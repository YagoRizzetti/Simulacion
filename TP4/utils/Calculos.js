import { actualizarRecaudacion } from "../Eventos/finAtencion.js";

const calcularUniforme = (rnd, a, b) =>{
    let resultado = 0
    resultado = a +(rnd*(b-a));
    resultado = Math.round(resultado); // Redondear a un número entero
    return resultado;
}


export const calcularDemoraLlegada = (rndllegada, a , b) =>{
    let demora = 0;
    demora = calcularUniforme(rndllegada, a, b);
    return demora;
}

export const seleccionarPeluquero = (rnd, probabilidadAprendiz, probabilidadVeteranoA) =>{
    probabilidadVeteranoA = probabilidadAprendiz + probabilidadVeteranoA;
    let peluquero = "";
    if(rnd < probabilidadAprendiz){
        peluquero = "Aprendiz";
    } 
    if(rnd < probabilidadVeteranoA){
        peluquero = "Veterano A";
    }
    else{
        peluquero = "Veterano B";
    }

    return peluquero;
}

export const verificarEstadoPeluquero = (peluqueroAsignado, aprendiz, veteranoA, veteranoB) =>{
    if(peluqueroAsignado == "Aprendiz" && aprendiz.estado == "Libre"){
        return true;
    }
    if(peluqueroAsignado == "Veterano A" && veteranoA.estado == "Libre"){
        return true;
    }
    if(peluqueroAsignado == "Veterano B" && veteranoB.estado == "Libre"){
        return true;
    }
    else{
        return false;
    }
}

export const calcularMomentoRefresco = (reloj) =>{
    let momentoRefresco = reloj + 1800;
    return momentoRefresco;
}

export const eliminarProximasllegada = (controlEventos) => {
    controlEventos = controlEventos.filter(evento => evento.evento !== "Llegada Cliente");
};

export const controlarRefrescoCliente = (reloj, controlClientes, recaudacion, dia) =>{
    for (let cliente of controlClientes){
        if(reloj >= cliente.momentoRefresco && !cliente.refresco){
            actualizarRecaudacion("",recaudacion, "Gasto", dia);
            cliente.refresco = true;
        }
    }
}

export const calcularRelojAMostrar = (reloj, relojAMostrar) => {
    let horas = Math.floor(reloj / 3600);
    let minutos = Math.floor((reloj % 3600) / 60);
    let segundos = reloj % 60;
    
    // Formatear para asegurar que siempre se muestren dos dígitos
    let horasFormateadas = horas.toString().padStart(2, '0');
    let minutosFormateados = minutos.toString().padStart(2, '0');
    let segundosFormateados = segundos.toString().padStart(2, '0');
    
    relojAMostrar = `${horasFormateadas}:${minutosFormateados}:${segundosFormateados}`;
}