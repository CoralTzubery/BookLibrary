import { addBook, reportLostBook } from "./model.js";

export function onAddBookSumbit() {
    const form = document.getElementById("order-new") as HTMLFormElement;

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const title = (document.querySelector("#title") as HTMLInputElement).value;
        const author = (document.querySelector("#author") as HTMLInputElement).value;
        const category = (document.querySelector("#category") as HTMLSelectElement).value;

        if(!title || !author || !category) {
            throw new Error("All the inputs must be filled");
            return;
        }
        console.log("title:", title);
        console.log("author:", author);
        console.log("category:", category);
    });
}
