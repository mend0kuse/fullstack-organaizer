import React, { FC, useState } from 'react'
import { Link } from 'react-router-dom';

import './navbar.scss'

import calendar from '../../img/Calendar.svg'
import doc from '../../img/Document.svg'

interface NavbarProps {
	navbarOpen: boolean
}

const Navbar: FC<NavbarProps> = ({ navbarOpen }) => {
	return (
		<nav className={navbarOpen ? 'navbar show' : 'navbar'}>
			<ul className='navbar__list list-navbar'>
				<li className='list-navbar__item'>
					<Link className='list-navbar__link _icon-Calendar' to='/calendar'>Календарь</Link>
				</li>
				<li className='list-navbar__item'>
					<Link className='list-navbar__link _icon-Document' to='/kanban'>Канбан</Link>
				</li>
			</ul>
		</nav>
	)
}

export default Navbar