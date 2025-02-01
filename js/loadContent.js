async function loadContent() {
    const header = document.getElementById("header");
    const content = document.getElementById("content");

    if (header && content) {
        // Fetch header and content asynchronously
        const [headerHTML, contentHTML] = await Promise.all([
            fetch("/library-api-55/partials/header.html").then(res => res.text()),
            fetch("/library-api-55/partials/home_content.html").then(res => res.text())
        ]);
        header.innerHTML = headerHTML;
        content.innerHTML = contentHTML;
    }

    // Initialize the books list on content load
    setTimeout(fetchBooks, 500); // Giving some delay to ensure content is loaded
}

loadContent();
