// import { useContext } from 'react';
// import { CurrentUserContext } from '../contexts/CurrentUserContext';
import {useEffect, useState} from 'react';

function Card(props) {
  const [visibleCardSide, setVisibleCardSide] = useState('a');

  function handleCardSideClick(cardSide) {
    setVisibleCardSide(cardSide);
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
    </div>
    
    </>
  );
}

export default Card;