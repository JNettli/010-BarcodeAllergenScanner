const container = document.getElementById("container");
const nextBTN = document.getElementById("nextBTN");
const prevBTN = document.getElementById("prevBTN");
let pageNum = 1;

// Function to fetch products from the API
function fetchProducts(pageNum) {
    return fetch(`https://kassal.app/api/v1/products?page=${pageNum}`, {
        method: "GET",
        headers: {
            Authorization: "Bearer YTzc29dgYRKS0pMRtLeakhxiVSwUZe56i9ki9OCm",
        },
    })
        .then((resp) => resp.json())
        .catch((error) => {
            console.error("Error fetching product data:", error);
            throw error;
        });
}

// Function to display products
function displayProducts(products) {
    container.innerHTML = "";
    products.forEach((product) => {
        displayProduct(product);
    });
}

// Function to display a single product
function displayProduct(data) {
    container.innerHTML += `
        <div class="productList">
            <h2>${data.name}</h2>
            <img src="${data.image}"/>
        </div>
    `;
}

// Function to handle next button click
nextBTN.addEventListener("click", function () {
    pageNum++;
    fetchMultiplePages();
});

// Function to handle previous button click
prevBTN.addEventListener("click", function () {
    if (pageNum > 1) {
        pageNum--;
        fetchMultiplePages();
    }
});

// Fetch and display multiple pages on load
fetchMultiplePages();

// Function to fetch multiple pages
function fetchMultiplePages() {
    const numPagesToFetch = 2;
    const pageNumbersToFetch = Array.from(
        { length: numPagesToFetch },
        (_, i) => pageNum + i
    );

    Promise.all(pageNumbersToFetch.map((pageNum) => fetchProducts(pageNum)))
        .then((pageResults) => {
            products = pageResults.reduce(
                (acc, pageResult) => acc.concat(pageResult.data),
                []
            );
            displayProducts(products);
        })
        .catch((error) => {
            console.error("Error fetching multiple pages:", error);
        });
}
