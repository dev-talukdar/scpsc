import { Schema, model } from 'mongoose'
import { Guardian, LocalGuardian, Student, UserName } from './student.interface'

const userNameSchema = new Schema<UserName>({
  firstName: { type: String, required: [true, 'First name is required'] },
  middleName: { type: String, required: true },
  lastName: { type: String, required: [true, 'Last name is required'] },
})

const guardianSchema = new Schema<Guardian>({
  fatherName: { type: String, required: [true, 'Father name is required'] },
  fatherOccupation: { type: String, required: true },
  fatherContactNo: { type: String, required: true },
  motherName: { type: String, required: [true, 'Mother name is required'] },
  motherOccupation: { type: String, required: true },
  motherContactNo: { type: String, required: true },
})
const localGuardianSchema = new Schema<LocalGuardian>({
  name: { type: String, required: [true, 'Guardian name is required'] },
  occupation: { type: String, required: true },
  contactNo: { type: String, required: true },
  address: { type: String, required: true },
})

const studentSchema = new Schema<Student>({
  id: { type: String, required: true, unique: true},
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
  email: { type: String, required: [true, 'Valid Email is required'], unique: true },
  contactNumber: { type: String, required: [true, 'Contact Number required'] },
  emergencyContactNumber: { type: String, required: true },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
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
    default: 'active'
  },
})

export const StudentModel = model<Student>('Student', studentSchema)
