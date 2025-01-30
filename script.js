function fetchBooks() {
    const apiUrl = "https://script.google.com/macros/s/AKfycbyS1DhitfsJcFD_jXUWG38ax4Wb-0Q87DCo29piptardDZnjZIMCAsFJHhcKg8kUmOKUQ/execc";
    
    // ✅ JSONP 방식 요청 (콜백 함수 추가)
    const script = document.createElement("script");
    script.src = apiUrl + "?callback=handleBookData";
    document.body.appendChild(script);
}

// ✅ JSON 데이터를 받아서 화면에 표시
function handleBookData(data) {
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
