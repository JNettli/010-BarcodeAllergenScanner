const productContainer = document.getElementById("fetch-content");
const ApiUrl = "https://raw.githubusercontent.com/JNettli/010-BarcodeAllergenScanner/main/products.json"
const url = window.location.search;
let eanId = url.slice(4,17) 
console.log(eanId)

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
    const product = data.find(item => item.id === eanId);
    if (product) {
        const productInfo = `
            <h1>${product.title}</h1>
            <img src="${product.image}" alt="${product.title}" id="product-image">
            <p>Allergens:</p>
            <div id="allergens-container">
                ${product.allergens.map(allergen => `<div class="allergen">${allergen}</div>`).join('')}
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


fetch(ApiUrl)
    .then(response => response.json())
    .then(data => amendProduct(data))
    .catch(error => console.log(error));