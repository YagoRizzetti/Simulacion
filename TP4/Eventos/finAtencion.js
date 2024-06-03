
export const verificarFinAtencionPeluquero = (peluqueroFinAtencion, reloj, finAtencionAprendiz, finAtencionVeteranoA, finAtencionVeteranoB) =>{
    if(reloj == finAtencionAprendiz.finAtencion){
        peluqueroFinAtencion = "Aprendiz";
    }
    if(reloj == finAtencionVeteranoA.finAtencion){
        peluqueroFinAtencion = "Veterano A";
    }
    else{
        peluqueroFinAtencion = "Veterano B";
    }
}

export const controlarColaPeluquero = (peluqueroFinAtencion, aprendiz, veteranoA, veteranoB) => {
    if(peluqueroFinAtencion == "Aprendiz" && aprendiz.cola == 0){
        return true
    }
    if(peluqueroFinAtencion == "Veterano A" && veteranoA.cola == 0){
        return true
    }
    if(peluqueroFinAtencion == "Veterano B" && veteranoB.cola == 0){
        return true
    }
    return false
}

export const reducirColaPeluquero = (peluqueroFinAtencion, aprendiz, veteranoA, veteranoB) =>{
    if(peluqueroFinAtencion == "Aprendiz"){
        aprendiz.cola --;
    }
    if(peluqueroFinAtencion == "Veterano A"){
        veteranoA.cola --;
    }
    if(peluqueroFinAtencion == "Veterano B"){
        veteranoB.cola --;
    }
}

export const aumentarclientesAtendidosPeluquero = (peluqueroFinAtencion, aprendiz, veteranoA, veteranoB) =>{
    if(peluqueroFinAtencion == "Aprendiz"){
        aprendiz.clientesAtendidos++;
    }
    if(peluqueroFinAtencion == "Veterano A"){
        veteranoA.clientesAtendidos++;
    }
    if(peluqueroFinAtencion == "Veterano B"){
        veteranoB.clientesAtendidos++;
    }
}

export const sacarClienteDeEspera = (peluqueroFinAtencion, controlClientes) => {
    let posicionClienteAEliminar = -1;
    let momentoRefrescoMasCerca = Infinity;  // Inicializar con un valor alto
    let posicionActual = 0;

    for (let cliente of controlClientes) {
        if (cliente.peluquero === peluqueroFinAtencion) {
            if (cliente.momentoRefresco < momentoRefrescoMasCerca) {
                momentoRefrescoMasCerca = cliente.momentoRefresco;
                posicionClienteAEliminar = posicionActual;
            }
        }
        posicionActual++;
    }

    if (posicionClienteAEliminar !== -1) {
        controlClientes[posicionClienteAEliminar].estado = "";
        controlClientes[posicionClienteAEliminar].peluquero = "";
        controlClientes[posicionClienteAEliminar].momentoRefresco = 0;
        controlClientes[posicionClienteAEliminar].refresco = "";
    }
}

export const actualizarRecaudacion = (peluqueroFinAtencion, recaudacion, tipo, dia, controlClientes) =>{
    if(tipo == "Ganancia"){
        if(peluqueroFinAtencion == "Aprendiz"){
            recaudacion.gananciasDiarias += 1800;
            recaudacion.gananciasNetas += 1800;
        }
        if(peluqueroFinAtencion == "Veterano A" || peluqueroFinAtencion == "Veterano B"){
            recaudacion.gananciasDiarias += 3500;
            recaudacion.gananciasNetas += 3500;
        }
    }
    else{
        recaudacion.gastosDiarios -= 1500;
        recaudacion.gananciasNetas -= 1500;
    }
    recaudacion.promedioRecaudacion = recaudacion.gananciasNetas/dia;
}

export const actualizarFinAtencion = (peluqueroFinAtencion, finAtencionAprendiz, finAtencionVeteranoA, finAtencionVeteranoB, random, demora, finAtencion) =>{
    if(peluqueroFinAtencion == "Aprendiz"){
        finAtencionAprendiz.random = random;
        finAtencionAprendiz.demora = demora;
        finAtencionAprendiz.finAtencion = finAtencion;
    }
    if(peluqueroFinAtencion == "Veterano A"){
        finAtencionVeteranoA.random = random;
        finAtencionVeteranoA.demora = demora;
        finAtencionVeteranoA.finAtencion = finAtencion;
    }
    if(peluqueroFinAtencion == "Veterano B"){
        finAtencionVeteranoB.random = random;
        finAtencionVeteranoB.demora = demora;
        finAtencionVeteranoB.finAtencion = finAtencion;
    }
}