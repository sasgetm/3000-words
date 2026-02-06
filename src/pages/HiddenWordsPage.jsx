import { Link } from 'react-router-dom';

function HiddenWordsPage({ hiddenWords, allCards, onRestore }) {
	return (
		<>
		{/* <div className="hidden-words hidden-words_page"> */}
			<Link to="/" className="ago-button button-48">
				←
			</Link>

			<ul className="hidden-words__list">
				{hiddenWords.map(id => {
					const card = allCards.find(c => c._id === id);
					if (!card) return null;

					return (
						<li key={id} className="hidden-words__item">
							<span className="hidden-words__word hidden-words__word_en">
								{card.a.word}
							</span>
							<span className="hidden-words__word hidden-words__word_ru">
								{card.b.word}
							</span>
							<div
								className="hidden-words__restore button-48"
								onClick={() => onRestore(card._id)}
							>
								<svg width="32" height="29" viewBox="0 0 32 29" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M1.49984 4.96706L18.3998 4.96706C24.8998 4.96706 29.6665 10.1671 29.6665 16.2337C29.6665 22.3004 24.8998 27.5004 18.3998 27.5004H12.7414M1.49984 4.96706L12.7665 8.43373M1.49984 4.96706L12.7665 1.5004" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
								</svg>
							</div>
						</li>
					);
				})}
			</ul>
		{/* </div> */}
		</>
	);
}

export default HiddenWordsPage;