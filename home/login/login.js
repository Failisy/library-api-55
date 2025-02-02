document.getElementById("login-form").addEventListener("submit", async function(event) {
    event.preventDefault();  // 기본 폼 제출 동작 방지

    const unit = document.getElementById("unit").value;
    const militaryId = document.getElementById("militaryId").value;
    const rank = document.getElementById("rank").value;
    const name = document.getElementById("name").value;

    // 서버로 로그인 정보 전송
    const response = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ unit, militaryId, rank, name })
    });

    const result = await response.json();

    if (result.success) {
        // 로그인 성공 시 사용자 정보 저장 후 대시보드로 이동
        localStorage.setItem("user", JSON.stringify({ unit, militaryId, rank, name }));
        window.location.href = "../dashboard/index.html";  // 대시보드로 이동
    } else {
        document.getElementById("login-status").textContent = "로그인 실패: 정보를 확인하세요.";
    }
});
