import { Schema, model } from 'mongoose'
import { TAcademicDepartment } from './academicDepertment.interface'
import AppError from '../../errors/AppError'
import httpStatus from 'http-status'

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
    },
  },
  {
    timestamps: true,
  },
)

// same nam e department ache, kina check kore dekha hocche
academicDepartmentSchema.pre('save', async function (next) {
  const isDepartmentExist = await AcademicDepartment.findOne({
    name: this.name,
  })

  if (isDepartmentExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'This department is already exist')
  }
  next()
})

// invalid Id diye data update korte chaile, error produce kora hoitese
academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery()

  const isDepartmentExist = await AcademicDepartment.findOne(query)

  if (!isDepartmentExist) {
    throw new AppError(404, 'This department does not exist')
  }
  next()
})

export const AcademicDepartment = model<TAcademicDepartment>(
  'AcademicDepartment',
  academicDepartmentSchema,
)
