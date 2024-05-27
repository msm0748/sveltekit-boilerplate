import prisma from '$lib/db';

export const getUserFromDb = async (email: string, pwHash: string) => {
	const user = await prisma.user.findFirst({
		where: {
			email: email, // 사용자 ID
			password: pwHash // 해시된 비밀번호
		}
	});

	return user;
};
