import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

export async function POST({ request }) {
	const { username, password } = await request.json();

	const response = await fetch(`${env.VITE_BASE_URL_PRODUCTION}/signin`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ username, password })
	});

	if (!response.ok) {
		return json({ error: 'Login failed' }, { status: response.status });
	}

	const data = await response.json();
	return json(data);
}
