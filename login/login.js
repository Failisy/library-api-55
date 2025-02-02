// login.js
document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const unit = document.getElementById('unit').value;
    const militaryId = document.getElementById('military-id').value;
    const rank = document.getElementById('rank').value;
    const name = document.getElementById('name').value;

    // 로그인 정보 객체
    const loginData = {
        unit: unit,
        militaryId: militaryId,
        rank: rank,
        name: name
    };

    // Google Apps Script API 호출
    fetch('https://script.google.com/macros/s/AKfycbxY42riSqMamZuhsYa7E-VzUlnTPyKFgd25caG_B5gl6M4M9pMiuUblwy3M4DNXTRLgjwL/exec', {
        method: 'POST',
        body: JSON.stringify(loginData),
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors' // CORS 모드 활성화
    })
    .then(response => response.text())
    .then(data => {
        if (data === '로그인 성공') {
            alert('로그인 성공!');
            // 로그인 성공 후 페이지 이동 또는 추가 처리
        } else {
            alert('로그인 실패!');
        }
    })
    .catch(error => console.error('Error:', error));
});
