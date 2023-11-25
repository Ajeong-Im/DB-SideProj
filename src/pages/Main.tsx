import { Link } from "react-router-dom";
import BarChart from "./BarChart";

const Main = () => {
  return (
    <div className="grid grid-cols-3 gap-4 justify-center content-center">
      <div className="col-span-2 grid gap-4 content-center -ml-20">
        <div>
          <div className="text-center text-4xl font-sans font-bold mt-8 mb-2 text text-slate-700">
            Rental Car Service
          </div>
          <div className="text-center font-sans text-xl text-slate-500 mb-5">
            Admin Page
          </div>
        </div>
        <div className="flex justify-center -mr-3 -mt-10">
          <img
            className="w-160 h-80"
            src="https://i.ibb.co/3dXsBVM/Group-1000002270-2.png"
            alt="random"
          />
        </div>

        {/* 메뉴 List */}
        <div className="col-span-1 grid grid-cols-5">
          <div></div>
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
          <div></div>
        </div>
      </div>

      <div className="flex justify-center mt-40 mr-44">
        <BarChart />
      </div>
    </div>
  );
};

export default Main;
