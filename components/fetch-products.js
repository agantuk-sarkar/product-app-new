// get all products API
export const fetchAllProducts = async (skip,limit)=>{
    try{
        const response = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);

        if(response.ok){
            const data = await response.json();
            return data;
        } else {
            throw new Error("404 Error");
        }
    } catch(error){
        console.log("error:",error);
    }
}

// get search product API
export const fetchSearchProduct = async (searchText,skip,limit)=>{
    try{
        const response = await fetch(`https://dummyjson.com/products/search?q=${searchText}&limit=${limit}&skip=${skip}`);

        if(response.ok){
            const data = await response.json();
            return data;
        } else {
            throw new Error("Invalid request");
        }
    }catch(error){
        console.log("error:",error);
    }
}

// get all the category list API
export const fetchCategoryList = async ()=>{
    try{
        const response = await fetch("https://dummyjson.com/products/category-list");

        if(response.ok){
            const data = await response.json();
            return data;
        } else {
            throw new Error("Invalid request");
        }
    } catch(error){
        console.log("error:",error);
    }
}

// get products by category API
export const fetchProductsByCategory = async(categoryTag)=>{
    try{
        const response = await fetch(`https://dummyjson.com/products/category/${categoryTag}`);

        if(response.ok){
            const data = await response.json();
            return data;
        } else {
            throw new Error("400 Bad request");
        }
    } catch(error){
        console.log("error:",error);
    }
}

// get single product by id
export const fetchSingleProductById = async (id)=>{
    try{
        const response = await fetch(`https://dummyjson.com/products/${id}`);

        if(response.ok){
            const data = await response.json();
            return data;
        } else {
            throw new Error("404 Bad request");
        }
    } catch(error){
        console.log("error:",error);
    }
}