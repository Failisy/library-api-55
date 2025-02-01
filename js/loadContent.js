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

    // DOM이 완전히 로드된 후, 도서 목록을 불러옴
    document.addEventListener('DOMContentLoaded', () => {
        const searchInput = document.getElementById('search');
        if (searchInput) {
            searchInput.addEventListener('input', function() {
                const query = this.value;
                searchBooks(query);
            });
        }

        const addBookForm = document.getElementById('add-book-form');
        if (addBookForm) {
            addBookForm.addEventListener('submit', function(event) {
                event.preventDefault();
                addBook();
            });
        }
    });
}

loadContent();  // 콘텐츠 로드 실행
