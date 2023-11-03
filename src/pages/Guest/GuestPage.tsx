import { Link } from "react-router-dom";

const GuestPage = () => {
  return (
    <div>
      <div>
        <h3>여긴 Guest Page</h3>
      </div>
      <div>
        <Link to="/addguest">
          <button className="bg-slate-300">고객 등록</button>
        </Link>
      </div>
    </div>
  );
};

export default GuestPage;
