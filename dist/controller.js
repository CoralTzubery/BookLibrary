import { orderBook, getBooks, onBooksUpdate, updateBookStatus, addBookToUser, removeBookFromUser, getUserBook } from "./model.js";
import { renderBooks } from "./view.js";
onBooksUpdate(() => renderBooks(getBooks()));
export function setupOrderForm() {
    const form = document.querySelector("form[name='order-new'");
    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const formData = new FormData(form);
            const title = formData.get("title");
            const author = formData.get("author");
            const category = formData.get("category");
            if (!title || !author || !category) {
                throw new Error("All the fields must be filled");
                return;
            }
            orderBook({
                id: crypto.randomUUID().replace("-", "").slice(-8),
                title,
                author,
                category,
                status: "Free",
            });
            form.reset();
            alert("Book orderd successfully");
        });
    }
}
export function populateBooksDropdown() {
    const bookDropdown = document.querySelector("#bookDropdown");
    const userBooks = getUserBook();
    if (bookDropdown) {
        bookDropdown.innerHTML = userBooks.map(book => `<option value="${book.id}">${book.title}</option>`).join('');
    }
}
export function setupReportForm() {
    const form = document.querySelector("#report-form");
    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const bookDropdown = document.querySelector("#bookDropdown");
            const bookId = bookDropdown.value;
            updateBookStatus(bookId, "Lost");
            removeBookFromUser(bookId);
            alert("Book reported as lost!");
        });
    }
}
export function borrowBook(bookId) {
    const book = getBooks().find((b) => b.id === bookId);
    if (book) {
        updateBookStatus(bookId, "Taken");
        addBookToUser(book);
    }
}
export function returnBook(bookId) {
    updateBookStatus(bookId, "Free");
    removeBookFromUser(bookId);
}
export function init() {
    setupOrderForm();
    setupReportForm();
    populateBooksDropdown();
    renderBooks(getBooks());
}
