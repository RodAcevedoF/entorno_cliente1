import {
	createContext,
	useContext,
	useState,
	type FC,
	type ReactNode,
} from 'react';

interface AuthContextType {
	isAuthenticated: boolean;
	setSession: (user: any) => void;
	clearSession: () => void;
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

interface AuthProviderProps {
    children: ReactNode;
    defaultUser?: any;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children, defaultUser }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(!!defaultUser);
	const [userRole, setUserRole] = useState<'admin' | 'user' | 'guest'>(defaultUser?.role || 'guest');
	const [username, setUsername] = useState<string | undefined>(defaultUser?.username);
	const loading = false;

	const setSession = (user: any) => {
		setIsAuthenticated(true);
		setUserRole(user.role || 'user');
		setUsername(user.username);
	};

	const clearSession = () => {
		setIsAuthenticated(false);
		setUserRole('guest');
		setUsername(undefined);
	};

	return (
		<AuthContext.Provider
			value={{
				isAuthenticated,
				setSession,
				clearSession,
				loading,
				userRole,
				username,
			}}>
			{children}
		</AuthContext.Provider>
	);
};
