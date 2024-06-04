import {validarDatos} from "./utils/Validaciones.js";
import { Aprendiz, AsignacionPeluquero, Cliente, Control, Esperas, Fila, FinAtencionAprendiz, FinAtencionVeteranoA, FinAtencionVeteranoB, LlegadaCliente, Recaudacion, VeteranoA, VeteranoB } from "./Clases.js";
import {crearTabla} from "./GenrarTabla.js";
import { llegadaCliente } from "./llegadaCliente.js";
import { aperturaNegocio } from "./aperturaNegocio.js";
import { finAtencion } from "./finAtencion.js";

const esllegadaCliente = (ultimaFila) =>{
    if(ultimaFila.control.reloj < ultimaFila.llegadaCliente.llegada){
        if(ultimaFila.llegadaCliente.llegada <= ultimaFila.finAtencionAprendiz.finAtencion && ultimaFila.llegadaCliente.llegada <= ultimaFila.finAtencionVeteranoA.finAtencion && ultimaFila.llegadaCliente.llegada <= ultimaFila.finAtencionVeteranoB.finAtencion){
            return true
        }
    }
    return false
}

const esFinAtencion = (ultimaFila) =>{
    if(ultimaFila.control.reloj < ultimaFila.finAtencionAprendiz.finAtencion || ultimaFila.control.reloj < ultimaFila.finAtencionVeteranoA.finAtencion || ultimaFila.control.reloj < ultimaFila.finAtencionVeteranoB.finAtencion ){
        if(ultimaFila.llegadaCliente.llegada >= ultimaFila.finAtencionAprendiz.finAtencion || ultimaFila.llegadaCliente.llegada >= ultimaFila.finAtencionVeteranoA.finAtencion || ultimaFila.llegadaCliente.llegada >= ultimaFila.finAtencionVeteranoB.finAtencion){
            return true
        }
    }
    return false
}

const esUltimoClienteDelDia = (ultimaFila) =>{
    if(ultimaFila.llegadaCliente.llegada == 0 && ultimaFila.finAtencionAprendiz.finAtencion == 0 && ultimaFila.finAtencionVeteranoA.finAtencion == 0 && ultimaFila.finAtencionVeteranoB.finAtencion == 0 && ultimaFila.esperas.esperaSimultanea == 0){
        return true
    }
    return false
}

