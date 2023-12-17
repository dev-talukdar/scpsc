import { Model } from 'mongoose'

export type TUserName = {
  firstName: string
  middleName?: string
  lastName: string
}

export type TGuardian = {
  fatherName: string
  fatherOccupation: string
  fatherContactNo: string
  motherName: string
  motherOccupation: string
  motherContactNo: string
}

export type TLocalGuardian = {
  name: string
  occupation: string
  contactNo: string
  address: string
}

export type TStudent = {
  id: string
  password: string
  name: TUserName
  gender: 'male' | 'female' | 'other'
  dateOfBirth: string
  email: string
  contactNumber: string
  emergencyContactNumber: string
  bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'
  presentAddress: string
  permanentAddress: string
  guardian: TGuardian
  localGuardian: TLocalGuardian
  profilePicture?: string
  isActive: 'active' | 'blocked'
  academicDepartment: string
  createdAt: string
  updatedAt: string
}

// for creating static
export interface StudentModel extends Model<TStudent> {
  isUserExists(id: string): Promise<TStudent | null>
}

// for creating instance

// export type StudentMethods = {
//   isUserExists(id: string): Promise<TStudent | null>;
// }

// export type StudentModel = Model<TStudent, Record<string, never>, StudentMethods>
