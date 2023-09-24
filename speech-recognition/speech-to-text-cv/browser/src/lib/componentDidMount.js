import { getTokenOrRefresh } from './token_util';

export async function componentDidMount(messageStore) {
	const tokenRes = await getTokenOrRefresh();
	if (tokenRes.authToken === null) {
		messageStore.set({ text: 'FATAL_ERROR: ' + tokenRes.error, background: 'variant-filled-error' });
	}
}
