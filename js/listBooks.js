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
        const books = Array.isArray(data) ? data : data.books;

        tbody.innerHTML = ""; // 테이블 초기화
        books.forEach(book => {
            const row = `<tr>
                <td>${book.ID}</td>
                <td>${book.ISBN}</td>
                <td>${book.TITLE}</td>
                <td>${book.AUTHOR}</td>
                <td>${book.PUBLISHER}</td>
                <td>${book.ADD_CODE}</td>
                <td>${book.PRE_PRICE}</td>
                <td>${book.PAGE}</td>
                <td>${book.SIZE}</td>
                <td>${book.PUBLISH_DATE}</td>
                <td>${book.SUBJECT}</td>
                <td>${book.LOAN}</td>
            </tr>`;
            tbody.innerHTML += row;
        });

        updatePagination(page); // 페이지네이션 버튼 상태 업데이트

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
