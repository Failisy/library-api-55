const apiUrl = 'https://army-library55.wofyf789.workers.dev/books'; // Cloudflare Worker API URL
const bookTableBody = document.getElementById('book-table-body');
const searchInput = document.getElementById('searchInput');

async function fetchBooks() {
    try {
        const response = await fetch(apiUrl);
        const books = await response.json();
        
        // 책 데이터를 표 형식으로 출력
        displayBooks(books);
    } catch (error) {
        console.error('API 요청 실패:', error);
        bookTableBody.innerHTML = '<tr><td colspan="12">책 정보를 가져오는 데 실패했습니다.</td></tr>';
    }
}

function displayBooks(books) {
    bookTableBody.innerHTML = '';  // 기존 목록을 비우기
    books.forEach(book => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${book.id}</td>  <!-- 고유 ID -->
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.publisher}</td>
            <td>${book.isbn}</td>
            <td>${book.additionalCode}</td>
            <td>${book.price}</td>
            <td>${book.pages}</td>
            <td>${book.size}</td>
            <td>${book.pubDate}</td>
            <td>${book.classification}</td>
            <td>${book.status}</td>
        `;
        bookTableBody.appendChild(tr);
    });
}

// 검색 기능 추가 (여러 항목 검색)
searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    fetch(apiUrl)
        .then(response => response.json())
        .then(books => {
            const filteredBooks = books.filter(book => 
                book.title.toLowerCase().includes(query) || 
                book.author.toLowerCase().includes(query) ||
                book.publisher.toLowerCase().includes(query) ||
                book.isbn.toLowerCase().includes(query) ||
                book.classification.toLowerCase().includes(query) ||
                book.status.toLowerCase().includes(query)
            );
            displayBooks(filteredBooks);
        })
        .catch(error => console.error('검색 실패:', error));
});

// 페이지 로드 시 책 목록 가져오기
fetchBooks();
