// login.js
document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const unit = document.getElementById('unit').value;
    const militaryId = document.getElementById('military-id').value;
    const rank = document.getElementById('rank').value;
    const name = document.getElementById('name').value;

    // API 호출에 필요한 구글 스프레드시트 ID와 API 키
    const sheetId = '1cdECKnvPoVWmvw36BDEp5JeIRHKXRaGHeaqqWWRB9Ow'; // 구글 스프레드시트 ID
    const apiKey = 'AIzaSyBPu53tOzSynITOGZeoFTe1Q81DGDilAPc'; // 구글 API 키

    // 구글 Sheets API URL
    const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/로그인?key=${apiKey}`;

    // 로그인 정보 객체
    const loginData = {
        unit: unit,
        militaryId: militaryId,
        rank: rank,
        name: name
    };

    // 구글 스프레드시트 데이터 요청
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const rows = data.values;
            let loginSuccess = false;

            // 스프레드시트 데이터에서 로그인 정보 확인
            for (let i = 1; i < rows.length; i++) {
                const row = rows[i];
                if (row[0] === loginData.unit && row[1] === loginData.militaryId && row[2] === loginData.rank && row[3] === loginData.name) {
                    loginSuccess = true;
                    break;
                }
            }

            if (loginSuccess) {
                alert('로그인 성공!');
                // 로그인 성공 후 페이지 이동 또는 추가 처리
            } else {
                alert('로그인 실패!');
            }
        })
        .catch(error => console.error('Error:', error));
});
