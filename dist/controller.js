export function onAddBookSumbit() {
    const form = document.getElementById("order-new");
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const title = document.querySelector("#title").value;
        const author = document.querySelector("#author").value;
        const category = document.querySelector("#category").value;
        if (!title || !author || !category) {
            throw new Error("All the inputs must be filled");
            return;
        }
        console.log("title:", title);
        console.log("author:", author);
        console.log("category:", category);
    });
}
