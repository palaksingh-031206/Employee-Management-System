import Employee from "../models/employeeModel.js";

export async function getAllEmployeeDetails(_, res) {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 });
    res.status(200).json(employees);
  } catch (error) {
    console.error("Error in getting all employees details controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getEmployeeByID(req, res) {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json(employee);
  } catch (error) {
    console.error("Error in get employee by ID controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function createEmployee(req, res) {
  try {
    const {
      employeeID,
      fullName,
      email,
      phoneNumber,
      department,
      designation,
      salary,
      joiningDate,
    } = req.body;

    if (
      !employeeID ||
      !fullName ||
      !email ||
      !phoneNumber ||
      !department ||
      !designation ||
      !salary ||
      !joiningDate
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const employee = new Employee({
      employeeID,
      fullName,
      email,
      phoneNumber,
      department,
      designation,
      salary,
      joiningDate,
    });

    const savedEmployee = await employee.save();

    res.status(201).json(savedEmployee);
  } catch (error) {

    if (error.code === 11000) {
      if (error.keyPattern.employeeID) {
        return res.status(400).json({
          message: "Employee ID already exists",
        });
      }

      if (error.keyPattern.email) {
        return res.status(400).json({
          message: "Email already exists",
        });
      }
    }

    console.error("Error in create employee controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
export async function updateEmployeeDetails(req, res) {
  try {
    const {
      employeeID,
      fullName,
      email,
      phoneNumber,
      department,
      designation,
      salary,
      empstatus,
      joiningDate,
    } = req.body;

    const existingEmployeeID = await Employee.findOne({
      employeeID: employeeID,
      _id: { $ne: req.params.id },
    });

    if (existingEmployeeID) {
      return res.status(404).json({
        message: "Employee ID already exists",
      });
    }

    const existingEmployeeEmail = await Employee.findOne({
      email: email,
      _id: { $ne: req.params.id },
    });

    if (existingEmployeeEmail) {
      return res.status(404).json({
        message: "Email already exists",
      });
    }

    const updateEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      {
        employeeID,
        fullName,
        email,
        phoneNumber,
        department,
        designation,
        salary,
        empstatus,
        joiningDate,
      },
      { new: true, runValidators: true }
    );

    if (!updateEmployee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    res.status(200).json(updateEmployee);

  } catch (error) {
    console.error("Error in updating Employee Controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
export async function deleteEmployee(req, res) {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);

    if (!deletedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({ message: "Employee deleted successfully" });

  } catch (error) {
    console.error("Error in delete Employee Controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function searchByEmployeeID(req, res) {
  try {
    const employeeID = req.query.employeeID;

    const employee = await Employee.findOne({ employeeID });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json(employee);

  } catch (error) {
    console.error("Error in search Employee by id Controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function sortBySalary(req, res) {
  try {
    const sortsal = req.query.order === "desc" ? -1 : 1;

    const employees = await Employee.find().sort({ salary: sortsal });

    res.status(200).json({
      message: "Employee salary sorted successfully",
      data: employees,
    });

  } catch (error) {
    console.error("Error in sort by salary Controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function filterByDepartment(req, res) {
  try {
    const { department } = req.query;

    const employees = await Employee.find({
      department: { $regex: department, $options: "i" },
    });

    if (employees.length === 0) {
      return res.status(404).json({
        message: "No employee found in the department",
      });
    }

    res.status(200).json({
      message: "Employee filtered by department successfully",
      count: employees.length,
      data: employees,
    });

  } catch (error) {
    console.error("Error in filter by department Controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
