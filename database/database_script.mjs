const verifyInExcel = async (student_info) => {
    if (student_info.student_registration_number === '22MEI10039') {
       const result = 'Verified'
        return result
    } else {
       const result = 'Not Found'
        return result
    }
}

export{
    verifyInExcel
}