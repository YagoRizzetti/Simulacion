export const verificarFinAtencionPeluquero = (peluqueroFinAtencion, reloj, finAtencionAprendiz, finAtencionVeteranoA, finAtencionVeteranoB) =>{
    if(reloj == finAtencionAprendiz.finAtencion){
        peluqueroFinAtencion = "Aprendiz";
    }
    if(reloj == finAtencionVeteranoA.finAtencion){
        peluqueroFinAtencion = "Veterano A";
    }
    if(reloj == finAtencionVeteranoB.finAtencion){
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

export const sacarClienteDeEspera = (peluqueroFinAtencion, controlClientes) =>{
    posicionCLienteAEliminar = 0;
    momentoRefrescoMasCerca = 0;
    for(cliente in controlClientes){
        if(cliente.peluquero == peluqueroFinAtencion){
            if(momentoRefrescoMasCerca = 0){
                momentoRefrescoMasCerca = cliente.momentoRefresco;
            }
            else{
                if(cliente.momentoRefresco < momentoRefrescoMasCerca){
                    momentoRefrescoMasCerca = cliente.momentoRefresco;
                }
            }
        }
    }
}

export const actualizarRecaudacion = (peluqueroFinAtencion, recaudacion, tipo, dia) =>{
    if(tipo == "Ganancia"){
        if(peluqueroFinAtencion == "Aprendiz"){
            recaudacion.gananciasDiarias += 1800;
            recaudacion.gananciasNetas += 1800;
        }
        if(peluqueroFinAtencion == "Veterano A" || peluqueroFinAtencion == "Veterano B"){
            recaudacion.gananciasDiarias += 2500;
            recaudacion.gananciasNetas += 2500;
        }
    }
    else{
        recaudacion.gastosDiarios -= 1500;
        recaudacion.gananciasNetas -= 1500;
    }
    recaudacion.promedioRecaudacion = gananciasNetas/dia;
}