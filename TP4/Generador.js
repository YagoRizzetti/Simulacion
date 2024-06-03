import {validarDatos} from "./utils/Validaciones.js";
import {eliminarProximasllegada, calcularRelojAMostrar, controlarRefrescoCliente, verificarEstadoPeluquero} from "./utils/Calculos.js";
import { Aprendiz, AsignacionPeluquero, Cliente, Control, Esperas, Fila, FinAtencionAprendiz, FinAtencionVeteranoA, FinAtencionVeteranoB, LlegadaCliente, Recaudacion, VeteranoA, VeteranoB } from "./Clases.js";
import { calcularProximaLlegada , asignarPeluquero, calcularFinAtencion, generarNuevoCliente, aumentarColaPeluqueroAsignado} from "./Eventos/llegadaCliente.js";
import { ocuparPeluquero } from "./EstadosPeluquero/ocupar.js";
import { liberarPeluquero } from "./EstadosPeluquero/liberar.js";
import {verificarFinAtencionPeluquero, controlarColaPeluquero, sacarClienteDeEspera, actualizarFinAtencion, actualizarRecaudacion, reducirColaPeluquero, aumentarclientesAtendidosPeluquero} from "./Eventos/finAtencion.js";
import {crearTabla} from "./GenrarTabla.js";

