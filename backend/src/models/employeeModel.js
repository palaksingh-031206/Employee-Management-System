import mongoose from "mongoose";
const employeeSchema=new mongoose.Schema({
    employeeID: {
        type:String,
        required: true,
        unique: true},
    fullName: {
        type:String,
        required:true},
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true},
    phoneNumber: {
        type: String,
        required: true,
        minlength:10,
        maxlength:15},
    department:{
        type: String,
        required: true},
    designation:{
        type: String,
        required: true},
    salary:{
        type: Number,
        required: true,
        min:0},
    empstatus: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active"},
    joiningDate:{
        type:String,
        required:true}
},
{timestamps:true})
const Employee=mongoose.model("Employee", employeeSchema);
export default Employee;