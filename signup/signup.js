document.getElementById('signup-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const unit = document.getElementById('unit').value;
    const militaryId = document.getElementById('military-id').value;
    const rank = document.getElementById('rank').value;
    const name = document.getElementById('name').value;

    const sheetId = 'YOUR_SPREADSHEET_ID'; // 구글 스프레드시트 ID
    const apiKey = 'YOUR_API_KEY'; // 구글 API 키

    // 구글 Sheets API URL
    const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/회원가입!A1:D1:append?key=${apiKey}`;

    // 추가할 데이터
    const newRow = {
        values: [
            [unit, militaryId, rank, name]
        ]
    };

    // 데이터 추가 요청
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newRow)
    })
    .then(response => response.json())
    .then(data => {
        if (data.updates.updatedCells > 0) {
            alert('회원가입 성공!');
            // 회원가입 후 페이지 이동 또는 다른 처리를 추가할 수 있습니다.
        } else {
            alert('회원가입 실패!');
        }
    })
    .catch(error => console.error('Error:', error));
});
