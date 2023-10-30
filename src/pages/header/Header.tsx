import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <Link to="/">
        <div className="bg-slate-300">
          <h2 className="">Header</h2>
        </div>
      </Link>
    </>
  );
};

export default Header;
