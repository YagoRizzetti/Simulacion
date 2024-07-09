// Función para validar los datos del formulario
export function validarDatos(datosFormulario) {
    // Verificar si algún campo está vacío
    if (!datosFormulario.tamaño || !datosFormulario.cantidadVentas[0] || !datosFormulario.cantidadVentas[1] || !datosFormulario.cantidadVentas[2] || !datosFormulario.cantidadVentas[3] || !datosFormulario.cantidadVentas[4] || !datosFormulario.cantidadVentas[5] || !datosFormulario.cantidadVentas[6] || !datosFormulario.cantidadVentas[7] || !datosFormulario.tipoVenta[0] || !datosFormulario.tipoVenta[1] || !datosFormulario.tipoVenta[2]) {
        alert('Por favor, complete todos los campos.');
        return false; // La validación no pasó
    }

    // Verificar si algún valor es negativo
    if (datosFormulario.tamaño < 0) {
        alert('El tamaño de la muestra debe ser un numero positivo.');
        return false; // La validación no pasó
    }

    if (datosFormulario.cantidadVentas.some(valor => 1 >= valor <= 0) || datosFormulario.tipoVenta.some(valor => 1 >= valor <= 0)) {
        alert('Los valores de las probabilidades deben ser positivos entre 0,01 y 0,99.');
        return false; // La validación no pasó
    }

    // if (datosFormulario.rango[0] > datosFormulario.rango[1]){
    //     alert('El rango de filas es incorrecto. El valor desde debe ser menor al valor hasta.');
    //     return false;
    // }

    // if (datosFormulario.rango[0] <= 0){
    //     alert('El rango de filas es incorrecto. El valor desde debe ser positivo.');
    //     return false;
    // }

    // if (datosFormulario.rango[1] > datosFormulario.tamaño){
    //     alert('El rango de filas es incorrecto. El valor hasta debe ser Menor o igual al tamaño de la muestra.');
    //     return false;
    // }

    if ((datosFormulario.cantidadVentas[0] + datosFormulario.cantidadVentas[1] + datosFormulario.cantidadVentas[2]+ datosFormulario.cantidadVentas[3] + datosFormulario.cantidadVentas[4] + datosFormulario.cantidadVentas[5] + datosFormulario.cantidadVentas[6] + datosFormulario.cantidadVentas[7]) != 1){
        alert('La suma de las probabilidades de las cantidades de ventas debe dar 1.');
        return false;
    }

    if ((datosFormulario.tipoVenta[0] + datosFormulario.tipoVenta[1] + datosFormulario.tipoVenta[2]) != 1){
        alert('La suma de las probabilidades de los tipos de ventas debe dar 1.');
        return false;
    }
    // Si la validación pasa, retornar true
    return true;
}