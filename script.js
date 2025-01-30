const CLIENT_ID = "650457472463-1bg83e4nvs912fnv9u6dnbupb6glj1g9.apps.googleusercontent.com";  // Google OAuth 클라이언트 ID
const API_KEY = "AIzaSyA3_dlMzkw6N3fG2zl-Hwj__864TxzkNNE";   // Google API 키

let bookData = [];  // 도서 목록 데이터를 저장할 배열

// Google OAuth 인증 초기화
function initGoogleAuth() {
    gapi.load("auth2", function() {
        gapi.auth2.init({ client_id: CLIENT_ID });
    });
}

// Google 로그인
function signIn() {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signIn().then(function(googleUser) {
        const profile = googleUser.getBasicProfile();
        document.getElementById("login-status").innerText = `로그인한 사용자: ${profile.getEmail()}`;
    }).catch(function(error) {
        console.error("Login error:", error);
    });
}

// Google 로그아웃
function signOut() {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function() {
        document.getElementById("login-status").innerText = "로그인이 필요합니다.";
    });
}

// 도서 목록 가져오기
function fetchBooks() {
    const spreadsheetId = "1cdECKnvPoVWmvw36BDEp5JeIRHKXRaGHeaqqWWRB9Ow";  // 스프레드시트 ID
    const range = "books";  // 도서 목록이 있는 시트 이름
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${API_KEY}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            bookData = data.values.slice(1);  // 첫 번째 행(헤더)을 제외하고 데이터 저장
            displayBooks(bookData);  // 도서 목록 화면에 표시
        })
        .catch(error => console.error('도서 목록을 가져오는 중 오류 발생:', error));
}

// 도서 목록 화면에 표시
function displayBooks(books) {
    const bookListDiv = document.getElementById("book-list");
    bookListDiv.innerHTML = "";  // 기존 목록을 지운 후 새로 추가

    books.forEach(book => {
        const bookElement = document.createElement("div");
        bookElement.innerHTML = `
            <h3>${book[1]}</h3> <!-- 책 제목 -->
            <p>저자: ${book[2]}</p>
            <p>출판사: ${book[3]}</p>
            <p>ISBN: ${book[4]}</p>
            <p>고유 ID: ${book[0]}</p> <!-- 고유 ID -->
        `;
        bookListDiv.appendChild(bookElement);
    });
}

// 도서 검색
function searchBooks() {
    const searchTerm = document.getElementById("search-input").value.toLowerCase();
    const filteredBooks = bookData.filter(book => {
        return book[1].toLowerCase().includes(searchTerm);
    });
    displayBooks(filteredBooks);
}

// 초기 실행
window.onload = function() {
    initGoogleAuth();
    fetchBooks();
};
