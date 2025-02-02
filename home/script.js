async function fetchBookList() {
    const apiKey = "{{API_KEY}}";  // GitHub Actions에서 교체된 값
    const sheetId = "{{SHEET_ID}}";  // GitHub Actions에서 교체된 값

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/books?key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (!data.values || data.values.length === 0) {
            throw new Error("데이터가 없습니다.");
        }

        const bookList = data.values;
        const tableBody = document.querySelector('#book-list tbody');

        for (let i = 1; i < bookList.length; i++) {
            const book = bookList[i];
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${book[0]}</td>
                <td>${book[1]}</td>
                <td>${book[2]}</td>
                <td>${book[3]}</td>
                <td>${book[4]}</td>
                <td>${book[5]}</td>
            `;
            tableBody.appendChild(row);
        }
    } catch (error) {
        console.error('도서 목록을 가져오는 중 오류가 발생했습니다:', error);
    }
}

window.onload = fetchBookList;
