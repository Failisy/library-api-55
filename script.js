const apiBase = "https://army-library55.wofyf789.workers.dev/";

document.getElementById("login-form").addEventListener("submit", async function(event) {
    event.preventDefault();

    // 로그인 성공 처리 (단순한 예제)
    document.getElementById("login").style.display = "none";
    document.getElementById("main-content").style.display = "block";
});

async function fetchBooks() {
    try {
        const response = await fetch(apiBase + "books");
        const books = await response.json();
        
        const tbody = document.querySelector("#book-table tbody");
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

fetchBooks();
