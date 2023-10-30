import { Link } from "react-router-dom";

const Main = () => {
  return (
    <>
      <h3>MainPage</h3>
      <ul>
        <Link to={"/product/1"}>
          <li>1번 상품</li>
        </Link>
        <Link to={"/product/2"}>
          <li>2번 상품</li>
        </Link>
      </ul>
    </>
  );
};

export default Main;
