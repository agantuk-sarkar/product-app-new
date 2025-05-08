export const displayProducts = (main_product_container, data) => {
  // main_product_container.innerHTML = "";
  console.log("data:", data);

  // using higher order function to create multiple card container
  data?.map((product) => {
    const card_container = document.createElement("div");
    card_container.classList.add("card-container");

    const image_container = document.createElement("div");
    image_container.classList.add("image-container");

    const image = document.createElement("img");
    image.classList.add("image");
    image.src = product.thumbnail;

    const text_container = document.createElement("div");
    text_container.classList.add("text-container");

    const title = document.createElement("p");
    title.classList.add("title");
    title.textContent = product.title;

    const rating = document.createElement("p");
    rating.classList.add("rating");
    rating.textContent = `Rating: ${product.rating}`;

    const description = document.createElement("p");
    description.classList.add("description");
    description.textContent = product.description;

    const view_details_button = document.createElement("button");
    view_details_button.classList.add("view-details-button");
    view_details_button.textContent = "View Details";
    view_details_button.addEventListener("click", () => {
      window.location.href = `./pages/single-product.html?id=${product.id}`;
    });

    text_container.append(title, rating, description, view_details_button);

    image_container.append(image);
    card_container.append(image_container, text_container);
    main_product_container.append(card_container);
  });
};
