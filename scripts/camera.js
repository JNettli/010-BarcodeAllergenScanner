window.onload = function () {
    var cameraButton = document.getElementById("camera");
    var scanner = document.getElementById("scanner");
    var manualInput = document.querySelector(".manualDiv");

    cameraButton.addEventListener("click", function () {
        if (scanner.style.display === "none" || scanner.style.display === "") {
            scanner.style.display = "block";
            manualInput.style.display = "none";
            setTimeout(function () {
                scanner.style.display = "none";
                manualInput.style.display = "block";
                showToast("Please Enter Barcode Manually");
            }, 4000);
        } else {
            scanner.style.display = "none";
            manualInput.style.display = "block";
        }
    });

    function showToast(message) {
        var toast = document.createElement("div");
        toast.classList.add("toast");
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(function () {
            document.body.removeChild(toast);
        }, 4000);
    }
};