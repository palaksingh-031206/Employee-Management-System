import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import api from "../lib/axios";
import toast from "react-hot-toast";
import EmployeeCard from "../components/EmployeeCard.jsx";
import EmployeeNotFound from "../components/EmployeeNotFound.jsx";

const HomePage = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [departmentQuery, setDepartmentQuery] = useState("");
  const [employeeIDQuery, setEmployeeIDQuery] = useState("");
  const [salaryOrder, setSalaryOrder] = useState("");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await api.get("/employees");
        setEmployees(res.data);
      } catch (error) {
        toast.error("Failed to load employees");
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  const fetchEmployees = async (department = "") => {
    try {
      setLoading(true);
      let url = "/employees";
      if (department.trim()) {
        url = `/department?department=${encodeURIComponent(department)}`;
      }
      const res = await api.get(url);
      setEmployees(res.data.data || res.data);
    } catch (error) {
      toast.error("Failed to load employees");
      setEmployees([]);
    } finally {
      setLoading(false);
    }
  };

  const filterByDepartment = async () => {
    if (!departmentQuery.trim()) return;
    try {
      setLoading(true);
      const res = await api.get(
        `/department?department=${encodeURIComponent(departmentQuery)}`,
      );
      setEmployees(res.data.data);
    } catch (error) {
      toast.error(
        `Employees with department "${departmentQuery}" do not exist`,
      );
      setEmployees([]);
    } finally {
      setLoading(false);
    }
  };

  const searchByEmployeeID = async () => {
    if (!employeeIDQuery.trim()) {
      fetchEmployees();
      return;
    }
    try {
      setLoading(true);
      const res = await api.get(
        `/search?employeeID=${encodeURIComponent(employeeIDQuery)}`,
      );
      setEmployees([res.data]);
    } catch (error) {
      toast.error(`Employee with ID "${employeeIDQuery}" does not exist`);
      setEmployees([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchEmployeesSortedBySalary = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/sort/salary?order=${salaryOrder}`);
      setEmployees(res.data.data || res.data);
    } catch (error) {
      toast.error("Failed to sort employees by salary");
    } finally {
      setLoading(false);
    }
  };

  const resetSalarySort = () => {
    setSalaryOrder("");
    fetchEmployees();
  };

  const resetEmployeeID = () => {
    setEmployeeIDQuery("");
    fetchEmployees();
  };

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      if (!departmentQuery.trim()) {
        await fetchEmployees();
        return;
      }
      await filterByDepartment();
    }
  };

  const handleIDSearchKey = (e) => {
    if (e.key === "Enter") {
      searchByEmployeeID();
    }
  };

  const totalEmployees = employees.length;
  const totalDepartments = [...new Set(employees.map((emp) => emp.department))]
    .length;

  const totalDesignations = [
    ...new Set(employees.map((emp) => emp.designation)),
  ].length;

  const averageSalary = employees.length
    ? Math.floor(
        employees.reduce((sum, emp) => sum + emp.salary, 0) / employees.length,
      )
    : 0;

  return (
    <div className="min-h-screen bg-base-300">
      <Navbar />

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-base-100 shadow-md rounded-xl p-6">
            <p className="text-sm text-gray-500">Total Employees</p>
            <h2 className="text-3xl font-bold text-primary">
              {totalEmployees}
            </h2>
          </div>

          <div className="bg-base-100 shadow-md rounded-xl p-6">
            <p className="text-sm text-gray-500">Total Departments</p>
            <h2 className="text-3xl font-bold text-secondary">
              {totalDepartments}
            </h2>
          </div>

          <div className="bg-base-100 shadow-md rounded-xl p-6">
            <p className="text-sm text-gray-500">Total Designations</p>
            <h2 className="text-3xl font-bold text-accent">
              {totalDesignations}
            </h2>
          </div>

          <div className="bg-base-100 shadow-md rounded-xl p-6">
            <p className="text-sm text-gray-500">Average Salary</p>
            <h2 className="text-3xl font-bold">₹{averageSalary}</h2>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {/* Search by Employee ID */}
          <div className="relative">
            <input
              type="text"
              id="employeeID"
              name="employeeID"
              placeholder="Search by Employee ID"
              className="input input-bordered w-full h-12"
              value={employeeIDQuery}
              onChange={(e) => setEmployeeIDQuery(e.target.value)}
              onKeyDown={handleIDSearchKey}
            />
            {employeeIDQuery && (
              <button
                onClick={resetEmployeeID}
                className="absolute right-2 top-1/2 -translate-y-1/2 btn btn-xs"
              >
                Reset
              </button>
            )}
          </div>
          {/* Department */}
          <div className="relative">
            <input
              type="text"
              id="department"
              name="department"
              placeholder="Type department"
              className="input input-bordered w-full h-12 pr-20"
              value={departmentQuery}
              onChange={(e) => setDepartmentQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            {departmentQuery && (
              <button
                onClick={() => {
                  setDepartmentQuery("");
                  fetchEmployees();
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 btn btn-xs"
              >
                Reset
              </button>
            )}
          </div>
          {/* Sort Salary */}
          <select
            id="salaryOrder"
            name="salaryOrder"
            className="select select-bordered w-full h-12"
            value={salaryOrder}
            onChange={(e) => setSalaryOrder(e.target.value)}
          >
            <option value="">Sort Salary</option>
            <option value="asc">Ascending ↑</option>
            <option value="desc">Descending ↓</option>
          </select>

          <button
            onClick={fetchEmployeesSortedBySalary}
            className="btn btn-secondary h-12 w-full font-semibold"
          >
            Sort by Salary 💰
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center text-primary py-10">
            Loading employees...
          </div>
        )}

        {/* Empty */}
        {!loading && employees.length === 0 && <EmployeeNotFound />}

        {/* Employee Grid */}
        {!loading && employees.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {employees.map((employee) => (
              <EmployeeCard
                key={employee._id}
                employee={employee}
                setEmployees={setEmployees}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
