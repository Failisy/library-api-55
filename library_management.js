// library_management.js

const sheetId = "1cdECKnvPoVWmvw36BDEp5JeIRHKXRaGHeaqqWWRB9Ow"; // 스프레드시트 ID
const apiKey = "AIzaSyA3_dlMzkw6N3fG2zl-Hwj__864TxzkNNE"; // Google API 키
const clientId = "YOUR_CLIENT_ID_HERE"; // Google OAuth 클라이언트 ID
const adminSheet = "admin"; // 관리자 목록 시트
const sheetName = "books"; // 도서 목록 시트
const loanSheet = "loan"; // 대출 기록 시트

const discoveryDocs = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];
const scopes = "https://www.googleapis.com/auth/spreadsheets";

let currentUserEmail = "";

// ✅ Google 로그인 및 인증
function signIn() {
    gapi.load("client:auth2", () => {
        gapi.client.init({
            apiKey: apiKey,
            clientId: clientId,
            discoveryDocs: discoveryDocs,
            scope: scopes
        }).then(() => {
            gapi.auth2.getAuthInstance().signIn().then(user => {
                currentUserEmail = user.getBasicProfile().getEmail();
                document.getElementById("login-status").textContent = `✅ 로그인: ${currentUserEmail}`;
                checkAdmin(currentUserEmail);
            });
        });
    });
}

// ✅ 로그아웃 기능
function signOut() {
    gapi.auth2.getAuthInstance().signOut().then(() => {
        document.getElementById("login-status").textContent = "로그인이 필요합니다.";
        document.getElementById("admin-status").textContent = "";
        document.getElementById("admin-panel").style.display = "none";
        currentUserEmail = "";
    });
}

// ✅ 관리자 여부 확인
async function checkAdmin(email) {
    const adminApiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${adminSheet}?key=${apiKey}`;
    try {
        const response = await fetch(adminApiUrl);
        const data = await response.json();
        if (data.values.some(row => row[0] === email)) {
            document.getElementById("admin-status").textContent = "✅ 관리자 권한 있음";
            enableAdminFeatures();
        } else {
            document.getElementById("admin-status").textContent = "❌ 관리자 권한 없음";
        }
    } catch (error) {
        console.error("관리자 확인 오류:", error);
    }
}

// ✅ 관리자 기능 활성화
function enableAdminFeatures() {
    document.getElementById("admin-panel").style.display = "block";
}

// ✅ 도서 검색 기능
function searchBooks() {
    const searchText = document.getElementById("search-input").value.toLowerCase();
    const filteredData = bookData.filter((row, index) => {
        if (index === 0) return true;
        return row.some(cell => cell.toLowerCase().includes(searchText));
    });
    renderTable(filteredData);
}

// ✅ 관리자 추가 기능
async function addAdmin() {
    if (!currentUserEmail) {
        alert("먼저 로그인하세요!");
        return;
    }
    const newAdminEmail = document.getElementById("new-admin-email").value;
    if (!newAdminEmail) {
        alert("추가할 관리자 이메일을 입력하세요.");
        return;
    }
    const adminApiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/admin:append?valueInputOption=RAW&key=${apiKey}`;
    const adminData = { values: [[newAdminEmail]] };
    try {
        const response = await fetch(adminApiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(adminData)
        });
        if (response.ok) {
            alert(`✅ ${newAdminEmail}님이 관리자로 추가되었습니다!`);
        } else {
            alert("❌ 관리자 추가 실패! 다시 시도하세요.");
        }
    } catch (error) {
        console.error("관리자 추가 오류:", error);
        alert("❌ 관리자 추가 중 오류 발생!");
    }
}

// ✅ Google API 스크립트 로드
function loadGapi() {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/api.js";
    script.onload = () => console.log("✅ Google API 로드 완료!");
    document.body.appendChild(script);
}
loadGapi();
