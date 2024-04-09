window.onload = function () {
    // Get the camera button element
    var cameraButton = document.getElementById("camera");

    // Get the scanner element
    var scanner = document.getElementById("scanner");

    // Add click event listener to the camera button
    cameraButton.addEventListener("click", function () {
        // Toggle the visibility of the scanner element
        if (scanner.style.display === "none" || scanner.style.display === "") {
            scanner.style.display = "block";
        } else {
            scanner.style.display = "none";
        }
    });
};
