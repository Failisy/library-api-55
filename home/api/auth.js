const { google } = require('googleapis');

async function authenticate() {
    const auth = new google.auth.GoogleAuth({
        credentials: {
            client_email: process.env.GOOGLE_CLIENT_EMAIL,  // GitHub Secrets에 저장된 값
            private_key: process.env.GOOGLE_PRIVATE_KEY,    // GitHub Secrets에 저장된 값
        },
        scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const client = await auth.getClient();
    return google.sheets({ version: 'v4', auth: client });
}

async function checkUser(req, res) {
    const { unit, militaryId, rank, name } = req.body;

    const sheets = await authenticate();
    const response = await sheets.spreadsheets.values.get({
        spreadsheetId: process.env.SHEET_ID,   // Google Sheets ID
        range: 'login!A:D',                    // 로그인 데이터가 있는 시트 범위
    });

    const rows = response.data.values;  // 시트에서 받은 데이터
    const userExists = rows.some(row => 
        row[0] === unit && row[1] === militaryId && row[2] === rank && row[3] === name
    );

    if (userExists) {
        res.status(200).json({ success: true });
    } else {
        res.status(400).json({ success: false });
    }
}

module.exports = { checkUser };
