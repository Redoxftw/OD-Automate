const express =require('express');
const app = express();

app.listen(3000,()=>{
    console.log('Server is active')
})
app.use(express.static('public'))


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