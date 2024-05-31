// Liberar Peluquero Asignado
export const liberarPeluquero = (peluqueroFinAtencion, aprendiz, veteranoA, veteranoB) =>{
    if(peluqueroFinAtencion == "Aprendiz"){
        aprendiz.estado = "Ocupado";
    }
    if(peluqueroFinAtencion == "Veterano A"){
        veteranoA.estado = "Ocupado";
    }
    if(peluqueroFinAtencion == "Veterano B"){
        veteranoB.estado = "Ocupado";
    }
    
}