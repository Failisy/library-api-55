async function returnBook(bookId) {
    try {
        const response = await fetch(`${apiBase}books/return/${bookId}`, {
            method: "POST",
        });
        if (!response.ok) {
            throw new Error("반납 처리 오류");
        }
        alert("도서 반납이 완료되었습니다.");
    } catch (error) {
        console.error("❌ 반납 처리 오류:", error);
    }
}
