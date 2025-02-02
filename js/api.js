// GitHub Actions에서 받은 JSON 파일을 클라이언트에서 읽어오는 방식
async function fetchBooks() {
  try {
    const response = await fetch("data.json");  // 'data.json' 파일을 읽어옴
    const data = await response.json();
    
    if (data && data.values) {
      displayBooks(data.values);
    } else {
      console.error("데이터가 올바르지 않습니다.");
    }
  } catch (error) {
    console.error("도서 목록을 불러오는 중 오류 발생:", error);
  }
}

function displayBooks(books) {
  const bookList = document.getElementById("book-list");
  books.forEach((book) => {
    const bookItem = document.createElement("tr");
    bookItem.innerHTML = `
      <td>${book[0]}</td>   <!-- ID -->
      <td>${book[1]}</td>   <!-- ISBN -->
      <td>${book[2]}</td>   <!-- 제목 -->
      <td>${book[3]}</td>   <!-- 저자 -->
      <td>${book[4]}</td>   <!-- 출판사 -->
      <td>${book[5]}</td>   <!-- 부가기호 -->
      <td>${book[6]}</td>   <!-- 가격 -->
      <td>${book[7]}</td>   <!-- 쪽수 -->
      <td>${book[8]}</td>   <!-- 크기 -->
      <td>${book[9]}</td>   <!-- 출판일 -->
      <td>${book[10]}</td>  <!-- 분류기호 -->
      <td>${book[11]}</td>  <!-- 대출 가능 여부 -->
    `;
    bookList.appendChild(bookItem);
  });
}

document.addEventListener('DOMContentLoaded', fetchBooks);
