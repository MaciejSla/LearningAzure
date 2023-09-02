import { SPEECH_KEY, SPEECH_REGION } from '$env/static/private';
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';
const speechConfig = sdk.SpeechConfig.fromSubscription(SPEECH_KEY, SPEECH_REGION);

const testFunc = () => {
	return 'lol';
};

export function load() {
	return {
		key: SPEECH_KEY
	};
}

export const actions = {
	recording: async ({ request }) => {
		const data = await request.formData();
		const file = data.get('file');
		console.log(file);
	}
};
