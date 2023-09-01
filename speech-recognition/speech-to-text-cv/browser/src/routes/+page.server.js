import { SPEECH_KEY, SPEECH_REGION } from "$env/static/private";
import * as sdk from "microsoft-cognitiveservices-speech-sdk";
const speechConfig = sdk.SpeechConfig.fromSubscription(
  SPEECH_KEY,
  SPEECH_REGION
);

export function load() {
  return {
    key: SPEECH_KEY,
  };
}
