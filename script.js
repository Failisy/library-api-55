const sheetId = "1cdECKnvPoVWmvw36BDEp5JeIRHKXRaGHeaqqWWRB9Ow"; // 스프레드시트 ID
const apiKey = "AIzaSyA3_dlMzkw6N3fG2zl-Hwj__864TxzkNNE"; // Google API 키
const sheetName = "books"; // ✅ 가져올 시트 이름

// ✅ API 요청 URL
const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(sheetName)}?key=${apiKey}`;

// ✅ 도서 목록 가져오기
async function fetchBooks() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        console.log("📌 가져온 데이터:", data); // 데이터 확인

        if (data.values) {
            renderTable(data.values);
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
    bookListDiv.innerHTML = ""; // 기존 데이터 초기화

    if (data.length <= 1) {
        showError("📌 도서 목록이 없습니다.");
        return;
    }

    const table = document.createElement("table");
    const [headers, ...rows] = data;

    // ✅ 테이블 헤더 생성
    table.appendChild(createRow(headers, "th"));

    // ✅ 테이블 바디 생성
    rows.forEach(row => table.appendChild(createRow(row, "td")));

    bookListDiv.appendChild(table);
}

// ✅ 행 생성 함수 (헤더 & 데이터)
function createRow(cells, cellType) {
    const row = document.createElement("tr");
    cells.forEach(cell => {
        const cellElement = document.createElement(cellType);
        cellElement.textContent = cell || ""; // 빈 셀 처리
        row.appendChild(cellElement);
    });
    return row;
}

// ✅ 오류 메시지 표시
function showError(message) {
    document.getElementById("book-list").textContent = message;
}

// ✅ 페이지 로딩 시 데이터 가져오기
fetchBooks();
