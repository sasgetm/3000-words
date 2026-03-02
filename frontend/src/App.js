import { Routes, Route, useNavigate } from 'react-router-dom';

import CardsPage from './pages/CardsPage';
import HiddenWordsPage from './pages/HiddenWordsPage';
import LogInPage from './pages/LogInPage';

// import logo from './logo.svg';
import { useEffect, useState } from 'react';
import './styles/normalize.css';
import './App.css';
// import { cardsArr } from './utils/constants.js';

import { fetchCategories } from './api/categoriesApi';
import { fetchWordsByCategory } from './api/wordsApi';

function App() {
	const navigate = useNavigate();
	const [words, setWords] = useState([]);
	const [activeCategory, setActiveCategory] = useState(2);
	const [cardSide, setCardSide] = useState('a');
	const [categories, setCategories] = useState([]);

	// const [hiddenWords, setHiddenWords] = useState(() => {
	// 	const stored = localStorage.getItem('hiddenWords');
	// 	return stored ? JSON.parse(stored) : [];
	// });

	const [hiddenWords, setHiddenWords] = useState(() => {
		return JSON.parse(localStorage.getItem('hiddenWords')) || [];
	});
	const [order, setOrder] = useState([]);
	// const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		fetchCategories()
			.then(data => setCategories(data))
			.catch(console.error);
	}, []);

	useEffect(() => {
		if (!activeCategory) return;

		fetchWordsByCategory(activeCategory)
			.then(data => {
				setWords(data);
				setOrder(data.map(word => word.id));
			})
			.catch(console.error);
	}, [activeCategory]);



	// useEffect(() => {
	// 	const ids = categories.find(h => h._id === activeCategory)?.items || [];
	// 	setCardsOrder(ids);
	// }, [activeCategory]);

	useEffect(() => {
		localStorage.setItem('hiddenWords', JSON.stringify(hiddenWords));
	}, [hiddenWords]);

	function handleCardsNav(operation) {
		setOrder(prev => {
			const visible = prev.filter(
				id => !hiddenWords.includes(id)
			);

			if (visible.length <= 1) return prev;

			let rotated;

			if (operation === 'next') {
				rotated = [...visible.slice(1), visible[0]];
			} else if (operation === 'prev') {
				rotated = [
					visible[visible.length - 1],
					...visible.slice(0, -1),
				];
			} else {
				return prev;
			}

			const queue = [...rotated];

			return prev.map(id =>
				hiddenWords.includes(id)
					? id
					: queue.shift()
			);
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
	}
	
	const handleRestoreWord = (id) => {
		setHiddenWords(prev =>
			prev.filter(hiddenId => hiddenId !== id)
		);
	};

	const visibleCards = order
		.map(id => words.find(word => word.id === id))
		.filter(word => word && !hiddenWords.includes(word.id));
	// const currentCard = visibleCards[currentIndex] || null;

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
						path="/3000-words"
						element={
							<CardsPage
								cards={visibleCards}
								cardSide={cardSide}
								onTurn={handleTurn}
								onHide={handleCardHide}
								onNav={handleCardsNav}
								onCategory={handleCategory}
								onOpenHidden={() => navigate('/3000-words/hidden')}
								onOpenLogIn={() => navigate('/3000-words/login/')}
								categories={categories}
							/>
						}
					/>

					<Route
						path="/3000-words/hidden"
						element={
							<HiddenWordsPage
								hiddenWords={hiddenWords}
								onRestore={handleRestoreWord}
							/>
						}
					/>

					<Route
						path="/3000-words/login"
						element={
							<LogInPage />
						}
					/>
				</Routes>

			</div>
		</div>
	);
}

export default App;
