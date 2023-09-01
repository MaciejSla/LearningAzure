import os
import azure.cognitiveservices.speech as speechsdk
from dotenv import load_dotenv
from tinydb import TinyDB
import os
import openai
import json

load_dotenv()

openai.api_type = "azure"
openai.api_base = "https://etrust-openai-devel.openai.azure.com/"
openai.api_version = "2022-12-01"
openai.api_key = os.getenv("OPENAI_API_KEY")

db = TinyDB("db.json")


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

# Potential chatGPT query
prompt = f"""Jakie dane osobowe zawiera to zdanie: {" ".join(text)}? 
Podaj mi je w formacie dokumentu JSON z następującymi polami: name, surname, age, mail, phone, job, education, known_languages, interests. 
W pola dla których brakuje informacji wpisz "-".
"""


response = openai.Completion.create(
    engine="gpt-learning",
    prompt=prompt,
    temperature=0,
    max_tokens=300,
    top_p=1,
    frequency_penalty=0,
    presence_penalty=0,
    stop=["}"],
)

response_text = (
    "{"
    + response.choices[0].text.split("{", 1)[1].replace("\n", "").replace("'", '"')
    + "}"
)

final_object = json.loads(response_text)
db.insert(final_object)
