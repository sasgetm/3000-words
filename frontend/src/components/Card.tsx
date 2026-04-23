import React, { useEffect, useState } from 'react';
import { Word } from '../types/word';

type CardProps = {
  card: Word
  side: 'a' | 'b'
  onHide: (id: number) => void
}

function Card({ card, side, onHide }: CardProps) {
  const [visibleCardSide, setVisibleCardSide] = useState<'a' | 'b'>(side);

  useEffect(() => {
    setVisibleCardSide(side);
  }, [side]);

  function handleCardSideClick(cardSide: 'a' | 'b') {
    setVisibleCardSide(cardSide);
  }

  function handleCardHideClick() {
    onHide(card.id);
  }

  return (
    <div className="card" draggable="true">
      <div
        className={`card__side card__side_a ${
          visibleCardSide === 'a' ? 'card__side_visible' : ''
        }`}
        onClick={() => handleCardSideClick('b')}
      >
        <div className="card__word">{card.word_en}</div>
      </div>

      <div
        className={`card__side card__side_b ${
          visibleCardSide === 'b' ? 'card__side_visible' : ''
        }`}
        onClick={() => handleCardSideClick('a')}
      >
        <div className="card__word">{card.word_ru}</div>
      </div>

      <div className="card__hide-button" onClick={handleCardHideClick}>
        <svg
          className="card__hide-icon"
          width="21"
          height="30"
          viewBox="0 0 21 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M1.5 3.5L2.5 28.5H18.5L19.5 3.5H1.5Z" stroke="#4B4F67" strokeWidth="3" strokeLinejoin="round"/>
          <path d="M7.5 8L8 24" stroke="#4B4F67" strokeWidth="3" strokeLinecap="round"/>
          <path d="M13.499 8L13 24" stroke="#4B4F67" strokeWidth="3" strokeLinecap="round"/>
          <path d="M8.5 1.5L12.5 1.5" stroke="#4B4F67" strokeWidth="3" strokeLinecap="round"/>
          <path d="M12.5 1.5V3.5" stroke="#4B4F67" strokeWidth="3" strokeLinecap="round"/>
          <path d="M8.5 1.5V3.5" stroke="#4B4F67" strokeWidth="3" strokeLinecap="round"/>
        </svg>
      </div>
    </div>
  );
}

export default Card;