import { TStudent } from './student.interface'
import { Student } from './student.model'

const createStudentIntoDb = async (studentData: TStudent) => {
  if (await Student.isUserExists(studentData.id)) {
    throw new Error('user already exists')
  }
  const result = await Student.create(studentData) //builtin static method

  // const student = new Student(studentData) // create an instance

  // if(await student.isUserExists(studentData.id)){
  //   throw new Error('user already exists')
  // }

  // const result = await student.save()  //built in instance method
  return result
}

const getAllStudentFromDb = async () => {
  const result = await Student.find()
  return result
}

const getSingleStudentFromDb = async (id: string) => {
  const result = await Student.findOne({ id })
  return result
}

export const StudentServices = {
  createStudentIntoDb,
  getAllStudentFromDb,
  getSingleStudentFromDb,
}
