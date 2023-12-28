import { Router } from "express";
import { createTask, updateTask } from "../controller/task.controllers.js";


const router = Router()


router.route('/').post(createTask)

router.route('/:taskId').put(updateTask)


export default router