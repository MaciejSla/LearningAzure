import { getTokenOrRefresh } from './token_util';

export async function componentDidMount(messageStore) {
	const tokenRes = await getTokenOrRefresh();
	if (tokenRes.authToken === null) {
		messageStore.set('FATAL_ERROR: ' + tokenRes.error);
	}
}
