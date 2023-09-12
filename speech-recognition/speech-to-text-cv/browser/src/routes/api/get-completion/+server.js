import { OpenAIClient, AzureKeyCredential } from '@azure/openai';
import { OPENAI_API_KEY, OPENAI_API_ENDPOINT } from '$env/static/private';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
	try {
		const { text } = await request.json();

		// const prompt = `Sentence: ${text}, \nQuery: SELECT, \nTable: employees(id, name, surname, age, mail, phone, job, education, known_languages, interests).`;

		const messages = [
			{
				role: 'system',
				content:
					"Assistant is an AI chatbot that helps users turn a sentence containing information about a person into a specific JSON format. The JSON object is made out of these fields: name, surname, age, mail, phone, job, education, known_languages, interests. After users input a sentence, assistant will provide a JSON object containing all of the matching information from the sentence. Fields that don't have matching information should be filled with '-'. If no data can be extracted from the sentance, return object with all fields filled with '-'."
			},
			// {
			// 	role: 'user',
			// 	content: `Sentence: Krzysztof Krawczyk lat 39, \nQuery: SELECT, \nTable: employees(id, name, surname, age, mail, phone, job, education, known_languages, interests).`
			// },
			// {
			// 	role: 'assistant',
			// 	content: "SELECT * FROM employees WHERE name='Krzysztof' AND surname='Krawczyk' AND age=39;"
			// },
			{ role: 'user', content: text }
		];
		// const messages = [
		// 	{
		// 		role: 'system',
		// 		content:
		// 			'Assistant is an AI chatbot that helps users turn a natural language sentence into MySQL query format. After users input a sentence they want in query format, the query type and a table on which to run the query, it will provide the query using all of the overlaping data between the sentence and the table.'
		// 	},
		// 	{
		// 		role: 'user',
		// 		content: `Sentence: Krzysztof Krawczyk lat 39, \nQuery: SELECT, \nTable: employees(id, name, surname, age, mail, phone, job, education, known_languages, interests).`
		// 	},
		// 	{
		// 		role: 'assistant',
		// 		content: "SELECT * FROM employees WHERE name='Krzysztof' AND surname='Krawczyk' AND age=39;"
		// 	},
		// 	{ role: 'user', content: prompt }
		// ];

		const client = new OpenAIClient(OPENAI_API_ENDPOINT, new AzureKeyCredential(OPENAI_API_KEY));
		const deploymentId = 'gpt-learning';
		const result = await client.getChatCompletions(deploymentId, messages);

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
		} catch {
			completion = {
				name: '-',
				surname: '-',
				age: '-',
				mail: '-',
				phone: '-',
				job: '-',
				education: '-',
				known_languages: '-',
				interests: '-'
			};
		}

		console.log(completion);

		return json(completion);
	} catch (err) {
		console.log(err);
	}
}
