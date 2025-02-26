import { borrowBook, returnBook } from "./controller.js";
export function renderBooks(books) {
    const bookList = document.querySelector(".recently-added");
    const bookTable = document.querySelector(".book-table");
    if (bookList) {
        bookList.innerHTML = books.map((book) => `
            <li class="card">
                <a href="#">
                    <img src="pictures/default.jpg" alt="${book.title}">
                    <p>${book.category}</p>
                    <p>${book.title}</p>
                    <p>${book.author}</p>
                    <button onclick="borrowBook('${book.id}')">${book.status === "Free" ? "Borrow" : "Taken"}</button>
                </a>
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
                <th>Due-Date</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            ${books.map((book) => `
                <tr>
                    <td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.category}</td>
                    <td>${'01.04.25'}</td>
                    <td><button class="return-button" data-book-id="${book.id}">Return</button></td>
                </tr>
            `).join("")}
        </tbody>
        `;
    }
    const borrowButtons = bookTable.querySelectorAll(".borrow-button");
    borrowButtons.forEach(button => {
        button.addEventListener("click", () => {
            const bookId = button.dataset.bookId;
            if (bookId) {
                borrowBook(bookId);
            }
        });
    });
    const returnButtons = bookTable.querySelectorAll(".return-button");
    returnButtons.forEach(button => {
        button.addEventListener("click", () => {
            const bookId = button.dataset.bookId;
            if (bookId) {
                returnBook(bookId);
            }
        });
    });
}
