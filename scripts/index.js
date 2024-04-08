const inputValue = document.getElementById("numeral-input");
const enterButton = document.getElementById("proceed-button");

inputValue.addEventListener('input', function(event){
    var trimmedValue = inputValue.value.slice(0, 13);
    inputValue.value = trimmedValue;
    
    if(inputValue.value.length < 13 && inputValue.value.length > 0){
        inputValue.style.backgroundColor = "pink";
    }
    else {
        inputValue.style.backgroundColor = "";
    }
});

enterButton.addEventListener('click', function(event) {
    if (inputValue.value.length === 13) {
        const inputValueValue = inputValue.value;
        const url = `product.html?ID=${inputValueValue}`;
        window.location.href = url;
    }
    else {
        window.alert("Please enter an EAN number with exactly 13 digits");}
});