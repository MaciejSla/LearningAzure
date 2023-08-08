import whisper

model = whisper.load_model("small")
audio = whisper.load_audio("aboutSpeechSdk.wav")
audio = whisper.pad_or_trim(audio)

result = model.transcribe(audio)
print(result["text"])
