import { Cards } from "./cards";
import { useGameState } from "../hooks/useGames";
import { Link } from "react-router-dom";

const MemoryCard = () => {
  const { cards, matches, moves, restart, setRestart } = useGameState();

  return (
    <div className="container">
      <h1 className="text-center">Memory Card</h1>

      <div className="MryCrd">
        <div className="col-md-4 mt-5">
          <div className="d-flex justify-content-between">
            <h4>Moves : {moves}</h4>
            <h4> Matches : {matches}</h4>
          </div>

          <div className="game-wrapper">
            {cards.map((row, i) => (
              <Cards value={row.value} isFlipped={row.id} key={i} />
            ))}
          </div>
        </div>
      </div>
      
      <div className="text-center">
        <button
          className="btn btn-primary mx-4"
          onClick={() => setRestart(!restart)}
        >
          Restart
        </button>

        <Link to="/task2" className="btn btn-primary">
          Task 2
        </Link>
      </div>
    </div>
  );
};

export default MemoryCard;
