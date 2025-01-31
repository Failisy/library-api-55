const API_BASE = "https://army-library55.wofyf789.workers.dev"; // Cloudflare Workers API URL

// 📌 1. 도서 목록 불러오기
async function fetchBooks() {
    const searchQuery = document.getElementById("search").value;
    const response = await fetch(`${API_BASE}/books`);
    const data = await response.json();
    const books = data.values.slice(1); // 첫 번째 행(헤더) 제외
    const bookList = document.getElementById("book-list");

    bookList.innerHTML = "";
    books.forEach(book => {
        if (!searchQuery || book[1].includes(searchQuery)) {
            bookList.innerHTML += `
                <tr>
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
                </tr>
            `;
        }
    });
}

// 📌 2. 도서 추가
async function addBook() {
    const id = document.getElementById("book-id").value;
    const title = document.getElementById("book-title").value;
    const author = document.getElementById("book-author").value;
    const publisher = document.getElementById("book-publisher").value;

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

// 📌 3. 도서 대출
async function loanBook(id) {
    const borrower = prompt("대출자 이름 입력:");
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

// 📌 5. 도서 삭제
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

// 페이지 로드 시 도서 목록 불러오기
fetchBooks();
