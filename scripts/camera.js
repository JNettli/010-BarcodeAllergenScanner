window.onload = function() {

  var cameraButton = document.getElementById("camera");
  var scanner = document.getElementById("scanner");
  var manualInput = document.querySelector(".manualDiv");
  
  cameraButton.addEventListener("click", function() {
    // Toggle visibility of scanner section
    if (scanner.style.display === "none" || scanner.style.display === "") {
      scanner.style.display = "block";
     
      // Hide scanner section after 3 seconds and show toast message
      setTimeout(function() {
        scanner.style.display = "none";
       
        showToast("Please Enter Barcode Manually");
      }, 4000);
    } else {
      scanner.style.display = "none";
 
    }
  });
  
  function showToast(message) {
    var toast = document.createElement("div");
    toast.classList.add("toast");
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(function() {
      document.body.removeChild(toast);
    }, 3000);
  }
};
