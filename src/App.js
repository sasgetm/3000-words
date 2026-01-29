// import logo from './logo.svg';
// import { useContext } from 'react';
// import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from './components/Card';
import { useEffect, useState, useMemo } from 'react';
import './styles/normalize.css';
import './App.css';
import { cardsArr, cardsHundreds } from './utils/constants.js';

function App() {
	const [allCards] = useState(cardsArr);
	const [cardsOrder, setCardsOrder] = useState([]);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isHiddenWordsOpen, setIsHiddenWordsOpen] = useState(false);
	const [activeCategory, setActiveCategory] = useState(2);
	const [cardSide, setCardSide] = useState('a');

	const [hiddenWords, setHiddenWords] = useState(() => {
		const stored = localStorage.getItem('hiddenWords');
		return stored ? JSON.parse(stored) : [];
	});

	useEffect(() => {
		const ids = cardsHundreds.find(h => h._id === activeCategory)?.items || [];
		setCardsOrder(ids);
	}, [activeCategory]);

	useEffect(() => {
		localStorage.setItem('hiddenWords', JSON.stringify(hiddenWords));
	}, [hiddenWords]);

	function handleCardsNav(operation) {
		setCardsOrder(prev => {
			// оставляем только нескрытые карточки
			const visibleOrder = prev.filter(id => !hiddenWords.includes(id));
			if (visibleOrder.length <= 1) return prev;

			let newVisibleOrder = [];

			if (operation === 'next') {
				newVisibleOrder = [
					visibleOrder[visibleOrder.length - 1],
					...visibleOrder.slice(0, -1),
				];
			}

			if (operation === 'prev') {
				newVisibleOrder = [
					...visibleOrder.slice(1),
					visibleOrder[0],
				];
			}

			// возвращаем скрытые карточки на свои места в общем порядке
			const result = prev.map(id =>
				hiddenWords.includes(id) ? id : newVisibleOrder.shift()
			);

			return result;
		});
	}

	const cards = useMemo(() => {
		return cardsOrder
			.filter(id => !hiddenWords.includes(id))
			.map(id => allCards.find(card => card._id === id))
			.filter(Boolean);
	}, [cardsOrder, allCards, hiddenWords]);

	function handleMenu() {
		setIsHiddenWordsOpen(false);
		setIsMenuOpen(prev => !prev);
	}

	function handleCategory(cat) {
		setActiveCategory(cat);
		handleMenu();
	}

	function handleTurn() {
		setCardSide(prev => (prev === 'a' ? 'b' : 'a'));
	}

	function handleCardHide(cardId) {
		setHiddenWords(prev => {
			if (prev.includes(cardId)) return prev;
			return [...prev, cardId];
		});

		setCardsOrder(prev => prev.filter(id => id !== cardId));
	}
	
	function handleRestoreWord(cardId) {
		setHiddenWords(prev => prev.filter(id => id !== cardId));
	}

	return (
		<div className="page">
			{/* <header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					Edit <code>src/App.js</code> and save to reload.
				</p>
				<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn React
				</a>
			</header> */}
			<div className="container">
				<div onClick={handleTurn} className={`turn-button button-48`}>
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

				<div className={`menu ${isMenuOpen ? 'menu_open' : ''}`}>
					<ul className="menu__list">

						{ cardsHundreds.map((hundred, i) => (
							/* <li className={`menu__item ${isHundredActive(hundred._id) ? 'active' : ''}`} onClick={handleCategory(hundred._id)}>{hundred._id}</li> */
							<li className="menu__item" onClick={() => handleCategory(hundred._id)}>{hundred._id}</li>
						))}

						<li
							className="menu__item menu__item_hidden"
							onClick={() => {
								setIsMenuOpen(false);
								setIsHiddenWordsOpen(true);
							}}
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

					</ul>
				</div>

				<div className={`hidden-words ${isHiddenWordsOpen ? 'hidden-words_open' : ''}`}>
					<ul className="hidden-words__list">
						{hiddenWords.map(id => {
							const card = allCards.find(c => c._id === id);
							if (!card) return null;

							return (
								<li key={id} className="hidden-words__item">
									<span className="hidden-words__word hidden-words__word_en">
										{card.b.word}
									</span>
									<span className="hidden-words__word hidden-words__word_ru">
										{card.a.word}
									</span>
									<button
										className="hidden-words__restore button-48"
										onClick={() => handleRestoreWord(id)}
									>
										Вернуть
									</button>
								</li>
							);
						})}
					</ul>
				</div>

				<div className="cards-container">
					{ [...cards].reverse().map((card) => (
						<Card
							key={card._id}
							card={card}
							side={cardSide}
							onHide={handleCardHide}
							// handleCardSideClick={handleCardSideClick}
							// onCardLike={props.handleCardLike}
							// handleCardDelete={props.handleCardDelete}
						/>
					))}
				</div>

				<div className="nav">
					{/* вынести в отдельный компонент */}
					<div className="nav__button nav__button--prev button-48" onClick={() => handleCardsNav('next')}>
						<svg className="nav__icon" viewBox="0 0 15 33">
							<path d="M12.9399 31.5001L1.93945 17.7495C1.3551 17.019 1.35276 15.984 1.93711 15.2536C4.09752 12.5531 9.30786 6.04016 12.9399 1.50006" fill="none" stroke="#4B4F67" strokeWidth="3" strokeLinecap="round"/>
						</svg>
					</div>

					<div className="nav__button nav__button--next button-48" onClick={() => handleCardsNav('prev')}>
						<svg className="nav__icon" viewBox="0 0 15 33">
							<path d="M1.5 31.5001L12.5005 17.7495C13.0848 17.019 13.0872 15.984 12.5028 15.2536C10.3424 12.5531 5.13208 6.04016 1.5 1.50006" fill="none" stroke="#4B4F67" strokeWidth="3" strokeLinecap="round"/>
						</svg>
					</div>
				</div>

			</div>
		</div>
	);
}

export default App;
