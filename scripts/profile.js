const APIUrl = "https://kassal.app/api/v1/products/ean/7044610875996";

async function getContent(url) {
    try {
        const response = await fetch(url, {
            headers: {
                Authorization:
                    "Bearer YTzc29dgYRKS0pMRtLeakhxiVSwUZe56i9ki9OCm",
            },
        });
        const data = await response.json();
        const allergenList = new Set();
        data.data.allergens.forEach((product) => {
            data.data.allergens.forEach((allergen) => {
                allergenList.add(allergen.display_name);
            });
        });
        const allergenCatalogue = [...allergenList];
        return allergenCatalogue;
    } catch {
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
    .then((allergenCatalogue) => {
        const allergenContainer = document.getElementById("allergenContainer");
        allergenCatalogue.forEach((allergen) => {
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.name = "allergen";
            checkbox.value = allergen;

            const label = document.createElement("label");
            label.textContent = allergen;

            if (localStorage.getItem(allergen) === "true") {
                checkbox.checked = true;
            }

            checkbox.addEventListener("change", function () {
                updateLocalStorageAllergens(allergen, this.checked);
            });

            const allergenDiv = document.createElement("div");
            allergenDiv.appendChild(checkbox);
            allergenDiv.appendChild(label);

            allergenContainer.appendChild(allergenDiv);
        });
    })
    .catch((error) => {
        console.log("Error", error);
    });
