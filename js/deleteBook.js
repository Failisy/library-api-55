async function deleteBook(bookId) {
    try {
        const response = await fetch(`${apiBase}books/${bookId}`, {
            method: "DELETE", // DELETE 요청 수정
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error("도서 삭제 오류");
        }

        alert("도서가 삭제되었습니다."); // 성공 메시지
    } catch (error) {
        console.error("❌ 도서 삭제 오류:", error); // 오류 처리
    }
}
