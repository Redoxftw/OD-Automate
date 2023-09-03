const express =require('express');
const app = express();

const PORT = process.env.PORT || 3030;

// your code



app.get('/api/olduser/auth/:registration_number/:student_name/:latitude/:longitude',async (req,res)=>{
    try {
        console.log(req.params)
        const student_info=req.params
        const result=await verifyInExcel(student_info)
        res.json({status:result});
    } catch (error) {
        
    }
})

const verifyInExcel= async(student_info)=>{
    if (student_info.registration_number==='22MEI10039') {
        result ='Verified'
        return result
    }else{
        result ='Not Found'
        return result
    }
}

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
  app.use(express.static('public'))
});