import { User } from '@prisma/client';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET ?? 'super-secret';

const generate = (user: User & { id: string }) => {
	// Sign a short-lived JWT
	const token = jwt.sign(
		{ user },
		JWT_SECRET,
		{ expiresIn: '1d' }, // expires in 15 minutes
	);
	return token;
};

const verify = (token: string): { user: (User & { id: string }) | null } => {
	try {
		const payload = jwt.verify(token, JWT_SECRET) as {
			user: User & { id: string };
		};
		return payload; // Payload: { user, iat, exp }
	} catch {
		return { user: null }; // Invalid, expired, or tampered
	}
};

export const JWT = () => {
	return { generate, verify };
};
