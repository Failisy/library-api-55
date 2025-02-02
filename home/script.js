async function fetchBookList() {
    const response = await fetch('https://army-library55.wofyf789.workers.dev/books');
    const data = await response.json();

    const bookList = data.books; // API 응답에 맞게 데이터 구조 조정 필요
    const tableBody = document.querySelector('#book-list tbody');
    
    bookList.forEach(book => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.id}</td>
            <td>${book.isbn}</td>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.publisher}</td>
            <td>${book.loan_status}</td>
        `;
        tableBody.appendChild(row);
    });
}

// 페이지 로드 시 도서 목록을 가져옵니다.
window.onload = fetchBookList;
