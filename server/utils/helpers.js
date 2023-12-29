
export function formatTimeToMinutes(time1, time2){

    const [hour1, minute1] = time1.split(':').map(Number);
    const [hour2, minute2] = time2.split(':').map(Number);
  
    // Convert times to minutes
    const minutes1 = hour1 * 60 + minute1;
    const minutes2 = hour2 * 60 + minute2;

    return [minutes1,minutes2]  
}

export function addTimes(time1, time2) {

    const [minutes1,minutes2] = formatTimeToMinutes(time1,time2)
    const totalMinutes = minutes1+minutes2
    // Calculate the new hour and minute values
    const newHour = Math.floor(totalMinutes / 60);
    const newMinute = totalMinutes % 60;
  
    // Format the result as "hh:mm"
    const result = `${String(newHour).padStart(2, '0')}:${String(newMinute).padStart(2, '0')}`;
  
    return result;
}



export function getTimeDifference(time1, time2) {
   
    const [minutes1,minutes2] = formatTimeToMinutes(time1,time2)
    // Calculate the time difference in minutes
    const differenceInMinutes = Math.abs(minutes2 - minutes1);
  
    // Convert the difference back to hours and minutes
    const hours = Math.floor(differenceInMinutes / 60);
    const remainingMinutes = differenceInMinutes % 60;
  
    // Format the result in "hh:mm"
    const formattedDifference = `${String(hours).padStart(2, '0')}:${String(remainingMinutes).padStart(2, '0')}`;
  
    return formattedDifference;
  }