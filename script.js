const sheetId = "1cdECKnvPoVWmvw36BDEp5JeIRHKXRaGHeaqqWWRB9Ow"; // 🔥 스프레드시트 ID
const apiKey = "AIzaSyA3_dlMzkw6N3fG2zl-Hwj__864TxzkNNE"; // 🔥 생성한 Google API 키

// ✅ 시트 이름을 URL 인코딩하여 API 요청
const sheetName = encodeURIComponent("도서 목록"); // 🔥 "도서목록"을 URL에 맞게 변환
const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}?key=${apiKey}`;

function fetchBooks() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log("📌 가져온 데이터:", data); // 콘솔에서 확인
            if (data.values) {
                displayBooks(data.values);
            } else {
                document.getElementById("book-list").textContent = "데이터를 불러올 수 없습니다.";
            }
        })
        .catch(error => {
            console.error("Google Sheets API 오류 발생:", error);
            document.getElementById("book-list").textContent = "데이터를 가져오는 중 오류가 발생했습니다.";
        });
}

function displayBooks(data) {
    const bookListDiv = document.getElementById("book-list");

    // ✅ 기존 테이블이 있으면 삭제
    bookListDiv.innerHTML = "";

    if (data.length > 1) {
        const table = document.createElement("table");
        const thead = document.createElement("thead");
        const tbody = document.createElement("tbody");

        // ✅ 테이블 헤더 생성 (첫 번째 행)
        const headers = data[0];
        const headerRow = document.createElement("tr");
        headers.forEach(header => {
            const th = document.createElement("th");
            th.textContent = header;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);

        // ✅ 테이블 바디 생성 (두 번째 행부터)
        for (let i = 1; i < data.length; i++) {
            const row = document.createElement("tr");
            data[i].forEach(cell => {
                const td = document.createElement("td");
                td.textContent = cell ? cell : " - "; // 빈 셀을 "-"로 표시
                row.appendChild(td);
            });
            tbody.appendChild(row);
        }

        table.appendChild(thead);
        table.appendChild(tbody);
        bookListDiv.appendChild(table);
    } else {
        bookListDiv.textContent = "📌 도서 목록이 없습니다.";
    }
}

// ✅ 페이지 로딩 시 데이터 가져오기
fetchBooks();
