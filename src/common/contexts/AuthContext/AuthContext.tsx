import {
	createContext,
	useContext,
	useEffect,
	useState,
	type FC,
	type ReactNode,
} from 'react';
import { AuthService } from '@/api/services/auth.service';

interface AuthContextType {
	isAuthenticated: boolean;
	login: (username: string, pass: string) => Promise<void>;
	register: (username: string, pass: string) => Promise<void>;
	logout: () => Promise<void>;
	loading: boolean;
	userRole?: 'admin' | 'user' | 'guest';
    username?: string;
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

const USER_STORAGE_KEY = 'valenti_user';

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [userRole, setUserRole] = useState<'admin' | 'user' | 'guest'>('guest');
    const [username, setUsername] = useState<string | undefined>(undefined);
    const [loading, setLoading] = useState(true);

	useEffect(() => {
        // Check local storage on mount to persist session across refreshes
        const storedUser = localStorage.getItem(USER_STORAGE_KEY);
        if (storedUser) {
            try {
                const user = JSON.parse(storedUser);
                setIsAuthenticated(true);
                setUserRole(user.role || 'user');
                setUsername(user.username);
            } catch (e) {
                console.error("Failed to parse stored user", e);
                localStorage.removeItem(USER_STORAGE_KEY);
            }
        }
        setLoading(false);
	}, []);

	const login = async (u: string, p: string) => {
		try {
            // REAL CALL: Checks against data.json
			const user = await AuthService.login(u, p);
            
            // Save session to local storage (so refresh doesn't logout)
            localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
            
			setIsAuthenticated(true);
			setUserRole(user.role || 'user');
            setUsername(user.username);
		} catch (e) {
			console.error('Login failed', e);
			throw e;
		}
	};

    const register = async (u: string, p: string) => {
        try {
            // REAL CALL: Writes to data.json
            const user = await AuthService.register(u, p);

            // Auto login after register
            localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
            
            setIsAuthenticated(true);
            setUserRole(user.role || 'user');
            setUsername(user.username);
        } catch (e) {
            console.error('Register failed', e);
            throw e;
        }
    }

	const logout = async () => {
		try {
			await AuthService.logout();
            localStorage.removeItem(USER_STORAGE_KEY);
			setIsAuthenticated(false);
			setUserRole('guest');
            setUsername(undefined);
		} catch (e) {
			console.error('Logout failed', e);
		}
	};

	return (
		<AuthContext.Provider
			value={{ isAuthenticated, login, register, logout, loading, userRole, username }}>
			{children}
		</AuthContext.Provider>
	);
};