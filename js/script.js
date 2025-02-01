const apiBase = "https://army-library55.wofyf789.workers.dev/";

async function fetchBooks() {
    try {
        const tbody = document.getElementById("book-list");
        if (!tbody) {
            console.error("도서 목록을 표시할 요소를 찾을 수 없습니다.");
            return;
        }

        const response = await fetch(apiBase + "books");
        if (!response.ok) {
            throw new Error("서버 응답 오류");
        }
        const books = await response.json();

        tbody.innerHTML = "";
        books.forEach(book => {
            const row = `<tr>
                <td>${book.ID}</td>
                <td>${book.제목}</td>
                <td>${book.저자}</td>
                <td>${book.출판사}</td>
                <td>${book.ISBN}</td>
                <td>${book.대출_가능_여부}</td>
            </tr>`;
            tbody.innerHTML += row;
        });
    } catch (error) {
        console.error("도서 목록을 불러오는 중 오류 발생:", error);
    }
}
async function loadContent() {
    const header = document.getElementById("header");
    const content = document.getElementById("content");
    if (header && content) {
        const [headerHTML, contentHTML] = await Promise.all([
            fetch("/library-api-55/partials/header.html").then(res => res.text()),
            fetch("/library-api-55/partials/content.html").then(res => res.text())
        ]);
        header.innerHTML = headerHTML;
        content.innerHTML = contentHTML;
    }
}
