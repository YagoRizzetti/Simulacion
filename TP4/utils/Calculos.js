const calcularUniforme = (rnd, a, b) =>{
    resultado = a + rnd*(b-a)
    return resultado
}


export const calcularDemoraLlegada = (rndllegada, a , b) =>{
    demora = calcularUniforme(rndllegada, a, b)
    return demora
}

export const calcularFinAtencion = (reloj, rndFinAtencion, peluquero, distribucionAprendiz, distribucionVeteranoA, distribucionVeteranoB) =>{
    if(peluquero == "Aprendiz"){
        let demoraAtencion = calcularUniforme(rndFinAtencion, distribucionAprendiz[0], distribucionAprendiz[1]);
        let finAtencion = reloj + demoraAtencion;
        return(demoraAtencion, finAtencion);
    }
    if(peluquero == "Veterano A"){
        let demoraAtencion = calcularUniforme(rndFinAtencion, distribucionVeteranoA[0], distribucionVeteranoA[1]);
        let finAtencion = reloj + demoraAtencion;
        return(demoraAtencion, finAtencion);
    }
    if(peluquero == "Veterano B"){
        let demoraAtencion = calcularUniforme(rndFinAtencion, distribucionVeteranoB[0], distribucionVeteranoB[1]);
        let finAtencion = reloj + demoraAtencion;
        return(demoraAtencion, finAtencion);
    }
}

export const seleccionarPeluquero = (rnd, probabilidadAprendiz, probabilidadVeteranoA) =>{
    probabilidadVeteranoA = probabilidadAprendiz + probabilidadVeteranoA
    let peluquero = ""
    if(rnd < probabilidadAprendiz){
        peluquero = "Aprendiz"
    } 
    if(rnd < probabilidadVeteranoA){
        peluquero = "Veterano A"
    }
    else{
        peluquero = "Veterano B"
    }

    return peluquero
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

// Cambiando el estado del Peluquero Asignado
export const cambiarEstadoPeluquero = (peluqueroAsignado, nuevoEstado, aprendiz, veteranoA, veteranoB) =>{
    if(peluqueroAsignado == "Aprendiz"){
        aprendiz.estado = nuevoEstado;
    }
    if(peluqueroAsignado == "Veterano A"){
        veteranoA.estado = nuevoEstado;
    }
    if(peluqueroAsignado == "Veterano B"){
        veteranoB.estado = nuevoEstado;
    }
    
}