// Función para generar los datos con base en los datos del formulario
export const generarDatos = (datosFormulario) => {
    // Verificar si los datos son válidos antes de proceder
    if (validarDatos(datosFormulario)) {
        // Aquí puedes implementar la lógica para generar los datos utilizando los valores de datosFormulario
        console.log('Generando datos...');
        console.log(datosFormulario);
        let distribucionAAprendiz = datosFormulario.aprendiz[1];
        let distribucionBAprendiz = datosFormulario.aprendiz[2];
        let distribucionAVeteranoA = datosFormulario.veteranoA[1];
        let distribucionBVeteranoA =  datosFormulario.veteranoA[2];
        let distribucionAVeteranoB = datosFormulario.veteranoB[1];
        let distribucionBVeteranoB = datosFormulario.veteranoB[2];
        let distribucionALlegada = datosFormulario.llegadaClientes[0];
        let distribucionBLlegada = datosFormulario.llegadaClientes[1];
        let probabilidadAprendiz = datosFormulario.aprendiz[0];
        let probabilidadVeteranoA = datosFormulario.veteranoA[0];
        let probabilidadVeteranoB = datosFormulario.veteranoB[0];
        const dias = datosFormulario.tiempo;
        let relojAMostrar = "00:00:00";
        const duracionJornada = 60 * 60 * 8;
        let apertura = true;
        let finJornada = false;
        let aprendiz = new Aprendiz("Libre",0,0);
        let veteranoA = new VeteranoA("Libre",0,0);
        let veteranoB = new VeteranoB("Libre",0,0);
        let esperas = new Esperas(0,0);
        let filasAMostrar = [];
        let control = new Control("Inicio Jornada",0,0);
        let controlClientes = [Cliente];
        let proximaLlegada = new LlegadaCliente(0,0,0);
        let finAtencionAprendiz = new FinAtencionAprendiz(0,0,0);
        let finAtencionVeteranoA = new FinAtencionVeteranoA(0,0,0);
        let finAtencionVeteranoB = new FinAtencionVeteranoB(0,0,0);
        let recaudacion = new Recaudacion(0,0,0,0);
        let peluqueroAsignado = new AsignacionPeluquero(0,"");
        let ultimaFila = new Fila(0,control,relojAMostrar,proximaLlegada,peluqueroAsignado,finAtencionAprendiz,finAtencionVeteranoA,finAtencionVeteranoB,aprendiz,veteranoA,veteranoB,recaudacion,esperas,controlClientes);
        let numero = 0;
        while (numero < 5) {
            numero++;
            console.log(ultimaFila);
            if (ultimaFila.control.dia >= dias && controlEventos.length == 0) break;
            
            if(ultimaFila.control.reloj >= duracionJornada){
                finJornada = true;
            }
            // Cuando Abre El Negocio
            if(apertura){
                let nuevaFila = new Fila();
                nuevaFila = aperturaNegocio(nuevaFila, ultimaFila, distribucionALlegada, distribucionBLlegada);
                apertura = false;
                ultimaFila = nuevaFila;
                continue;
            } 
            
            // Cuando Llega Un Cliente
            if(esllegadaCliente(ultimaFila)){
                let nuevaFila = new Fila();
                nuevaFila = llegadaCliente(nuevaFila, ultimaFila, distribucionALlegada, distribucionBLlegada, probabilidadAprendiz, probabilidadVeteranoA, probabilidadVeteranoB, distribucionAAprendiz, distribucionBAprendiz, distribucionAVeteranoA, distribucionBVeteranoA, distribucionAVeteranoB, distribucionBVeteranoB);
                ultimaFila = nuevaFila;
            }

            // Cuando Fin Atencion
            if(esFinAtencion(ultimaFila)){
                let nuevaFila = new Fila();
                nuevaFila = finAtencion(nuevaFila, ultimaFila, distribucionAAprendiz, distribucionBAprendiz, distribucionAVeteranoA, distribucionBVeteranoA, distribucionAVeteranoB, distribucionBVeteranoB);
                ultimaFila = nuevaFila;
            }

            //UltimoCliente de la Jornada
            if(finJornada){
                if(esUltimoClienteDelDia(ultimaFila)){
                    apertura = true;
                }    
            }

            // Agregando fila a la lista de filas a Mostrar
            if(ultimaFila.numero >= datosFormulario.rango[0] && ultimaFila.numero <= datosFormulario.rango[1]){
                filasAMostrar.push(ultimaFila);
                console.log("Fila agregado:", ultimaFila);
            } else {
                console.log("Fila no agregado.");
            }
            

        }
         
        filasAMostrar.push(ultimaFila);
        let maxEsperaSimultanea = ultimaFila.esperas.maxEsperaSimultanea;
        crearTabla(maxEsperaSimultanea);

        let tablaFilas = document.querySelector('.tbody');

        // Limpiamos el contenido actual de la tabla
        tablaFilas.innerHTML = '';
    
        // Iteramos sobre la lista de Filas y creamos las filas de la tabla
        filasAMostrar.forEach(fila => {
            let row = tablaFilas.insertRow();
            row.insertCell().textContent = fila.numero;
            row.insertCell().textContent = fila.control.evento;
            row.insertCell().textContent = fila.control.dia;
            row.insertCell().textContent = fila.control.reloj;
            row.insertCell().textContent = fila.relojAMostrar;
            row.insertCell().textContent = fila.llegadaCliente.random;
            row.insertCell().textContent = fila.llegadaCliente.demora;
            row.insertCell().textContent = fila.llegadaCliente.llegada;
            row.insertCell().textContent = fila.asignacionPeluquero.random;
            row.insertCell().textContent = fila.asignacionPeluquero.peluquero;
            row.insertCell().textContent = fila.finAtencionAprendiz.random;
            row.insertCell().textContent = fila.finAtencionAprendiz.demora;
            row.insertCell().textContent = fila.finAtencionAprendiz.finAtencion;
            row.insertCell().textContent = fila.finAtencionVeteranoA.random;
            row.insertCell().textContent = fila.finAtencionVeteranoA.demora;
            row.insertCell().textContent = fila.finAtencionVeteranoA.finAtencion;
            row.insertCell().textContent = fila.finAtencionVeteranoB.random;
            row.insertCell().textContent = fila.finAtencionVeteranoB.demora;
            row.insertCell().textContent = fila.finAtencionVeteranoB.finAtencion;
            row.insertCell().textContent = fila.aprendiz.estado;
            row.insertCell().textContent = fila.aprendiz.cola;
            row.insertCell().textContent = fila.aprendiz.clientesAtendidos;
            row.insertCell().textContent = fila.veteranoA.estado;
            row.insertCell().textContent = fila.veteranoA.cola;
            row.insertCell().textContent = fila.veteranoA.clientesAtendidos;
            row.insertCell().textContent = fila.veteranoB.estado;
            row.insertCell().textContent = fila.veteranoB.cola;
            row.insertCell().textContent = fila.veteranoB.clientesAtendidos;
            row.insertCell().textContent = fila.recaudacion.gananciasDiarias;
            row.insertCell().textContent = fila.recaudacion.gastosDiarios;
            row.insertCell().textContent = fila.recaudacion.gananciasNetas;
            row.insertCell().textContent = fila.recaudacion.promedioRecaudacion;
            row.insertCell().textContent = fila.esperas.esperaSimultanea;
            row.insertCell().textContent = fila.esperas.maxEsperaSimultanea;

            // Agregar columnas para cada cliente
            for (let i = 0; i < esperas.maxEsperaSimultanea; i++) {
                if (i < fila.clientes.length) {
                    // Si hay un cliente en esta posición, mostrar sus atributos
                    row.insertCell().textContent = fila.clientes[i].estado;
                    row.insertCell().textContent = fila.clientes[i].peluquero;
                    row.insertCell().textContent = fila.clientes[i].momentoRefresco;
                    row.insertCell().textContent = fila.clientes[i].refresco;
                } else {
                    // Si no hay cliente en esta posición, agregar celdas vacías
                    row.insertCell().textContent = '';
                    row.insertCell().textContent = '';
                    row.insertCell().textContent = '';
                    row.insertCell().textContent = '';
                }
            }
        });



        // Por ejemplo, puedes realizar cálculos, operaciones, etc.
    } else {
        console.log('Los datos ingresados no son válidos.');
        // Aquí puedes mostrar un mensaje al usuario indicando que los datos no son válidos
    }
}
