const productContainer = document.getElementById("fetch-content");
const ApiUrl = "https://kassal.app/api/v1/products/ean/"
const url = window.location.search;
let eanId = url.slice(4,17) 
console.log(eanId)
let newUrl = ApiUrl+eanId
console.log(newUrl)


function emphasizeAllergens() {
    const allergensContainer = document.getElementById("allergens-container");
    const allergenDivs = allergensContainer.querySelectorAll(".allergen");

    allergenDivs.forEach(div => {
        const allergenName = div.textContent.trim();
        if (localStorage.getItem(allergenName) === "true") {
            div.classList.add("emphasized");
        }
    });
}

function amendProduct(data) {
    if (data.data.products.length > 0) {
        const product = data.data.products[0]; // Assuming you want the first product
        const allergens = data.data.allergens; // Assuming allergens array is directly accessible
        
        const productInfo = `
            <h1>${product.name}</h1>
            <img src="${product.image}" alt="${product.name}" id="product-image">
            <p>Allergens:</p>
            <div id="allergens-container">
                ${allergens.map(allergen => `<div class="allergen">${allergen}</div>`).join('')}
            </div>
        `;
        productContainer.innerHTML = productInfo;
        emphasizeAllergens();
    } else {
        const titleElement = document.createElement('h2');
        titleElement.textContent = "Product not found";
        productContainer.appendChild(titleElement);
    }
}

fetch(newUrl, {
    headers: {
      Authorization: "Bearer YTzc29dgYRKS0pMRtLeakhxiVSwUZe56i9ki9OCm",
    },
  })
    .then(response => response.json())
    .then(data => amendProduct(data))
    .catch(error => console.log(error));