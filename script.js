const apiUrl = 'https://army-library55.wofyf789.workers.dev/books'; // 새로운 API URL
const bookListElement = document.getElementById('books');
const searchInput = document.getElementById('searchInput');

async function fetchBooks() {
    try {
        const response = await fetch(apiUrl);
        const books = await response.json();
        
        // 책 데이터를 화면에 출력
        displayBooks(books);
    } catch (error) {
        console.error('API 요청 실패:', error);
        bookListElement.innerHTML = '<li>책 정보를 가져오는 데 실패했습니다.</li>';
    }
}

function displayBooks(books) {
    bookListElement.innerHTML = '';  // 기존 목록을 비우기
    books.forEach(book => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>제목:</strong> ${book.title}<br>
            <strong>저자:</strong> ${book.author}<br>
            <strong>출판사:</strong> ${book.publisher}<br>
            <strong>ISBN:</strong> ${book.isbn}
        `;
        bookListElement.appendChild(li);
    });
}

// 검색 기능 추가
searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    fetch(apiUrl)
        .then(response => response.json())
        .then(books => {
            const filteredBooks = books.filter(book => 
                book.title.toLowerCase().includes(query) || 
                book.author.toLowerCase().includes(query)
            );
            displayBooks(filteredBooks);
        })
        .catch(error => console.error('검색 실패:', error));
});

// 페이지 로드 시 책 목록 가져오기
fetchBooks();
