import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import './index.css';
import App from './App.tsx';
import { CartProvider } from './common/contexts/CartContext/CartContext.tsx';
import { ToastProvider } from './common/contexts/ToastContext/ToastContext.tsx';
import { ToastContainer } from './common/components/toast/ToastContainer.tsx';
import { AuthProvider } from './common/contexts/AuthContext/AuthContext.tsx';
import { AuthService } from './api/services/auth.service.ts';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
			<ToastProvider>
				<AuthProvider>
					<CartProvider>
						<App />
						<ToastContainer />
					</CartProvider>
				</AuthProvider>
			</ToastProvider>
		</BrowserRouter>
	</StrictMode>,
);
