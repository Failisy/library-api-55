const apiBase = "https://army-library55.wofyf789.workers.dev/";

let currentPage = 1;
const itemsPerPage = 10; // 한 페이지에 표시할 도서 수

async function fetchBooks(page = 1) {
    try {
        const tbody = document.getElementById("book-list");
        if (!tbody) {
            console.error("❌ 도서 목록을 표시할 요소를 찾을 수 없습니다.");
            return;
        }

        const response = await fetch(`${apiBase}books?page=${page}&limit=${itemsPerPage}`);
        if (!response.ok) {
            throw new Error("서버 응답 오류");
        }

        const data = await response.json();
        const books = Array.isArray(data) ? data : data.books; // 배열로 변환하거나 데이터 구조 처리

        tbody.innerHTML = ""; // 테이블 초기화
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

        updatePagination(page); // 페이지네이션 업데이트

    } catch (error) {
        console.error("❌ 도서 목록을 불러오는 중 오류 발생:", error);
    }
}

function updatePagination(page) {
    const prevButton = document.getElementById("prev-page");
    const nextButton = document.getElementById("next-page");

    prevButton.disabled = page <= 1;
    nextButton.disabled = page >= totalPages;
}

function goToNextPage() {
    currentPage++;
    fetchBooks(currentPage);
}

function goToPrevPage() {
    currentPage--;
    fetchBooks(currentPage);
}

fetchBooks(currentPage); // 처음 도서 목록 불러오기
