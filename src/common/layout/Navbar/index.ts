import type { FC } from 'react';
import NavbarComponent, { type NavbarProps } from './Navbar';
import { Left } from './components/sections/Sections';
import { Center } from './components/sections/Sections';
import { Right } from './components/sections/Sections';
import Logo from './components/logo/Logo';
import Menu, { NavItems } from './components/menu/Menu';
import DualBtn from './components/dualbtn/DualBtn';
import Burger from './components/burger/Burger';
import MobileDropdown from './components/mobile/MobileDropdown';

type NavbarComposition = FC<NavbarProps> & {
	Left: typeof Left;
	Center: typeof Center;
	Right: typeof Right;
	Logo: typeof Logo;
	Menu: typeof Menu;
	NavItems: typeof NavItems;
	DualBtn: typeof DualBtn;
    Burger: typeof Burger;
    MobileDropdown: typeof MobileDropdown;
};

const Navbar = NavbarComponent as NavbarComposition;

Navbar.Left = Left;
Navbar.Center = Center;
Navbar.Right = Right;
Navbar.Logo = Logo;
Navbar.Menu = Menu;
Navbar.NavItems = NavItems;
Navbar.DualBtn = DualBtn;
Navbar.Burger = Burger;
Navbar.MobileDropdown = MobileDropdown;

export default Navbar;
