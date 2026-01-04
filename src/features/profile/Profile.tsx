import { useAuth } from '@/common/contexts/AuthContext/AuthContext';
import { AuthService } from '@/api/services/auth.service';
import { useNavigate } from 'react-router';
import styles from './Profile.module.css';
import { useState, useEffect } from 'react';
import useMutation from '@/common/hooks/useMutation';
import useQuery from '@/common/hooks/useQuery';
import { OrderService } from '@/api/services/order.service';
import type { Order, User } from '@/types/types.app';
import { Trash2, Package, Calendar } from 'lucide-react';

const Profile = () => {
	const { clearSession, userContext, isLoading: isAuthLoading } = useAuth();
	const navigate = useNavigate();
	const [notifications, setNotifications] = useState(false);
	const [newsletter, setNewsletter] = useState(false);

	const { mutate: logout, isLoading: isLogoutLoading } = useMutation<
		void,
		string
	>(AuthService.logout, {
		onSuccess: () => {
			clearSession();
			navigate('/');
		},
		onError: (error) => {
			console.error('Logout failed', error);
		},
	});

	useQuery<User | undefined>(
		() =>
			userContext.id
				? AuthService.getUserById(userContext.id)
				: Promise.resolve(undefined),
		[userContext.id],
		{
			enabled: !!userContext.id,
			onSuccess: (data) => {
				if (data && data.preferences) {
					setNotifications(data.preferences.notifications);
					setNewsletter(data.preferences.newsletter);
				}
			},
		},
	);

	const { mutate: updateUser } = useMutation<
		User,
		{ userId: string; data: Partial<User> }
	>(({ userId, data }) => AuthService.updateUser(userId, data), {
		onSuccess: (data) => {
			if (data.preferences) {
				setNotifications(data.preferences.notifications);
				setNewsletter(data.preferences.newsletter);
			}
		},
	});

	const {
		data: orders,
		isLoading: isOrdersLoading,
		refetch: refetchOrders,
	} = useQuery<Order[]>(
		() =>
			userContext.id
				? OrderService.getOrdersByUserId(userContext.id)
				: Promise.resolve([]),
		[userContext.id],
		{
			enabled: !!userContext.id,
		},
	);

	const { mutate: deleteOrder, isLoading: isDeleting } = useMutation<
		void,
		string
	>(OrderService.removeOrder, {
		onSuccess: () => {
			refetchOrders();
		},
		onError: (error) => {
			console.error('Failed to delete order', error);
		},
	});

	const handlePreferenceChange = (
		key: 'notifications' | 'newsletter',
		value: boolean,
	) => {
		if (!userContext.id) return;
		const newPreferences = {
			notifications,
			newsletter,
			[key]: value,
		};
		// Optimistic update
		if (key === 'notifications') setNotifications(value);
		if (key === 'newsletter') setNewsletter(value);

		updateUser({
			userId: userContext.id,
			data: { preferences: newPreferences },
		});
	};

	useEffect(() => {
		if (!isAuthLoading && !userContext.isAuthenticated) {
			navigate('/login');
		}
	}, [isAuthLoading, userContext.isAuthenticated, navigate]);

	if (isAuthLoading) {
		return (
			<div className={styles.loadingText}>Verifying soul signature...</div>
		);
	}

	if (!userContext.isAuthenticated) {
		return null;
	}

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.avatar}>
					{userContext.username?.charAt(0).toUpperCase()}
				</div>
				<div className={styles.userInfo}>
					<h1>{userContext.username}</h1>
					<p>Spiritual Traveler</p>
				</div>
			</div>

			<div className={styles.grid}>
				<div className={styles.section}>
					<h2 className={styles.sectionTitle}>Journey History</h2>
					<div className={styles.ordersList}>
						{isOrdersLoading ? (
							<p className={styles.loadingText}>Consulting the archives...</p>
						) : orders && orders.length > 0 ? (
							orders.map((order) => (
								<div key={order.id} className={styles.orderCard}>
									<div className={styles.orderHeader}>
										<div className={styles.orderMeta}>
											<span className={styles.orderId}>
												<Package size={14} /> #{order.id.slice(0, 8)}
											</span>
											<span className={styles.orderDate}>
												<Calendar size={14} />
												{new Date(order.orderDate).toLocaleDateString()}
											</span>
										</div>
										<button
											className={styles.deleteBtn}
											onClick={() => deleteOrder(order.id)}
											disabled={isDeleting}
											title='Remove from history'>
											<Trash2 size={16} />
										</button>
									</div>

									<div className={styles.orderItems}>
										{order.items.map((item, idx) => (
											<div key={idx} className={styles.itemRow}>
												<span className={styles.itemName}>{item.name}</span>
												<span className={styles.itemPrice}>
													{item.quantity} x ${item.price}
												</span>
											</div>
										))}
									</div>

									<div className={styles.orderFooter}>
										<span>Total Essence</span>
										<span className={styles.totalPrice}>${order.total}</span>
									</div>
								</div>
							))
						) : (
							<div className={styles.emptyState}>
								<p>No journeys recorded yet.</p>
								<button
									className={styles.browseBtn}
									onClick={() => navigate('/sessions')}>
									Start a New Journey
								</button>
							</div>
						)}
					</div>
				</div>

				<div className={styles.sidebar}>
					<div className={styles.section}>
						<h2 className={styles.sectionTitle}>Preferences</h2>
						<div className={styles.settingsList}>
							<div className={styles.settingItem}>
								<span>Session Reminders</span>
								<div
									className={styles.toggle}
									data-active={notifications}
									onClick={() =>
										handlePreferenceChange('notifications', !notifications)
									}
								/>
							</div>
							<div className={styles.settingItem}>
								<span>Weekly Wisdom Newsletter</span>
								<div
									className={styles.toggle}
									data-active={newsletter}
									onClick={() =>
										handlePreferenceChange('newsletter', !newsletter)
									}
								/>
							</div>
						</div>
					</div>

					<button
						className={styles.logoutBtn}
						onClick={() => userContext.id && logout(userContext.id)}
						disabled={isLogoutLoading || !userContext.id}>
						Sign Out
					</button>
				</div>
			</div>
		</div>
	);
};

export default Profile;
