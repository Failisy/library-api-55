// login.js
document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const unit = document.getElementById('unit').value;
    const militaryId = document.getElementById('military-id').value;
    const rank = document.getElementById('rank').value;
    const name = document.getElementById('name').value;

    // 여기에 구글 스프레드시트 API와 연동하는 코드가 들어갑니다.
    // 예시로, 로그인 정보를 콘솔에 출력:
    console.log(`부대: ${unit}, 군번: ${militaryId}, 계급: ${rank}, 성명: ${name}`);

    // 로그인 API 호출 (구글 스프레드시트 연동)
    // 예를 들어, fetch()를 사용하여 스프레드시트에 요청을 보내고, 유효성을 검사할 수 있습니다.
});
