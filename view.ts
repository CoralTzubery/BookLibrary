import { Book } from "./model.js";

export function renderBooks(books: Book[]) {
    const bookList = document.querySelector(".recently-added") as HTMLUListElement;
    const bookTable = document.querySelector(".book-table") as HTMLTableElement;

    if (bookList) {
        bookList.innerHTML = books.map((book) => `
            <li class="card">
                <a hred ="#">
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
            <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th>Action</th>
            </tr>
            ${books.map((book) => `
                <tr>
                    <td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.category}</td>
                    <td>${book.status}</td>
                    <td><button onclick="borrowBook('${book.id}')">${book.status === "Free" ? "Borrow" : "Return"}</button></td>
                </tr>
            `).join("")}
        `;
    }
}