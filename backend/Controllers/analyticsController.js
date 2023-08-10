const mongoose= require('mongoose')
const asyncHandler= require('express-async-handler')

const piechat= asyncHandler(async(req,res)=>{
    const startdate=req.params.startdate
    const enddate=req.params.enddate

    const piechat=[
        {
            "id": "Completed",
            "label": "Completed",
            "value": 0,
            "color": "hsl(236, 70%, 50%)"
        },
        {
            "id": "Incomplete",
            "label": "Incomplete",
            "value": 0,
            "color": "hsl(241, 70%, 50%)"
        }
        // {
        //     "id": "Started",
        //     "label": "Started",
        //     "value": 0,
        //     "color": "hsl(316, 70%, 50%)"
        // }

    ]
    

    const date1=new Date(new Date(startdate).toDateString());
    var nextDay=date1
    nextDay.setDate(nextDay.getDate() );
    nextDay=nextDay.toISOString().split('T')[0]

    const date2=new Date(new Date(enddate).toDateString());
    var stopDay=date2
    stopDay.setDate(stopDay.getDate() + 1);
    stopDay=stopDay.toISOString().split('T')[0]

    while(nextDay!=stopDay)
    {
        const db = mongoose.connection.getClient();
        const collection = db.db().collection(nextDay);
       
        let data=[];
        const r = await collection.find({}).toArray().then((doc) => {
            data=doc;
            return data;  
        })
      
        r.map((objects)=>{
            
            if(objects.status=="completed"){
                piechat[0].value=piechat[0].value+1
            }
            if(objects.status=="incomplete" || objects.status == "started" || objects.status == '' || (objects.status).length ==0)
            {
                piechat[1].value=piechat[1].value+1
            }
           
        })

        var nextDay = new Date(nextDay);
        nextDay.setDate(nextDay.getDate() + 1);
        nextDay=nextDay.toISOString().split('T')[0]
    }


        
    res.json(piechat)
})

function formatDateToReverse(dateString) {
    const [year, month, day] = dateString.split('-');
  
    const formattedDate = `${day}-${month}-${year}`;
  
    return formattedDate;
  }
const bargraph= asyncHandler(async(req,res)=>{
    const startdate=req.params.startdate
    const enddate=req.params.enddate

    const bar_data=[]


    const date1=new Date(new Date(startdate).toDateString());
    var nextDay=date1
    nextDay.setDate(nextDay.getDate());
    nextDay=nextDay.toISOString().split('T')[0]

    const date2=new Date(new Date(enddate).toDateString());
    var stopDay=date2
    stopDay.setDate(stopDay.getDate() + 1);
    stopDay=stopDay.toISOString().split('T')[0]

    while(nextDay!=stopDay && nextDay<=stopDay)
    {
        var x=0,y=0;

        const db = mongoose.connection.getClient();
        const collection = db.db().collection(nextDay);
        let data=[];

        const r = await collection.find({}).toArray().then((doc) => {
            data=doc;
        
            return data;  
        })

        r.map((objects)=>{
            
            if(objects.status=="completed"){
               
                x=x+1
            }
            if(objects.status=="incomplete" || objects.status == "started" || objects.status == '' || (objects.status).length ==0)
            {
               
                y=y+1
            }
          
        })
        
        const reversedDateStr = nextDay.split("-").reverse().join("-");
       
        bar_data.push(
            {
                "id": reversedDateStr,
                "Completed": x,
                "Incomplete": y,
            }
        )

        var nextDay = new Date(nextDay);
        nextDay.setDate(nextDay.getDate() + 1);
        nextDay=nextDay.toISOString().split('T')[0]
    }

   
    res.json(bar_data)
})

module.exports={
    piechat,
    bargraph
}