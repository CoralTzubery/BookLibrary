let books = loadBooksFromLocalStorage();
let userBooks = loadUserBooksFromLocalStorage();
let subscribers = [];
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
        { id: crypto.randomUUID().replace("-", "").slice(-8), title: "Marriage Ultimatum", author: "Lindsay Armstrong", category: "Romance", status: "Taken" },
        { id: crypto.randomUUID().replace("-", "").slice(-8), title: "The Time Machine", author: "Lindsay Armstrong", category: "Fiction", status: "Taken" },
        { id: crypto.randomUUID().replace("-", "").slice(-8), title: "Fear No Evil", author: "Anatoly Shcharansky", category: "Biography", status: "Taken" }
    ];
}
function saveUserBooksToLocalStorage() {
    localStorage.setItem('userBooks', JSON.stringify(userBooks));
}
function loadUserBooksFromLocalStorage() {
    const storedUserBooks = localStorage.getItem('userBooks');
    const loadedBooks = storedUserBooks ? JSON.parse(storedUserBooks) : [
        { id: crypto.randomUUID().replace("-", "").slice(-8), title: "Acting and Reflecting", author: "Wilfried Sieg", category: "Philosophy", status: "Taken" },
        { id: crypto.randomUUID().replace("-", "").slice(-8), title: "Marriage Ultimatum", author: "Lindsay Armstrong", category: "Romance", status: "Taken" },
        { id: crypto.randomUUID().replace("-", "").slice(-8), title: "The Time Machine", author: "Lindsay Armstrong", category: "Fiction", status: "Taken" },
        { id: crypto.randomUUID().replace("-", "").slice(-8), title: "Fear No Evil", author: "Anatoly Shcharansky", category: "Biography", status: "Taken" },
    ];
    console.log(loadedBooks);
    return loadedBooks;
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
export function getUserBook() {
    return userBooks;
}
export function addBookToUser(book) {
    userBooks.push(book);
    saveUserBooksToLocalStorage();
    notifySubscribers();
}
export function removeBookFromUser(bookId) {
    userBooks = userBooks.filter((book) => book.id !== bookId);
    saveUserBooksToLocalStorage();
    notifySubscribers();
}
export function updateBookStatus(bookId, status) {
    const book = books.find((b) => b.id === bookId);
    if (book) {
        book.status = status;
        saveBooksToLocalStorage();
        notifySubscribers();
    }
}
