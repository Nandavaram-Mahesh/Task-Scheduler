import mongoose, { Schema } from "mongoose";

// import aggregatePaginate  from 'mongoose-aggregate-paginate-v2';

const DailyScheduleSchema = new Schema(
{
    UserId: {
        type:String,
    },
    CreatedDate: {
        type: Date,
        default: Date.now
    },
    DailyTasks: {
        type:Map,
        of:[
            { startTime: { type: String }, duration: { type: String } }
            //{ approximateTime: { type: String }, difficultyLevel: { type: String } , priority:{type:String} }
          ]
    }
}
)

// TaskSchema.plugin(aggregatePaginate);

const DailyTask = mongoose.model('DailyTasks', TaskSchema);

export default Task;