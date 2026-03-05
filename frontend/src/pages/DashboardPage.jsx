import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import { ArrowLeftIcon } from "lucide-react";

const DashboardPage = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await api.get("/");
        setEmployees(res.data);
      } catch (error) {
        toast.error("Failed to load employees");
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  const totalEmployees = employees.length;

  const totalDepartments = [...new Set(employees.map((emp) => emp.department))]
    .length;

  const totalDesignations = [
    ...new Set(employees.map((emp) => emp.designation)),
  ].length;

  const totalSalary = employees.reduce((sum, emp) => sum + emp.salary, 0);

  const activeEmployees = employees.filter(
    (emp) => emp.empstatus === "Active",
  ).length;

  const inactiveEmployees = employees.filter(
    (emp) => emp.empstatus === "Inactive",
  ).length;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />

      <div className="max-w-7xl mx-auto p-6">
        <Link to={"/"} className="btn btn-ghost mb-6">
          <ArrowLeftIcon className="size-5" /> Back to Employees
        </Link>
        <h1 className="text-3xl font-bold mb-6">Employee Dashboard</h1>

        {loading ? (
          <div className="text-center py-10">Loading...</div>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="bg-base-100 shadow-md rounded-xl p-6 mb-8">
  <h2 className="text-xl font-bold mb-4">
    Dashboard Summary
  </h2>

  <ul className="space-y-3 text-lg">

    <li>
      <strong>Total Employees:</strong> {totalEmployees}
    </li>

    <li>
      <strong>Total Departments:</strong>{" "}
      {[...new Set(employees.map(emp => emp.department))].join(", ")}
    </li>

    <li>
      <strong>Total Designations:</strong>{" "}
      {[...new Set(employees.map(emp => emp.designation))].join(", ")}
    </li>

    <li>
      <strong>Total Salary of All Employees:</strong> ₹{totalSalary}
    </li>

    <li>
      <strong>Active Employees:</strong> {activeEmployees}
    </li>

    <li>
      <strong>Inactive Employees:</strong> {inactiveEmployees}
    </li>

  </ul>
</div>

            {/* Employee List */}
            <div className="bg-base-100 shadow-md rounded-xl p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Employee List</h2>

              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Department</th>
                      <th>Designation</th>
                      <th>Salary</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees.map((emp) => (
                      <tr key={emp._id}>
                        <td>{emp.employeeID}</td>
                        <td>{emp.fullName}</td>
                        <td>{emp.department}</td>
                        <td>{emp.designation}</td>
                        <td>₹{emp.salary}</td>
                        <td>
                          <span
                            className={`badge ${
                              emp.empstatus === "Active"
                                ? "badge-success"
                                : "badge-error"
                            }`}
                          >
                            {emp.empstatus}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <button onClick={handlePrint} className="btn btn-primary">
              Print Dashboard 🖨
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
