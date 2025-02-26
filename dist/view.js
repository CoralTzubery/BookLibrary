import { getBooks } from "./model.js";
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
                    <button class="borrow-button" data-book-id="${book.id}">${book.status === "Free" ? "Borrow" : "Taken"}</button>
                    <button class="return-button" data-book-id="${book.id}">${book.status === "Free" ? "Return" : "Taken"}</button>
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
                    <td>
                        <button class="borrow-button ${book.status === 'Taken' ? 'hidden' : ''}" data-book-id="${book.id}">Borrow</button>
                        <button class="return-button ${book.status === 'Free' ? 'hidden' : ''}" data-book-id="${book.id}">Return</button>
                    </td>
                </tr>
            `).join("")}
        </tbody>
        `;
    }
    bookTable.addEventListener('click', (event) => {
        const target = event.target;
        if (target.classList.contains('borrow-button')) {
            const bookId = target.dataset.bookId;
            if (bookId) {
                borrowBook(bookId);
                renderBooks(getBooks());
            }
        }
        else if (target.classList.contains('return-button')) {
            const bookId = target.dataset.bookId;
            if (bookId) {
                returnBook(bookId);
                renderBooks(getBooks());
            }
        }
    });
}
export function renderUserBooks(books) {
    const bookTable = document.querySelector(".book-table");
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
}
export function renderRecentlyAdded(books) {
    const recentlyAddedList = document.querySelector('.recently-added');
    if (recentlyAddedList) {
        recentlyAddedList.innerHTML = books.slice(0, 4).map(book => ` //slice(0,4) for the first 4 books
            <li class="card">
                <a href="#">
                    <img src="pictures/default.jpg" alt="<span class="math-inline">\{book\.title\}"\> <p\>default picture for books without one yet</p\>
                    <p>{book.category}</p>
                    <p>book.title</p><p>{book.author}</p>
                    <button class="borrow-button" data-book-id="book.id">{book.status === "Free" ? "Borrow" : "Taken"}</button>
                    <button class="return-button" data-book-id="book.id">{book.status === "Free" ? "Return" : "Taken"}</button>
                </a>
            </li>
        `).join('');
    }
}
