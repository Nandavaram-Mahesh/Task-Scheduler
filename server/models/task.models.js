import mongoose, { Schema } from "mongoose";

const TaskSchema = new Schema(
{
    UserName: {
        type:String,
    }, 
    Age: {
        type:String
    }, 
    Profession:{
        type:String
    } , 
    Wake: {
        type:String
    }, 
    Sleep: {
        type:String
    }, 
    usualTasks: {
        type:Map,
        of:[
            { startTime: { type: String }, duration: { type: String } }
          ]
    },
    enjoyableActivities: {
        type: [
          { type: String }
        ]
      }
}
)


const Task = mongoose.model('Task', TaskSchema);

export default Task;