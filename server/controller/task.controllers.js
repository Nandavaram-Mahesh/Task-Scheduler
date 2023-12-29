import Task from "../models/task.models.js"
import { asyncHandler } from "../utils/asyncHandler.utils.js"
import { addTimes, formatTimeToMinutes, getTimeDifference } from "../utils/helpers.js"

const createTask = asyncHandler(async(req,res)=>{
    const {UserId, UserName,Age,Profession,Wake,Sleep,usualTasks,enjoyableActivities} = req.body

    const task = await Task.create({
    UserId,
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

const getTaskById = asyncHandler(async (req,res)=>{
    const {taskId} = req.params
    //const task = await Task.findById(taskId)
    const task = await Task.findOne({ UserId: taskId })
    if(!task){
        throw new Error
    }
    return res.status(200).json(task)
})





  //returns true if time1 is smaller or equal
  function compareTimes(time1, time2) {

        const [minutes1,minutes2]= formatTimeToMinutes(time1,time2)
        // Compare the two times
        return  minutes1 <= minutes2 
    
    }
  
function getRoutine(routine){
     //     "usualTasks": {
    //     "Breakfast": { "startTime": "9:00", "duration": "1:30" },
    //     "Lunch": { "startTime": "13:00", "duration": "1:30" },
    //     "Snack": { "startTime": "15:30", "duration": "0:30" },
    //     "Dinner": { "startTime": "20:30", "duration": "1:00" }
        
    //      }

    let schedule = []
    for (const taskNames of routine.entries()) {
        
        let duration = [taskNames[1][0]['startTime'], addTimes(taskNames[1][0]['startTime'], taskNames[1][0]['duration'])];
      

        schedule.push([[taskNames[0]], duration]);

    }
    return schedule

} 

function arrangeTasks(Tasks){
    let toSchedule = []

    for (const value in Tasks){
            //console.log(Tasks[value])
            let dailyTask = Object.keys(Tasks[value])[0]
            let approxTime = Object.values(Tasks[value])[0]['Time']
            toSchedule.push([dailyTask, approxTime])   
    }

    return toSchedule

}

function getTimeSlots(startTime, stopTime, schedule){

    let gap = []
    let endTime = startTime
    for (const val in schedule){
        //console.log(schedule[val])
        gap.push(getTimeDifference(endTime, schedule[val][1][0]))
        endTime = schedule[val][1][1]
    }

    gap.push(getTimeDifference(endTime, stopTime));
    return gap

}

const getSchedule = asyncHandler(async (req,res)=>{

    // "Tasks": [{``
    //     "Coding": {
    //         "Time": "2:00",
    //         "Difficulty": "1",
    //         "Priority": "1"
    //     }
    // }]

    const {UserId, Tasks} = req.body
    const task = await Task.findOne({ UserId: UserId })
    
    if(!task){
        return res.status(200).json({"Response":"Nope, cannot get user"})
    }

    // {
    //     "UserId": "10",
    //     "UserName":"Clauds",
    //     "Age": "23",
    //     "Profession": "Student",
    //     "Wake": "7:00",
    //     "Sleep": "23:00",
    //     "usualTasks": {
    //     "Breakfast": { "startTime": "9:00", "duration": "1:30" },
    //     "Lunch": { "startTime": "13:00", "duration": "1:30" },
    //     "Snack": { "startTime": "15:30", "duration": "0:30" },
    //     "Dinner": { "startTime": "20:30", "duration": "1:00" }
        
    //      }

    const startTime = task.Wake
    const stopTime = task.Sleep
    const routine = task.usualTasks
    
    let schedule = getRoutine(routine)
    let toSchedule = arrangeTasks(Tasks)
    let timeSlots = getTimeSlots(startTime, stopTime, schedule)

    console.log('The usual routine: ',toSchedule)
    console.log('The schedule to be added for the day: ',schedule)
    console.log('Timeslots available: ',timeSlots)
    
    
    
        //console.log(schedule[val])
        for(let i = 0; toSchedule.length > 0; i++){
        for (let vale in timeSlots){
            
            if(compareTimes(toSchedule[i][1],timeSlots[vale])){

                let toAdd = [[toSchedule[i][0]], [schedule[vale][1][1], addTimes(schedule[vale][1][1],toSchedule[i][1])] ]
                let mark = Number(vale) + 1
                schedule.splice( mark, 0, toAdd);
                toSchedule = toSchedule.filter(element => element !== toSchedule[i]);
                //console.log(toSchedule)
                //console.log(schedule)
                timeSlots = getTimeSlots(startTime, stopTime, schedule)
            }

            if(toSchedule.length == 0){break;}
        }
    }
    console.log('Daily Schedule',schedule)
    return res.status(200).json({"Response": schedule})
})



// const updateTask = asyncHandler(async(req,res)=>{
//     const {} = req.body
// })


export{ createTask,getTaskById, getSchedule}