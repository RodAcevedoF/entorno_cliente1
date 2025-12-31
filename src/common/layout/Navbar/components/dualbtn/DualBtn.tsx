import { useNavigate } from 'react-router';
import { useAuth } from '@/common/contexts/AuthContext/AuthContext';
import { useCart } from '@/common/contexts/CartContext/CartContext';
import styles from './DualBtn.module.css';
import { ShoppingCart } from 'lucide-react';

export const DualBtn = () => {
	const { isAuthenticated, logout, username } = useAuth();
	const { toggleCart, count } = useCart();
	const navigate = useNavigate();

	return (
		<div className={styles.container}>
			<button className={styles.btnSecondary} onClick={toggleCart}>
				<ShoppingCart /> {count > 0 && `(${count})`}
			</button>

			{isAuthenticated ? (
				<>
					<button
						className={styles.btnPrimary}
						onClick={() => navigate('/profile')}>
						{username || 'Profile'}
					</button>
					<button className={styles.btnLogout} onClick={() => logout()}>
						Logout
					</button>
				</>
			) : (
				<button
					className={styles.btnPrimary}
					onClick={() => navigate('/login')}>
					Login
				</button>
			)}
		</div>
	);
};

export default DualBtn;