// Función para generar los datos con base en los datos del formulario
export const generarDatos = (datosFormulario) => {
    // Verificar si los datos son válidos antes de proceder
    if (validarDatos(datosFormulario)) {
        // Aquí puedes implementar la lógica para generar los datos utilizando los valores de datosFormulario
        console.log('Generando datos...');
        console.log(datosFormulario);
        let distribucionAprendiz = [datosFormulario.aprendiz[1], datosFormulario.aprendiz[2]];
        let distribucionVeteranoA = [datosFormulario.veteranoA[1], datosFormulario.veteranoA[2]];
        let distribucionVeteranoB= [datosFormulario.veteranoB[1], datosFormulario.veteranoB[2]];
        const dias = datosFormulario.tiempo;
        let dia = 1;
        let reloj = 0;
        let relojAMostrar = "";
        const duracionJornada = 60 * 60 * 8;
        let numeroFila = 0;
        let ultimaFila = new Fila(0,Control,relojAMostrar,LlegadaCliente,AsignacionPeluquero,FinAtencionAprendiz,FinAtencionVeteranoA,FinAtencionVeteranoB,Aprendiz,VeteranoA,VeteranoB,Recaudacion,Esperas,[Cliente]);
        let aperturaNegocio = true;
        let finJornada = false;
        let aprendiz = new Aprendiz("Libre",0,0);
        let veteranoA = new VeteranoA("Libre",0,0);
        let veteranoB = new VeteranoB("Libre",0,0);
        let esperas = new Esperas(0,0);
        let filasAMostrar = [];
        let controlEventos = [Control];
        let controlClientes = [Cliente];
        let proximaLlegada = new LlegadaCliente(0,0,0);
        let finAtencionAprendiz = new FinAtencionAprendiz(0,0,0);
        let finAtencionVeteranoA = new FinAtencionVeteranoA(0,0,0);
        let finAtencionVeteranoB = new FinAtencionVeteranoB(0,0,0);
        let recaudacion = new Recaudacion(0,0,0,0);
        let peluqueroAsignado = new AsignacionPeluquero(0,"");
        let peluqueroFinAtencion = "";
        while (dia < dias && numeroFila <= 1000) {
            if (dia >= dias && controlEventos.length == 0) break;

            numeroFila++;
            reloj = controlEventos.length > 0 ? reloj + (controlEventos[0].reloj - reloj): reloj;
            // Controlar si ya se Termino la jornada del dia
            if(reloj >= duracionJornada){
                finJornada = true;
                proximaLlegada.random = null;
                proximaLlegada.demora = null;
                proximaLlegada.llegada = null;
                eliminarProximasllegada(controlEventos);
            }

            // Si recien Abre el negocio 
            if(aperturaNegocio){
                // Calculando y guardando la proxima llegada
                reloj = 0;
                calcularProximaLlegada(datosFormulario.llegadaClientes[0], datosFormulario.llegadaClientes[1], controlEventos, proximaLlegada, dia, reloj);
                aperturaNegocio = false;
            }

            // Controlando si algun Cliente supero los 30 minutos de espera y necesita un refresco
            controlarRefrescoCliente(reloj, controlClientes, recaudacion, dia)

            // Evento Llegada de Cliente
            if(controlEventos[0].evento = "llegada Cliente" && !finJornada){
                // Calculando y guardando la proxima llegada
                calcularProximaLlegada(datosFormulario.llegadaClientes[0], datosFormulario.llegadaClientes[1], controlEventos, proximaLlegada, dia, reloj);
                // Generando la asignacion del peluquero para el cliente que acaba de llegar
                asignarPeluquero(peluqueroAsignado, datosFormulario.aprendiz[0], datosFormulario.veteranoA[0]);
                // Verificando si el peluquero esta libre
                if(verificarEstadoPeluquero(peluqueroAsignado.peluquero, aprendiz, veteranoA, veteranoB)){
                    // Calcular Fin de Atencion del Peluquero
                    calcularFinAtencion(reloj, peluqueroAsignado, distribucionAprendiz, distribucionVeteranoA, distribucionVeteranoB, finAtencionAprendiz, finAtencionVeteranoA, finAtencionVeteranoB, controlEventos, dia);
                    ocuparPeluquero(peluqueroAsignado.peluquero, aprendiz, veteranoA, veteranoB);
                }
                // Si el Peluquero Esta Ocupado
                else{
                    // Generando Nuevo Cliente
                    generarNuevoCliente(controlClientes, esperas, peluqueroAsignado.peluquero, reloj);
                    // Actualizando la cola del peluquero Asignado
                    aumentarColaPeluqueroAsignado(peluqueroAsignado.peluquero, aprendiz, veteranoA, veteranoB);
                    // Gestionando las Esperas
                    esperas.esperaSimultanea ++;
                    if (esperas.esperaSimultanea > esperas.maxEsperaSimultanea){
                        esperas.maxEsperaSimultanea = esperas.esperaSimultanea
                    }
                }
                peluqueroAsignado.random = null;
                peluqueroAsignado.peluquero = "";
            }
            
            // Evento Fin de Atencion
            if(controlEventos[0].evento = "Fin Atencion"){
                verificarFinAtencionPeluquero(peluqueroFinAtencion, reloj, finAtencionAprendiz, finAtencionVeteranoA, finAtencionVeteranoB);
                // Controlar cola de Peluquero que termino de Atender (si no tiene clientes en cola)
                if(controlarColaPeluquero(peluqueroFinAtencion, aprendiz, veteranoA, veteranoB)){
                    liberarPeluquero(peluqueroFinAtencion, aprendiz, veteranoA, veteranoB);
                    actualizarFinAtencion(peluqueroFinAtencion, finAtencionAprendiz, finAtencionVeteranoA, finAtencionVeteranoB, null, null, null);

                }
                // si tiene clientes en cola
                else{
                    // Calculando el Proximo Fin de Atencion para el nuevo cliente
                    calcularFinAtencion(reloj, peluqueroAsignado, distribucionAprendiz, distribucionVeteranoA, distribucionVeteranoB, finAtencionAprendiz, finAtencionVeteranoA, finAtencionVeteranoB, controlEventos, dia);
                    sacarClienteDeEspera(peluqueroFinAtencion,controlClientes);
                    actualizarFinAtencion(peluqueroFinAtencion, finAtencionAprendiz, finAtencionVeteranoA, finAtencionVeteranoB, rndFinAtencion, demoraAtencion, finAtencion);
                }
                // actualizando datos de espera, recaudacion y del objeto peluquero 
                esperas.esperaSimultanea --;
                actualizarRecaudacion(peluqueroFinAtencion, recaudacion,"Ganancia",dia);
                reducirColaPeluquero(peluqueroFinAtencion, aprendiz, veteranoA, veteranoB);
                aumentarclientesAtendidosPeluquero(peluqueroFinAtencion, aprendiz, veteranoA, veteranoB);
            }

            calcularRelojAMostrar(reloj, relojAMostrar);

            let fila = new Fila(numeroFila,controlEventos[0],relojAMostrar,proximaLlegada,peluqueroAsignado,finAtencionAprendiz, finAtencionVeteranoA, finAtencionVeteranoB,aprendiz,veteranoA,veteranoB,recaudacion,esperas,controlClientes);
            
            if (numeroFila >= datosFormulario.rango[0] && numeroFila <= datosFormulario.rango[1]) {
                filasAMostrar.push(fila);
                console.log("Fila agregado:", fila);
            } else {
                console.log("Fila no agregado.");
            }
            ultimaFila = fila;

            // Si la fila no es la primera del dia quiere decir que ocurrio un evento 
            if(!aperturaNegocio){
                controlEventos.shift();                
            }

            // Controlar fin de la jornada y avanzar al siguiente día si es necesario
            if (finJornada && controlEventos.length === 0 && !controlClientes.some(cliente => cliente.estado === "")) {
                dia++;
                reloj = 0;
                aperturaNegocio = true;
                finJornada = false;
                aprendiz.estado = "Libre";
                veteranoA.estado = "Libre";
                veteranoB.estado = "Libre";
                controlEventos = [];
                controlClientes = [];
                console.log(`Iniciando el día ${dia}`);
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
            row.insertCell().textContent = fila.control.relojAMostrar;
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
