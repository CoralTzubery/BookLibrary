let books = [
    { id: crypto.randomUUID().replace("-", "").slice(-8), title: "Acting and Reflecting", author: "Wilfried Sieg", category: "Philosophy", status: "Taken" },
    { id: crypto.randomUUID().replace("-", "").slice(-8), title: "A Game of Throns", author: "George R. R. Martin", category: "Science", status: "Free" },
    { id: crypto.randomUUID().replace("-", "").slice(-8), title: "Chaotic Phenomena in Astrophysics", author: "J. R. Buchler", category: "Fiction", status: "Free" },
    { id: crypto.randomUUID().replace("-", "").slice(-8), title: "Hell is My Heaven", author: "Jeneth Murrey", category: "Romance", status: "Free" },
    { id: crypto.randomUUID().replace("-", "").slice(-8), title: "Marriage Ultimatum", author: "Lindsay Armstrong", category: "Romance", status: "Taken" },
    { id: crypto.randomUUID().replace("-", "").slice(-8), title: "The Time Machine", author: "Lindsay Armstrong", category: "Fiction", status: "Taken" },
    { id: crypto.randomUUID().replace("-", "").slice(-8), title: "Fear No Evil", author: "Anatoly Shcharansky", category: "Biography", status: "Taken" },
];
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
