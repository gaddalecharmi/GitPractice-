const express = require("express");
const app=express();
app.use(express.json());
const port=3000;
let  students=[
{id:1,studentName:"Charmi",totalMarks:100},
{id:2,studentName:"Riya",totalMarks:90},
{id:3,studentName:"Riya",totalMarks:80},
];
//get request
app.get("/students",(req,res)=>{
        console.log("GET: Fetching all students");
res.status(200).json(students);
});
//get by id
app.get("/students/:id",(req,res)=>{
const id=Number(req.params.id);
const student=students.find(s=>s.id===id);
if(!student){
    res.status(404).json({
        message:"Student Not found"
    });
}
else{
    res.status(200).json(student);
}
});
//post request
app.post("/students",(req,res)=>{
    const {id,studentName,totalMarks}=req.body;
    if(!Number.isInteger(id)||typeof studentName!=="string"||!Number.isInteger(totalMarks)){
        res.status(400).json({
            message:"Invalid data types"
        });
    }
   if(students.some(s=>s.id===id)){
        res.status(400).json({
            message:"Student with this id already exists"
        });
    }
    const newStudent={id,studentName,totalMarks};
    students.push(newStudent);
    res.status(201).json(newStudent);
});
//put request 
app.put("/students/:id",(req,res)=>{
    const id=Number(req.params.id);
    const student=students.find(s=>s.id===id);
    const {studentName,totalMarks}=req.body;
    if(!student){
        res.status(404).json({
            message:"Student Not found"
        });
    }
    if(typeof studentName!=="string"||!Number.isInteger(totalMarks)){
        res.status(400).json({
            message:"Invalid data types"
        });
    }
    student.studentName=studentName;
    student.totalMarks=totalMarks;
    res.status(200).json({
        message:"Student updated successfully"
    });
});
//delete request
app.delete("/students/:id",(req,res)=>{
    const id=Number(req.params.id);
    const studentIndex=students.findIndex(s=>s.id===id);
    if(studentIndex===-1){
        res.status(404).json({
            message:"Student Not found"
        });
    }
    students.splice(studentIndex,1);
    res.status(200).json({
        message:"Student deleted successfully"
    });
});
const client = require('prom-client');

// Collect default Node.js metrics
client.collectDefaultMetrics();

// Create metrics endpoint
app.get('/metrics', async (req, res) => {
    res.set('Content-Type', client.register.contentType);

    res.end(await client.register.metrics());
});
app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
});