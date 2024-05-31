import {Cliente, Control} from "../Clases"
import { calcularMomentoRefresco, seleccionarPeluquero } from "../utils/Calculos";
import { generarRandom } from "../utils/GeneradorRandoms";

export const calcularProximaLlegada = (uniformaALlegada, uniformeBLlegada, controlEventos, proximaLlegada) =>{
    let rndllegada = generarRandom();
    let demora = calcularDemoraLlegada(rndllegada, uniformaALlegada, uniformeBLlegada)
    let momentoLlegada = reloj + demora;
    let control = new Control("llegada Cliente", dia, momentoLlegada);
    controlEventos.push(control);
    controlEventos.sort();
    proximaLlegada.random, proximaLlegada.demora, proximaLlegada.llegada = rndllegada, demora, momentoLlegada;
}

export const asignarPeluquero = (peluqueroAsignado, probabilidadAprendiz, probabilidadVeteranoA) =>{
    let rndAsignacion = generarRandom();
    peluqueroAsignado = seleccionarPeluquero(rndAsignacion, probabilidadAprendiz, probabilidadVeteranoA);
}

export const calcularFinAtencion = (rndFinAtencion, reloj, peluquero, demoraAtencion, finAtencion ,distribucionAprendiz, distribucionVeteranoA, distribucionVeteranoB, finAtencionAprendiz, finAtencionVeteranoA, finAtencionVeteranoB) =>{
    rndFinAtencion = generarRandom();
    if(peluquero == "Aprendiz"){
        demoraAtencion = calcularUniforme(rndFinAtencion, distribucionAprendiz[0], distribucionAprendiz[1]);
        finAtencion = reloj + demoraAtencion;
        finAtencionAprendiz.random, finAtencionAprendiz.demora, finAtencionAprendiz.finAtencion = rndFinAtencion,demoraAtencion,finAtencion;
    }
    if(peluquero == "Veterano A"){
        demoraAtencion = calcularUniforme(rndFinAtencion, distribucionVeteranoA[0], distribucionVeteranoA[1]);
        finAtencion = reloj + demoraAtencion;
        finAtencionVeteranoA.random, finAtencionVeteranoA.demora, finAtencionVeteranoA.finAtencion = rndFinAtencion,demoraAtencion,finAtencion;
    }
    if(peluquero == "Veterano B"){
        demoraAtencion = calcularUniforme(rndFinAtencion, distribucionVeteranoB[0], distribucionVeteranoB[1]);
        finAtencion = reloj + demoraAtencion;
        finAtencionVeteranoB.random, finAtencionVeteranoB.demora, finAtencionVeteranoB.finAtencion = rndFinAtencion,demoraAtencion,finAtencion;
    }
}

export const generarNuevoCliente = (controlClientes, esperas, peluqueroAsignado, reloj) =>{
    let clienteCreado = new Cliente();
    if(length.controlClientes = 0){
        clienteCreado = (1, "En Espera", peluqueroAsignado, calcularMomentoRefresco(reloj), false);
    }
    if(length.controlClientes = esperas.maxEsperaSimultanea){
        let numero = esperas.maxEsperaSimultanea + 1;
        clienteCreado = (numero, "En Espera", peluqueroAsignado, calcularMomentoRefresco(reloj), false);
    }
    if(length.controlClientes < esperas.esperaSimultanea){
        for(let cliente in controlClientes){
            if(cliente.estado == ""){
                clienteCreado = (cliente.numero, "En Espera", peluqueroAsignado, calcularMomentoRefresco(reloj), false);
            } 
        }
    }
    controlClientes.push(clienteCreado);
}
