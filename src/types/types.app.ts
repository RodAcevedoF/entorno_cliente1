export interface User {
	id: string;
	username?: string;
	email: string;
	password: string;
	themePreference?: 'light' | 'dark';
	createdAt: string;
	role: 'user' | 'admin';
	preferences?: {
		notifications: boolean;
		newsletter: boolean;
	};
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
	items: CartItem[];
	createdAt: string;
}

export interface Order {
	id: string;
	items: CartItem[];
	total: number;
	orderDate: string;
	userId: string;
}

export interface OrderDTO {
	items: CartItem[];
	total: number;
	userId: string;
}

export interface CartItem {
	sessionId: string;
	quantity: number;
	name: string;
	price: number;
}

export interface UserSession {
	id: string;
	userId: string;
	startedAt: Date;
}

export interface AddToCartVars {
	userId: string;
	item: CartItem;
}
