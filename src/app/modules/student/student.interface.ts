import {} from 'mongoose'

export type UserName = {
  firstName: string
  middleName?: string
  lastName: string
}

export type Guardian = {
  fatherName: string
  fatherOccupation: string
  fatherContactNo: string
  motherName: string
  motherOccupation: string
  motherContactNo: string
}

export type LocalGuardian = {
  name: string
  occupation: string
  contactNo: string
  address: string
}

export type Student = {
  id: string
  name: UserName
  gender: 'male' | 'female' | 'other'
  dateOfBirth: string
  email: string
  contactNumber: string
  emergencyContactNumber: string
  bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'
  presentAddress: string
  permanentAddress: string
  guardian: Guardian
  localGuardian: LocalGuardian
  profilePicture?: string
  isActive: 'active' | 'blocked'
  academicDepartment: string
  createdAt: string
  updatedAt: string
}
