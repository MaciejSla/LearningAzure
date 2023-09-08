import { getTokenOrRefresh } from '$lib/token_util';
import { writable } from 'svelte/store';
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';

export const writableStore = writable('INITIALIZED: ready to test speech...');

export async function componentDidMount() {
	const tokenRes = await getTokenOrRefresh();
	if (tokenRes.authToken === null) {
		writableStore.set('FATAL_ERROR: ' + tokenRes.error);
	}
}

export async function fromMic() {
	const tokenObj = await getTokenOrRefresh();
	const speechConfig = sdk.SpeechConfig.fromAuthorizationToken(tokenObj.authToken, tokenObj.region);
	speechConfig.speechRecognitionLanguage = 'pl-PL';

	const audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();
	const recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

	writableStore.set('speak into your microphone...');

	recognizer.recognizeOnceAsync((result) => {
		let displayText;
		if (result.reason === sdk.ResultReason.RecognizedSpeech) {
			displayText = `RECOGNIZED: Text=${result.text}`;
		} else {
			displayText =
				'ERROR: Speech was cancelled or could not be recognized. Ensure your microphone is working properly.';
		}

		writableStore.set(displayText);
	});
}
