import React, { FC, useState } from 'react'
import Navbar from './navbar/Navbar'
import './header.scss'

const Header: FC = () => {
	const [navbarOpen, setNavbarOpen] = useState(false)

	return (
		<header className='header'>
			<div onClick={e => setNavbarOpen(!navbarOpen)} className={navbarOpen ? 'hamburger open ' : 'hamburger'}>
				<span className="bar bar1"></span>
				<span className="bar bar2"></span>
				<span className="bar bar3"></span>
				<span className="bar bar4"></span>
			</div>
			<Navbar navbarOpen={navbarOpen} />
		</header>
	)
}

export default Header