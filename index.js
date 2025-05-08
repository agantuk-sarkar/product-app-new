import { navBar } from "./components/nav-bar.js";
import { displayProducts } from "./components/display-products.js";
import { debounce } from "./utils/debounce.js";
import {
  fetchAllProducts,
  fetchSearchProduct,
  fetchCategoryList,
  fetchProductsByCategory,
} from "./components/fetch-products.js";

// getting the html element nav-bar into js
document.querySelector(".nav-bar").innerHTML = navBar();

// getting the html element product main card container into js
const main_product_container = document.querySelector(
  ".product-main-card-container"
);

// getting the search input html element into js
const search_input = document.getElementById("search-input");

// getting the sort by category html element into js
const sort_by_category = document.getElementById("sort-by-category");

// getting the cross icon html element into js
const cross_icon = document.querySelector(
  ".search-and-sortBy-category-container > i"
);

// taking global values
let pageNo = 1;
let limit = 10;
let totalItems = 0;
let hasMoreData = true;
let searchQuery = "";

// function for resolving the promise for the fetch API call getAllProducts
async function getAllProducts(pageNo, limit) {
  let skip = (pageNo - 1) * limit;
  const all_products = await fetchAllProducts(skip, limit);
  const totalItems = all_products.total;
  //   console.log(all_products.products);
  if (skip + limit > totalItems) {
    hasMoreData = false;
  }

  showProducts(main_product_container, all_products.products);
}
loadProducts(pageNo, limit);

// function to show products
function showProducts(productContainer, products) {
  if (hasMoreData && products) {
    displayProducts(productContainer, products);
  }
}

// code for infinite scrolling
window.addEventListener("scroll", (event) => {
  const { clientHeight, scrollTop, scrollHeight } =
    event.target.documentElement;

  if (clientHeight + scrollTop + 10 >= scrollHeight) {
    pageNo = pageNo + 1;
    limit = 10;

    if (hasMoreData) {
      loadProducts(pageNo, limit);
    }
  }
});

// input event for search input
search_input.addEventListener("input", (event) => {
  const search_text = event.target.value;
  pageNo = 1;
  limit = 10;
  functionToPass(search_text, pageNo, limit);
});

const functionToPass = debounce(test, 2000);

// test function which is funcToCall
function test(searchText, pageNo, limit) {
  main_product_container.innerHTML = "";
  searchQuery = searchText;

  loadProducts(pageNo, limit);
}

// click event for cross icon to remove the search input and show all products
cross_icon.addEventListener("click", async () => {
  main_product_container.innerHTML = "";
  pageNo = 1;
  limit = 10;
  let skip = (pageNo - 1) * limit;
  const all_products = await fetchAllProducts(skip, limit);
  search_input.value = null;
  displayProducts(main_product_container, all_products.products);
});

// function to load products
function loadProducts(pageNo, limit) {
  if (searchQuery) {
    getSearchProduct(searchQuery, pageNo, limit);
  } else {
    getAllProducts(pageNo, limit);
  }
}

// function to get search product
async function getSearchProduct(search_text, pageNo, limit) {
  let skip = (pageNo - 1) * limit;
  const searched_products = await fetchSearchProduct(search_text, skip, limit);

  totalItems = searched_products.total;

  if (skip + limit > totalItems) {
    hasMoreData = false;
  }
  displayProducts(main_product_container, searched_products.products);
}

// function to get category list
async function getCategoryList() {
  const category_list = await fetchCategoryList();

  if (category_list) {
    console.log("category_list:",category_list);
    category_list.map((category) => {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category;
      sort_by_category.append(option);
    });
  }
}
getCategoryList();

// function to get products by category
function getProductsByCategory() {
  sort_by_category.addEventListener("change", async (event) => {
    main_product_container.innerHTML = "";
    hasMoreData = false;

    const getCategoryProducts = await fetchProductsByCategory(
      event.target.value
    );

    displayProducts(main_product_container, getCategoryProducts.products);
  });
}

getProductsByCategory();

// code for toggling theme from dark to light
const theme_icon = document.querySelector(".theme-icon");
const moon_icon = document.querySelector(".theme-icon > i");

// click event for moon icon
moon_icon.addEventListener("click", toggleDarkTheme);

// applying the theme preference when page is refreshed
applyThemePreference();

// function to toggle dark theme
function toggleDarkTheme() {
  theme_icon.innerHTML = "";
  setTheme("dark");

  const sun_icon = document.createElement("span");
  sun_icon.innerHTML = `<i class="lni lni-sun-1"></i>`;

  const sun_icon_text = document.createElement("span");
  sun_icon_text.textContent = "Light Mode";

  theme_icon.append(sun_icon, sun_icon_text);

  sun_icon.addEventListener("click", toggleLightTheme);
}

// function to toggle light theme
function toggleLightTheme() {
  theme_icon.innerHTML = "";
  setTheme("light");

  const moon_icon_text = document.createElement("span");
  moon_icon_text.textContent = "Dark Mode";

  theme_icon.append(moon_icon, moon_icon_text);
  moon_icon.addEventListener("click", toggleDarkTheme);
}

// function to set given theme
function setTheme(themeName) {
  localStorage.setItem("theme", themeName);
  document.documentElement.setAttribute("data-theme", themeName);
}

// function to apply the theme when the page is refreshed
function applyThemePreference() {
  const storedTheme = localStorage.getItem("theme") || "light";
  setTheme(storedTheme);
  theme_icon.innerHTML = "";

  if (storedTheme === "dark") {
    const sun_icon = document.createElement("span");
    sun_icon.innerHTML = `<i class="lni lni-sun-1"></i>`;

    const sun_icon_text = document.createElement("span");
    sun_icon_text.textContent = "Light Mode";

    theme_icon.append(sun_icon, sun_icon_text);

    sun_icon.addEventListener("click", toggleLightTheme);
  } else {
    const moon_icon_text = document.createElement("span");
    moon_icon_text.textContent = "Dark Mode";

    theme_icon.append(moon_icon, moon_icon_text);
  }
}
