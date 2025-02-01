async function editBook(bookId, title, author, publisher, isbn) {
    try {
        const response = await fetch(`${apiBase}books/${bookId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, author, publisher, isbn })
        });

        if (!response.ok) {
            throw new Error("도서 수정 오류");
        }

        alert("도서 정보가 수정되었습니다.");
    } catch (error) {
        console.error("❌ 도서 수정 오류:", error);
    }
}
