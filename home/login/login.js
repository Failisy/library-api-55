document.getElementById("login-form").addEventListener("submit", async function(event) {
    event.preventDefault();

    const unit = document.getElementById("unit").value;
    const militaryId = document.getElementById("militaryId").value;
    const rank = document.getElementById("rank").value;
    const name = document.getElementById("name").value;

    const response = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ unit, militaryId, rank, name })
    });

    const result = await response.json();
    if (result.success) {
        localStorage.setItem("user", JSON.stringify({ unit, militaryId, rank, name }));
        window.location.href = "../dashboard/index.html";
    } else {
        document.getElementById("login-status").textContent = "로그인 실패: 정보를 확인하세요.";
    }
});
