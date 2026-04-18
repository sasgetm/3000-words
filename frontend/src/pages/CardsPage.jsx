import { useState } from 'react';
import Card from '../components/Card';

function CardsPage({
	cards,
	cardSide,
	onTurn,
	onHide,
	onNav,
	onOpenHidden,
	onOpenAuth,
	onCategory,
	categories,
}) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	function handleMenu() {
		setIsMenuOpen(prev => !prev);
	}

	return (
		<>
			<div onClick={onTurn} className="turn-button button-48">
				<svg className="turn-button__icon" width="29" height="31" viewBox="0 0 29 31" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M1.50039 10.7857C3.35747 5.21427 8.61935 1.5 14.5004 1.5C20.3814 1.5 25.6431 5.21427 27.5002 10.7857M27.5002 10.7857C27.5002 6.76189 26.2622 3.97618 26.2622 3.97618M27.5002 10.7857C25.0241 7.99998 22.5479 6.76189 22.5479 6.76189" stroke="#4B4F67" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
					<path d="M27.5001 19.4524C25.643 25.0238 20.3811 28.738 14.5001 28.738C8.6191 28.738 3.35738 25.0238 1.50024 19.4524M1.50024 19.4524C1.50025 23.4761 2.73833 26.2619 2.73833 26.2619M1.50024 19.4524C3.97643 22.2381 6.45261 23.4761 6.45261 23.4761" stroke="#4B4F67" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
				</svg>
			</div>

			<div onClick={handleMenu} className={`menu-button button-48 ${isMenuOpen ? 'menu-button_open' : ''}`}>
				<div className="menu-button__icon">
					<div className="menu-button__dot"></div>
					<div className="menu-button__dot"></div>
					<div className="menu-button__dot"></div>
				</div>
			</div>

			{/* меню */}
			<div className={`menu ${isMenuOpen ? 'menu_open' : ''}`}>
			{/* <div className="menu"> */}
				<ul className="menu__list">
					{/* {cardsHundreds.map(hundred => (
						<li
							key={hundred._id}
							className="menu__item"
							onClick={() => {
								onCategory(hundred._id);
								setIsMenuOpen(false);
							}}
						>
							{hundred._id}
						</li> */}
					{categories.map(parent => (
						parent.children?.map(child => (
							<li
								key={child.id}
								className="menu__item"
								onClick={() => {
									onCategory(child.id);
									setIsMenuOpen(false);
								}}
							>
								{/* {parent.name} → {child.name} */}
								{child.name}
							</li>
						))
					))}

					<li
						className="menu__item menu__item_hidden"
						onClick={onOpenHidden}
					>
						<svg className="menu__item-hidden-icon" width="21" height="30" viewBox="0 0 21 30" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M1.5 3.5L2.5 28.5H18.5L19.5 3.5H1.5Z" stroke="#fff" strokeWidth="3" strokeLinejoin="round"/>
							<path d="M7.5 8L8 24" stroke="#fff" strokeWidth="3" strokeLinecap="round"/>
							<path d="M13.499 8L13 24" stroke="#fff" strokeWidth="3" strokeLinecap="round"/>
							<path d="M8.5 1.5L12.5 1.5" stroke="#fff" strokeWidth="3" strokeLinecap="round"/>
							<path d="M12.5 1.5V3.5" stroke="#fff" strokeWidth="3" strokeLinecap="round"/>
							<path d="M8.5 1.5V3.5" stroke="#fff" strokeWidth="3" strokeLinecap="round"/>
						</svg>
					</li>

					<li
						className="menu__item menu__item_login"
						onClick={onOpenAuth}
					>
						<svg className="menu__item-login-icon" width="22" height="25" viewBox="0 0 22 25" fill="none" xmlns="http://www.w3.org/2000/svg">
						<circle cx="11" cy="6.26089" r="5.26089" stroke="white" strokeWidth="2"/>
						<path d="M11 15C16.254 15 21 19.7412 21 24H11H1C1 19.7412 5.74603 15 11 15Z" stroke="white" strokeWidth="2"/>
						</svg>
					</li>
				</ul>
			</div>

			<div className="cards-container">
				{[...cards].reverse().map(card => (
					<Card
						key={card.id}
						card={card}
						side={cardSide}
						onHide={() => onHide(card.id)}
					/>
				))}
			</div>

			<div className="nav">
				{/* вынести в отдельный компонент */}
				<div className="nav__button nav__button--prev button-48" onClick={() => onNav('prev')}>
					<svg className="nav__icon" viewBox="0 0 15 33">
						<path d="M12.9399 31.5001L1.93945 17.7495C1.3551 17.019 1.35276 15.984 1.93711 15.2536C4.09752 12.5531 9.30786 6.04016 12.9399 1.50006" fill="none" stroke="#4B4F67" strokeWidth="3" strokeLinecap="round"/>
					</svg>
				</div>

				<div className="nav__button nav__button--next button-48" onClick={() => onNav('next')}>
					<svg className="nav__icon" viewBox="0 0 15 33">
						<path d="M1.5 31.5001L12.5005 17.7495C13.0848 17.019 13.0872 15.984 12.5028 15.2536C10.3424 12.5531 5.13208 6.04016 1.5 1.50006" fill="none" stroke="#4B4F67" strokeWidth="3" strokeLinecap="round"/>
					</svg>
				</div>
			</div>
		</>
	);
}

export default CardsPage;