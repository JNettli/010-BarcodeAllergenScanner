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
        const product = data.data.products[0];
        const allergens = data.data.allergens;
        const filteredAllergens = allergens.filter(allergen => allergen.contains === "YES");
        
        const productInfo = `
            <h1>${product.name}</h1>
            <img src="${product.image}" alt="${product.name}" id="productImage">
            <p>Allergens:</p>
            <div id="allergens-container">
                ${filteredAllergens.map(allergen => `<div class="allergen">${allergen.display_name}</div>`).join('')}
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