import { fetchSingleProductById } from "../components/fetch-products.js";
import { displaySingleProduct } from "../components/display-single-product.js";

// getting the html element product-main-container into js
const product_main_container = document.querySelector(".product-main-container");

// Parse the URL query parameters
let query_parameters = new URLSearchParams(window.location.search);

// Get the ID from query parameters
let id = query_parameters.get("id");
console.log("id:",id);

let singleProductArray = [];

// function to get single product by Id
async function getSingleProduct(id){
    const single_product = await fetchSingleProductById(id);
    singleProductArray.push(single_product);

    displaySingleProduct(product_main_container,singleProductArray);
}
getSingleProduct(id);