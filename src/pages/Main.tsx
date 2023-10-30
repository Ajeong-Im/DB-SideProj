import { Link } from "react-router-dom";

const Main = () => {
  return (
    <div className="h-65 grid grid-cols-2 gap-4 content-center">
      <div className="h-screen grid grid-row-2 gap-4 content-center">
        <div>
          <div className="text-center text-5xl font-sans font-semibold mb-4 text text-slate-700">
            Rental Car Service
          </div>
          <div className="text-center font-sans text-2xl text-slate-500 mb-10">
            Admin Page
          </div>
        </div>
        <div className="flex justify-center ml-4">
          <img
            className="max-w-full max-h-full"
            src="https://i.ibb.co/2YZrwY0/mainCar.png"
            alt="random"
          />
        </div>
      </div>

      <div className="h-65 grid grid-cols-2 gap-4 content-center">
        <div className="h-65 grid grid-row-3 gap-4 content-center ml-10">
          <div>
            <Link to="/rentalstatus">
              <img
                src="https://i.ibb.co/VJ4YZp4/rental-status.png"
                className="hover:opacity-75 transition-opacity duration-300"
                alt="Rental Status"
              />
            </Link>
          </div>
          <div>
            <Link to="/guest">
              <img
                src="https://i.ibb.co/N7HWD2x/guest.png"
                className="hover:opacity-75 transition-opacity duration-300"
                alt="Rental Status"
              />
            </Link>
          </div>
          <div>
            <Link to="/office">
              <img
                src="https://i.ibb.co/h2w7V4y/office.png"
                className="hover:opacity-75 transition-opacity duration-300"
                alt="Rental Status"
              />
            </Link>
          </div>
        </div>
        <div className="h-65 grid grid-row-3 gap-4 content-center mr-10">
          <div>
            <Link to="/product">
              <img
                src="https://i.ibb.co/Wf6J4qZ/vehicle.png"
                className="hover:opacity-75 transition-opacity duration-300"
                alt="Rental Status"
              />
            </Link>
          </div>
          <div>
            <Link to="/employee">
              <img
                src="https://i.ibb.co/W28RQkB/employee.png"
                className="hover:opacity-75 transition-opacity duration-300"
                alt="Rental Status"
              />
            </Link>
          </div>
          <div>
            <Link to="/repair">
              <img
                src="https://i.ibb.co/mb77HHX/maintenance.png"
                className="hover:opacity-75 transition-opacity duration-300"
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
