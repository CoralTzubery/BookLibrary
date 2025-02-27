import { Book, getBooks, getUserBook} from "./model.js";
import { borrowBook, returnBook } from "./controller.js";

export function renderBooks(books: Book[]) {
    const bookList = document.querySelector(".recently-added") as HTMLUListElement;
    const bookTable = document.querySelector(".book-table") as HTMLTableElement;

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
                            <button class="borrow-button ${book.status === 'Taken' || book.status === 'Lost' ? 'hidden' : ''}" data-book-id="${book.id}">Borrow</button>
                            <button class="return-button ${book.status === 'Free' || book.status === 'Lost' ? 'hidden' : ''}" data-book-id="${book.id}">Return</button>
                        </td>
                    </tr>
                `).join("")}
            </tbody>
        `;
    }

    document.addEventListener('DOMContentLoaded', () => {
        const bookTable = document.querySelector('.book-table') as HTMLTableElement;
        
        if (bookTable) {
            bookTable.addEventListener('click', (event) => {
                const target = event.target as HTMLElement;
                
                if (target.classList.contains('borrow-button')) {
                    const bookId = target.dataset.bookId;

                    if (bookId) {
                        borrowBook(bookId);
                        renderBooks(getBooks());
                        renderMyBooks(getUserBook());
                    }
            
                } else if (target.classList.contains('return-button')) {
                    const bookId = target.dataset.bookId;

                    if (bookId) {
                        returnBook(bookId);
                        renderBooks(getBooks());
                        renderMyBooks(getUserBook());
                    }
                }
            });
        }
    });
}

export function renderMyBooks(books: Book[]) {
    const bookTable = document.querySelector(".my-books") as HTMLTableElement; // שימו לב: my-books
    
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
                ${books.map((book) => `
                    <tr>
                        <td>${book.title}</td>
                        <td>${book.author}</td>
                        <td>${book.category}</td>
                        <td><button class="return-button" data-book-id="${book.id}">Return</button></td>
                    </tr>
                `).join("")}
            </tbody>
        `;


        bookTable.addEventListener('click', (event) => {
            const target = event.target as HTMLElement;

            if (target.classList.contains('return-button')) {
                const bookId = target.dataset.bookId;

                if (bookId) {
                    returnBook(bookId);
                    renderMyBooks(getUserBook());
                    renderBooks(getBooks()); 
                }
            }
        });
    }
}

export function removeRowFromTable(bookId: string) {
    const row = document.getElementById(`book-${bookId}`);

    if (row) {
        row.remove();
    }
}