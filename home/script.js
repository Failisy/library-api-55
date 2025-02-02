async function fetchBookList() {
    const apiKey = process.env.API_KEY; // GitHub Actions에서 가져온 환경 변수
    const sheetId = process.env.SHEET_ID; // GitHub Actions에서 가져온 환경 변수

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/books?key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (!data.values || data.values.length === 0) {
            throw new Error("데이터가 없습니다.");
        }

        const bookList = data.values; // 시트 데이터에서 책 목록 가져오기
        const tableBody = document.querySelector('#book-list tbody');

        // 첫 번째 행은 헤더이므로 데이터는 2번째 행부터 시작
        for (let i = 1; i < bookList.length; i++) {
            const book = bookList[i];
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${book[0]}</td> <!-- ID -->
                <td>${book[1]}</td> <!-- ISBN -->
                <td>${book[2]}</td> <!-- 제목 -->
                <td>${book[3]}</td> <!-- 저자 -->
                <td>${book[4]}</td> <!-- 출판사 -->
                <td>${book[5]}</td> <!-- 대출 가능 여부 -->
            `;
            tableBody.appendChild(row);
        }
    } catch (error) {
        console.error('도서 목록을 가져오는 중 오류가 발생했습니다:', error);
    }
}

// 페이지 로드 시 도서 목록을 가져옵니다.
window.onload = fetchBookList;
