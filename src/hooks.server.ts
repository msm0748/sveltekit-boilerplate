import { redirect, type Handle, type HandleFetch } from '@sveltejs/kit';

// ID에 '(account)'를 포함하는지 확인하는 함수
const isAccountRoute = (id: string | null) => {
	const idPattern = /\(account\)/;
	return idPattern.test(id || '');
};

export const handleFetch: HandleFetch = async ({ request, fetch, event }) => {
	const accessToken = event.cookies.get('access_token');
	const { pathname } = event.url;

	// 헤더 설정
	request.headers.set('Authorization', `Bearer ${accessToken}`);

	// 새로운 요청 객체로 fetch 호출
	const response = await fetch(request);

	const isAccountPage = isAccountRoute(event.route.id);

	// 토큰 만료시 로그인 페이지로 리다이렉트
	if (response.status === 401 && !isAccountPage) {
		throw redirect(303, '/signin');
	}

	return response;
};

export const handle: Handle = async ({ event, resolve }) => {
	const { locals, cookies, fetch } = event;
	const accessToken = cookies.get('access_token');
	try {
		// const response = await fetch(`/api/user/auth`, {
		// 	method: 'GET',
		// 	headers: {
		// 		Authorization: `Bearer ${accessToken}`
		// 	}
		// });
		// const user = await response.json();
		// locals.user = user;
	} catch (error) {
		console.error(error);

		locals.user = null;
	}

	const response = await resolve(event);
	return response;
};
