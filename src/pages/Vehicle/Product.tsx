import { Link } from "react-router-dom";

const Product = () => {
  return (
    <>
      <h3>여긴 Vehicle Page</h3>
      <ul>
        <Link to={"/carlist/1"}>
          <li>1번 차</li>
        </Link>
        <Link to={"/carlist/2"}>
          <li>2번 차</li>
        </Link>
      </ul>
    </>
  );
};

export default Product;
