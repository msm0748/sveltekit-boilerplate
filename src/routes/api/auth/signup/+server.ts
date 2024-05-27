import prisma from '$lib/db';
import bcrypt from 'bcryptjs';
import { json } from '@sveltejs/kit';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { saltRounds } from '$lib/constants/passwordSalt';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const { email, password } = await request.json();

	const hashedPassword = await bcrypt.hash(password, saltRounds);

	try {
		await prisma.user.create({
			data: {
				email,
				password: hashedPassword
			}
		});

		return json({ message: '회원가입에 성공했습니다.' });
	} catch (error) {
		if (error instanceof PrismaClientKnownRequestError) {
			switch (error.code) {
				case 'P2002':
					return json(
						{ message: '이미 존재하는 이메일 입니다.' },
						{
							status: 409
						}
					);

				default:
					return json({ message: error }, { status: 500 });
			}
		}

		return json({ message: error }, { status: 500 });
	}
};
