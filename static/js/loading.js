document.addEventListener("DOMContentLoaded", function() {
    // Muestra el pez de carga
    document.getElementById("loadingDiv").style.display = "block";

    // El pez de carga se oculta luego de 2 segundos
    setTimeout(function() {
        document.getElementById("loadingDiv").style.display = "none";
    }, 2000);
});



