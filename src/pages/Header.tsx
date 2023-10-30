import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <Link to="/">
        <div className="bg-slate-300">
          <h1>Header</h1>
        </div>
      </Link>
    </>
  );
};

export default Header;
