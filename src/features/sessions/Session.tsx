import { useState, useCallback } from 'react';
import useQuery from '@/common/hooks/useQuery';
import useMutation from '@/common/hooks/useMutation';
import { SessionsService } from '@/api/services/sessions.service';
import { CartService } from '@/api/services/cart.service';
import type { Cart, CartItem } from '@/types/types.app';
import { SessionCard } from './components/SessionCard';
import { useAuth } from '@/common/contexts/AuthContext/AuthContext';
import { useCart } from '@/common/contexts/CartContext/CartContext';
import { useToast } from '@/common/contexts/ToastContext/ToastContext';
import styles from './Session.module.css';

const Sessions = () => {
	const {
		data: sessions,
		isLoading,
		error,
	} = useQuery(SessionsService.getSessions);
	const [searchTerm, setSearchTerm] = useState('');

	const { userContext } = useAuth();
	const { setItems } = useCart();
	const { addToast } = useToast();

	const fetchCart = useCallback(
		() => CartService.getCartByUserId(userContext!.id!),
		[userContext?.id],
	);

	const handleCartSuccess = useCallback(
		(cart: Cart) => setItems(cart.items ?? []),
		[setItems],
	);

	useQuery<Cart>(fetchCart, [userContext?.id], {
		enabled: !!userContext?.id,
		onSuccess: handleCartSuccess,
	});

	const handleAddSuccess = useCallback(
		(cart: Cart) => {
			setItems(cart.items ?? []);
			addToast('Added to cart', 'success');
		},
		[setItems, addToast],
	);

	const handleAddError = useCallback(
		(err: Error) => addToast(`Failed to add to cart: ${err.message}`, 'error'),
		[addToast],
	);

	const { mutate: addItem, isLoading: isAdding } = useMutation<
		Cart,
		{ item: CartItem }
	>(({ item }) => CartService.addItem({ userId: userContext!.id!, item }), {
		onSuccess: handleAddSuccess,
		onError: handleAddError,
	});

	if (isLoading)
		return (
			<div className={styles.loading}>Accessing the Akashic Records...</div>
		);
	if (error)
		return (
			<div className={styles.error}>
				Connection to the source interrupted: {error.message}
			</div>
		);

	const filteredSessions = sessions?.filter((session) =>
		session.name.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h1 className={styles.title}>Explore Sessions</h1>
				<div className={styles.searchWrapper}>
					<input
						type='text'
						placeholder='Search for wisdom...'
						className={styles.search}
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>
			</div>

			<div className={styles.grid}>
				{filteredSessions?.map((session) => (
					<SessionCard
						key={session.id}
						session={session}
						onAddToCart={(item) => addItem({ item })}
						isAdding={isAdding}
					/>
				))}
			</div>

			{filteredSessions?.length === 0 && (
				<div className={styles.loading}>
					No sessions found matching your frequency.
				</div>
			)}
		</div>
	);
};

export default Sessions;
