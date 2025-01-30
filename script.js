const apiUrl = 'https://army-library55.wofyf789.workers.dev/books'; // Cloudflare Worker API URL
const bookListContainer = document.getElementById('book-list-container');
const searchInput = document.getElementById('searchInput');

async function fetchBooks() {
    try {
        const response = await fetch(apiUrl);
        const books = await response.json();
        
        // 책 데이터를 카드 형식으로 출력
        displayBooks(books);
    } catch (error) {
        console.error('API 요청 실패:', error);
        bookListContainer.innerHTML = '<p>책 정보를 가져오는 데 실패했습니다.</p>';
    }
}

function displayBooks(books) {
    bookListContainer.innerHTML = '';  // 기존 목록을 비우기
    books.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        bookCard.innerHTML = `
            <h3 class="book-title">${book.title}</h3>
            <p class="book-id">고유 ID: ${book.id}</p>
            <p class="book-author">저자: ${book.author}</p>
            <p class="book-publisher">출판사: ${book.publisher}</p>
            <p class="book-isbn">ISBN: ${book.isbn}</p>
            <p class="book-price">가격: ${book.price}</p>
            <p class="book-pages">쪽수: ${book.pages}</p>
            <p class="book-size">크기: ${book.size}</p>
            <p class="book-pubdate">출판일: ${book.pubDate}</p>
            <p class="book-classification">분류기호: ${book.classification}</p>
            <p class="book-status">대출 가능 여부: ${book.status}</p>
        `;
        bookListContainer.appendChild(bookCard);
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
