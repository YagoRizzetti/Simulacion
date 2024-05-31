// Ocupar Peluquero Asignado
export const ocuparPeluquero = (peluqueroAsignado, aprendiz, veteranoA, veteranoB) =>{
    if(peluqueroAsignado == "Aprendiz"){
        aprendiz.estado = "Ocupado";
    }
    if(peluqueroAsignado == "Veterano A"){
        veteranoA.estado = "Ocupado";
    }
    if(peluqueroAsignado == "Veterano B"){
        veteranoB.estado = "Ocupado";
    }
    
}