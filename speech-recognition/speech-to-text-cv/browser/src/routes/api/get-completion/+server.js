import { OpenAIClient, AzureKeyCredential } from '@azure/openai';
import { OPENAI_API_KEY, OPENAI_API_ENDPOINT } from '$env/static/private';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
	try {
		const { text } = await request.json();

		const messages = [
			{
				role: 'system',
				content:
					"Assistant is an AI chatbot that helps users turn a sentence containing information about a person into a specific JSON format. The JSON object is made out of these fields: name, surname, age, mail, phone, job, education, known_languages, interests. After users input a sentence, assistant will provide a JSON object containing all of the matching information from the sentence. Fields that don't have matching information should be filled with '-', except known_laguages and interest which should be left as empty arrays instead. Any phone number longer or shorter than 9 digits should be ignored all together and replaced with '-'. Assistant will automatically format the phone number to be a 9 character string that contains only digits - any area codes should be left out."
			},
			{ role: 'user', content: text }
		];

		const client = new OpenAIClient(OPENAI_API_ENDPOINT, new AzureKeyCredential(OPENAI_API_KEY));
		const deploymentId = 'gpt-learning';
		const result = await client.getChatCompletions(deploymentId, messages);

		console.log(result.choices[0].message);

		let completion = '';

		try {
			completion = JSON.parse(
				'{' +
					result.choices[0].message.content
						.split('{')[1]
						.replace('\n', '')
						.replace("'", '"')
						.split('}')[0] +
					'}'
			);
			if (completion.name != '-') {
				completion.name = completion.name.charAt(0).toUpperCase() + completion.name.slice(1);
			}
			if (completion.surname != '-') {
				completion.surname = completion.surname
					.split(' ')
					.map((x) => x.charAt(0).toUpperCase() + x.slice(1))
					.join(' ')
					.split('-')
					.map((x) => x.charAt(0).toUpperCase() + x.slice(1))
					.join('-');
			}
		} catch {
			return new Response('Incorrect information given - cannot parse input.', { status: 422 });
		}

		console.log(completion);

		return json(completion);
	} catch (err) {
		console.log(err);
	}
}
