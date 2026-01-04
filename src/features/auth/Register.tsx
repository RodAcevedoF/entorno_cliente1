import { useState } from 'react';
import { useAuth } from '@/common/contexts/AuthContext/AuthContext';
import { AuthService } from '@/api/services/auth.service';
import { useNavigate, Link } from 'react-router';
import styles from './Auth.module.css';
import useMutation from '@/common/hooks/useMutation';
import type { UserDTO, User } from '@/types/types.app';
import { ValidationError } from '@/common/errors/errors.app';
import ShowPasswordBtn from './ShowPasswordBtn';

const Register = () => {
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const { setSession } = useAuth();
	const navigate = useNavigate();

	const user: UserDTO = {
		username,
		email,
		password,
		confirmPassword,
	};

	const {
		mutate: register,
		isLoading,
		error,
	} = useMutation<User, UserDTO>(AuthService.register, {
		onSuccess: () => {
			setSession(user);
			navigate('/');
		},
		onError: (error) => {
			console.log(error);
		},
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		register(user);
	};

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h2 className={styles.title}>Join the Journey</h2>
				{error &&
					(error instanceof ValidationError ? (
						<div className={styles.error}>
							<ul>
								{Array.isArray(error.messages) ? (
									error.messages.map((msg, index) => <li key={index}>{msg}</li>)
								) : (
									<li>{error.messages}</li>
								)}
							</ul>
						</div>
					) : (
						<div className={styles.error}>{error.message}</div>
					))}
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
						<label htmlFor='username' className={styles.label}>
							Username
						</label>
						<input
							type='username'
							id='username'
							className={styles.input}
							value={username}
							onChange={(e) => setUsername(e.target.value)}
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
					<div className={styles.inputGroup}>
						<label htmlFor='confirmPassword' className={styles.label}>
							Confirm Password
						</label>
						<input
							type={showPassword ? 'text' : 'password'}
							id='confirmPassword'
							className={styles.input}
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
						/>
						<ShowPasswordBtn
							cssClass={styles.passwordToggle}
							isShowing={showPassword}
							parentMethod={() => setShowPassword(!showPassword)}
						/>
					</div>
					<button type='submit' disabled={isLoading} className={styles.button}>
						Create Account
					</button>
				</form>
				<div className={styles.footer}>
					Already have an account?{' '}
					<Link to='/login' className={styles.link}>
						Sign in
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Register;
