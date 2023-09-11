const express = require('express');
const app = express();

const PORT = process.env.PORT || 3030;

app.get('/api/auth/:student_registration_number/:student_name/:user_latitude/:user_longitude', async (req, res) => {
    try {
        console.log(req.params)
        const student_info = req.params
        const result = await verifyInExcel(student_info)
        res.json({ status: result });
    } catch (error) {
        console.error(`Error : ${error}`)
    }
})

app.get('/api/reporterror/:student_registration_number/:student_name/:ERR_MSG', async (req,res)=>{
    try {
        const student_info=req.params
        console.log(student_info)
    } catch (error) {
        console.error(error)
    }
})


const verifyInExcel = async (student_info) => {
    if (student_info.student_registration_number === '22MEI10039') {
        result = 'Verified'
        return result
    } else {
        result = 'Not Found'
        return result
    }
}

app.listen(3000,() => {
    console.log(`server started on port ${PORT}`);
    app.use(express.static('public'))
});