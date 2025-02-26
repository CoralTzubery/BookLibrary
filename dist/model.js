let books = [];
let userBooks = [];
let subscribers = [];
export function orderBook(book) {
    if (books.some((b) => b.id === book.id)) {
        throw new Error("Somebody already asked to order this book");
    }
    books.push(book);
    notifySubscribers();
}
export function reportLostBook(bookId) {
    const book = books.find((b) => b.id === bookId);
    if (book) {
        book.status = "Taken";
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
    notifySubscribers();
}
export function removeBookFromUser(bookId) {
    userBooks = userBooks.filter((book) => book.id !== bookId);
    notifySubscribers();
}
export function updateBookStatus(bookId, status) {
    const book = books.find((b) => b.id === bookId);
    if (book) {
        book.status = status;
        notifySubscribers();
    }
}
