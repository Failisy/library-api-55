const API_BASE = "https://library55.wofyf0211.workers.dev"; // Cloudflare API 주소

document.addEventListener("DOMContentLoaded", function () {
    fetchBooks(); // 초기 데이터 로드
});

// 📌 1. 도서 목록 불러오기 (검색 포함, 렉 방지 최적화)
async function fetchBooks() {
    const searchElement = document.getElementById("search");
    if (!searchElement) {
        console.error("🚨 Error: 'search' 요소를 찾을 수 없습니다!");
        return;
    }

    const searchQuery = searchElement.value.trim().toLowerCase();
    const loadingElement = document.getElementById("loading");
    const bookTable = document.getElementById("book-table");
    const bookList = document.getElementById("book-list");

    loadingElement.style.display = "block";
    bookTable.style.display = "none";
    bookList.innerHTML = ""; // 기존 리스트 초기화

    try {
        // Cloudflare Workers의 캐싱된 데이터 가져오기
        const response = await fetch(`${API_BASE}/books`, { cache: "force-cache" });
        const data = await response.json();
        const books = data.values.slice(1); // 첫 번째 행(헤더) 제외

        // HTML 렌더링 최적화 → `innerHTML` 대신 `appendChild()` 사용
        const fragment = document.createDocumentFragment();

        books.forEach(book => {
            if (!searchQuery || book[1].toLowerCase().includes(searchQuery)) {
                const tr = document.createElement("tr");

                tr.innerHTML = `
                    <td>${book[0]}</td>
                    <td>${book[1]}</td>
                    <td>${book[2]}</td>
                    <td>${book[3]}</td>
                    <td>${book[4]}</td>
                    <td>
                        <button onclick="loanBook('${book[0]}')">대출</button>
                        <button onclick="returnBook('${book[0]}')">반납</button>
                        <button onclick="deleteBook('${book[0]}')">삭제</button>
                    </td>
                `;

                fragment.appendChild(tr);
            }
        });

        bookList.appendChild(fragment); // 최적화된 방식으로 한 번에 추가
        loadingElement.style.display = "none";
        bookTable.style.display = "block";
    } catch (error) {
        console.error("🚨 데이터 로딩 실패:", error);
        loadingElement.innerHTML = "❌ 데이터를 불러오는 데 실패했습니다!";
    }
}

// 📌 2. 도서 추가 (중복 추가 방지)
async function addBook() {
    const id = document.getElementById("book-id").value.trim();
    const title = document.getElementById("book-title").value.trim();
    const author = document.getElementById("book-author").value.trim();
    const publisher = document.getElementById("book-publisher").value.trim();

    if (!id || !title || !author || !publisher) {
        alert("모든 필드를 입력하세요.");
        return;
    }

    const response = await fetch(`${API_BASE}/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, title, author, publisher, status: "대출 가능" })
    });

    if (response.ok) {
        alert("도서가 추가되었습니다!");
        fetchBooks();
    } else {
        alert("추가 실패");
    }
}

// 📌 3. 도서 대출 (연속 요청 방지)
async function loanBook(id) {
    const borrower = prompt("대출자 이름 입력:");
    if (!borrower) return;

    const date = new Date().toISOString().split("T")[0];

    const response = await fetch(`${API_BASE}/loan`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, borrower, date })
    });

    if (response.ok) {
        alert("대출 완료!");
        fetchBooks();
    } else {
        alert("대출 실패");
    }
}

// 📌 4. 도서 반납
async function returnBook(id) {
    const returnDate = new Date().toISOString().split("T")[0];

    const response = await fetch(`${API_BASE}/return`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, returnDate })
    });

    if (response.ok) {
        alert("반납 완료!");
        fetchBooks();
    } else {
        alert("반납 실패");
    }
}

// 📌 5. 도서 삭제 (중복 요청 방지)
async function deleteBook(id) {
    if (!confirm("정말 삭제하시겠습니까?")) return;

    const response = await fetch(`${API_BASE}/delete`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
    });

    if (response.ok) {
        alert("삭제 완료!");
        fetchBooks();
    } else {
        alert("삭제 실패");
    }
}
