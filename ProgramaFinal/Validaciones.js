// Función para validar los datos del formulario
export function validarDatos(datosFormulario) {
    // Verificar si algún campo está vacío
    if (!datosFormulario.tamaño || !datosFormulario.tipos[0] || !datosFormulario.tipos[1] || !datosFormulario.tipos[2] || !datosFormulario.asesor[0] || !datosFormulario.asesor[1] || !datosFormulario.asesor[2] || !datosFormulario.asesor[3] || !datosFormulario.asesor[4] || !datosFormulario.asesor[5]) {
        alert('Por favor, complete todos los campos.');
        return false; // La validación no pasó
    }

    // Verificar si algún valor es negativo
    if (datosFormulario.tamaño < 0) {
        alert('El tamaño de la muestra debe ser un numero positivo.');
        return false; // La validación no pasó
    }

    if (datosFormulario.tipos.some(valor => 1 >= valor <= 0) || datosFormulario.asesor.some(valor => 1 >= valor <= 0)) {
        alert('Los valores de las probabilidades deben ser positivos entre 0,01 y 0,99.');
        return false; // La validación no pasó
    }

    if (datosFormulario.rango[0] > datosFormulario.rango[1]){
        alert('El rango de filas es incorrecto. El valor desde debe ser menor al valor hasta.');
        return false;
    }

    if (datosFormulario.rango[0] <= 0){
        alert('El rango de filas es incorrecto. El valor desde debe ser positivo.');
        return false;
    }

    if (datosFormulario.rango[1] > datosFormulario.tamaño){
        alert('El rango de filas es incorrecto. El valor hasta debe ser Menor o igual al tamaño de la muestra.');
        return false;
    }

    if ((datosFormulario.tipos[0] + datosFormulario.tipos[1] + datosFormulario.tipos[2]) != 1){
        alert('La suma de las probabilidades de los tipos de destinatarios debe dar 1.');
        return false;
    }

    if ((datosFormulario.asesor[0] + datosFormulario.asesor[1]) != 1){
        alert('La suma de las probabilidades de los asesores para el destinatario paciente debe dar 1.');
        return false;
    }

    if ((datosFormulario.asesor[2] + datosFormulario.asesor[3]) != 1){
        alert('La suma de las probabilidades de los asesores para el destinatario que asistio a la clinica debe dar 1.');
        return false;
    }

    if ((datosFormulario.asesor[4] + datosFormulario.asesor[5]) != 1){
        alert('La suma de las probabilidades de los asesores para el destinatario que nunca asistio a la clinica debe dar 1.');
        return false;
    }
    // Si la validación pasa, retornar true
    return true;
}