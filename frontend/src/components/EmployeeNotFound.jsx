import { NotebookIcon } from "lucide-react";
import { Link } from "react-router";

const EmployeeNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6 max-w-md mx-auto text-center">
      <div className="bg-primary/10 rounded-full p-8">
        <NotebookIcon className="size-10 text-primary" />
      </div>
      <h3 className="text-2xl font-bold">No employees yet</h3>
      <p className="text-base-content/70">
        Ready to add employees? Add your first employee to the system.
      </p>
      <Link to="/create" className="btn btn-primary">
        Add First Employee
      </Link>
    </div>
  );
};

export default EmployeeNotFound;
