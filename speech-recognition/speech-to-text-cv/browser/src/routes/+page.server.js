import { SPEECH_KEY, SPEECH_REGION } from '$env/static/private';
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';
const speechConfig = sdk.SpeechConfig.fromSubscription(SPEECH_KEY, SPEECH_REGION);
speechConfig.speechRecognitionLanguage = 'pl-PL';
let recognizedText = '';

// ! Possibly rework this
// function fromFile(file) {
// 	let audioConfig = sdk.AudioConfig.fromWavFileInput(file);
// 	let speechRecognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

// 	speechRecognizer.recognizeOnceAsync((result) => {
// 		switch (result.reason) {
// 			case sdk.ResultReason.RecognizedSpeech:
// 				console.log(`RECOGNIZED: Text=${result.text}`);
// 				break;
// 			case sdk.ResultReason.NoMatch:
// 				console.log('NOMATCH: Speech could not be recognized.');
// 				break;
// 			case sdk.ResultReason.Canceled:
// 				const cancellation = sdk.CancellationDetails.fromResult(result);
// 				console.log(`CANCELED: Reason=${cancellation.reason}`);

// 				if (cancellation.reason == sdk.CancellationReason.Error) {
// 					console.log(`CANCELED: ErrorCode=${cancellation.ErrorCode}`);
// 					console.log(`CANCELED: ErrorDetails=${cancellation.errorDetails}`);
// 					console.log('CANCELED: Did you set the speech resource key and region values?');
// 				}
// 				break;
// 		}
// 		speechRecognizer.close();
// 	});
// }

export function load() {
	return {
		text: recognizedText
	};
}

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const file = data.get('recording');
		console.log(file);
		// fromFile(file);
		// const data = Object.fromEntries(await request.formData());
		// console.log(data);
	}
};
