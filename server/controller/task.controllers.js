import Task from "../models/task.models.js"
import { asyncHandler } from "../utils/asyncHandler.utils.js"

const createTask = asyncHandler(async(req,res)=>{
    const {UserName,Age,Profession,Wake,Sleep,usualTasks,enjoyableActivities} = req.body

    const task = await Task.create({
    UserName , 
    Age, 
    Profession, 
    Wake, 
    Sleep, 
    usualTasks,
    enjoyableActivities  
}
)

    return res.status(201).json(task)
}) 

const updateTask = asyncHandler(async(req,res)=>{

})
export{ createTask,updateTask}