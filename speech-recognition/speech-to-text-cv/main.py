import os
import azure.cognitiveservices.speech as speechsdk
from dotenv import load_dotenv
import openai

load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")


def speech_recognize_continuous_async_from_microphone():
    text = []
    """performs continuous speech recognition asynchronously with input from microphone"""
    speech_config = speechsdk.SpeechConfig(
        subscription=os.environ.get("SPEECH_KEY"),
        region=os.environ.get("SPEECH_REGION"),
    )

    speech_config.speech_recognition_language = "pl-PL"

    speech_recognizer = speechsdk.SpeechRecognizer(speech_config=speech_config)

    keyword = "prześlij formularz"

    done = False

    def recognized_cb(evt: speechsdk.SpeechRecognitionEventArgs):
        if keyword in evt.result.text.lower():
            nonlocal done
            done = True
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

    print('Powiedz "Prześlij formularz" aby zakończyć nasłuchiwanie...')
    while not done:
        continue
    speech_recognizer.stop_continuous_recognition_async()
    print("recognition stopped, main thread can exit now.")
    return text


text = speech_recognize_continuous_async_from_microphone()
print(" ".join(text))

# chat_completion = openai.ChatCompletion.create(
#     model="gpt-3.5-turbo", messages=[{"role": "user", "content": "Hello world"}]
# )

# # print the chat completion
# print(chat_completion.choices[0].message.content)
