import { Router } from "express";
import { createStudent,deleteStudent, getAllStudents, modifierStudent,getStudentById} from '../controllers/studentController.js'
import { validateId } from "../middleware/handleError.js";

const router = Router();

router.get('/', getAllStudents);
router.post('/',createStudent);
router.patch('/:id',validateId('id'),modifierStudent);
router.get('/:id', validateId('id'),getStudentById)
router.delete('/:id',validateId('id'),deleteStudent);

export default router;