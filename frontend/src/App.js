import { Routes, Route, useNavigate } from 'react-router-dom';

import CardsPage from './pages/CardsPage';
import HiddenWordsPage from './pages/HiddenWordsPage';

// import logo from './logo.svg';
// import { useContext } from 'react';
// import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useEffect, useState, useMemo } from 'react';
import './styles/normalize.css';
import './App.css';
import { cardsArr, cardsHundreds } from './utils/constants.js';


import { fetchTest } from './api/testApi';

function App() {

	const navigate = useNavigate();


	const [allCards] = useState(cardsArr);
	const [cardsOrder, setCardsOrder] = useState([]);
	const [activeCategory, setActiveCategory] = useState(2);
	const [cardSide, setCardSide] = useState('a');

	const [data, setData] = useState(null);

	useEffect(() => {
		fetchTest().then(setData).catch(console.error);
	}, []);


	// const [hiddenWords, setHiddenWords] = useState(() => {
	// 	const stored = localStorage.getItem('hiddenWords');
	// 	return stored ? JSON.parse(stored) : [];
	// });

	const [hiddenWords, setHiddenWords] = useState(() => {
		return JSON.parse(localStorage.getItem('hiddenWords')) || [];
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

	function handleCategory(cat) {
		setActiveCategory(cat);
		// handleMenu();
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
	
	// function handleRestoreWord(cardId) {
	// 	setHiddenWords(prev => prev.filter(id => id !== cardId));
	// }
	
	const handleRestoreWord = (id) => {
		setHiddenWords(prev =>
			prev.filter(hiddenId => hiddenId !== id)
		);
	};

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


    <div>
      <h1>api test</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div> 

				<Routes>
					<Route
						path="/"
						element={
							<CardsPage
								cards={cards}
								cardSide={cardSide}
								onTurn={handleTurn}
								onHide={handleCardHide}
								onNav={handleCardsNav}
								onCategory={handleCategory}
								onOpenHidden={() => navigate('/hidden')}
							/>
						}
					/>

					<Route
						path="/hidden"
						element={
							<HiddenWordsPage
								hiddenWords={hiddenWords}
								allCards={allCards}
								onRestore={handleRestoreWord}
							/>
						}
					/>
				</Routes>

			</div>
		</div>
	);
}

export default App;
