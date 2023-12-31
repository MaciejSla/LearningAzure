import { getTokenOrRefresh } from './token_util';
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';

export async function fromMicOnce(messageStore, resultStore) {
	const tokenObj = await getTokenOrRefresh();
	const speechConfig = sdk.SpeechConfig.fromAuthorizationToken(tokenObj.authToken, tokenObj.region);
	speechConfig.speechRecognitionLanguage = 'pl-PL';

	const audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();
	const recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

	// messageStore.set('');

	recognizer.recognizeOnceAsync((result) => {
		if (result.reason === sdk.ResultReason.RecognizedSpeech) {
			resultStore.set(result.text);
		} else {
			messageStore.set({
				text: 'ERROR: Speech was cancelled or could not be recognized. Ensure your microphone is working properly.',
				background: 'variant-filled-error'
			});
			// resultStore.set('');
		}
	});
}
