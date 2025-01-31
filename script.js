const API_BASE = "https://library55.wofyf0211.workers.dev"; // Cloudflare API 주소

document.addEventListener("DOMContentLoaded", function () {
    fetchBooks();
});

// 📌 1. 도서 목록 불러오기 (엑셀 형식 + 대출/반납/삭제 버튼 추가)
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
        const response = await fetch(`${API_BASE}/books`, { cache: "force-cache" });
        const data = await response.json();
        const books = data.values.slice(1); // 첫 번째 행(헤더) 제외

        const fragment = document.createDocumentFragment();

        books.forEach(book => {
            if (!searchQuery || book[2].toLowerCase().includes(searchQuery)) {
                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td>${book[0]}</td>
                    <td>${book[1]}</td>
                    <td>${book[2]}</td>
                    <td>${book[3]}</td>
                    <td>${book[4]}</td>
                    <td>${book[5]}</td>
                    <td>${book[6]}</td>
                    <td>${book[7]}</td>
                    <td>${book[8]}</td>
                    <td>${book[9]}</td>
                    <td>${book[10]}</td>
                    <td>${book[11]}</td>
                    <td>
                        <button onclick="loanBook('${book[0]}')">대출</button>
                        <button onclick="returnBook('${book[0]}')">반납</button>
                        <button onclick="deleteBook('${book[0]}')">삭제</button>
                    </td>
                `;
                fragment.appendChild(tr);
            }
        });

        bookList.appendChild(fragment);
        loadingElement.style.display = "none";
        bookTable.style.display = "block";
    } catch (error) {
        console.error("🚨 API 요청 실패:", error);
        loadingElement.innerHTML = "❌ 데이터를 불러오는 데 실패했습니다!";
    }
}

// 📌 2. 도서 대출
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

// 📌 3. 도서 반납
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

// 📌 4. 도서 삭제
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

// 📌 5. 테이블 정렬 기능 (클릭하면 오름차순/내림차순 변경)
function sortTable(columnIndex) {
    const table = document.getElementById("book-table");
    const tbody = document.getElementById("book-list");
    const rows = Array.from(tbody.getElementsByTagName("tr"));

    const isAscending = table.getAttribute("data-sort-dir") === "asc";
    table.setAttribute("data-sort-dir", isAscending ? "desc" : "asc");

    rows.sort((rowA, rowB) => {
        const cellA = rowA.getElementsByTagName("td")[columnIndex].textContent;
        const cellB = rowB.getElementsByTagName("td")[columnIndex].textContent;

        return isAscending ? cellA.localeCompare(cellB, "ko") : cellB.localeCompare(cellA, "ko");
    });

    tbody.innerHTML = "";
    rows.forEach(row => tbody.appendChild(row));
}
