import { Book, orderBook, reportLostBook, getBooks, onBooksUpdate, updateBookStatus, addBookToUser, removeBookFromUser, getUserBook } from "./model.js";
import { renderBooks } from "./view.js";

onBooksUpdate(() => renderBooks(getBooks()));

export function setupOrderForm() {
    const form = document.querySelector("form[name='order-new'") as HTMLFormElement;
    
    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            const formData = new FormData(form);

            const title = formData.get("title") as string;
            const author = formData.get("author") as string;
            const category = formData.get("category") as string;

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

export function populateBookDropdowm () {
    const bookDropdown = document.querySelector("#bookDropdown") as HTMLSelectElement;
    const userBooks = getUserBook();

    if (bookDropdown) {
        bookDropdown.innerHTML = userBooks.map(book => `<option value="${book.id}">${book.title}</option`).join('');
    }
}

export function setupReportForm() {
    const form = document.querySelector("form[name='report'") as HTMLFormElement;

    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            const bookDropdown = document.querySelector("#bookDropdown") as HTMLSelectElement;
            const bookId = bookDropdown.value;

            updateBookStatus(bookId, "Lost");
            removeBookFromUser(bookId);

            alert("Book reported as lost!");
        });
    }
}

export function borrowBook(bookId: string) {
    const book = getBooks().find((b) => b.id === bookId);

    if (book) {
        updateBookStatus(bookId, "Taken");
        addBookToUser(book);
    }
}

export function returnBook(bookId: string) {
    updateBookStatus(bookId, "Free");
    removeBookFromUser(bookId);
}

export function init() {
    setupOrderForm();
    setupReportForm();
    renderBooks(getBooks());
}
