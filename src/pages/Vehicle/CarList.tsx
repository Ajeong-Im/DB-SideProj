import { Link } from "react-router-dom";

const CarList = () => {
  return (
    <>
      <h3>여긴 Vehicle Page</h3>
      <Link to={"/addcar"}>
        <button className="t-full bg-slate-300 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
          차량 추가
        </button>
      </Link>
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
