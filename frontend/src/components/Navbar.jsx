import { Link } from "react-router";
import { PlusIcon } from "lucide-react";
import { FaUsers } from "react-icons/fa";
import { LayoutDashboard } from "lucide-react";
const Navbar = () => {
  return (
    <header className="bg-secondary border-b border-base-content/10">
      <div className="ms-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FaUsers className="text-6xl text-black" />
            <h1 className="text-black md:text-2xl font-bold tracking-wide">
              EMPLOYEE MANAGEMENT SYSTEM
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Link to={"/create"} className="btn btn-primary">
              <PlusIcon className="size-5" />
              <span> New Employee</span>
            </Link>
            <Link to={"/dashboard"} className="btn btn-primary flex items-center gap-2">
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
