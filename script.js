const sheetId = "1cdECKnvPoVWmvw36BDEp5JeIRHKXRaGHeaqqWWRB9Ow"; // 스프레드시트 ID
const apiKey = "AIzaSyA3_dlMzkw6N3fG2zl-Hwj__864TxzkNNE"; // Google API 키
const sheetName = "books"; // ✅ 가져올 시트 이름

const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(sheetName)}?key=${apiKey}`;

let bookData = []; // 📌 전체 도서 데이터를 저장할 변수

// ✅ 도서 데이터 가져오기
async function fetchBooks() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        console.log("📌 가져온 데이터:", data); // 데이터 확인

        if (data.values) {
            bookData = data.values;
            renderTable(bookData); // 전체 목록 렌더링
        } else {
            showError("데이터를 불러올 수 없습니다.");
        }
    } catch (error) {
        console.error("Google Sheets API 오류 발생:", error);
        showError("데이터를 가져오는 중 오류가 발생했습니다.");
    }
}

// ✅ 테이블 생성 및 렌더링
function renderTable(data) {
    const bookListDiv = document.getElementById("book-list");
    bookListDiv.innerHTML = "";

    if (data.length <= 1) {
        showError("📌 도서 목록이 없습니다.");
        return;
    }

    const table = document.createElement("table");
    const [headers, ...rows] = data;

    // ✅ 검색 기능 추가: "대출" 버튼 포함
    table.appendChild(createRow([...headers, "대출"], "th"));
    rows.forEach(row => {
        const tr = createRow(row, "td");

        // 📌 "대출" 버튼 추가
        const loanButton = document.createElement("button");
        loanButton.textContent = "대출";
        loanButton.onclick = () => loanBook(row);
        const td = document.createElement("td");
        td.appendChild(loanButton);
        tr.appendChild(td);

        table.appendChild(tr);
    });

    bookListDiv.appendChild(table);
}

// ✅ 행 생성 함수
function createRow(cells, cellType) {
    const row = document.createElement("tr");
    cells.forEach(cell => {
        const cellElement = document.createElement(cellType);
        cellElement.textContent = cell || "";
        row.appendChild(cellElement);
    });
    return row;
}

// ✅ 검색 기능 (입력할 때마다 필터링)
function searchBooks() {
    const searchText = document.getElementById("search-input").value.toLowerCase();

    const filteredData = bookData.filter((row, index) => {
        if (index === 0) return true; // 헤더 유지
        return row.some(cell => cell.toLowerCase().includes(searchText));
    });

    renderTable(filteredData);
}

// ✅ 오류 메시지 표시
function showError(message) {
    document.getElementById("book-list").textContent = message;
}

// ✅ 페이지 로딩 시 데이터 가져오기
fetchBooks();

// ✅ 도서 대출 기능 (Google Sheets API 사용)
async function loanBook(book) {
    // 🔹 대출자 정보 입력 받기
    const unit = prompt("📌 부대를 입력하세요:");
    if (!unit) return;
    
    const soldierId = prompt("📌 군번을 입력하세요:");
    if (!soldierId) return;

    const rank = prompt("📌 계급을 입력하세요:");
    if (!rank) return;

    const name = prompt("📌 이름을 입력하세요:");
    if (!name) return;

    const loanApiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/loan:append?valueInputOption=RAW&key=${apiKey}`;
    
    // 🔹 Google Sheets에 추가할 데이터 구성 (고유 ID 포함)
    const loanData = {
        values: [[book[0], ...book.slice(1), unit, soldierId, rank, name, new Date().toLocaleDateString()]]
    };

    try {
        const response = await fetch(loanApiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(loanData)
        });

        if (response.ok) {
            alert(`✅ ${name}님, 도서 대출 완료!`);
        } else {
            alert("❌ 대출 실패! 다시 시도하세요.");
        }
    } catch (error) {
        console.error("대출 오류:", error);
        alert("❌ 대출 중 오류 발생!");
    }
}


// ✅ 도서 반납 기능 (Google Sheets API 사용)
async function returnBook(book) {
    const soldierId = prompt("📌 군번을 입력하세요 (반납 확인):");
    if (!soldierId) return;

    const loanApiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/loan?key=${apiKey}`;
    
    try {
        const response = await fetch(loanApiUrl);
        const data = await response.json();

        if (!data.values) {
            alert("❌ 대출 기록이 없습니다.");
            return;
        }

        // 🔹 대출 기록에서 해당 "고유 ID + 군번"이 일치하는 도서 찾기
        const updatedData = data.values.filter(row => !(row[0] === book[0] && row[6] === soldierId)); // 고유 ID + 군번 검증

        if (updatedData.length === data.values.length) {
            alert("❌ 해당 군번으로 대출된 기록이 없습니다.");
            return;
        }

        // 🔹 기존 대출 기록 삭제 후 업데이트
        const clearLoanUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/loan:clear?key=${apiKey}`;
        await fetch(clearLoanUrl, { method: "POST" });

        const updateLoanUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/loan?valueInputOption=RAW&key=${apiKey}`;
        await fetch(updateLoanUrl, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ values: updatedData })
        });

        alert("✅ 도서 반납 완료!");
    } catch (error) {
        console.error("반납 오류:", error);
        alert("❌ 반납 중 오류 발생!");
    }
}
