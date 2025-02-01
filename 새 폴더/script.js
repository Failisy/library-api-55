const apiBase = "https://army-library55.wofyf789.workers.dev/";

document.getElementById("login-form").addEventListener("submit", async function(event) {
    event.preventDefault();
    alert("�α��� ����� �� �߰��˴ϴ�!");
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
                <td>${book.����}</td>
                <td>${book.����}</td>
                <td>${book.���ǻ�}</td>
                <td>${book.ISBN}</td>
                <td>${book.����_����_����}</td>
            </tr>`;
            tbody.innerHTML += row;
        });
    } catch (error) {
        console.error("���� ����� �ҷ����� �� ���� �߻�:", error);
    }
}
fetchBooks();