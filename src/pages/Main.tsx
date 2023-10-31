import { Link } from "react-router-dom";

const Main = () => {
  return (
    <div className="h-65 grid grid-cols-2 gap-4 content-center">
      <div className="h-screen grid grid-row-2 gap-4 content-center">
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

      <div className="h-65 grid grid-cols-2 gap-4 content-center">
        <div className="h-65 grid grid-row-3 gap-4 content-center ml-10">
          <div>
            <Link to="/rentalstatus">
              <img
                src="https://i.ibb.co/0ng7cxP/Group-1000002263.png"
                className="grayscale hover:grayscale:hover"
                alt="Rental Status"
              />
            </Link>
          </div>
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
                src="https://i.ibb.co/x8rnqvg/Group-1000002265.png"
                className="grayscale hover:grayscale:hover"
                alt="Rental Status"
              />
            </Link>
          </div>
        </div>
        <div className="h-65 grid grid-row-3 gap-4 content-center mr-10">
          <div>
            <Link to="/product">
              <img
                src="https://i.ibb.co/p0X11Qx/Group-1000002264.png"
                className="grayscale hover:grayscale:hover"
                alt="Rental Status"
              />
            </Link>
          </div>
          <div>
            <Link to="/employee">
              <img
                src="https://i.ibb.co/xhSqFSc/Group-1000002268.png"
                className="grayscale hover:grayscale:hover"
                alt="Rental Status"
              />
            </Link>
          </div>
          <div>
            <Link to="/repair">
              <img
                src="https://i.ibb.co/3S3R2qb/Group-1000002267.png"
                className="grayscale hover:grayscale:hover"
                alt="Rental Status"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
