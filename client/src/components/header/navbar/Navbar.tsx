import React, { FC, memo, useContext, useState } from 'react'
import { Link } from 'react-router-dom';

import { ButtonTypes } from '../../../types/KanbanTypes'

import './navbar.scss'
import anon from '../../../img/Anon1.jpg'

import { AuthToken } from '../../../context/authContext';
import { authService } from '../../../services/authService';
import Button from '../../UI/button/Button';

interface NavbarProps {
	navbarOpen: boolean
}

const Navbar: FC<NavbarProps> = memo(({ navbarOpen }) => {
	const { jwtToken, setJwtToken } = useContext(AuthToken)
	const { data: profile } = authService.useUserInfoQuery(jwtToken)

	return (
		<nav className={navbarOpen ? 'navbar show' : 'navbar'}>
			<ul className='navbar__list list-navbar'>
				<li className='list-navbar__item list-navbar__profile'>
					{jwtToken
						?
						<>
							{profile && <img src={profile.avatar ? 'http://localhost:5000/images/' + profile.avatar : anon} alt="" />}
							<Link className='list-navbar__link ' to='/lk'>Профиль</Link>
						</>
						:
						<>
							<img src={anon} alt="" />
							<Link className='list-navbar__link ' to='/login'>Вход</Link>
						</>
					}
				</li>
				<li className='list-navbar__item'>
					<Link className='list-navbar__link _icon-Calendar' to='/calendar'>Календарь</Link>
				</li>
				<li className='list-navbar__item'>
					<Link className='list-navbar__link _icon-Document' to='/kanban'>Канбан</Link>
				</li>
				<li className='list-navbar__item'>
					<Link className='list-navbar__link' to='/notebook'>Блокнот</Link>
				</li>
				<li className='list-navbar__item'>
					{jwtToken
						? <Button type={ButtonTypes.BG_NONE} className='list-navbar__link' onClick={e => setJwtToken('')}>Выход</Button>
						: <Link className='list-navbar__link ' to='/registration'>Регистрация</Link>
					}
				</li>

			</ul>
		</nav >
	)
})

export default Navbar