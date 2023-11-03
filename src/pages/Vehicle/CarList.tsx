import { Link } from "react-router-dom";

const CarList = () => {
  return (
    <>
      <h3>여긴 Vehicle Page</h3>
      <ul>
        <Link to={"/product/1"}>
          <li>1번 차</li>
        </Link>
        <Link to={"/product/2"}>
          <li>2번 차</li>
        </Link>
      </ul>
    </>
  );
};
export default CarList;
