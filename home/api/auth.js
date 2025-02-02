const { google } = require('googleapis');

async function authenticate() {
    const auth = new google.auth.GoogleAuth({
        credentials: {
            client_email: process.env.GOOGLE_CLIENT_EMAIL,
            private_key: process.env.GOOGLE_PRIVATE_KEY,
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
        spreadsheetId: process.env.SHEET_ID,
        range: 'login!A:D', // A, B, C, D 열에 로그인 정보
    });

    const rows = response.data.values;
    const userExists = rows.some(row => row[0] === unit && row[1] === militaryId && row[2] === rank && row[3] === name);

    if (userExists) {
        res.status(200).json({ success: true });
    } else {
        res.status(400).json({ success: false });
    }
}

module.exports = { checkUser };
