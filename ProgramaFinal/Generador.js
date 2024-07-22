import { validarDatos } from "./Validaciones.js";
import { calcularCantidad, venderAutos, calcularEstadisticasVendedor, calcularEstadisticaGeneral } from "./Calculos.js";
// Clase para los datos del formulario
class DatosFormulario {
    constructor(tamaño, cantidadVentas, tipoVenta) {
        this.tamaño = tamaño;
        this.cantidadVentas = cantidadVentas;
        this.tipoVenta = tipoVenta;
    }
}

class Mes{
    constructor(numero, CantidadVentas1, CantidadVentas2, CantidadVentas3, Ventas1, Ventas2, Ventas3, Vendedor1, Vendedor2, Vendedor3,estadistica){
        this.numero = numero;
        this.CantidadVentas1 = CantidadVentas1;
        this.CantidadVentas2 = CantidadVentas2;
        this.CantidadVentas3 = CantidadVentas3;
        this.Ventas1 = Ventas1;
        this.Ventas2 = Ventas2;
        this.Ventas3 = Ventas3;
        this.Vendedor1 = Vendedor1;
        this.Vendedor2 = Vendedor2;
        this.Vendedor3 = Vendedor3;
        this.Estadistica = estadistica;
    }
}



// Función para generar los datos con base en los datos del formulario
export function generarDatos(datosFormulario) {
    // Verificar si los datos son válidos antes de proceder
    if (validarDatos(datosFormulario)) {
        // Aquí puedes implementar la lógica para generar los datos utilizando los valores de datosFormulario
        console.log('Generando datos...');
        console.log(datosFormulario);
        let cont = 0;
        let datosMes = [];
        let ultimoMes = new Mes(0, [], [], [], [], [], [], [0,0,0,0,0,0], [0,0,0,0,0,0], [0,0,0,0,0,0],[0,0]);
        while (cont < datosFormulario.tamaño) {
            cont ++;
            console.log(cont)
            // let cantidadVendedor1 = [0,0];
            // let cantidadVendedor2 = [0,0];
            // let cantidadVendedor3 = [0,0];
            // let vendedor1 = [0,0,0,0,0,0];
            // let vendedor2 = [0,0,0,0,0,0];
            // let vendedor3 = [0,0,0,0,0,0];
            // let estadisticasGeneral = [0,0];
            let cantidadVendedor1 = calcularCantidad(datosFormulario.cantidadVentas);
            let cantidadVendedor2 = calcularCantidad(datosFormulario.cantidadVentas);
            let cantidadVendedor3 = calcularCantidad(datosFormulario.cantidadVentas);
            let autosVendidosVendedor1 = venderAutos(cantidadVendedor1[1],datosFormulario.tipoVenta);
            let autosVendidosVendedor2 = venderAutos(cantidadVendedor2[1],datosFormulario.tipoVenta);
            let autosVendidosVendedor3 = venderAutos(cantidadVendedor3[1],datosFormulario.tipoVenta);
            let vendedor1 = calcularEstadisticasVendedor(cantidadVendedor1[1],autosVendidosVendedor1,ultimoMes.Vendedor1,cont);
            let vendedor2 = calcularEstadisticasVendedor(cantidadVendedor2[1],autosVendidosVendedor2,ultimoMes.Vendedor2,cont);
            let vendedor3 = calcularEstadisticasVendedor(cantidadVendedor3[1],autosVendidosVendedor3,ultimoMes.Vendedor3,cont);
            let estadisticasGeneral = calcularEstadisticaGeneral(vendedor1[4],vendedor2[4],vendedor3[4],ultimoMes.Estadistica,cont);

            const mes = new Mes();
            mes.numero = cont;
            mes.CantidadVentas1 = cantidadVendedor1;
            mes.CantidadVentas2 = cantidadVendedor2;
            mes.CantidadVentas3 = cantidadVendedor3;
            mes.Ventas1 = autosVendidosVendedor1;
            mes.Ventas2 = autosVendidosVendedor2;
            mes.Ventas3 = autosVendidosVendedor3;
            mes.Vendedor1 = vendedor1;
            mes.Vendedor2 = vendedor2;
            mes.Vendedor3 = vendedor3;
            mes.Estadistica = estadisticasGeneral;
            datosMes.push(mes);
            ultimoMes = mes;
        } 
        console.log(datosMes)

        let tablaMes = document.querySelector('.tbody');

        // Limpiamos el contenido actual de la tabla
        tablaMes.innerHTML = '';
    
        // Iteramos sobre la lista de mails y creamos las filas de la tabla
        datosMes.forEach(mes => {
            let fila = tablaMes.insertRow();
    
            // Insertamos las celdas con la información de cada mail
            fila.insertCell().textContent = mes.numero;
            fila.cells[0].classList.add('sticky-col');
            fila.insertCell().textContent = mes.CantidadVentas1[0];
            fila.insertCell().textContent = mes.CantidadVentas1[1];
            fila.insertCell().textContent = mes.CantidadVentas2[0];
            fila.insertCell().textContent = mes.CantidadVentas2[1];
            fila.insertCell().textContent = mes.CantidadVentas3[0];
            fila.insertCell().textContent = mes.CantidadVentas3[1];

            fila.insertCell().textContent = mes.Ventas1[0];
            fila.insertCell().textContent = mes.Ventas1[1];
            fila.insertCell().textContent = mes.Ventas1[2];
            fila.insertCell().textContent = mes.Ventas1[3];
            fila.insertCell().textContent = mes.Ventas1[4];
            fila.insertCell().textContent = mes.Ventas1[5];
            fila.insertCell().textContent = mes.Ventas1[6];
            fila.insertCell().textContent = mes.Ventas1[7];
            fila.insertCell().textContent = mes.Ventas1[8];
            fila.insertCell().textContent = mes.Ventas1[9];
            fila.insertCell().textContent = mes.Ventas1[10];
            fila.insertCell().textContent = mes.Ventas1[11];
            fila.insertCell().textContent = mes.Ventas1[12];
            fila.insertCell().textContent = mes.Ventas1[13];
            fila.insertCell().textContent = mes.Ventas1[14];
            fila.insertCell().textContent = mes.Ventas1[15];
            fila.insertCell().textContent = mes.Ventas1[16];
            fila.insertCell().textContent = mes.Ventas1[17];
            fila.insertCell().textContent = mes.Ventas1[18];
            fila.insertCell().textContent = mes.Ventas1[19];
            fila.insertCell().textContent = mes.Ventas1[20];
            fila.insertCell().textContent = mes.Ventas1[21];
            fila.insertCell().textContent = mes.Ventas1[22];
            fila.insertCell().textContent = mes.Ventas1[23];
            fila.insertCell().textContent = mes.Ventas1[24];
            fila.insertCell().textContent = mes.Ventas1[25];
            fila.insertCell().textContent = mes.Ventas1[26];
            fila.insertCell().textContent = mes.Ventas1[27];
            fila.insertCell().textContent = mes.Ventas1[28];
            fila.insertCell().textContent = mes.Ventas1[29];
            fila.insertCell().textContent = mes.Ventas1[30];
            fila.insertCell().textContent = mes.Ventas1[31];
            fila.insertCell().textContent = mes.Ventas1[32];
            fila.insertCell().textContent = mes.Ventas1[33];
            fila.insertCell().textContent = mes.Ventas1[34];
            fila.insertCell().textContent = mes.Ventas1[35];
            fila.insertCell().textContent = mes.Ventas1[36];
            fila.insertCell().textContent = mes.Ventas1[37];
            fila.insertCell().textContent = mes.Ventas1[38];
            fila.insertCell().textContent = mes.Ventas1[39];

            fila.insertCell().textContent = mes.Ventas2[0];
            fila.insertCell().textContent = mes.Ventas2[1];
            fila.insertCell().textContent = mes.Ventas2[2];
            fila.insertCell().textContent = mes.Ventas2[3];
            fila.insertCell().textContent = mes.Ventas2[4];
            fila.insertCell().textContent = mes.Ventas2[5];
            fila.insertCell().textContent = mes.Ventas2[6];
            fila.insertCell().textContent = mes.Ventas2[7];
            fila.insertCell().textContent = mes.Ventas2[8];
            fila.insertCell().textContent = mes.Ventas2[9];
            fila.insertCell().textContent = mes.Ventas2[10];
            fila.insertCell().textContent = mes.Ventas2[11];
            fila.insertCell().textContent = mes.Ventas2[12];
            fila.insertCell().textContent = mes.Ventas2[13];
            fila.insertCell().textContent = mes.Ventas2[14];
            fila.insertCell().textContent = mes.Ventas2[15];
            fila.insertCell().textContent = mes.Ventas2[16];
            fila.insertCell().textContent = mes.Ventas2[17];
            fila.insertCell().textContent = mes.Ventas2[18];
            fila.insertCell().textContent = mes.Ventas2[19];
            fila.insertCell().textContent = mes.Ventas2[20];
            fila.insertCell().textContent = mes.Ventas2[21];
            fila.insertCell().textContent = mes.Ventas2[22];
            fila.insertCell().textContent = mes.Ventas2[23];
            fila.insertCell().textContent = mes.Ventas2[24];
            fila.insertCell().textContent = mes.Ventas2[25];
            fila.insertCell().textContent = mes.Ventas2[26];
            fila.insertCell().textContent = mes.Ventas2[27];
            fila.insertCell().textContent = mes.Ventas2[28];
            fila.insertCell().textContent = mes.Ventas2[29];
            fila.insertCell().textContent = mes.Ventas2[30];
            fila.insertCell().textContent = mes.Ventas2[31];
            fila.insertCell().textContent = mes.Ventas2[32];
            fila.insertCell().textContent = mes.Ventas2[33];
            fila.insertCell().textContent = mes.Ventas2[34];
            fila.insertCell().textContent = mes.Ventas2[35];
            fila.insertCell().textContent = mes.Ventas2[36];
            fila.insertCell().textContent = mes.Ventas2[37];
            fila.insertCell().textContent = mes.Ventas2[38];
            fila.insertCell().textContent = mes.Ventas2[39];

            fila.insertCell().textContent = mes.Ventas3[0];
            fila.insertCell().textContent = mes.Ventas3[1];
            fila.insertCell().textContent = mes.Ventas3[2];
            fila.insertCell().textContent = mes.Ventas3[3];
            fila.insertCell().textContent = mes.Ventas3[4];
            fila.insertCell().textContent = mes.Ventas3[5];
            fila.insertCell().textContent = mes.Ventas3[6];
            fila.insertCell().textContent = mes.Ventas3[7];
            fila.insertCell().textContent = mes.Ventas3[8];
            fila.insertCell().textContent = mes.Ventas3[9];
            fila.insertCell().textContent = mes.Ventas3[10];
            fila.insertCell().textContent = mes.Ventas3[11];
            fila.insertCell().textContent = mes.Ventas3[12];
            fila.insertCell().textContent = mes.Ventas3[13];
            fila.insertCell().textContent = mes.Ventas3[14];
            fila.insertCell().textContent = mes.Ventas3[15];
            fila.insertCell().textContent = mes.Ventas3[16];
            fila.insertCell().textContent = mes.Ventas3[17];
            fila.insertCell().textContent = mes.Ventas3[18];
            fila.insertCell().textContent = mes.Ventas3[19];
            fila.insertCell().textContent = mes.Ventas3[20];
            fila.insertCell().textContent = mes.Ventas3[21];
            fila.insertCell().textContent = mes.Ventas3[22];
            fila.insertCell().textContent = mes.Ventas3[23];
            fila.insertCell().textContent = mes.Ventas3[24];
            fila.insertCell().textContent = mes.Ventas3[25];
            fila.insertCell().textContent = mes.Ventas3[26];
            fila.insertCell().textContent = mes.Ventas3[27];
            fila.insertCell().textContent = mes.Ventas3[28];
            fila.insertCell().textContent = mes.Ventas3[29];
            fila.insertCell().textContent = mes.Ventas3[30];
            fila.insertCell().textContent = mes.Ventas3[31];
            fila.insertCell().textContent = mes.Ventas3[32];
            fila.insertCell().textContent = mes.Ventas3[33];
            fila.insertCell().textContent = mes.Ventas3[34];
            fila.insertCell().textContent = mes.Ventas3[35];
            fila.insertCell().textContent = mes.Ventas3[36];
            fila.insertCell().textContent = mes.Ventas3[37];
            fila.insertCell().textContent = mes.Ventas3[38];
            fila.insertCell().textContent = mes.Ventas3[39];

            fila.insertCell().textContent = mes.Vendedor1[0];
            fila.insertCell().textContent = mes.Vendedor1[1];
            fila.insertCell().textContent = mes.Vendedor1[2];
            fila.insertCell().textContent = mes.Vendedor1[3];
            fila.insertCell().textContent = mes.Vendedor1[4];
            fila.insertCell().textContent = mes.Vendedor1[5];

            fila.insertCell().textContent = mes.Vendedor2[0];
            fila.insertCell().textContent = mes.Vendedor2[1];
            fila.insertCell().textContent = mes.Vendedor2[2];
            fila.insertCell().textContent = mes.Vendedor2[3];
            fila.insertCell().textContent = mes.Vendedor2[4];
            fila.insertCell().textContent = mes.Vendedor2[5];

            fila.insertCell().textContent = mes.Vendedor3[0];
            fila.insertCell().textContent = mes.Vendedor3[1];
            fila.insertCell().textContent = mes.Vendedor3[2];
            fila.insertCell().textContent = mes.Vendedor3[3];
            fila.insertCell().textContent = mes.Vendedor3[4];
            fila.insertCell().textContent = mes.Vendedor3[5];

            fila.insertCell().textContent = mes.Estadistica[0];
            fila.insertCell().textContent = mes.Estadistica[1];
        });



        // Por ejemplo, puedes realizar cálculos, operaciones, etc.
    } else {
        console.log('Los datos ingresados no son válidos.');
        // Aquí puedes mostrar un mensaje al usuario indicando que los datos no son válidos
    }
}

