import { StudentServices } from './student.service'
import httpStatus from 'http-status'
import sendResponse from '../../utils/sendResponse'
import catchAsync from '../../utils/catchAsync';
// import studentValidationSchema from './student.validation'


const getAllStudents = catchAsync(async(req, res) => {  
    const result = await StudentServices.getAllStudentFromDb()

      sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student Created Successfully',
      data: result,
    })    
}) ;

const getSingleStudent = catchAsync(async (req, res) => {  
    const { studentId } = req.params

    const result = await StudentServices.getSingleStudentFromDb(studentId)

      sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student Created Successfully',
      data: result,
    })  
})

const deleteStudent = catchAsync(async (req , res ) => { 
    const { studentId } = req.params

    const result = await StudentServices.deleteStudentFromDb(studentId)

      sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student Created Successfully',
      data: result,
    })  
})

export const studentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
}
