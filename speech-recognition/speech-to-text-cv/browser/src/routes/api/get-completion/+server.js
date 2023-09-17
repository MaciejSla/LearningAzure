import { OpenAIClient, AzureKeyCredential } from '@azure/openai';
import { OPENAI_API_KEY, OPENAI_API_ENDPOINT } from '$env/static/private';
import { json } from '@sveltejs/kit';

const regexp = new RegExp(`\{(?:[^{}]|(\{(?:[^{}]|())*\}))*\}`, 'g');
const fields = [
	'name',
	'surname',
	'age',
	'mail',
	'phone',
	'job',
	'education',
	'known_languages',
	'interests'
];

export async function POST({ request }) {
	try {
		const { text } = await request.json();

		const messages = [
			{
				role: 'system',
				content: `Assistant is an AI chatbot that turns a search command given by the user into a specific JSON format. The JSON object can contain only these fields: ${fields}. Assistant should extract matching information from the command and generate a JSON object based on those fields. Fields which can not be filled with information from these commands should be ignored and not included in the final JSON object.  The JSON can contain as little as one field. Assistant should only accept 9 digit phone numbers, not including area codes and dashes or empty spaces between the numbers. The values should be given in the same language as the command.`
				// "Assistant is an AI chatbot that helps users turn a sentence containing information about a person into a specific JSON format. The JSON object is made out of these fields: name, surname, age, mail, phone, job, education, known_languages, interests. After users input a sentence, assistant will provide a JSON object containing all of the matching information from the sentence. Fields that don't have matching information should be ignored and not included in the final JSON object. Any phone number longer or shorter than 9 digits should be ignored as well. Assistant will automatically format the phone number to be a 9 character string that contains only digits - any area codes should be left out."
			},
			{ role: 'user', content: `Parse this command: ${text}` }
		];

		const client = new OpenAIClient(OPENAI_API_ENDPOINT, new AzureKeyCredential(OPENAI_API_KEY));
		const deploymentId = 'gpt-learning';
		const result = await client.getChatCompletions(deploymentId, messages);

		console.log(result.choices[0].message);

		let completion = '';

		try {
			completion = JSON.parse(regexp.exec(result.choices[0].message.content)[0]);
			regexp.lastIndex = 0;
			if (completion.name) {
				completion.name = completion.name.charAt(0).toUpperCase() + completion.name.slice(1);
			}
			if (completion.surname) {
				completion.surname = completion.surname
					.split(' ')
					.map((x) => x.charAt(0).toUpperCase() + x.slice(1))
					.join(' ')
					.split('-')
					.map((x) => x.charAt(0).toUpperCase() + x.slice(1))
					.join('-');
			}
			if (completion.age) {
				completion.age =
					typeof completion.age == 'string' ? parseInt(completion.age) : completion.age;
			}
			if (completion.known_languages) {
				completion.known_languages =
					typeof completion.known_languages == 'string'
						? [completion.known_languages]
						: completion.known_languages;
			}
			if (completion.interests) {
				completion.interests =
					typeof completion.interests == 'string' ? [completion.interests] : completion.interests;
			}
		} catch {
			return new Response('Incorrect information given - cannot parse input.', { status: 422 });
		}

		if (!Object.keys(completion).every((val) => fields.includes(val))) {
			return new Response('Error parsing input - please try again', { status: 500 });
		}
		console.log(completion);

		return json(completion);
	} catch (err) {
		console.log(err);
	}
}
