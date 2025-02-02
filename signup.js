document.getElementById("signup-form").addEventListener("submit", function (e) {
    e.preventDefault();

    let unit = document.getElementById("unit").value;
    let militaryId = document.getElementById("military-id").value;
    let rank = document.getElementById("rank").value;
    let name = document.getElementById("name").value;
    let password = document.getElementById("password").value;

    // 기존 CSV 파일 읽기
    fetch('path/to/your/users.csv')
        .then(response => response.text())
        .then(csv => {
            let data = Papa.parse(csv, {header: true, skipEmptyLines: true}).data;

            // 새로운 사용자 추가
            let newUser = {unit, militaryId, rank, name, password};
            data.push(newUser);

            // CSV 형식으로 변환
            let newCSV = Papa.unparse(data);

            // 변경된 CSV 파일을 GitHub에 푸시하는 코드 (GitHub Actions 사용)
            pushCSVToRepo(newCSV);
        });
});

function pushCSVToRepo(csvData) {
    // GitHub Actions를 트리거하는 로직
}
