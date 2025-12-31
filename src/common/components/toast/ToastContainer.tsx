import { useToast } from '@/common/contexts/ToastContext/ToastContext';
import styles from './ToastContainer.module.css';

export const ToastContainer = () => {
    const { toasts, removeToast } = useToast();

    return (
        <div className={styles.container}>
            {toasts.map(toast => (
                <div key={toast.id} className={`${styles.toast} ${styles[toast.type]}`}>
                    <span>{toast.message}</span>
                    <button className={styles.closeBtn} onClick={() => removeToast(toast.id)}>
                        &times;
                    </button>
                </div>
            ))}
        </div>
    );
};
