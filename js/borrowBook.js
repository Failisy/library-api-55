async function borrowBook(bookId) {
    try {
        const response = await fetch(`${apiBase}books/borrow/${bookId}`, {
            method: "POST",
        });
        if (!response.ok) {
            throw new Error("대출 처리 오류");
        }
        alert("도서 대출이 완료되었습니다.");
    } catch (error) {
        console.error("❌ 대출 처리 오류:", error);
    }
}
