import { useAuth } from '@/common/contexts/AuthContext/AuthContext';
import { AuthService } from '@/api/services/auth.service';
import { useNavigate } from 'react-router';
import styles from './Profile.module.css';
import { useState } from 'react';

const Profile = () => {
	const { username, clearSession, isAuthenticated } = useAuth();
	const navigate = useNavigate();

	// Mock settings state
	const [notifications, setNotifications] = useState(true);
	const [newsletter, setNewsletter] = useState(true);

	const handleLogout = async () => {
		try {
			await AuthService.logout();
			clearSession();
			navigate('/');
		} catch (error) {
			console.error('Logout failed', error);
		}
	};

	if (!isAuthenticated) {
		navigate('/login');
		return null;
	}

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.avatar}>{username?.charAt(0).toUpperCase()}</div>
				<div className={styles.userInfo}>
					<h1>{username}</h1>
					<p>Spiritual Traveler</p>
				</div>
			</div>

			<div className={styles.section}>
				<h2 className={styles.sectionTitle}>Preferences</h2>
				<div className={styles.settingsList}>
					<div className={styles.settingItem}>
						<span>Session Reminders</span>
						<div
							className={styles.toggle}
							data-active={notifications}
							onClick={() => setNotifications(!notifications)}
						/>
					</div>
					<div className={styles.settingItem}>
						<span>Weekly Wisdom Newsletter</span>
						<div
							className={styles.toggle}
							data-active={newsletter}
							onClick={() => setNewsletter(!newsletter)}
						/>
					</div>
				</div>
			</div>

			<div className={styles.section}>
				<button
					className={styles.logoutBtn}
					onClick={handleLogout}>
					Sign Out
				</button>
			</div>
		</div>
	);
};

export default Profile;
