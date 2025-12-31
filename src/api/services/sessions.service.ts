import api from '../lib/api';

export interface Session {
	id: number;
	name: string;
	price: number;
	duration: number;
	category: string;
	level: string;
	instructor: string;
	description: string;
	maxParticipants: number;
	image: string;
}

export const SessionsService = {
	getSessions: async (): Promise<Session[]> => {
		const response = await api.get<Session[]>('/sessions');
		return response.data;
	},
};
