import api from "../lib/axios";
import { ArrowLeftIcon } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";

const CreatePage = () => {
  const [employeeID, setEmployeeID] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [salary, setSalary] = useState("");
  const [joiningDate, setJoiningDate] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/", {
        employeeID,
        fullName,
        email,
        phoneNumber,
        department,
        designation,
        salary: Number(salary),
        joiningDate,
      });
      toast.success("Employee Created Successfully!");
      navigate("/");
    } catch (error) {
      console.log("Error Creating Employee", error);
      toast.error("Failed to create Employee.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to={"/"} className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5" /> Back to Employees
          </Link>
          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Create New Employee</h2>
              <form onSubmit={handleSubmit}>
                {/* Employee ID */}
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Employee ID</span>
                  </label>
                  <input
                    type="text"
                    id="employeeID"
                    name="employeeID"
                    placeholder="Enter Employee ID"
                    className="input input-bordered"
                    value={employeeID}
                    onChange={(e) => setEmployeeID(e.target.value)}
                    required
                  />
                </div>
                {/* Full Name */}
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Full Name</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    placeholder="Enter Full Name"
                    className="input input-bordered"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
                {/* Email */}
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter Email"
                    className="input input-bordered"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                {/* Phone Number */}
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Phone Number</span>
                  </label>
                  <input
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    placeholder="Enter Phone Number"
                    className="input input-bordered"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </div>
                {/* Department */}
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Department</span>
                  </label>
                  <input
                    type="text"
                    id="department"
                    name="department"
                    placeholder="Enter Department"
                    className="input input-bordered"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    required
                  />
                </div>
                {/* Designation */}
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Designation</span>
                  </label>
                  <input
                    type="text"
                    id="designation"
                    name="designation"
                    placeholder="Enter Designation"
                    className="input input-bordered"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    required
                  />
                </div>
                {/* Salary */}
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Salary</span>
                  </label>
                  <input
                    type="number"
                    id="salary"
                    name="salary"
                    placeholder="Enter Salary"
                    className="input input-bordered"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    required
                  />
                </div>
                {/* Joining Date */}
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Joining Date</span>
                  </label>
                  <input
                    type="date"
                    id="joiningDate"
                    name="joiningDate"
                    className="input input-bordered"
                    value={joiningDate}
                    onChange={(e) => setJoiningDate(e.target.value)}
                    required
                  />
                </div>
                <div className="card-actions justify-end">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Creating..." : "Create Employee"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
