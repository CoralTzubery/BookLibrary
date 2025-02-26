type Book = {
    id: string,
    title: string,
    author: string;
    category: string,
    status: "Free" | "Taken",
}

let books: Book[] = [];
let subscribers: (() => void)[]= [];

export function orderBook(book: Book) {
    if (books.some((b) => b.id === book.id)) {
        throw new Error("Somebody already asked to order this book");
    }

    books.push(book);
    notifySubscribers();
}

export function reportLostBook(bookId: string) {
    const book = books.find((b) => b.id === bookId);
    
    if (book) {
        book.status = "Taken";
        notifySubscribers();
    }
}

export function getBooks() {
    return books;
}

export function onBooksUpdate(callback: () => void) {
    
}

export function notifySubscribers() {
    subscribers.forEach((callback) => callback());
}