import { Link } from "react-router-dom";

const Main = () => {
  return (
    <div className="h-65 grid grid-cols-3 gap-4 justify-center content-center">
      <div className="col-span-2 grid grid-row-2 gap-4 content-center ">
        <div>
          <div className="text-center text-5xl font-sans font-bold mb-4 text text-slate-700">
            Rental Car Service
          </div>
          <div className="text-center font-sans text-2xl text-slate-500 mb-5">
            Admin Page
          </div>
        </div>
        <div className="flex justify-center ml-2 -mr-10">
          <img
            className="max-w-full max-h-full"
            src="https://i.ibb.co/3dXsBVM/Group-1000002270-2.png"
            alt="random"
          />
        </div>
      </div>

      {/* 메뉴 List */}
      <div className="col-span-1 grid grid-row-3 gap-3 justify-center content-center align-center">
        <div>
          <Link to="/guest">
            <img
              src="https://i.ibb.co/TP3dsVN/Group-1000002266.png"
              className="grayscale hover:grayscale:hover"
              alt="Rental Status"
            />
          </Link>
        </div>
        <div>
          <Link to="/office">
            <img
              src="https://i.ibb.co/kDZzbg0/office.png"
              className="grayscale hover:grayscale:hover"
              alt="Rental Status"
            />
          </Link>
        </div>
        <div>
          <Link to="/carlist">
            <img
              src="https://i.ibb.co/p0X11Qx/Group-1000002264.png"
              className="grayscale hover:grayscale:hover"
              alt="Rental Status"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Main;
