import { getTokenOrRefresh } from '$lib/token_util';
import { writableStore } from '$lib/store';

export async function componentDidMount() {
	const tokenRes = await getTokenOrRefresh();
	if (tokenRes.authToken === null) {
		writableStore.set('FATAL_ERROR: ' + tokenRes.error);
	}
}
