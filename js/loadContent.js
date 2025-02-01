async function loadContent() {
    const header = document.getElementById("header");
    const content = document.getElementById("content");

    if (header && content) {
        // 헤더와 콘텐츠를 비동기적으로 로드
        const [headerHTML, contentHTML] = await Promise.all([
            fetch("partials/header.html").then(res => res.text()),  // 헤더 부분
            fetch("home_content.html").then(res => res.text())     // 콘텐츠 부분
        ]);
        header.innerHTML = headerHTML;
        content.innerHTML = contentHTML;  // 도서 목록과 관리 섹션 로드
    }

    // 도서 목록 초기화
    setTimeout(fetchBooks, 500);  // 페이지가 로드된 후 500ms 딜레이
}

loadContent();  // 콘텐츠 로드 실행
