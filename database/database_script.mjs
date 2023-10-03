import { GoogleAuth } from 'google-auth-library';
import { google } from 'googleapis';
import dotenv from 'dotenv';
dotenv.config();
const private_key = process.env.private_key.replace(/\\n/g, '\n');
const client_email = process.env.client_email;
const auth = new GoogleAuth({
    credentials: {
        client_email: client_email,
        private_key: private_key,
    },
    projectId: 'od-automate-2023',
    scopes: 'https://www.googleapis.com/auth/spreadsheets',
});

const spreadsheetId = '1nu-5fZcSPeKc-_LcomS0VceHji2msiGNXd_AU_xkEmM';
const range = 'C:C';

const getDataFromSheet = async () => {
    const service = google.sheets({ version: 'v4', auth });
    try {
        const result = await service.spreadsheets.values.get({
            spreadsheetId,
            range,
        });
        const retrivedData = result.data.values;
        return retrivedData;
    } catch (err) {
        throw err;
    }
}
const verifyInExcel = async (student_info) => {
    const retrivedData = await getDataFromSheet();
    for (let index = 1; index < retrivedData.length; index++) {
        if (retrivedData[index][0] === student_info.student_registration_number) {
            const result = 'Verified';
            return result;
        }
    }
    const result = 'Not Found';
    return result;
}

export {
    verifyInExcel
}