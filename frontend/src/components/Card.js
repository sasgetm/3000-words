// import { useContext } from 'react';
// import { CurrentUserContext } from '../contexts/CurrentUserContext';
import {useEffect, useState} from 'react';

function Card(props) {
  const [visibleCardSide, setVisibleCardSide] = useState(props.side);

  useEffect(() => {
    setVisibleCardSide(props.side);
  }, [props.side]);

  function handleCardSideClick(cardSide) {
    setVisibleCardSide(cardSide);
  }

  function handleCardHideClick () {
    props.onHide(props.card._id);
  }

  return (
    <>

    <div className="card" draggable="true">
      <div className={`card__side card__side_a ${visibleCardSide === 'a' ? 'card__side_visible' : ''}`} onClick={() => handleCardSideClick('b')}>
        {/* вынести в отдельный компонент */}
        <div className="card__word">{props.card.a.word}</div>
        {/* добавить ссылку на гугл-переводчик, сделать ссылку динамической https://translate.google.ru/?sl=ru&tl=en&text=%D0%B6%D0%B8%D0%B7%D0%BD%D1%8C&op=translate */}
      </div>

      <div className={`card__side card__side_b ${visibleCardSide === 'b' ? 'card__side_visible' : ''}`} onClick={() => handleCardSideClick('a')}>
        <div className="card__word">{props.card.b.word}</div>
      </div>

      <div className="card__hide-button" onClick={handleCardHideClick}>
        <svg className="card__hide-icon" width="21" height="30" viewBox="0 0 21 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.5 3.5L2.5 28.5H18.5L19.5 3.5H1.5Z" stroke="#4B4F67" strokeWidth="3" strokeLinejoin="round"/>
        <path d="M7.5 8L8 24" stroke="#4B4F67" strokeWidth="3" strokeLinecap="round"/>
        <path d="M13.499 8L13 24" stroke="#4B4F67" strokeWidth="3" strokeLinecap="round"/>
        <path d="M8.5 1.5L12.5 1.5" stroke="#4B4F67" strokeWidth="3" strokeLinecap="round"/>
        <path d="M12.5 1.5V3.5" stroke="#4B4F67" strokeWidth="3" strokeLinecap="round"/>
        <path d="M8.5 1.5V3.5" stroke="#4B4F67" strokeWidth="3" strokeLinecap="round"/>
        </svg>
      </div>
    </div>
    
    </>
  );
}

export default Card;