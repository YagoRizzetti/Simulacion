const calcularUniforme = (rnd, a, b) =>{
    resultado = a + rnd*(b-a)
    return resultado
}


export const calcularDemoraLlegada = (rndllegada, a , b) =>{
    demora = calcularUniforme(rndllegada, a, b)
    return demora
}

export const calcularAsignacionPeluquero = (rndAsignacion, a , b) =>{
    asignacion = calcularUniforme(rndAsignacion, a, b)
}

export const calcularFinAtencionAprendiz = (rndFinAtencionAprendiz, a , b) =>{

}

export const calcularFinAtencionVeteranoA = (rndFinAtencionVeteranoA, a , b) =>{

}

export const calcularFinAtencionVeteranoB = (rndFinAtencionVeteranoB, a , b) =>{

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