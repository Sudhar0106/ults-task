import { useFlip } from "../hooks/useFlip";

export const Cards = ({ value, isFlipped }) => {
  const { flipped, cardClicked } = useFlip();

  return flipped.find((id) => id.isFlipped == isFlipped) ? (
    <div className={`card flip`}>
      <div className="card-body d-flex justify-content-center align-items-center">
        <h3>{value}</h3>
      </div>
    </div>
  ) : (
    <div className="card" onClick={() => cardClicked({ value, isFlipped })}>
      <div className="card-body d-flex justify-content-center align-items-center">
        <h1>?</h1>
      </div>
    </div>
  );
};
