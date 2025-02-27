let books = loadBooksFromLocalStorage();
let users = loadUsersFromLocalStorage();
let subscribers = [];
export function createUser(user) {
    if (users.some((u) => u.username === user.username)) {
        throw new Error("Username already exists!");
    }
    users.push(user);
    saveUsersToLocalStorage();
    notifySubscribers();
}
export function authenticateUser(username, password) {
    const user = users.find((u) => u.username === username);
    if (!user || user.password !== password) {
        throw new Error("Invalid user");
    }
    return user;
}
function saveBooksToLocalStorage() {
    localStorage.setItem('books', JSON.stringify(books));
}
function loadBooksFromLocalStorage() {
    const storedBooks = localStorage.getItem("books");
    return storedBooks ? JSON.parse(storedBooks) : [
        { id: crypto.randomUUID().replace("-", "").slice(-8), title: "Acting and Reflecting", author: "Wilfried Sieg", category: "Philosophy", status: "Taken" },
        { id: crypto.randomUUID().replace("-", "").slice(-8), title: "A Game of Throns", author: "George R. R. Martin", category: "Science", status: "Free" },
        { id: crypto.randomUUID().replace("-", "").slice(-8), title: "Chaotic Phenomena in Astrophysics", author: "J. R. Buchler", category: "Fiction", status: "Free" },
        { id: crypto.randomUUID().replace("-", "").slice(-8), title: "Hell is My Heaven", author: "Jeneth Murrey", category: "Romance", status: "Free" },
        { id: crypto.randomUUID().replace("-", "").slice(-8), title: "Marriage Ultimatum", author: "Lindsay Armstrong", category: "Romance", status: "Free" },
        { id: crypto.randomUUID().replace("-", "").slice(-8), title: "The Time Machine", author: "Lindsay Armstrong", category: "Fiction", status: "Free" },
        { id: crypto.randomUUID().replace("-", "").slice(-8), title: "Fear No Evil", author: "Anatoly Shcharansky", category: "Biography", status: "Free" }
    ];
}
export function saveUsersToLocalStorage() {
    localStorage.setItem("users", JSON.stringify(users));
}
export function loadUsersFromLocalStorage() {
    const storedUserd = localStorage.getItem("users");
    return storedUserd ? JSON.parse(storedUserd) : [];
}
export function orderBook(book) {
    if (books.some((b) => b.id === book.id)) {
        throw new Error("Somebody already asked to order this book");
    }
    books.push(book);
    saveBooksToLocalStorage();
    notifySubscribers();
}
export function reportLostBook(bookId) {
    const book = books.find((b) => b.id === bookId);
    if (book) {
        book.status = "Taken";
        saveBooksToLocalStorage();
        notifySubscribers();
    }
}
export function getBooks() {
    return books;
}
export function onBooksUpdate(callback) {
    subscribers.push(callback);
}
export function notifySubscribers() {
    subscribers.forEach((callback) => callback());
}
export function addBookToUser(username, book) {
    const user = users.find((u => u.username === username));
    if (user) {
        book.owner = username;
        user.borrowedBooks.push(book);
        saveUsersToLocalStorage();
        notifySubscribers();
    }
}
export function removeBookFromUser(username, bookId) {
    const user = users.find((u => u.username === username));
    if (user) {
        user.borrowedBooks = user.borrowedBooks.filter((book) => book.id !== bookId);
        saveUsersToLocalStorage();
        notifySubscribers();
    }
}
export function updateBookStatus(bookId, status) {
    const book = books.find((b) => b.id === bookId);
    if (book) {
        book.status = status;
        saveBooksToLocalStorage();
        notifySubscribers();
    }
}
export function getBorrowedBooks(username) {
    const user = users.find((u) => u.username === username);
    return user ? user.borrowedBooks : [];
}
