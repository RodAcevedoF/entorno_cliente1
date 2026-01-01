export interface User {
	id: string;
	username?: string;
	email: string;
	password: string;
	themePreference?: 'light' | 'dark';
	createdAt: string;
	role: 'user' | 'admin';
}

export interface UserDTO {
	username?: string;
	email: string;
	password: string;
	confirmPassword?: string;
}

export interface Session {
	id: string;
	name: string;
	price: number;
	duration: number;
	category: string;
	level: 'beginner' | 'intermediate' | 'advanced';
	instructor: string;
	description: string;
	maxParticipants: number;
	image: string;
}

export interface AuthContextType {
	user: User | null;
	setSession: (user: User | null) => void;
}

export interface Cart {
	id: string;
	userId: string;
	items: Pick<Session, 'id'>[];
	createdAt: string;
}

export interface Orders {
	status: 'pending' | 'completed' | 'canceled';
	totalAmount: number;
	orderDate: string;
	sessions: Session[];
}