// Obtener los valores de los inputs y crear un objeto de la clase DatosFormulario
export function obtenerDatosFormulario() {
    const tamaño = parseInt(document.getElementById('tamaño').value);
    const cantidadVentas = [
        parseFloat(document.getElementById('vendeMenosDe5').value),
        parseFloat(document.getElementById('vende5').value),
        parseFloat(document.getElementById('vende6').value),
        parseFloat(document.getElementById('vende7').value),
        parseFloat(document.getElementById('vende8').value),
        parseFloat(document.getElementById('vende9').value),
        parseFloat(document.getElementById('vende10').value),
        parseFloat(document.getElementById('vendeMasde10').value)
    ];
    const tipoVentas = [
        parseFloat(document.getElementById('probAutoCompacto').value),
        parseFloat(document.getElementById('probAutoMediano').value),
        parseFloat(document.getElementById('probAutoLujo').value),
    ];

    // Crear un objeto de la clase DatosFormulario con los valores obtenidos
    const datosFormulario = new DatosFormulario(tamaño, cantidadVentas, tipoVentas);

    return datosFormulario;
}

export const limpiarFormulario = () => {
    // Obtén todos los elementos de input del formulario
    const inputs = document.querySelectorAll('input');

    // Recorre cada elemento de input y establece su valor como cadena vacía
    inputs.forEach(input => {
        input.value = '';
    });
};
