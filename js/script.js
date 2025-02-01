const apiBase = "https://army-library55.wofyf789.workers.dev/";

// 페이지네이션을 위한 변수
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
        console.log(data); // ✅ API 응답 확인

        const books = Array.isArray(data) ? data : data.books; // 배열로 변환하거나 데이터 구조 처리

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

        // 페이지네이션 버튼 업데이트
        updatePagination(page);
    } catch (error) {
        console.error("❌ 도서 목록을 불러오는 중 오류 발생:", error);
    }
}

// 페이지네이션 버튼 업데이트 함수
function updatePagination(page) {
    const prevButton = document.getElementById("prev-page");
    const nextButton = document.getElementById("next-page");

    prevButton.disabled = page <= 1; // 첫 페이지일 때 이전 버튼 비활성화
    nextButton.disabled = page >= totalPages; // 마지막 페이지일 때 다음 버튼 비활성화
}

// 다음 페이지
function goToNextPage() {
    currentPage++;
    fetchBooks(currentPage);
}

// 이전 페이지
function goToPrevPage() {
    currentPage--;
    fetchBooks(currentPage);
}

// 처음 로드할 때 첫 페이지의 도서를 불러오기
fetchBooks(currentPage);
