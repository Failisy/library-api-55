document.getElementById("search").addEventListener("input", function() {
    const query = this.value;
    searchBooks(query);
});

async function searchBooks(query) {
    try {
        const response = await fetch(`${apiBase}books/search?q=${query}`);
        if (!response.ok) {
            throw new Error("검색 결과를 불러오는 중 오류 발생");
        }

        const data = await response.json();
        const books = Array.isArray(data) ? data : data.books;

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
        console.error("❌ 도서 검색 오류:", error);
    }
}
