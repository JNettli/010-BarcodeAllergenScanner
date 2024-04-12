const container = document.getElementById("container");
const productList = document.getElementById("productList");
const loadMore = document.getElementById("loadMore");
let pageNum = 20;

function fetchProducts(pageNum) {
    return fetch(`https://kassal.app/api/v1/products?size=${pageNum}`, {
        headers: {
            Authorization: "Bearer YTzc29dgYRKS0pMRtLeakhxiVSwUZe56i9ki9OCm",
        },
    })
        .then((resp) => {
            if (!resp.ok) {
                throw new Error("Network response was not ok");
            }
            return resp.json();
        })
        .catch((error) => {
            console.error("Error fetching product data:", error);
        });
}
// Function to display a single product
function displayProduct(data) {
    const productElement = document.createElement("a");
    productElement.className = "productList";
    productElement.href = `/products.html?id=${data.id}`;
    productElement.innerHTML = `
<h2>${data.name}</h2>
<img src="${data.image}" alt="${data.name}"/>
   `;
    container.appendChild(productElement);
}
// Function to display products
function displayProducts(products) {
    container.innerHTML = "";
    for (let i = 0; i < products.length; i++) {
        displayProduct(products[i]);
    }
}

// Fetch and display products
async function fetchData() {
    try {
        const products = await fetchProducts(pageNum);
        if (products) {
            displayProducts(products.data);
        } else {
            console.error("No products fetched");
        }
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}
fetchData();

function displayProducts(productsData) {
    productsData.forEach((product) => {
        displayProduct(product);
    });
}

function displayProduct(productData) {
    container.innerHTML += `
        <a class="productList" href="/product.html?ID=${productData.ean}">
            <h2>${productData.name}</h2>
            <img src="${productData.image}"/>
        </a>
    `;
}

loadMore.addEventListener("click", function () {
    container.innerHTML = "";
    pageNum += 20;
    fetchData();
});
