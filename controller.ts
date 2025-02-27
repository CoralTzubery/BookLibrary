import { Book, orderBook, getBooks, onBooksUpdate, updateBookStatus, addBookToUser, removeBookFromUser, getBorrowedBooks, createUser, authenticateUser } from "./model.js";
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

export function populateBooksDropdown() {
    const bookDropdown = document.querySelector("#bookDropdown") as HTMLSelectElement;
    const username = localStorage.getItem("currentUser");

    if (bookDropdown && username) {
        const borrowedBooks = getBorrowedBooks(username);
        bookDropdown.innerHTML = borrowedBooks.map(book => `<option value="${book.id}">${book.title}</option>`).join('');
    }
}

export function setupReportForm() {
    const form = document.querySelector("#report-form") as HTMLFormElement;
    const username = localStorage.getItem("currentUser");

    if (form && username) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            const bookDropdown = document.querySelector("#bookDropdown") as HTMLSelectElement;
            const bookId = bookDropdown.value;

            updateBookStatus(bookId, "Lost");
            removeBookFromUser(username, bookId);

            alert("Book reported as lost!");
        });
    }
}

export function borrowBook(bookId: string) {
    const book = getBooks().find((b) => b.id === bookId);
    const username = localStorage.getItem("currentUser");

    if (book && username) {
        updateBookStatus(bookId, "Taken");
        addBookToUser(username, book);
    }
}

export function returnBook(bookId: string) {
    const username = localStorage.getItem("currentUser");

    if(username) {
        updateBookStatus(bookId, "Free");
        removeBookFromUser(username, bookId);
    }
}

export function setupLoginForm() {
    const form = document.querySelector("#login-form") as HTMLFormElement;

    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            const username = (document.querySelector("#username") as HTMLInputElement).value;
            const password = (document.querySelector("#password") as HTMLInputElement).value;

            try {
                authenticateUser(username, password);
                alert("Login successfuly!");
                localStorage.setItem("currentUser", username);
                window.location.href = "index.html";
            } catch (error) {
                alert(error.message);
            }
        });
    }
}

export function setupSignupForm() {
    const form = document.querySelector("#signup-form") as HTMLFormElement;

    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            const username = (document.querySelector("#username") as HTMLInputElement).value;
            const password = (document.querySelector("#password") as HTMLInputElement).value;

            try {
                createUser({
                    username,
                    password, 
                    borrowedBooks: []
                });
                alert("Signup successfuly!");
                window.location.href="login.html";
            } catch (error) {
                alert(error.message);
            }
        });
    }
}


export function init() {
    setupOrderForm();
    setupReportForm();
    populateBooksDropdown();
    renderBooks(getBooks());
    setupLoginForm();
    setupSignupForm();
}
