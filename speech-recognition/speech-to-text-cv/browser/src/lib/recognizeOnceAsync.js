import { getTokenOrRefresh } from '$lib/token_util';
import { messageStore, resultStore } from '$lib/store';
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';

export async function fromMicOnce() {
	const tokenObj = await getTokenOrRefresh();
	const speechConfig = sdk.SpeechConfig.fromAuthorizationToken(tokenObj.authToken, tokenObj.region);
	speechConfig.speechRecognitionLanguage = 'pl-PL';

	const audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();
	const recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

	messageStore.set('');

	recognizer.recognizeOnceAsync((result) => {
		if (result.reason === sdk.ResultReason.RecognizedSpeech) {
			resultStore.set(result.text);
		} else {
			messageStore.set(
				'ERROR: Speech was cancelled or could not be recognized. Ensure your microphone is working properly.'
			);
			resultStore.set('');
		}
	});
}
