const apiBase = "https://army-library55.wofyf789.workers.dev/";

document.addEventListener("DOMContentLoaded", () => {
    fetchBooks();
});

document.getElementById("login-form")?.addEventListener("submit", function(event) {
    event.preventDefault();
    window.location.href = "home.html";
});

async function fetchBooks() {
    try {
        const response = await fetch(apiBase + "books");
        if (!response.ok) {
            throw new Error("서버 응답 오류");
        }
        const books = await response.json();
        
        const tbody = document.getElementById("book-list");
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
