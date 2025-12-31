import Navbar from './common/layout/Navbar';
import Home from '@/features/home/Home';
import './index.css';
import { Routes, Route } from 'react-router';
import { mainNav } from './common/layout/Navbar/data/navigation';
import Profile from './features/profile/Profile';
import Sessions from './features/sessions/Session';
import { CartDrawer } from './features/cart/CartDrawer';
import About from './features/about/About';
import Login from './features/auth/Login';
import Register from './features/auth/Register';

function App() {
	return (
		<>
			<header>
				<Navbar>
					<Navbar.Left>
						<Navbar.Logo />
					</Navbar.Left>
					<Navbar.Center>
						<Navbar.Menu>
							<Navbar.NavItems items={mainNav} />
						</Navbar.Menu>
					</Navbar.Center>
					<Navbar.Right>
						<Navbar.DualBtn />
                        <Navbar.Burger />
					</Navbar.Right>
                    <Navbar.MobileDropdown items={mainNav} />
				</Navbar>
			</header>
			<main>
                <CartDrawer />
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/profile' element={<Profile />} />
					<Route path='/sessions' element={<Sessions />} />
					<Route path='/about' element={<About />} />
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
					<Route path='*' element={<div>Not Found</div>} />
				</Routes>
			</main>
			<footer>
				<p>© {new Date().getFullYear()} Sueños Valenti. All rights reserved.</p>
			</footer>
		</>
	);
}

export default App;
