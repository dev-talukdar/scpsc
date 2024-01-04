import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import { TAcademicSemester } from './academicSemester.Interface'
import { AcademicSemester } from './academicSemester.Model'
import { AcademicSemesterNameCodeMapper } from './academicSemester.const'

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  if (AcademicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new AppError(httpStatus.NOT_FOUND, 'Invalid Semester Code')
  }

  const result = await AcademicSemester.create(payload)

  return result
}

const getAllAcademicSemesterFromDB = async () => {
  const result = await AcademicSemester.find()
  return result
}

const getSingleAcademicSemesterFromDB = async (id: string) => {
  const result = await AcademicSemester.findById(id)
  return result
}

const updateAcademicSemesterIntoDB = async (
  id: string,
  payload: Partial<TAcademicSemester>,
) => {
  if (
    payload.name &&
    payload.code &&
    AcademicSemesterNameCodeMapper[payload.name] !== payload.code
  ) {
    throw new AppError(httpStatus.NOT_FOUND, 'Invalid Semester Code')
  }

  const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result
}

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemesterFromDB,
  getSingleAcademicSemesterFromDB,
  updateAcademicSemesterIntoDB,
}
