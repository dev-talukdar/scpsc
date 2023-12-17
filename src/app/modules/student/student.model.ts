import { Schema, model } from 'mongoose'
import validator from 'validator'
import {
  StudentModel,
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
} from './student.interface'
import bcrypt from 'bcrypt'

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    maxlength: 20,
    trim: true,
  },
  middleName: { type: String, required: true },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} is not valid lastName',
    },
  },
})

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: [true, 'Father name is required'],
    trim: true,
  },
  fatherOccupation: { type: String, required: true },
  fatherContactNo: { type: String, required: true },
  motherName: {
    type: String,
    required: [true, 'Mother name is required'],
    trim: true,
  },
  motherOccupation: { type: String, required: true },
  motherContactNo: { type: String, required: true },
})
const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: [true, 'Guardian name is required'],
    trim: true,
  },
  occupation: { type: String, required: true },
  contactNo: { type: String, required: true },
  address: { type: String, required: true },
})

const studentSchema = new Schema<TStudent, StudentModel>({
  id: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: true },
  name: {
    type: userNameSchema,
    required: true,
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true,
  },
  dateOfBirth: { type: String, required: true },
  email: {
    type: String,
    required: [true, 'Valid Email is required'],
    unique: true,
    trim: true,
    // validate: {
    //   validator: (value: string) =>  validator.isEmail(value),
    //   message: '{VALUE} is not a valid email type'
    // }
  },
  contactNumber: { type: String, required: [true, 'Contact Number required'] },
  emergencyContactNumber: { type: String, required: true },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: {
    type: guardianSchema,
    required: true,
  },
  localGuardian: {
    type: localGuardianSchema,
    required: true,
  },
  profilePicture: { type: String },
  isActive: {
    type: String,
    enum: ['active', 'blocked'],
    default: 'active',
  },
  academicDepartment: { type: String, required: true },
  createdAt: { type: String, required: true },
  updatedAt: { type: String, required: true },
})

// pre save middleware / hook
studentSchema.pre('save', function () {
  console.log(this, 'pre hook: we will save our data')
  // hashing password and save into DB
})

// post save middleware / hook
studentSchema.post('save', function () {
  console.log(this, 'we saved our data')
})

// creating a custom static method
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id })
  return existingUser
}

//creating a custom instance method
// studentSchema.methods.isUserExists = async function(id: string){
//   const existingUser = await Student.findOne({id});
//   return existingUser
// }

export const Student = model<TStudent, StudentModel>('Student', studentSchema)
