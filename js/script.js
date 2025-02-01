const apiBase = "https://army-library55.wofyf789.workers.dev/";

async function fetchBooks() {
    try {
        const tbody = document.getElementById("book-list");
        if (!tbody) {
            console.error("❌ 도서 목록을 표시할 요소를 찾을 수 없습니다.");
            return;
        }

        const response = await fetch(apiBase + "books");
        if (!response.ok) {
            throw new Error("서버 응답 오류");
        }
        
        const data = await response.json();
        console.log(data); // ✅ API 응답 확인
        
        // books가 배열인지 확인
        const books = Array.isArray(data) ? data : data.books; // 배열로 변환하거나 데이터 구조 처리
        
        // 배열이 아닌 경우 예외 처리
        if (!Array.isArray(books)) {
            throw new Error("도서 목록을 불러오는 중 오류 발생: books 데이터가 배열이 아닙니다.");
        }

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
        console.error("❌ 도서 목록을 불러오는 중 오류 발생:", error);
    }
}
