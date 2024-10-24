import { FadeLoader } from "react-spinners";

const PageLoader = () => {
  return (
    <div className="loader">
      <div className="load">
        <FadeLoader />
      </div>
    </div>
  );
};

export default PageLoader;
