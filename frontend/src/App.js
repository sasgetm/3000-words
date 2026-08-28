import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';

import CardsPage from './pages/CardsPage';
import HiddenWordsPage from './pages/HiddenWordsPage';
import AuthPage from './pages/AuthPage';

import { useEffect, useState } from 'react';
import { fetchCurrentUser } from './api/authApi';
import './styles/normalize.css';
import './App.css';

import { fetchCategories } from './api/categoriesApi';
import { fetchWordsByCategory } from './api/wordsApi';
import { hideWord, unhideWord } from './api/hiddenWordsApi';

function App() {
	const navigate = useNavigate();
	const [words, setWords] = useState([]);
	const [activeCategory, setActiveCategory] = useState(2);
	const [cardSide, setCardSide] = useState('a');
	const [categories, setCategories] = useState([]);
	const [isLogged, setIsLogged] = useState(false);
	const [userLogin, setUserLogin] = useState('');
	const [isLoadingCategories, setIsLoadingCategories] = useState(true);
	const [isLoadingWords, setIsLoadingWords] = useState(true);

	useEffect(() => {
		const token = localStorage.getItem('auth_token');

		if (!token) return;

		fetchCurrentUser()
			.then((user) => {
				if (user && user.login) {
					setIsLogged(true);
					setUserLogin(user.login);
				}
			})
			.catch(() => {
				localStorage.removeItem('auth_token');
				setIsLogged(false);
				setUserLogin('');
			});
	}, []);

	const [hiddenWords, setHiddenWords] = useState([]);
	const [order, setOrder] = useState([]);
	// const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		setIsLoadingCategories(true);
		fetchCategories()
			.then(data => setCategories(data))
			.catch(console.error)
			.finally(() => setIsLoadingCategories(false));
	}, []);

	useEffect(() => {
		if (!activeCategory) return;

		setIsLoadingWords(true);
		fetchWordsByCategory(activeCategory)
			.then(data => {
				setWords(data);
				setOrder(data.map(word => word.id));
			})
			.catch(console.error)
			.finally(() => setIsLoadingWords(false));
	}, [activeCategory]);

	useEffect(() => {
		if (!isLogged) {
			setHiddenWords([]);
			return;
		}
		(async () => {
			const pendingRaw = sessionStorage.getItem('pendingHiddenWords');
			if (pendingRaw) {
				try {
					const pendingIds = JSON.parse(pendingRaw);
					if (Array.isArray(pendingIds) && pendingIds.length > 0) {
						await Promise.all(pendingIds.map(id => hideWord(id).catch(() => {})));
						setHiddenWords(prev => {
							const merged = [...prev];
							pendingIds.forEach(id => {
								if (!merged.includes(id)) merged.push(id);
							});
							return merged;
						});
					}
				} catch {}
				sessionStorage.removeItem('pendingHiddenWords');
			}
			const pendingRedirect = sessionStorage.getItem('pendingRedirect');
			if (pendingRedirect) {
				sessionStorage.removeItem('pendingRedirect');
				navigate(pendingRedirect);
			}
		})();
	}, [isLogged, navigate]);

	function handleCardsNav(operation) {
		setOrder(prevOrder => {
			const visible = prevOrder.filter(
				id => !hiddenWords.includes(id)
			);

			if (visible.length <= 1) return prevOrder;

			let rotated;

			if (operation === 'next') {
				rotated = [...visible.slice(1), visible[0]];
			} else if (operation === 'prev') {
				rotated = [
					visible[visible.length - 1],
					...visible.slice(0, -1),
				];
			} else {
				return prevOrder;
			}

			const queue = [...rotated];

			return prevOrder.map(id =>
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
		if (isLogged) {
			hideWord(cardId).catch(console.error);
			setHiddenWords(prev => (prev.includes(cardId) ? prev : [...prev, cardId]));
			return;
		}
		const pending = JSON.parse(sessionStorage.getItem('pendingHiddenWords') || '[]');
		if (!pending.includes(cardId)) {
			pending.push(cardId);
			sessionStorage.setItem('pendingHiddenWords', JSON.stringify(pending));
		}
		navigate('/3000-words/auth');
	}

	const handleRestoreWord = (id) => {
		if (isLogged) {
			unhideWord(id).catch(console.error);
		}
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
								onOpenHidden={() => {
									if (isLogged) {
										navigate('/3000-words/hidden');
									} else {
										sessionStorage.setItem('pendingRedirect', '/3000-words/hidden');
										navigate('/3000-words/auth');
									}
								}}
								onOpenAuth={() => navigate('/3000-words/auth')}
								categories={categories}
								activeCategory={activeCategory}
								isLoading={isLoadingCategories || isLoadingWords}
							/>
						}
					/>

					<Route
						path="/3000-words/hidden"
						element={
							isLogged ? (
								<HiddenWordsPage onRestore={handleRestoreWord} />
							) : (
								(() => {
									sessionStorage.setItem('pendingRedirect', '/3000-words/hidden');
									return <Navigate to="/3000-words/auth" replace />;
								})()
							)
						}
					/>

					<Route
						path="/3000-words/auth"
						element={
							<AuthPage
								isLogged={isLogged}
								userLogin={userLogin}
								setIsLogged={setIsLogged}
								setUserLogin={setUserLogin}
							/>
						}
					/>
				</Routes>

			</div>
		</div>
	);
}

export default App;
