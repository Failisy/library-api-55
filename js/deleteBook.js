async function deleteBook(bookId) {
    try {
        const response = await fetch(`${apiBase}books/${bookId}`, {
            method: "DELETE
