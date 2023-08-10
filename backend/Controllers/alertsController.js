const mongoose=require('mongoose')
const asyncHandler= require('express-async-handler')

const userAlerts=asyncHandler(async(req,res)=>{

    const from_date=req.params.id;
    const to_date=req.params.id2;

    const date1=new Date(new Date(from_date).toDateString());
    var nextDay=date1
    nextDay.setDate(nextDay.getDate());
    nextDay=nextDay.toISOString().split('T')[0]

    const date2=new Date(new Date(to_date).toDateString());
    var stopDay=date2
    stopDay.setDate(stopDay.getDate() + 1);
    stopDay=stopDay.toISOString().split('T')[0]

    const dateChanger=(dateString)=>{;

        const dateObject = new Date(dateString);

        const day = String(dateObject.getUTCDate()).padStart(2, "0");
        const month = String(dateObject.getUTCMonth() + 1).padStart(2, "0"); // Add +1 to the month
        const year = dateObject.getUTCFullYear();
        const hours = String(dateObject.getUTCHours()).padStart(2, "0");
        const minutes = String(dateObject.getUTCMinutes()).padStart(2, "0");
        const seconds = String(dateObject.getUTCSeconds()).padStart(2, "0");
        const milliseconds = String(dateObject.getUTCMilliseconds()).padStart(3, "0");

        const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}:${milliseconds}`;

        return formattedDate;

    }

    const result=[]

    while(nextDay!=stopDay)
    {
        const db = mongoose.connection.getClient();
        const collection = db.db().collection(nextDay);
        let data=[];
        const r = await collection.find({}).toArray().then((doc) => {
            data=doc;
            return data;  
        })

        if(r.length){
            r.map((item)=>{
                if(item.step_1_start_time){
                    var date=new Date(item.step_1_start_time*1000)
                    date=dateChanger(date)
                    item.step_1_start_time=date
                }
            
                if(item.step_2_start_time){
                    var date2=new Date(item.step_2_start_time*1000)
                    date2=dateChanger(date2)
                    item.step_2_start_time=date2
                }
                

                if(item.step_3_start_time){
                    var date3=new Date(item.step_3_start_time*1000)
                    date3=dateChanger(date3)
                    item.step_3_start_time=date3
                }
                
                if(item.step_4_start_time){
                    var date4=new Date(item.step_4_start_time*1000)
                    date4=dateChanger(date4)
                    item.step_4_start_time=date4
                }
                
                if(item.step_5_start_time){
                    var date5=new Date(item.step_5_start_time*1000)
                    date5=dateChanger(date5)
                    item.step_5_start_time=date5
                }

                if(item.step_6_start_time){
                    var date6=new Date(item.step_6_start_time*1000)
                    date6=dateChanger(date6)
                    item.step_6_start_time=date6
                }
                if(item.step_7_start_time){
                    var date7=new Date(item.step_7_start_time*1000)
                    date7=dateChanger(date7)
                    item.step_7_start_time=date7
                }
                if(item.step_8_start_time){
                    var date8=new Date(item.step_8_start_time*1000)
                    date8=dateChanger(date8)
                    item.step_8_start_time=date8
                }

                if(item.start_timestamp){
                    var datestart=new Date(item.start_timestamp*1000)
                    datestart=dateChanger(datestart)
                    item.start_timestamp=datestart
                }
                if(item.end_timestamp){
                    var dateend=new Date(item.end_timestamp*1000)
                    dateend=dateChanger(dateend)
                    item.end_timestamp=dateend
                }
                result.push(item)
                
            })
        }
        var nextDay = new Date(nextDay);
        nextDay.setDate(nextDay.getDate() + 1);
        nextDay=nextDay.toISOString().split('T')[0]
    } 

    if(result){
        res.json(result)
    }
    else{
        res.json([])
    }
    

})

module.exports={
    userAlerts
}