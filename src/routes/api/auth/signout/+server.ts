import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async () => {
	return json(
		{ message: '로그아웃에 성공했습니다.' },
		{
			status: 200,
			headers: {
				'Set-Cookie': 'accessToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT'
			}
		}
	);
};
