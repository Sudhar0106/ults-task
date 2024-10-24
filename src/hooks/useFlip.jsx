import { useState } from "react";
import { useGameState } from "./useGames";

var tempFlip = [];

export const useFlip = () => {
  const [flipped, setFlipped] = useState([]);
  const { matches, moves, setMoves, setMatches } = useGameState();

  const cardClicked = async (item) => {
    await tempFlip.push(item);

    // if(tempFlip.length ===2){
    //     setTimeout(() => {
    //         tempFlip=[];
    //         setFlipped([])
    //     }, 1000);
    // }else{
    //     setFlipped(tempFlip);
    // }
   if (tempFlip.length == 2) {
      setMoves(moves + 1);
      setTimeout(() => {
        tempFlip = [];
        setFlipped([]);
      }, 1000);
    }
    setFlipped(tempFlip);
  };

  return { flipped, cardClicked };
};
