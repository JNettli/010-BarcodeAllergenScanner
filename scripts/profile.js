const APIUrl = "https://raw.githubusercontent.com/JNettli/010-BarcodeAllergenScanner/main/products.json";

async function getContent(url){
    try{
        const response = await fetch(url);
        const data = await response.json();
        const allergenList = new Set();
        data.forEach(product => {
            product.allergens.forEach(allergen => {
                allergenList.add(allergen);
            });
        });
        const allergenCatalogue = [...allergenList];
        console.log(allergenList)
        return allergenCatalogue
    }
    catch{
        console.log("This does not work");
    }
}


function updateLocalStorageAllergens(allergen, checked) {
    if (checked) {
        localStorage.setItem(allergen, "true");
    } else {
        localStorage.removeItem(allergen);
    }
}

getContent(APIUrl)
    .then(allergenCatalogue => {
        const allergenContainer = document.getElementById("allergen-container");
        allergenCatalogue.forEach(allergen => {            
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.name = "allergen"
            checkbox.value = allergen;

            const label = document.createElement("label");
            label.textContent = allergen

            if (localStorage.getItem(allergen) === "true") {
                checkbox.checked = true;
            }

            checkbox.addEventListener("change", function() {
                updateLocalStorageAllergens(allergen, this.checked);
            });

            const allergenDiv = document.createElement("div");
            allergenDiv.appendChild(checkbox);
            allergenDiv.appendChild(label);

            allergenContainer.appendChild(allergenDiv);
       })
    })
    .catch(error => {
        console.log("Error", error)
    })

