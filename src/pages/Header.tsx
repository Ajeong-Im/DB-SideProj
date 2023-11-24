import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <Link to="/">
        <div className="bg-slate-200 h-10 flex items-center">
          <img
            src="https://i.ibb.co/WPGhwSs/Group-1000002277.png"
            alt="logo"
            className="w-30 h-8 ml-10"
          />
        </div>
      </Link>
    </>
  );
};

export default Header;
