export default {
    async fetch(request, env) {
        if (request.method === "POST") {
            const { unit, militaryId, rank, name } = await request.json();
            const sheetId = env.SHEET_ID;
            const apiKey = env.API_KEY;
            const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/login!A:D?key=${apiKey}`;

            const sheetResponse = await fetch(url);
            const sheetData = await sheetResponse.json();
            const rows = sheetData.values.slice(1);

            const userExists = rows.some(row => row[0] === unit && row[1] === militaryId && row[2] === rank && row[3] === name);
            
            return new Response(JSON.stringify({ success: userExists }), {
                headers: { "Content-Type": "application/json" }
            });
        }
        return new Response("Invalid request", { status: 400 });
    }
};
