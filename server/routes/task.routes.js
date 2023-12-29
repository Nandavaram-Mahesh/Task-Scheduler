import { Router } from "express";
import { createTask, getTaskById, getSchedule } from "../controller/task.controllers.js";


const router = Router()


router.route('/').post(createTask)

router.route('/:taskId').get(getTaskById)

router.route('/schedule/').post(getSchedule)


export default router