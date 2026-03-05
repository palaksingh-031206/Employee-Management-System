import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { LoaderIcon, Trash2Icon, ArrowLeftIcon } from "lucide-react";

const EmployeeDetailPage = () => {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await api.get(`/${id}`);

        setEmployee({
          ...res.data,
          joiningDate: res.data.joiningDate
            ? res.data.joiningDate.split("T")[0]
            : "",
        });

      } catch (error) {
        console.error("Error fetching employee", error);
        toast.error("Failed to fetch employee");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this employee?"))
      return;

    try {
      await api.delete(`/${id}`);
      toast.success("Employee deleted successfully");
      navigate("/");
    } catch (error) {
      console.error("Error deleting employee", error);

      if (error.response && error.response.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to delete employee");
      }
    }
  };

  const handleSave = async () => {
    if (!employee.fullName.trim() || !employee.email.trim()) {
      toast.error("Please add full name and email");
      return;
    }

    setSaving(true);

    try {
      await api.put(`/${id}`, employee);

      toast.success("Employee updated successfully");
      navigate("/");

    } catch (error) {
      console.error("Error updating employee", error);

      if (error.response && error.response.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }

    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">

          {/* HEADER */}
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="h-5 w-5" /> Back to Employees
            </Link>

            <button
              onClick={handleDelete}
              className="btn btn-error btn-outline"
            >
              <Trash2Icon className="h-5 w-5" /> Delete Employee
            </button>
          </div>

          {/* FORM CARD */}
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">

              {[
                { label: "Employee ID", key: "employeeID", type: "text" },
                { label: "Full Name", key: "fullName", type: "text" },
                { label: "Email", key: "email", type: "email" },
                { label: "Phone Number", key: "phoneNumber", type: "text" },
                { label: "Department", key: "department", type: "text" },
                { label: "Designation", key: "designation", type: "text" },
                { label: "Salary", key: "salary", type: "number" },
                { label: "Joining Date", key: "joiningDate", type: "date" },
              ].map((field) => (
                <div className="form-control mb-4" key={field.key}>
                  <label className="label">
                    <span className="label-text">{field.label}</span>
                  </label>

                  <input
                    type={field.type}
                    className="input input-bordered"
                    value={employee[field.key] || ""}
                    onChange={(e) =>
                      setEmployee({
                        ...employee,
                        [field.key]: e.target.value,
                      })
                    }
                  />
                </div>
              ))}

              {/* ACTION BUTTON */}
              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary"
                  disabled={saving}
                  onClick={handleSave}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EmployeeDetailPage;