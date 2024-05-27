import prisma from '$lib/db';
import bcrypt from 'bcryptjs';

import { json } from '@sveltejs/kit';
import { JWT_SECRET } from '$env/static/private';
import jwt from 'jsonwebtoken';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const { email, password } = await request.json();

	try {
		const user = await prisma.user.findUnique({
			where: {
				email
			}
		});

		if (!user) {
			return json({ message: '사용자를 찾을 수 없습니다.' }, { status: 404 });
		}

		if (user.provider === 'local' && user.password) {
			const passwordMatch = await bcrypt.compare(password, user.password);

			if (!passwordMatch) {
				return json({ message: '잘못된 비밀번호입니다.' }, { status: 401 });
			}
		}

		const accessToken = jwt.sign(
			{
				id: user.id,
				email: user.email,
				name: user.name,
				role: user.role
			},
			JWT_SECRET,
			{
				expiresIn: '24h'
			}
		);

		const setCookieHeader = `accessToken=${accessToken}; HttpOnly; Max-Age=86400; SameSite=Strict; Path=/`;

		return json(
			{ message: '로그인에 성공했습니다.' },
			{ headers: { 'Set-Cookie': setCookieHeader } }
		);
	} catch (error) {
		return json({ message: error }, { status: 500 });
	}
};
