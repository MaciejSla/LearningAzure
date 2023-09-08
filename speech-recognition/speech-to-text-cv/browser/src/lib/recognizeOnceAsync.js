import { getTokenOrRefresh } from '$lib/token_util';
import { writableStore } from '$lib/store';
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';

export async function fromMicOnce() {
	const tokenObj = await getTokenOrRefresh();
	const speechConfig = sdk.SpeechConfig.fromAuthorizationToken(tokenObj.authToken, tokenObj.region);
	speechConfig.speechRecognitionLanguage = 'pl-PL';

	const audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();
	const recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

	writableStore.set('speak into your microphone...');

	recognizer.recognizeOnceAsync((result) => {
		let displayText;
		if (result.reason === sdk.ResultReason.RecognizedSpeech) {
			displayText = result.text;
		} else {
			displayText =
				'ERROR: Speech was cancelled or could not be recognized. Ensure your microphone is working properly.';
		}

		writableStore.set(displayText);
	});
}
