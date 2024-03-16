const express=require("express");

const app=express();

app.use(express.json());

const userInfo=[{
    name:"Tanmay",
    kidney:[{
        healthy: false
    }]
}]

//Get details regarding a Patient
app.get("/Patient/:name",(req,res)=>{
    
    const patientName=req.params.name;
    let userIndex=-1;
    for(let i=0;i<userInfo.length;i=i+1){
        if(userInfo[i].name===patientName){
            userIndex=i;
            break;
        }
    }

    if(userIndex==-1){
        return res.send("Name Not found");
    }

    const usersKidney=userInfo[userIndex].kidney;  //Use userIndex in place of 0
    let noOfHealthyKidneys=0;
    const totalKidney=usersKidney.length;
    for(let i=0;i<usersKidney.length;i=i+1){
        if(usersKidney[i].healthy){
            noOfHealthyKidneys++;
        }
    }

    let noofUnhealthyKidney=usersKidney.length-noOfHealthyKidneys;

    res.json({
        totalKidney,
        noOfHealthyKidneys,
        noofUnhealthyKidney
    })
})


app.post("/add",(req,res)=>{
    const patientName=req.body.name;
    const kidneyHealth=req.body.healthy;

    let userIndex=-1;
    for(let i=0;i<userInfo.length;i=i+1){
        if(userInfo[i].name===patientName){
            userIndex=i;
            break;
        }
    }

    if(userIndex==-1){
        const newPatient={
            name:patientName,
            kidney:[{
                healthy: kidneyHealth
            }]
        }
        userInfo.push(newPatient);
        res.send("Patient added");
    }else{
        const newKidney={
            healthy:kidneyHealth
        }
        userInfo[userIndex].kidney.push(newKidney); 
        res.send(`Kidney added for ${patientName}`);
    }

});

app.put("/replace",(req,res)=>{
    const patientName=req.body.name;
    let userIndex=-1;
    for(let i=0;i<userInfo.length;i=i+1){
        if(userInfo[i].name===patientName){
            userIndex=i;
            break;
        }
    }

    if(userIndex==-1){
        res.send("Name Not found");
    }else{
        for(let i=0;i<userInfo[userIndex].kidney.length;i=i+1){
            userInfo[userIndex].kidney[i].healthy=true;
        }
        res.send("Kidneys are Healthy");
    }

});


app.delete("/removeKidney",(req,res)=>{
    const patientName=req.body.name;
    let userIndex=-1;
    for(let i=0;i<userInfo.length;i=i+1){
        if(userInfo[i].name===patientName){
            userIndex=i;
            break;
        }
    }

    if(userIndex==-1){
        res.send("No Patient of this name");
    }else{
        const newKidney=[];
        for(let i=0;i<userInfo[userIndex].kidney.length;i=i+1){
            if(userInfo[userIndex].kidney[i].healthy){
                newKidney.push({
                    healthy: true
                })
            }
        }
        userInfo[userIndex].kidney=newKidney;
        res.send("Unhealthy kidney deleted");
    }
});



app.listen(3000);

