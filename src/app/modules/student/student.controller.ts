import { Request, Response } from 'express'
import { StudentServices } from './student.service'
import studentValidationSchema from './student.validation'

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body

    // data validation using Joi
    const { error, value } = studentValidationSchema.validate(studentData)
    const result = await StudentServices.createStudentIntoDb(value)

    if (error) {
      res.status(500).json({
        success: false,
        message: 'Something went wrong',
        error: error.details,
      })
    }

    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: err,
    })
  }
}

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentFromDb()

    res.status(200).json({
      success: true,
      message: 'Student are retrieved successfully',
      data: result,
    })
  } catch (err) {
    console.log(err)
  }
}

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params

    const result = await StudentServices.getSingleStudentFromDb(studentId)

    res.status(200).json({
      success: true,
      message: 'Single Student found',
      data: result,
    })
  } catch (err) {
    console.log()
  }
}

export const studentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
}
