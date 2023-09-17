import { getTokenOrRefresh } from '$lib/token_util';
import { messageStore } from '$lib/store';

export async function componentDidMount() {
	const tokenRes = await getTokenOrRefresh();
	if (tokenRes.authToken === null) {
		messageStore.set('FATAL_ERROR: ' + tokenRes.error);
	}
}
