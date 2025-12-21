// import logo from './logo.svg';
// import { useContext } from 'react';
// import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from './components/Card';
// import {useEffect, useState} from 'react';
import {useState} from 'react';
import './styles/normalize.css';
import './App.css';
import { cardsArr } from './utils/constants.js';

function App() {
  const [cards, setCards] = useState(cardsArr);
	
	function handleCardsNav(operation) {
		// const cardsQuantity = cards.length;
		let updatedCards = [];
		if (operation === 'next') {
			updatedCards = [cards[cards.length - 1], ...cards.slice(0, -1)];
		}
		if (operation === 'prev') {
			updatedCards = [...cards.slice(1), cards[0]];
		}
    setCards(updatedCards);
	}
	

	// const cards = useContext(CurrentUserContext);

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
				<div className="cards-container">
					{ [...cards].reverse().map((card) => (
						<Card
							key={card._id}
							card={card}
							// handleCardSideClick={handleCardSideClick}
							// onCardLike={props.handleCardLike}
							// handleCardDelete={props.handleCardDelete}
						/>
					))}
				</div>

				<div className="nav">
					{/* вынести в отдельный компонент */}
					<div className="nav__button nav__button--prev" onClick={() => handleCardsNav('next')}>
						<svg className="nav__icon" viewBox="0 0 15 33">
							<path d="M12.9399 31.5001L1.93945 17.7495C1.3551 17.019 1.35276 15.984 1.93711 15.2536C4.09752 12.5531 9.30786 6.04016 12.9399 1.50006" fill="none" stroke="#4B4F67" stroke-width="3" stroke-linecap="round"/>
						</svg>
					</div>

					<div className="nav__button nav__button--next" onClick={() => handleCardsNav('prev')}>
						<svg className="nav__icon" viewBox="0 0 15 33">
							<path d="M1.5 31.5001L12.5005 17.7495C13.0848 17.019 13.0872 15.984 12.5028 15.2536C10.3424 12.5531 5.13208 6.04016 1.5 1.50006" fill="none" stroke="#4B4F67" stroke-width="3" stroke-linecap="round"/>
						</svg>
					</div>
				</div>

			</div>
		</div>
	);
}

export default App;
