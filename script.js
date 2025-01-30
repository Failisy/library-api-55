function fetchBooks() {
    const apiUrl = "https://script.google.com/macros/s/AKfycbytdLomP-FpYXo7J59j4rbjQCHB0fX7vDH7UJ9SHYoNeoOpEkWKqDpz4SR1NqhdFcXmsQ/exec";

    fetch(apiUrl)
        .then(response => response.text()) // JSON을 문자열로 받아옴
        .then(text => JSON.parse(text)) // 문자열을 JSON으로 변환
        .then(data => {
            console.log(data); // 가져온 데이터 콘솔에 출력
            displayBooks(data);
        })
        .catch(error => {
            console.error("데이터를 가져오는 중 오류 발생:", error);
        });
}

function displayBooks(data) {
    const bookListDiv = document.getElementById("book-list");

    if (data && data.length > 0) {
        const table = document.createElement("table");
        const thead = document.createElement("thead");
        const tbody = document.createElement("tbody");

        // 테이블 헤더 생성
        const headers = Object.keys(data[0]);
        const headerRow = document.createElement("tr");
        headers.forEach(header => {
            const th = document.createElement("th");
            th.textContent = header;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);

        // 테이블 바디 생성
        data.forEach(book => {
            const row = document.createElement("tr");
            headers.forEach(header => {
                const td = document.createElement("td");
                td.textContent = book[header];
                row.appendChild(td);
            });
            tbody.appendChild(row);
        });

        table.appendChild(thead);
        table.appendChild(tbody);
        bookListDiv.appendChild(table);
    } else {
        bookListDiv.textContent = "도서 목록이 없습니다.";
    }
}

// ✅ 페이지 로딩 시 데이터 가져오기
fetchBooks();
