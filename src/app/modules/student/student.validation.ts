import Joi from 'joi'

const userNameValidationSchema = Joi.object({
  firstName: Joi.string().required().max(20).trim(),
  middleName: Joi.string().required(),
  lastName: Joi.string().required().trim(),
})

const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().required().trim(),
  fatherOccupation: Joi.string().required(),
  fatherContactNo: Joi.string().required(),
  motherName: Joi.string().required().trim(),
  motherOccupation: Joi.string().required(),
  motherContactNo: Joi.string().required(),
})

const localGuardianValidationSchema = Joi.object({
  name: Joi.string().required().trim(),
  occupation: Joi.string().required(),
  contactNo: Joi.string().required(),
  address: Joi.string().required(),
})

const studentValidationSchema = Joi.object({
  id: Joi.string().required(),
  name: userNameValidationSchema.required(),
  gender: Joi.string().valid('male', 'female', 'other').required(),
  dateOfBirth: Joi.string().required(),
  email: Joi.string().email().required().trim(),
  contactNumber: Joi.string().required(),
  emergencyContactNumber: Joi.string().required(),
  bloodGroup: Joi.string().valid(
    'A+',
    'A-',
    'B+',
    'B-',
    'AB+',
    'AB-',
    'O+',
    'O-',
  ),
  presentAddress: Joi.string().required(),
  permanentAddress: Joi.string().required(),
  guardian: guardianValidationSchema.required(),
  localGuardian: localGuardianValidationSchema.required(),
  profilePicture: Joi.string(),
  isActive: Joi.string().valid('active', 'blocked').default('active'),
})

export default studentValidationSchema
