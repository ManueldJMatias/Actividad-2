/*
    utileria.js
    Funciones de validacion para formularios
    Manuel Matias - 2026
*/

// valida que el correo tenga formato correcto (algo@dominio.com)
function validarCorreo(correo) {
    var patron = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return patron.test(correo);
}

// revisa que el texto solo tenga letras, acepta acentos y ñ
function soloLetras(texto) {
    var patron = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/;
    return patron.test(texto);
}

// valida que un numero no tenga mas digitos que el maximo
function validarLongitud(numero, maxLongitud) {
    var soloDigitos = String(numero).replace(/[^0-9]/g, "");
    return soloDigitos.length <= maxLongitud;
}

// calcula cuantos años tiene alguien segun su fecha de nacimiento
// la fecha debe venir en formato YYYY-MM-DD
function calcularEdad(fechaNacimiento) {
    var hoy = new Date();
    var nacimiento = new Date(fechaNacimiento + "T00:00:00");

    var edad = hoy.getFullYear() - nacimiento.getFullYear();
    var diferenciaMes = hoy.getMonth() - nacimiento.getMonth();

    // si todavia no llega su cumple este año, le restamos 1
    if (diferenciaMes < 0 || (diferenciaMes === 0 && hoy.getDate() < nacimiento.getDate())) {
        edad--;
    }
    return edad;
}

// checa si la persona ya tiene 18 o mas
function esMayorDeEdad(fechaNacimiento) {
    return calcularEdad(fechaNacimiento) >= 18;
}

// valida que el password sea seguro:
// - minimo 8 caracteres
// - al menos 1 mayuscula, 1 minuscula, 1 numero y 1 caracter especial
function validarPassword(password) {
    if (password.length < 8) {
        return false;
    }

    var hayMayuscula = /[A-Z]/.test(password);
    var hayMinuscula = /[a-z]/.test(password);
    var hayNumero = /[0-9]/.test(password);
    var hayEspecial = /[!@#$%^&*()_+\-=\[\]{}|;:'",.<>?\/~`\\]/.test(password);

    if (hayMayuscula && hayMinuscula && hayNumero && hayEspecial) {
        return true;
    } else {
        return false;
    }
}


// --- funciones extras que yo agregue ---

// le da formato bonito a un telefono de 10 digitos -> (555) 123-4567
function formatearTelefono(telefono) {
    var nums = String(telefono).replace(/\D/g, "");

    if (nums.length != 10) {
        return null; // no es valido si no son 10 digitos
    }

    var resultado = "(" + nums.substring(0, 3) + ") " + nums.substring(3, 6) + "-" + nums.substring(6, 10);
    return resultado;
}

// cuenta cuantas palabras hay en un texto
function contarPalabras(texto) {
    if (!texto || texto.trim() == "") {
        return 0;
    }
    var palabras = texto.trim().split(/\s+/);
    return palabras.length;
}
