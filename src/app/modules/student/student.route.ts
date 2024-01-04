import express from 'express'
import { studentControllers } from './student.controller'
import validateRequest from '../../middleware/validateRequest'
import { studentValidations } from './student.validation'

const router = express.Router()

router.get('/', studentControllers.getAllStudents)

router.get('/:studentId', studentControllers.getSingleStudent)
// TODO: Can't update student information from specific part, but can do with entire information
router.patch(
  '/:studentId',
  validateRequest(studentValidations.updateStudentValidationSchema),
  studentControllers.updateStudent,
)

router.delete('/:studentId', studentControllers.deleteStudent)

export const StudentRoutes = router
