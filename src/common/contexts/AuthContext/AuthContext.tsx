import { AuthService } from '@/api/services/auth.service';
import {
	createContext,
	useContext,
	useEffect,
	useState,
	useCallback,
	useMemo,
	type FC,
	type ReactNode,
} from 'react';
import type { User } from '@/types/types.app';

interface AuthContextType {
	setSession: (user: Partial<User>) => void;
	clearSession: () => void;
	isLoading: boolean;
	userContext: {
		id: string | null;
		username: string | undefined;
		role: 'admin' | 'user' | 'guest';
		isAuthenticated: boolean;
	};
}

export const AuthContext = createContext<AuthContextType | undefined>(
	undefined,
);

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};

interface AuthProviderProps {
	children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
	const [userId, setUserId] = useState<string | null>(() => {
		return localStorage.getItem('valenti_user') ?? null;
	});
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [userRole, setUserRole] = useState<'admin' | 'user' | 'guest'>('guest');
	const [username, setUsername] = useState<string | undefined>(undefined);
	const [isLoading, setIsLoading] = useState(() => !!localStorage.getItem('valenti_user'));

	const setSession = useCallback((user: Partial<User>) => {
		const id = user?.id ?? null;
		if (id) {
			localStorage.setItem('valenti_user', id);
			setUserId(id);
		} else {
			localStorage.removeItem('valenti_user');
			setUserId(null);
		}
		setIsAuthenticated(true);
		setUserRole(user.role ?? 'user');
		setUsername(user.username);
	}, []);

	const clearSession = useCallback(() => {
		localStorage.removeItem('valenti_user');
		setUserId(null);
		setIsAuthenticated(false);
		setUserRole('guest');
		setUsername(undefined);
	}, []);

	useEffect(() => {
		const fetchUser = async () => {
			if (!userId) {
				return;
			}
			setIsLoading(true);
			try {
				const user = await AuthService.getUserById(userId);
				if (!user) {
					return;
				}
				setIsAuthenticated(true);
				setUserRole(user.role ?? 'guest');
				setUsername(user.username);
			} catch (err) {
				console.error('Failed to load user:', err);
			} finally {
				setIsLoading(false);
			}
		};
		fetchUser();
	}, [userId]);

	useEffect(() => {
		const handleStorage = (e: StorageEvent) => {
			if (e.key === 'valenti_user') {
				setUserId(e.newValue ?? null);
			}
		};
		window.addEventListener('storage', handleStorage);
		return () => window.removeEventListener('storage', handleStorage);
	}, []);

	const value = useMemo(
		() => ({
			setSession,
			clearSession,
			isLoading,
			userContext: {
				id: userId,
				username,
				role: userRole,
				isAuthenticated,
			},
		}),
		[
			setSession,
			clearSession,
			isLoading,
			userId,
			username,
			userRole,
			isAuthenticated,
		],
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
