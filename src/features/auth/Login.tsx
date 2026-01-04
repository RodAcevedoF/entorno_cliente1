import { useState } from 'react';
import { useAuth } from '@/common/contexts/AuthContext/AuthContext';
import { AuthService } from '@/api/services/auth.service';
import { useNavigate, Link } from 'react-router';
import styles from './Auth.module.css';
import useMutation from '@/common/hooks/useMutation';
import type { User, UserDTO } from '@/types/types.app';
import ShowPasswordBtn from './ShowPasswordBtn';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const { setSession } = useAuth();
	const navigate = useNavigate();

	const user = {
		email,
		password,
	};

	const {
		mutate: login,
		isLoading,
		error,
	} = useMutation<User, UserDTO>(AuthService.login, {
		onSuccess: (data) => {
			setSession(data);
			navigate('/');
		},
		onError: (error) => {
			console.log(error);
		},
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		login(user);
	};

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h2 className={styles.title}>Welcome Back</h2>
				{error && <div className={styles.error}>{error.message}</div>}
				<form onSubmit={handleSubmit} className={styles.form}>
					<div className={styles.inputGroup}>
						<label htmlFor='email' className={styles.label}>
							Email
						</label>
						<input
							type='email'
							id='email'
							className={styles.input}
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>
					<div className={styles.inputGroup}>
						<label htmlFor='password' className={styles.label}>
							Password
						</label>
						<input
							type={showPassword ? 'text' : 'password'}
							id='password'
							className={styles.input}
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
						<ShowPasswordBtn
							cssClass={styles.passwordToggle}
							isShowing={showPassword}
							parentMethod={() => setShowPassword(!showPassword)}
						/>
					</div>
					<button type='submit' className={styles.button} disabled={isLoading}>
						Sign In
					</button>
				</form>
				<div className={styles.footer}>
					Don't have an account?{' '}
					<Link to='/register' className={styles.link}>
						Sign up
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;
