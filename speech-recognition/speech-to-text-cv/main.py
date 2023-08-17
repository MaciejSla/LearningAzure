import os
import azure.cognitiveservices.speech as speechsdk
from dotenv import load_dotenv
from tinydb import TinyDB

db = TinyDB("db.json")

load_dotenv()


def speech_recognize_continuous_async_from_microphone(keywords: list = ["stop"]):
    """
    Performs continuous speech recognition from microphone and returns array of recognized sentences.

    Stops when recognized speech includes keyword.

    The default keyword is `stop`.

    """
    text = []
    speech_config = speechsdk.SpeechConfig(
        subscription=os.environ.get("SPEECH_KEY"),
        region=os.environ.get("SPEECH_REGION"),
    )

    speech_config.speech_recognition_language = "pl-PL"

    speech_recognizer = speechsdk.SpeechRecognizer(speech_config=speech_config)

    done = False

    def recognized_cb(evt: speechsdk.SpeechRecognitionEventArgs):
        for keyword in keywords:
            if keyword in evt.result.text.lower():
                nonlocal done
                done = True
                break
        print(evt.result.text)
        text.append(evt.result.text)

    def stop_cb(evt: speechsdk.SessionEventArgs):
        """callback that signals to stop continuous recognition"""
        print("CLOSING on {}".format(evt))
        nonlocal done
        done = True

    speech_recognizer.recognized.connect(recognized_cb)
    speech_recognizer.session_stopped.connect(stop_cb)
    speech_recognizer.canceled.connect(stop_cb)

    result_future = speech_recognizer.start_continuous_recognition_async()

    result_future.get()
    print("Continuous Recognition is now running, say something.")

    print(f'Powiedz "{"/".join(keywords)}" aby zakończyć nasłuchiwanie...')
    while not done:
        continue
    speech_recognizer.stop_continuous_recognition_async()
    print("recognition stopped, main thread can exit now.")
    return text


text = speech_recognize_continuous_async_from_microphone(
    ["prześlij formularz", "zapisz", "wyślij"]
)
print(" ".join(text))
document = {"text": text}

db.insert(document)
