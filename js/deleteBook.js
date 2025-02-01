async function deleteBook(bookId) {
    try {
        const response = await fetch(`${apiBase}books/${bookId}`, {
            method: "DELETE", // Fix: closing the string for "DELETE"
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error("도서 삭제 오류");
        }

        alert("도서가 삭제되었습니다."); // 책이 성공적으로 삭제되었음을 알리는 메시지
    } catch (error) {
        console.error("❌ 도서 삭제 오류:", error); // 오류 메시지를 콘솔에 출력
    }
}
