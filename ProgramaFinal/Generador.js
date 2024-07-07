import { validarDatos } from "./Validaciones";
import { generarRandom } from "./GeneradorRandoms";
import { calcularAsesor, calcularTipo } from "./Calculos";
// Clase para los datos del formulario
class DatosFormulario {
    constructor(tamaño, cantidadVentas, tipoVenta) {
        this.tamaño = tamaño;
        this.cantidadVentas = cantidadVentas;
        this.tipoVenta = tipoVenta;
    }
}

class Mes{
    constructor(numero, CantidadVentas1, CantidadVentas2, CantidadVentas3, Ventas1, Ventas2, Ventas3, Vendedor1, Vendedor2, Vendedor3){
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
    }
}



// Función para generar los datos con base en los datos del formulario
function generarDatos(datosFormulario) {
    // Verificar si los datos son válidos antes de proceder
    if (validarDatos(datosFormulario)) {
        // Aquí puedes implementar la lógica para generar los datos utilizando los valores de datosFormulario
        console.log('Generando datos...');
        console.log(datosFormulario);
        let cont = 0;
        let datosMails = [];
        let ultimoMail = new Mail(0, 0, "", 0, "", 0, 0, 0, 0);
        while (cont < datosFormulario.tamaño) {
            cont ++;
            console.log(cont)
            let rnd1 = generarRandom();
            let rnd2 = generarRandom();
            console.log(rnd1);
            console.log(rnd2);
            let tipo = calcularTipo(rnd1, datosFormulario.tipos);
            let asesor = calcularAsesor(rnd2, datosFormulario.asesor, tipo);
            let cantidad = ultimoMail.cantidaAsesores;
            let asesoresXPaciente = ultimoMail.asesoresXPaciente;
            let asesoresXAsistio = ultimoMail.asesoresXAsistio;
            let asesoresXNuncaAsistio = ultimoMail.asesoresXNuncaAsistio;
            if (asesor == "si") {
                cantidad = cantidad + 1;
                if(tipo == "Paciente"){
                    asesoresXPaciente ++;
                }
                if(tipo == "Asistio a la clinica"){
                    asesoresXAsistio ++;
                }
                if(tipo == "Nunca Asistio a la clinica"){
                    asesoresXNuncaAsistio ++;
                }
            }
            const mail = new Mail(cont, rnd1, tipo, rnd2, asesor, cantidad, asesoresXPaciente, asesoresXAsistio, asesoresXNuncaAsistio);
            
            if ((cont >= datosFormulario.rango[0] && cont <= datosFormulario.rango[1]) || cont == datosFormulario.tamaño) {
                datosMails.push(mail);
                console.log("Mail agregado:", mail);
            } else {
                console.log("Mail no agregado.");
            }

            ultimoMail = mail;
        } 
        console.log(datosMails)

        let tablaMails = document.querySelector('.tbody');

        // Limpiamos el contenido actual de la tabla
        tablaMails.innerHTML = '';
    
        // Iteramos sobre la lista de mails y creamos las filas de la tabla
        datosMails.forEach(mail => {
            let fila = tablaMails.insertRow();
    
            // Insertamos las celdas con la información de cada mail
            fila.insertCell().textContent = mail.numero;
            fila.insertCell().textContent = mail.random1;
            fila.insertCell().textContent = mail.tipo;
            fila.insertCell().textContent = mail.random2;
            fila.insertCell().textContent = mail.asesor;
            fila.insertCell().textContent = mail.cantidaAsesores;
            fila.insertCell().textContent = mail.asesoresXPaciente;
            fila.insertCell().textContent = mail.asesoresXAsistio;
            fila.insertCell().textContent = mail.asesoresXNuncaAsistio;
        });



        // Por ejemplo, puedes realizar cálculos, operaciones, etc.
    } else {
        console.log('Los datos ingresados no son válidos.');
        // Aquí puedes mostrar un mensaje al usuario indicando que los datos no son válidos
    }
}

// Obtener los valores de los inputs y crear un objeto de la clase DatosFormulario
function obtenerDatosFormulario() {
    const tamaño = parseInt(document.getElementById('tamaño').value);
    const cantidadVentas = [
        parseFloat(document.getElementById('vendeMenosDe5').value),
        parseFloat(document.getElementById('vende5').value),
        parseFloat(document.getElementById('vende6').value),
        parseFloat(document.getElementById('vende7').value),
        parseFloat(document.getElementById('vende8').value),
        parseFloat(document.getElementById('vende9').value),
        parseFloat(document.getElementById('vende10').value),
        parseFloat(document.getElementById('vendeMasDe10').value)
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

const limpiarFormulario = () => {
    // Obtén todos los elementos de input del formulario
    const inputs = document.querySelectorAll('input');

    // Recorre cada elemento de input y establece su valor como cadena vacía
    inputs.forEach(input => {
        input.value = '';
    });
};
