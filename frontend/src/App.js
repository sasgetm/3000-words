import { Routes, Route, useNavigate } from 'react-router-dom';

import CardsPage from './pages/CardsPage';
import HiddenWordsPage from './pages/HiddenWordsPage';

// import logo from './logo.svg';
import { useEffect, useState } from 'react';
import './styles/normalize.css';
import './App.css';
// import { cardsArr } from './utils/constants.js';

import { fetchCategories } from './api/categoriesApi';
import { fetchWordsByCategory } from './api/wordsApi';

function App() {
	const navigate = useNavigate();
	const [cards, setCards] = useState([]);
	const [activeCategory, setActiveCategory] = useState(2);
	const [cardSide, setCardSide] = useState('a');
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		fetchCategories()
			.then(data => setCategories(data))
			.catch(console.error);
	}, []);

	useEffect(() => {
		if (!activeCategory) return;

		fetchWordsByCategory(activeCategory)
			.then(data => setCards(data))
			.catch(console.error);
	}, [activeCategory]);




	// const [hiddenWords, setHiddenWords] = useState(() => {
	// 	const stored = localStorage.getItem('hiddenWords');
	// 	return stored ? JSON.parse(stored) : [];
	// });

	const [hiddenWords, setHiddenWords] = useState(() => {
		return JSON.parse(localStorage.getItem('hiddenWords')) || [];
	});

	// useEffect(() => {
	// 	const ids = categories.find(h => h._id === activeCategory)?.items || [];
	// 	setCardsOrder(ids);
	// }, [activeCategory]);

	useEffect(() => {
		localStorage.setItem('hiddenWords', JSON.stringify(hiddenWords));
	}, [hiddenWords]);

	function handleCardsNav(operation) {

		setCards(prev => {
			if (prev.length <= 1) return prev;

			if (operation === 'next') {
				return [...prev.slice(1), prev[0]];
			}

			if (operation === 'prev') {
				return [prev[prev.length - 1], ...prev.slice(0, -1)];
			}

			// возвращаем скрытые карточки на свои места в общем порядке
			// const result = prev.map(id =>
			// 	hiddenWords.includes(id) ? id : newVisibleOrder.shift()
			// );

			return prev;
		});
	}


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

		setCards(prev => prev.filter(card => card.id !== cardId));
	}
	
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
								categories={categories}
							/>
						}
					/>

					<Route
						path="/hidden"
						element={
							<HiddenWordsPage
								hiddenWords={hiddenWords}
								// allCards={allCards}
								allCards={cards}
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
