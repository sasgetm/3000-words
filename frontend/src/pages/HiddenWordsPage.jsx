import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchWordsByIds } from './../api/wordsApi';

function HiddenWordsPage({ hiddenWords, onRestore }) {
	const [words, setWords] = useState([]);

	useEffect(() => {
		if (!hiddenWords.length) {
			setWords([]);
			return;
		}

		fetchWordsByIds(hiddenWords)
			.then(setWords)
			.catch(console.error);
	}, [hiddenWords]);

	return (
		<>
		{/* <div className="hidden-words hidden-words_page"> */}
			<Link to="/3000-words/" className="ago-button button-48">
				←
			</Link>

			<ul className="hidden-words__list">
				{words.map(word => (
					<li key={word.id} className="hidden-words__item">
						<span className="hidden-words__word hidden-words__word_en">
							{word.word_en}
						</span>
						<span className="hidden-words__word hidden-words__word_ru">
							{word.word_ru}
						</span>
						<div
							className="hidden-words__restore button-48"
							onClick={() => onRestore(word.id)}
						>
							<svg className="hidden-words__restore-icon" width="32" height="29" viewBox="0 0 32 29" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M1.49984 4.96706L18.3998 4.96706C24.8998 4.96706 29.6665 10.1671 29.6665 16.2337C29.6665 22.3004 24.8998 27.5004 18.3998 27.5004H12.7414M1.49984 4.96706L12.7665 8.43373M1.49984 4.96706L12.7665 1.5004" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
							</svg>
						</div>
					</li>
				))}
			</ul>
		{/* </div> */}
		</>
	);
}

export default HiddenWordsPage;