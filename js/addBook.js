document.getElementById("add-book-form").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const title = document.getElementById("book-title").value;
    const author = document.getElementById("book-author").value;
    const publisher = document.getElementById("book-publisher").value;
    const isbn = document.getElementById("book-isbn").value;

    addBook(title, author, publisher, isbn);
});

async function addBook(title, author, publisher, isbn) {
    try {
        const response = await fetch(`${apiBase}books`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, author, publisher, isbn })
        });

        if (!response.ok) {
            throw new Error("도서 추가 오류");
        }

        alert("도서가 추가되었습니다.");
    } catch (error) {
        console.error("❌ 도서 추가 오류:", error);
    }
}
