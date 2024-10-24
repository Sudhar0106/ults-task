import { useEffect, useState } from "react";

export const useGameState = () => {
  const [cards, setCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [restart, setRestart] = useState(false);

  const cardData = [
    { id: 1, value: "🐶" },
    { id: 2, value: "🐱" },
    { id: 3, value: "🐭" },
    { id: 4, value: "🐹" },
    { id: 5, value: "🐶" },
    { id: 6, value: "🐱" },
    { id: 7, value: "🐭" },
    { id: 8, value: "🐹" },
  ];

  useEffect(() => {
    suffleCard();
  }, [restart]);

  const suffleCard = () => {
    let temp = cardData.length,
      suffle,
      randomCard,
      suffledCard = [];

    while (temp != 0) {
      suffle = Math.floor(Math.random() * temp);
      randomCard = cardData[suffle];
      cardData[suffle] = cardData[temp];
      cardData[temp] = randomCard;

      if (cardData[temp]) suffledCard.push(cardData[temp]);
      temp--;
    }

    setCards(suffledCard);
  };

  return {
    cards,
    moves,
    matches,
    setMoves,
    setMatches,
    restart,
    setRestart,
    // Add necessary functions
  };
};
