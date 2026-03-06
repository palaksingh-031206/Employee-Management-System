import express from "express"
import { createEmployee, deleteEmployee, filterByDepartment, getAllEmployeeDetails, getEmployeeByID, searchByEmployeeID, sortBySalary, updateEmployeeDetails } from "../controllers/employeeController.js"
const router=express.Router()
router.get(/search",searchByEmployeeID);
router.get("/sort/salary",sortBySalary);
router.get("/department",filterByDepartment);

router.get("/",getAllEmployeeDetails)
router.get("/:id",getEmployeeByID);
router.post("/",createEmployee);
router.put("/:id",updateEmployeeDetails);
router.delete("/:id",deleteEmployee);



export default router;

