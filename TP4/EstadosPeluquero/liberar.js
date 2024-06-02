// Liberar Peluquero Asignado
export const liberarPeluquero = (peluqueroFinAtencion, aprendiz, veteranoA, veteranoB) =>{
    if(peluqueroFinAtencion == "Aprendiz"){
        aprendiz.estado = "Libre";
    }
    if(peluqueroFinAtencion == "Veterano A"){
        veteranoA.estado = "Libre";
    }
    if(peluqueroFinAtencion == "Veterano B"){
        veteranoB.estado = "Libre";
    }
    
}