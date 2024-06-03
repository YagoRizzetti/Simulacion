import {Cliente, Control} from "../Clases.js"
import { calcularMomentoRefresco, seleccionarPeluquero, calcularDemoraLlegada} from "../utils/Calculos.js";
import { generarRandom } from "../utils/GeneradorRandoms.js";

export const calcularProximaLlegada = (uniformaALlegada, uniformeBLlegada, controlEventos, proximaLlegada, dia, reloj) =>{
    let rndllegada = 0;
    rndllegada = generarRandom();
    let demora = calcularDemoraLlegada(rndllegada, uniformaALlegada, uniformeBLlegada)
    let momentoLlegada = reloj + demora;
    let control = new Control("llegada Cliente", dia, momentoLlegada);
    controlEventos.push(control);
    controlEventos.sort((a, b) => a.reloj - b.reloj);
    proximaLlegada.random, proximaLlegada.demora, proximaLlegada.llegada = rndllegada, demora, momentoLlegada;
}

export const asignarPeluquero = (peluqueroAsignado, probabilidadAprendiz, probabilidadVeteranoA) =>{
    let rndAsignacion = 0;
    rndAsignacion = generarRandom();
    peluqueroAsignado = seleccionarPeluquero(rndAsignacion, probabilidadAprendiz, probabilidadVeteranoA);
}

export const calcularFinAtencion = (reloj, peluquero, distribucionAprendiz, distribucionVeteranoA, distribucionVeteranoB, finAtencionAprendiz, finAtencionVeteranoA, finAtencionVeteranoB, controlEventos, dia) =>{
    let rndFinAtencion = 0;
    rndFinAtencion = generarRandom();
    let demoraAtencion = 0;
    let finAtencion = 0;
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
    let control = new Control("Fin Atencion", dia, finAtencion);
    controlEventos.push(control);
    controlEventos.sort((a, b) => a.reloj - b.reloj);
}

export const generarNuevoCliente = (controlClientes, esperas, peluqueroAsignado, reloj) =>{
    let clienteCreado = new Cliente();
    if(length.controlClientes == 0){
        clienteCreado.numero = 1;
        clienteCreado.estado = "En Espera";
        clienteCreado.peluquero = peluqueroAsignado;
        clienteCreado.momentoRefresco = calcularMomentoRefresco(reloj);
        clienteCreado.refresco = "No";
    }
    if(length.controlClientes == esperas.maxEsperaSimultanea){
        let numero = esperas.maxEsperaSimultanea + 1;
        clienteCreado.numero = numero;
        clienteCreado.estado = "En Espera";
        clienteCreado.peluquero = peluqueroAsignado;
        clienteCreado.momentoRefresco = calcularMomentoRefresco(reloj);
        clienteCreado.refresco = "No";
    }
    if(controlClientes.length < esperas.esperaSimultanea){
        for(let cliente in controlClientes){
            if(cliente.estado == ""){
                clienteCreado.numero = cliente.numero;
                clienteCreado.estado = "En Espera";
                clienteCreado.peluquero = peluqueroAsignado;
                clienteCreado.momentoRefresco = calcularMomentoRefresco(reloj);
                clienteCreado.refresco = "No";
            } 
        }
    }
    controlClientes.push(clienteCreado);
}

export const aumentarColaPeluqueroAsignado = (peluqueroAsignado, aprendiz, veteranoA, veteranoB) =>{
    if(peluqueroAsignado == "Aprendiz"){
        aprendiz.cola ++;
    }
    if(peluqueroAsignado == "Veterano A"){
        veteranoA.cola ++;
    }
    if(peluqueroAsignado == "Veterano B"){
        veteranoB.cola ++;
    }

}