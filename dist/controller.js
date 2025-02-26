import { orderBook, getBooks, onBooksUpdate } from "./model.js";
import { renderBooks } from "./view.js";
onBooksUpdate(() => renderBooks(getBooks()));
export function setupOrderForm() {
    const form = document.querySelector("form[name='order-new'");
    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const formData = new FormData(form);
            const title = formData.get("title");
            const author = formData.get("author");
            const category = formData.get("category");
            if (!title || !author || !category) {
                throw new Error("All the fields must be filled");
                return;
            }
            orderBook({
                id: crypto.randomUUID().replace("-", "").slice(-8),
                title,
                author,
                category,
                status: "Free",
            });
            form.reset();
        });
    }
}
