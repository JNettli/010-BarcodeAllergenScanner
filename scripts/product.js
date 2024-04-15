const productContainer = document.getElementById("fetchContent");
const ApiUrl = "https://kassal.app/api/v1/products/ean/";
const url = window.location.search;
let eanId = url.slice(4, 17);
let newUrl = ApiUrl + eanId;

function emphasizeAllergens() {
    const allergensContainer = document.getElementById("allergensContainer");
    const allergenDivs = allergensContainer.querySelectorAll(".allergen");

    allergenDivs.forEach((div) => {
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
        const filteredAllergens = allergens.filter(
            (allergen) => allergen.contains === "YES"
        );
        const nutrition = data.data.nutrition;

        const productInfo = `
            <div id="productInfo">
            <h1>${product.name}</h1>
            <img src="${product.image}" alt="${product.name}" id="productImage">
            </div>
            <div id="allergenInfo">
            <h3>Allergens:</h3>
            <div id="allergensContainer">
                ${filteredAllergens
                    .map(
                        (allergen) =>
                            `<div class="allergen">${allergen.display_name}</div>`
                    )
                    .join("")}
            </div>
            </div>
            <div id="nutritionInfo">
            <h3>Nutrition:</h3>
            <ul id="nutritionContainer">
                ${nutrition
                    .map(
                        (nutrient) =>
                            `<li><strong>${nutrient.display_name}:</strong> ${nutrient.amount} ${nutrient.unit}</li>`
                    )
                    .join("")}
            </ul>
            </div>
        `;

        productContainer.innerHTML = productInfo;
        emphasizeAllergens();
    } else {
        const titleElement = document.createElement("h2");
        titleElement.textContent = "Product not found";
        productContainer.appendChild(titleElement);
    }
}

fetch(newUrl, {
    headers: {
        Authorization: "Bearer YTzc29dgYRKS0pMRtLeakhxiVSwUZe56i9ki9OCm",
    },
})
    .then((response) => response.json())
    .then((data) => amendProduct(data))
    .catch((error) => console.log(error));
