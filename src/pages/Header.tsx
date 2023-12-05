import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-slate-200 h-10 flex items-center">
        <div className=" cursor-pointer" onClick={() => navigate("/")}>
          <img
            src="https://i.ibb.co/WPGhwSs/Group-1000002277.png"
            alt="logo"
            className="w-30 h-8 ml-10"
          />
        </div>
        <div
          className="ml-10 cursor-pointer font-semibold text-slate-700"
          onClick={() => navigate("/guest")}
        >
          GUEST
        </div>
        <div
          className="ml-10 cursor-pointer font-semibold text-slate-700"
          onClick={() => navigate("/office")}
        >
          OFFICE
        </div>
        <div
          className="ml-10 cursor-pointer font-semibold text-slate-700"
          onClick={() => navigate("/carlist")}
        >
          VEHICLE
        </div>
      </div>
    </>
  );
};

export default Header;
