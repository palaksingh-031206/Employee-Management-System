import { Link, useLocation } from "react-router";
import { UserCircle, Briefcase, DollarSign, Edit2, Trash2 } from "lucide-react";
import { formatDate } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { useState } from "react";

const EmployeeCard = ({ employee, setEmployees }) => {
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  const isActive = location.pathname === `/employee/${employee._id}`;

  const handleDelete = async () => {
    try {
      await api.delete(`/employees/${employee._id}`);
      setEmployees(prev => prev.filter(e => e._id !== employee._id));
      toast.success("Employee deleted successfully");
    } catch {
      toast.error("Failed to delete employee");
    } finally {
      setShowModal(false);
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    try {
      const newStatus =currentStatus === "Active" ? "Inactive" : "Active";
      await api.put(`/employees/${id}`, {
        empstatus: newStatus,
      });
      setEmployees(prev =>
        prev.map(emp =>
          emp._id === id
            ? { ...emp, empstatus: newStatus }
            : emp
        )
      );
      toast.success("Status updated");
    } catch {
      toast.error("Failed to update status");
    }
  };

  return (
    <>
      <Link
        to={`/employee/${employee._id}`}
        className={`relative block rounded-xl bg-base-100 p-4 border transition-all duration-200
        ${isActive ? "border-primary shadow-lg" : "border-base-300"}
        hover:border-primary hover:shadow-xl`}
      >
        <div className="flex justify-between items-start">
          <p className="text-xs text-base-content/60 truncate">
            {employee.employeeID}
          </p>
          <span className="badge badge-secondary">
            {employee.department}
          </span>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2">
            <UserCircle className="size-4 text-primary" />
            <p className="font-medium text-base-content line-clamp-1">
              {employee.fullName}
            </p>
          </div>

          <div className="flex items-center gap-2 text-base-content/70">
            <Briefcase className="size-4 text-primary" />
            <p className="text-sm line-clamp-1">
              {employee.designation}
            </p>
          </div>
          <div className="flex items-center gap-2 text-base-content/70">
            <DollarSign className="size-4 text-primary" />
            <p className="text-sm line-clamp-1">
              ₹{employee.salary}
            </p>
          </div>
          <div className="flex items-center justify-between mt-4 border-t border-base-300 pt-3">
            <span
              className={`badge badge-sm ${
                employee.empstatus === "Active"
                  ? "badge-success"
                  : "badge-error"
              }`}
            >
              {employee.empstatus}
            </span>
            <button
              className={`btn btn-xs ${
                employee.empstatus === "Active"
                  ? "btn-outline btn-error"
                  : "btn-outline btn-success"
              }`}
              onClick={(e) => {
                e.preventDefault(); // prevent link navigation
                toggleStatus(employee._id, employee.empstatus);
              }}
            >
              {employee.empstatus === "Active"
                ? "Deactivate"
                : "Activate"}
            </button>
          </div>
        </div>
        <div className="mt-6 flex justify-between items-center">
          <span className="text-xs text-base-content/60">
            Joined: {formatDate(employee.joiningDate)}
          </span>
          <div className="flex items-center gap-4">
            <div
              className="tooltip tooltip-warning"
              data-tip="Edit employee"
            >
              <Edit2 className="size-4 text-warning hover:scale-110 transition" />
            </div>
            <div
              className="tooltip tooltip-error"
              data-tip="Delete employee"
            >
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setShowModal(true);
                }}
                className="text-error hover:scale-110 transition"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </Link>
      {showModal && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg text-error flex items-center gap-2">
              <Trash2 className="size-5" /> Delete Employee
            </h3>
            <p className="py-4 text-base-content/70">
              Are you sure you want to delete{" "}
              <span className="font-semibold">
                {employee.fullName}
              </span>
              ?
            </p>
            <div className="modal-action">
              <button
                className="btn btn-ghost"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-error flex items-center gap-2"
                onClick={handleDelete}
              >
                <Trash2 className="size-4" /> Delete
              </button>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
};

export default EmployeeCard;
