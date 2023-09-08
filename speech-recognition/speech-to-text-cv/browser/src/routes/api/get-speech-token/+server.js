import { SPEECH_KEY, SPEECH_REGION } from '$env/static/private';
import { json } from '@sveltejs/kit';
import axios from 'axios';

export async function GET() {
	const headers = {
		headers: {
			'Ocp-Apim-Subscription-Key': SPEECH_KEY,
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	};

	try {
		const tokenResponse = await axios.post(
			`https://${SPEECH_REGION}.api.cognitive.microsoft.com/sts/v1.0/issueToken`,
			null,
			headers
		);
		return json({ token: tokenResponse.data, region: SPEECH_REGION });
	} catch (err) {
		return new Response('There was an error authorizing your speech key.', { status: 401 });
	}
}
