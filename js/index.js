

var nombreInput = document.getElementById("nombre");
var correoInput = document.getElementById("correo");
var fechaInput = document.getElementById("fechaNacimiento");
var telInput = document.getElementById("telefono");
var passInput = document.getElementById("password");
var bioInput = document.getElementById("bio");
var form = document.getElementById("formRegistro");


nombreInput.addEventListener("input", function () {
    var hint = document.getElementById("nombreHint");
    if (this.value == "") {
        this.className = "";
        hint.textContent = "";
        hint.className = "form-hint";
    } else if (soloLetras(this.value)) {
        this.className = "valid";
        hint.textContent = "✓ Solo letras, correcto";
        hint.className = "form-hint success";
    } else {
        this.className = "invalid";
        hint.textContent = "✗ Solo se permiten letras y acentos";
        hint.className = "form-hint error";
    }
});


correoInput.addEventListener("input", function () {
    var hint = document.getElementById("correoHint");
    if (this.value == "") {
        this.className = "";
        hint.textContent = "";
        hint.className = "form-hint";
    } else if (validarCorreo(this.value)) {
        this.className = "valid";
        hint.textContent = "✓ Correo válido";
        hint.className = "form-hint success";
    } else {
        this.className = "invalid";
        hint.textContent = "✗ Formato de correo inválido";
        hint.className = "form-hint error";
    }
});


fechaInput.addEventListener("change", function () {
    var hint = document.getElementById("fechaHint");
    if (this.value == "") {
        hint.textContent = "";
        hint.className = "form-hint";
        return;
    }

    var edad = calcularEdad(this.value);
    var mayor = esMayorDeEdad(this.value);


    var textoModal = document.getElementById("modalTexto");
    var badge = document.getElementById("modalBadge");

    textoModal.innerHTML = "Tienes <strong>" + edad + "</strong> años.";

    if (mayor) {
        badge.innerHTML = '<span class="badge mayor">Mayor de edad</span>';
        hint.textContent = "Mayor de edad (" + edad + " años)";
        hint.className = "form-hint success";
        this.className = "valid";
    } else {
        badge.innerHTML = '<span class="badge menor">Menor de edad</span>';
        hint.textContent = "Menor de edad (" + edad + " años)";
        hint.className = "form-hint error";
        this.className = "invalid";
    }
    abrirModal();
});


telInput.addEventListener("input", function () {
    var hint = document.getElementById("telefonoHint");
    var digitos = this.value.replace(/\D/g, "");

    if (digitos == "") {
        this.className = "";
        hint.textContent = "";
        hint.className = "form-hint";
    } else if (digitos.length == 10) {
        this.className = "valid";
        var fmt = formatearTelefono(digitos);
        hint.textContent = "✓ " + fmt;
        hint.className = "form-hint success";
    } else if (digitos.length < 10) {
        this.className = "";
        hint.textContent = digitos.length + "/10 dígitos";
        hint.className = "form-hint";
    } else {
        this.className = "invalid";
        hint.textContent = "✗ Máximo 10 dígitos";
        hint.className = "form-hint error";
    }
});


passInput.addEventListener("input", function () {
    var hint = document.getElementById("passwordHint");
    var val = this.value;
    var bars = [
        document.getElementById("bar1"),
        document.getElementById("bar2"),
        document.getElementById("bar3"),
        document.getElementById("bar4")
    ];


    for (var i = 0; i < bars.length; i++) {
        bars[i].className = "bar";
    }

    if (val == "") {
        this.className = "";
        hint.textContent = "";
        hint.className = "form-hint";
        return;
    }


    var puntos = 0;
    if (val.length >= 8) puntos++;
    if (/[A-Z]/.test(val)) puntos++;
    if (/[0-9]/.test(val)) puntos++;
    if (/[!@#$%^&*()_+\-=\[\]{}|;:'",.<>?\/~`\\]/.test(val)) puntos++;

    var nivel;
    if (puntos <= 1) nivel = "weak";
    else if (puntos <= 3) nivel = "medium";
    else nivel = "strong";

    for (var i = 0; i < puntos; i++) {
        bars[i].className = "bar active " + nivel;
    }

    if (validarPassword(val)) {
        this.className = "valid";
        hint.textContent = "✓ Contraseña segura";
        hint.className = "form-hint success";
    } else {
        this.className = "invalid";
        var faltan = [];
        if (val.length < 8) faltan.push("8+ caracteres");
        if (!/[A-Z]/.test(val)) faltan.push("mayúscula");
        if (!/[a-z]/.test(val)) faltan.push("minúscula");
        if (!/[0-9]/.test(val)) faltan.push("número");
        if (!/[!@#$%^&*()_+\-=\[\]{}|;:'",.<>?\/~`\\]/.test(val)) faltan.push("carácter especial");
        hint.textContent = "Falta: " + faltan.join(", ");
        hint.className = "form-hint error";
    }
});


bioInput.addEventListener("input", function () {
    var hint = document.getElementById("bioHint");
    var n = contarPalabras(this.value);
    hint.textContent = n + " palabra" + (n != 1 ? "s" : "");
});


form.addEventListener("submit", function (e) {
    e.preventDefault();
    var resultado = document.getElementById("resultadoForm");
    var errores = [];

    if (!soloLetras(nombreInput.value) || nombreInput.value.trim() == "") {
        errores.push("Nombre inválido");
    }
    if (!validarCorreo(correoInput.value)) {
        errores.push("Correo inválido");
    }
    if (fechaInput.value == "" || !esMayorDeEdad(fechaInput.value)) {
        errores.push("Debe ser mayor de edad");
    }
    var digitos = telInput.value.replace(/\D/g, "");
    if (digitos.length != 10) {
        errores.push("Teléfono debe tener 10 dígitos");
    }
    if (!validarPassword(passInput.value)) {
        errores.push("Contraseña no cumple requisitos");
    }

    if (errores.length > 0) {
        resultado.className = "resultado show error";
        resultado.innerHTML = "Errores: " + errores.join(" | ");
    } else {
        resultado.className = "resultado show success";
        resultado.innerHTML = "¡Registro exitoso! Todos los datos son válidos.";
    }
});


function abrirModal() {
    document.getElementById("modalOverlay").classList.add("show");
}

function cerrarModal() {
    document.getElementById("modalOverlay").classList.remove("show");
}


document.getElementById("modalOverlay").addEventListener("click", function (e) {
    if (e.target == this) {
        cerrarModal();
    }
});