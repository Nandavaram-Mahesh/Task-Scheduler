import mongoose, { Schema } from "mongoose";

// import aggregatePaginate  from 'mongoose-aggregate-paginate-v2';

const TaskSchema = new Schema(
{
    UserId: {
        type:String,
    },
    CreatedDate: {
        type: Date,
        default: Date.now
    },
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
        type: Map,
        of: [ 
            { startTime: { type: String }, duration: { type: String } }
    ]}
        ,
    enjoyableActivities: {
        type: [
          { type: String }
        ]
      }
}
)

// TaskSchema.plugin(aggregatePaginate);

const Task = mongoose.model('Task', TaskSchema);

export default Task;