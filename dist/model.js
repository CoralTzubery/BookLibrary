let books = [];
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
}
export function notifySubscribers() {
    subscribers.forEach((callback) => callback());
}
