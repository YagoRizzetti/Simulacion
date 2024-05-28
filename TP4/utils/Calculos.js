
export const calcularTipo = (rnd1,tipos) =>{
    let tipo = "";
    if(rnd1 < tipos[0]){
        tipo = "Paciente"
        return tipo
    }
    if(rnd1 < tipos[0] + tipos[1]){
        tipo = "Asistio a la clinica"
        return tipo
    }
    else{
        tipo = "Nunca Asistio a la clinica"
        return tipo
    }
}

export const calcularAsesor = (rnd2,asesores,tipo) =>{
    let asesor = "";
    if(tipo == "Paciente"){
        if(rnd2 < asesores[0]){
            asesor = "si"
        }
        else{
            asesor = "no"
        }
        return asesor
    }
    if(tipo == "Asistio a la clinica"){
        if(rnd2 < asesores[2]){
            asesor = "si"
        }
        else{
            asesor = "no"
        }
        return asesor
    }
    else{
        if(rnd2 < asesores[4]){
            asesor = "si"
        }
        else{
            asesor = "no"
        }
        return asesor
    }
}
