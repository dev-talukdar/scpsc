import mongoose from 'mongoose'
import config from '../../config'
import { AcademicSemester } from '../academicSemester/academicSemester.Model'
import { TStudent } from '../student/student.interface'
import { Student } from '../student/student.model'
import { TUser } from './user.interface'
import { User } from './user.model'
import { generateStudentId } from './user.utils'
import AppError from '../../errors/AppError'
import httpStatus from 'http-status'

const createStudentIntoDb = async (password: string, payload: TStudent) => {
  const userData: Partial<TUser> = {}

  userData.password = password || (config.default_pass as string)

  userData.role = 'student'

  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  )

  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    //TODO
    if (!admissionSemester) {
      throw new Error('admission semester not found')
    }

    userData.id = await generateStudentId(admissionSemester)

    const newUser = await User.create([userData], { session })

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create a new user ')
    }

    payload.id = newUser[0].id
    payload.user = newUser[0]._id

    const newStudent = await Student.create([payload], { session })
    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create new student')
    }

    await session.commitTransaction()
    await session.endSession()

    return newStudent
  } catch (err) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error('Failed to create student')
  }
}

export const UserServices = {
  createStudentIntoDb,
}
