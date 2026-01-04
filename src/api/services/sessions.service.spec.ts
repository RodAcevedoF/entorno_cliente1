import { describe, it, expect, vi, mock } from 'bun:test';
import { SessionsService, SESSIONS_ENDPOINTS } from './sessions.service';
import api from '../../lib/api';

mock.module('../../lib/api', () => ({
	default: {
		get: vi.fn(),
	},
}));

describe('SessionsService', () => {
	it('getSessions fetches all sessions successfully', async () => {
		const mockSessions = [
			{ id: 1, name: 'Session 1' },
			{ id: 2, name: 'Session 2' },
		];
		(api.get as any).mockResolvedValue({ data: mockSessions });

		const result = await SessionsService.getSessions();

		expect(api.get).toHaveBeenCalledWith(SESSIONS_ENDPOINTS.SESSIONS);
		expect(result).toEqual(mockSessions);
	});
});
