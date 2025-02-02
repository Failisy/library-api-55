document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault();

    let militaryId = document.getElementById("military-id-login").value;
    let password = document.getElementById("password-login").value;

    // 기존 CSV 파일에서 사용자 정보 가져오기
    fetch('path/to/your/users.csv')
        .then(response => response.text())
        .then(csv => {
            let data = Papa.parse(csv, {header: true, skipEmptyLines: true}).data;
            let user = data.find(user => user.militaryId === militaryId && user.password === password);

            if (user) {
                alert("Login successful");
                // 로그인 성공 시 도서 관리 페이지로 리다이렉트
                window.location.href = "book-management.html";
            } else {
                alert("Invalid login credentials");
            }
        });
});
