document.addEventListener('DOMContentLoaded', function() {
    const bookListDiv = document.getElementById('book-list');

    // Google Apps Script 웹 앱 URL
    const apiUrl = 'https://script.google.com/macros/s/AKfycbz4AVoxyS9o_0QrpQCS0Fprda47MHQpGc4vBRsFR3qNqEih0zpdUbTICwtQIoNkDrAuHQ/exec';

    // 데이터 가져오기
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0) {
                const table = document.createElement('table');
                const thead = document.createElement('thead');
                const tbody = document.createElement('tbody');

                // 테이블 헤더 생성
                const headers = Object.keys(data[0]);
                const headerRow = document.createElement('tr');
                headers.forEach(header => {
                    const th = document.createElement('th');
                    th.textContent = header;
                    headerRow.appendChild(th);
                });
                thead.appendChild(headerRow);

                // 테이블 바디 생성
                data.forEach(book => {
                    const row = document.createElement('tr');
                    headers.forEach(header => {
                        const td = document.createElement('td');
                        td.textContent = book[header];
                        row.appendChild(td);
                    });
                    tbody.appendChild(row);
                });

                table.appendChild(thead);
                table.appendChild(tbody);
                bookListDiv.appendChild(table);
            } else {
                bookListDiv.textContent = '도서 목록이 없습니다.';
            }
        })
        .catch(error => {
            console.error('데이터를 가져오는 중 오류 발생:', error);
            bookListDiv.textContent = '데이터를 가져오는 중 오류가 발생했습니다.';
        });
});
