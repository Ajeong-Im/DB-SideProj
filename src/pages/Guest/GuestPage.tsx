import { Link } from "react-router-dom";

const GuestPage = () => {
  return (
    <div>
      <div>
        <h3>여긴 Guest Page</h3>
      </div>
      <div>
        <Link to="/addguest">
          <button className="t-full bg-slate-300 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
            고객 등록
          </button>
        </Link>
      </div>
    </div>
  );
};

export default GuestPage;
