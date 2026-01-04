import type { CartItem } from '@/types/types.app';
import {
	createContext,
	useContext,
	useState,
	type FC,
	type ReactNode,
} from 'react';

interface CartContextType {
	items: CartItem[];
	setItems: (items: CartItem[]) => void;
	total: number;
	count: number;
	isCartOpen: boolean;
	toggleCart: () => void;
	openCart: () => void;
	closeCart: () => void;
	removeFromCart: (sessionId: string) => void;
	clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
	const context = useContext(CartContext);
	if (!context) {
		throw new Error('useCart must be used within a CartProvider');
	}
	return context;
};

export const CartProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [items, setItems] = useState<CartItem[]>([]);

	const toggleCart = () => setIsCartOpen((prev) => !prev);
	const openCart = () => setIsCartOpen(true);
	const closeCart = () => setIsCartOpen(false);

	const removeFromCart = (sessionId: string) => {
		setItems((prev) => prev.filter((item) => item.sessionId !== sessionId));
	};

	const clearCart = () => {
		setItems([]);
	};

	const total = items.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0,
	);
	const count = items.reduce((sum, item) => sum + item.quantity, 0);

	return (
		<CartContext.Provider
			value={{
				items,
				setItems,
				total,
				count,
				isCartOpen,
				toggleCart,
				openCart,
				closeCart,
				removeFromCart,
				clearCart,
			}}>
			{children}
		</CartContext.Provider>
	);
};
