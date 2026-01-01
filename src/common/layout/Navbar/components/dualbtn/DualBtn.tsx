import { useNavigate } from 'react-router';
import { useAuth } from '@/common/contexts/AuthContext/AuthContext';
import { useCart } from '@/common/contexts/CartContext/CartContext';
import { AuthService } from '@/api/services/auth.service';
import useMutation from '@/common/hooks/useMutation';
import styles from './DualBtn.module.css';

export const DualBtn = () => {
    const { isAuthenticated, clearSession, username } = useAuth();
    const { toggleCart, count } = useCart();
    const navigate = useNavigate();

    const { mutate: logout, isLoading } = useMutation<void, void>(
        AuthService.logout,
        {
            onSuccess: () => {
                clearSession();
                navigate('/');
            },
            onError: (error) => {
                console.error('Logout failed', error);
            }
        }
    );

    return (
        <div className={styles.container}>
            <button 
                className={styles.btnSecondary} 
                onClick={toggleCart}
            >
                Cart {count > 0 && `(${count})`}
            </button>
            
            {isAuthenticated ? (
                <>
                    <button 
                        className={styles.btnPrimary} 
                        onClick={() => navigate('/profile')}
                    >
                        {username || 'Profile'}
                    </button>
                    <button 
                        className={styles.btnLogout} 
                        onClick={() => logout()}
                        disabled={isLoading}
                    >
                        {isLoading ? '...' : 'Logout'}
                    </button>
                </>
            ) : (
                <button 
                    className={styles.btnPrimary} 
                    onClick={() => navigate('/login')}
                >
                    Login
                </button>
            )}
        </div>
    );
}

export default DualBtn;
