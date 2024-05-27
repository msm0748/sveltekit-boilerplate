import { JWT_SECRET } from '$env/static/private';
import type { Handle, HandleFetch } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';

// JWT 페이로드 타입 정의
interface JWTPayload {
	id: number;
	email: string;
	name: string;
	role: number;
}

export const handle: Handle = async ({ event, resolve }) => {
	const accessToken = event.cookies.get('accessToken');

	try {
		if (!accessToken) event.locals.user = undefined;
		const claims = jwt.verify(accessToken!, JWT_SECRET) as JWTPayload;
		event.locals.user = {
			id: claims.id,
			email: claims.email,
			name: claims.name,
			role: claims.role
		};
		// if (!claims) event.locals.user = undefined;
	} catch (error) {
		event.locals.user = undefined;
		// console.error(error);
	}

	const response = await resolve(event);
	return response;
};

export const handleFetch: HandleFetch = async ({ request, fetch }) => {
	const response = await fetch(request);
	return response;
};
