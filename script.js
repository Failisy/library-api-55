const sheetId = "1cdECKnvPoVWmvw36BDEp5JeIRHKXRaGHeaqqWWRB9Ow"; // 🔥 스프레드시트 ID
const apiKey = "AIzaSyA3_dlMzkw6N3fG2zl-Hwj__864TxzkNNE"; // 🔥 생성한 Google API 키

// ✅ Google Sheets API URL 생성
const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/도서목록?key=${apiKey}`;

function fetchBooks() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data); // 데이터 확인
            displayBooks(data.values);
        })
        .catch(error => {
            console.error("Google Sheets API 오류 발생:", error);
        });
}

function displayBooks(data) {
    const bookListDiv = document.getElementById("book-list");

    if (data && data.length > 1) {
        const table = document.createElement("table");
        const thead = document.createElement("thead");
        const tbody = document.createElement("tbody");

        // 테이블 헤더 생성
        const headers = data[0]; // 첫 번째 행을 컬럼명으로 사용
        const headerRow = document.createElement("tr");
        headers.forEach(header => {
            const th = document.createElement("th");
            th.textContent = header;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);

        // 테이블 바디 생성
        for (let i = 1; i < data.length; i++) {
            const row = document.createElement("tr");
            data[i].forEach(cell => {
                const td = document.createElement("td");
                td.textContent = cell;
                row.appendChild(td);
            });
            tbody.appendChild(row);
        }

        table.appendChild(thead);
        table.appendChild(tbody);
        bookListDiv.appendChild(table);
    } else {
        bookListDiv.textContent = "도서 목록이 없습니다.";
    }
}

// ✅ 페이지 로딩 시 데이터 가져오기
fetchBooks();
