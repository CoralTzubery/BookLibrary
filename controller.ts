import { orderBook, reportLostBook, getBooks, onBooksUpdate } from "./model.js";

export function onOrderBookSumbit(formData: FormData) {
    const title = formData.get("title");
    const author = formData.get("author");
    const category = formData.get("category");

    if (typeof title !== "string") {
        throw new Error("The title must be a strin.");
    }

    if (typeof author !== "string") {
        throw new Error("The author name must be a strin.");
    }

    if (typeof category !== "string") {
        throw new Error("The category must be a strin.");
    }

    if (!title || !author || !category) {
        throw new Error("All the lines must be filled");
    }

    orderBook ({
        id: crypto.randomUUID().replace("-", "").slice(-8),
        title,
        author,
        category,
        status: "Free",
    });
}
