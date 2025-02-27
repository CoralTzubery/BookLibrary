import { getBooks, getBorrowedBooks } from "./model.js";
import { borrowBook, returnBook } from "./controller.js";
export function renderBooks(books) {
    const bookList = document.querySelector(".recently-added");
    const bookTable = document.querySelector(".book-table");
    if (bookList) {
        bookList.innerHTML = books.map((book) => `
            <li class="card">
                <p>${book.category}</p>
                <p>${book.title}</p>
                <p>${book.author}</p>
                <p>${book.status}</p>
            </li>
        `).join("");
    }
    if (bookTable) {
        bookTable.innerHTML = `
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                ${books.map((book) => `
                    <tr>
                        <td>${book.title}</td>
                        <td>${book.author}</td>
                        <td>${book.category}</td>
                        <td>${book.status}</td>
                        <td>
                            ${book.status !== "Lost" ?
            `<button class="borrow-button ${book.status === 'Taken' ? 'hidden' : ''}" data-book-id="${book.id}">Borrow</button>
                                <button class="return-button ${book.status === 'Free' ? 'hidden' : ''}" data-book-id="${book.id}">Return</button>` :
            ""}
                        </td>
                    </tr>
                `).join("")}
            </tbody>
        `;
    }
    document.addEventListener('DOMContentLoaded', () => {
        const bookTable = document.querySelector('.book-table');
        if (bookTable) {
            bookTable.addEventListener('click', (event) => {
                const target = event.target;
                if (target.classList.contains('borrow-button')) {
                    const bookId = target.dataset.bookId;
                    if (bookId) {
                        borrowBook(bookId);
                        renderBooks(getBooks());
                        const username = localStorage.getItem("currentUser");
                        if (username) {
                            renderMyBooks(username);
                        }
                    }
                }
                else if (target.classList.contains('return-button')) {
                    const bookId = target.dataset.bookId;
                    if (bookId) {
                        returnBook(bookId);
                        renderBooks(getBooks());
                        const username = localStorage.getItem("currentUser");
                        if (username) {
                            renderMyBooks(username);
                        }
                    }
                }
            });
        }
    });
}
export function renderMyBooks(username) {
    const bookTable = document.querySelector(".my-books");
    const borrowedBooks = getBorrowedBooks(username);
    if (bookTable) {
        bookTable.innerHTML = `
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Category</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                ${borrowedBooks.map((book) => `
                    <tr>
                        <td>${book.title}</td>
                        <td>${book.author}</td>
                        <td>${book.category}</td>
                        <td>
                            ${book.status !== "Lost" ? `<button class="return-button" data-book-id="${book.id}">Return</button>` : ""}
                        </td>
                    </tr>
                `).join("")}
            </tbody>
        `;
        bookTable.addEventListener('click', (event) => {
            const target = event.target;
            if (target.classList.contains('return-button')) {
                const bookId = target.dataset.bookId;
                const username = localStorage.getItem("currentUser");
                if (bookId && username) {
                    returnBook(bookId);
                    renderMyBooks(username);
                    renderBooks(getBooks());
                }
            }
        });
    }
}
export function removeRowFromTable(bookId) {
    const row = document.getElementById(`book-${bookId}`);
    if (row) {
        row.remove();
    }
}
export function displayCurrentUser() {
    console.log("displayCurrentUser called");
    const username = localStorage.getItem("currentUser");
    const currentUserElement = document.getElementById("current-user");
    if (currentUserElement) {
        if (username) {
            currentUserElement.textContent = `Hello, ${username}`;
        }
        else {
            currentUserElement.textContent = "";
        }
    }
}
