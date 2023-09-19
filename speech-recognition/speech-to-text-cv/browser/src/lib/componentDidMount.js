import { getTokenOrRefresh } from './token_util';
import { messageStore } from './store';

export async function componentDidMount() {
	const tokenRes = await getTokenOrRefresh();
	if (tokenRes.authToken === null) {
		messageStore.set('FATAL_ERROR: ' + tokenRes.error);
	}
}
