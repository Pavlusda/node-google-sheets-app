const { google } = require('googleapis');
const keys = require('./keys.json');

const client = new google.auth.JWT(
    keys.client_email,
    null,
    keys.private_key,
    ['https://www.googleapis.com/auth/spreadsheets'],

);

client.authorize(function(err, token){
    if(err) {
        console.log(err);
        return;
    } else {
        console.log('connected!');
        gsrun(client);
    }
});

async function gsrun(cl){
    const gsapi = google.sheets({version:'v4', auth: cl});

    const updateOptions = {
        spreadsheetId: '1Z2raBzc3zgcRd88rlnAcqYGlETHpuFNAaNzspSjjn2A',
        range: 'A3',
        valueInputOption: 'RAW',
        resource: {
            values: [['Woooo!']]
        }
    };

    const getOptions = {
        spreadsheetId: '1lZfSPEvx-xb_qq7XZnqCSw2zEx0zNzggZql8f4GWRI4',
        range: 'Form Responses 1!B2:O3'
    };

    let dataResponse = await gsapi.spreadsheets.values.get(getOptions);
    dataArray = dataResponse.data.values;
    console.log(dataArray);
};