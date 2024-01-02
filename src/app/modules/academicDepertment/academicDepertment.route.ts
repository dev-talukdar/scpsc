import express from 'express'
import { AcademicDepartmentValidation } from './academicDepertment.validation'
import validateRequest from '../../middleware/validateRequest'
import { AcademicDepartmentControllers } from './academicDepertment.controller'

const router = express.Router()

router.post(
  '/create-academic-department',
  validateRequest(
    AcademicDepartmentValidation.createAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentControllers.createAcademicDepartment,
)

router.get('/', AcademicDepartmentControllers.getAllAcademicDepartments)

router.get(
  '/:departmentId',
  AcademicDepartmentControllers.getSingleAcademicDepartment,
)

router.patch(
  '/:departmentId',
  validateRequest(
    AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentControllers.updateAcademicDepartment,
)

export const AcademicDepartmentRoutes = router
