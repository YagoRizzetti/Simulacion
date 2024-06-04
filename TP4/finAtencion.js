import { calcularFinAtencion, formatearTiempo } from "./calculos.js";

export const finAtencion = (nuevaFila, ultimaFila, distribucionAAprendiz, distribucionBAprendiz, distribucionAVeteranoA, distribucionBVeteranoA, distribucionAVeteranoB, distribucionBVeteranoB) =>{
    //let nuevaFila = [[0,"",1,0,""],[0,0,0],[0,""],[0,0,0],[0,0,0],[0,0,0],["Libre",0,0],["Libre",0,0],["Libre",0,0],[0,0,0,0],[0,0],[]];
    nuevaFila = ultimaFila;
    nuevaFila.numero ++;
    nuevaFila.control.evento = "Fin Atencion";
    // Fin Atencion Aprendiz
    if(ultimaFila.finAtencionAprendiz.finAtencion < ultimaFila.finAtencionVeteranoA.finAtencion && ultimaFila.finAtencionAprendiz.finAtencion < ultimaFila.finAtencionVeteranoB.finAtencion){
        nuevaFila.control.reloj = ultimaFila.control.reloj + ultimaFila.finAtencionAprendiz.demora;
        nuevaFila.relojAMostrar = formatearTiempo(nuevaFila.control.reloj);
        nuevaFila.aprendiz.clientesAtendidos++;
        if(ultimaFila.aprendiz.cola == 0){
            nuevaFila.aprendiz.estado = "Libre";
            nuevaFila.finAtencionAprendiz.random = 0;
            nuevaFila.finAtencionAprendiz.demora = 0;
            nuevaFila.finAtencionAprendiz.finAtencion = 0; 
        }
        else{
            nuevaFila.aprendiz.cola = ultimaFila.aprendiz.cola - 1;
            let random, demora, momentoFinAtencion = calcularFinAtencion(nuevaFila.control.reloj,distribucionAAprendiz, distribucionBAprendiz);
            nuevaFila.finAtencionAprendiz.random = random;
            nuevaFila.finAtencionAprendiz.demora = demora;
            nuevaFila.finAtencionAprendiz.finAtencion = momentoFinAtencion;
            nuevaFila.recaudacion.gananciasDiarias += 1800;
            nuevaFila.recaudacion.gananciasNetas += 1800;
            nuevaFila.recaudacion.promedioRecaudacion = nuevaFila.recaudacion.gananciasNetas/nuevaFila.control.dia;
            let maxMomentoRefresco = Infinity;
            for(let i in ultimaFila.clientes){
                if(i.momentoRefresco < maxMomentoRefresco && i.peluquero == "Aprendiz"){
                    maxMomentoRefresco = i.momentoRefresco;
                }
            }
            for(let i in ultimaFila.clientes){
                if(i.momentoRefresco == maxMomentoRefresco){
                    nuevaFila.estado = "";
                    nuevaFila.peluquero = "";
                    nuevaFila.momentoRefresco = 0;
                    nuevaFila.refresco = "";
                }
            }
            nuevaFila.esperas.esperaSimultanea = ultimaFila.esperas.esperaSimultanea - 1;
        }
    }
    // Fin Atencion Veterano A
    if(ultimaFila.finAtencionVeteranoA.finAtencion < ultimaFila.finAtencionAprendiz.finAtencion && ultimaFila.finAtencionVeteranoA.finAtencion < ultimaFila.finAtencionVeteranoB.finAtencion){
        nuevaFila.control.reloj = ultimaFila.control.reloj + ultimaFila.finAtencionVeteranoA.demora;
        nuevaFila.relojAMostrar = formatearTiempo(nuevaFila.control.reloj);
        nuevaFila.veteranoA.clientesAtendidos++;
        if(ultimaFila.veteranoA.cola == 0){
            nuevaFila.veteranoA.estado = "Libre";
            nuevaFila.finAtencionVeteranoA.random = 0;
            nuevaFila.finAtencionVeteranoA.demora = 0;
            nuevaFila.finAtencionVeteranoA.finAtencion = 0; 
        }
        else{
            nuevaFila.veteranoA.cola = ultimaFila.veteranoA.cola - 1;
            let random, demora, momentoFinAtencion = calcularFinAtencion(nuevaFila.control.reloj,distribucionAVeteranoA, distribucionBVeteranoA);
            nuevaFila.finAtencionVeteranoA.demora = demora;
            nuevaFila.finAtencionVeteranoA.finAtencion = momentoFinAtencion;
            nuevaFila.finAtencionVeteranoA.random = random;
            nuevaFila.recaudacion.gananciasDiarias += 2500;
            nuevaFila.recaudacion.gananciasNetas += 2500;
            nuevaFila.recaudacion.promedioRecaudacion = nuevaFila.recaudacion.gananciasNetas/nuevaFila.control.dia;
            let maxMomentoRefresco = Infinity;
            for(let i in ultimaFila.clientes){
                if(i.momentoRefresco < maxMomentoRefresco && i.peluquero == "Veterano A"){
                    maxMomentoRefresco = i.momentoRefresco;
                }
            }
            for(let i in ultimaFila.clientes){
                if(i.momentoRefresco == maxMomentoRefresco){
                    nuevaFila.estado = "";
                    nuevaFila.peluquero = "";
                    nuevaFila.momentoRefresco = 0;
                    nuevaFila.refresco = "";
                }
            }
            nuevaFila.esperas.esperaSimultanea = ultimaFila.esperas.esperaSimultanea - 1;
        }

    }
    // Fin Atencion Veterano B
    else{
        nuevaFila.control.reloj = ultimaFila.control.reloj + ultimaFila.finAtencionVeteranoB.demora;
        nuevaFila.relojAMostrar = formatearTiempo(nuevaFila.control.reloj);
        nuevaFila.veteranoB.clientesAtendidos++;
        if(ultimaFila.veteranoB.cola == 0){
            nuevaFila.veteranoB.estado = "Libre";
            nuevaFila.finAtencionVeteranoB.random = 0;
            nuevaFila.finAtencionVeteranoB.demora = 0;
            nuevaFila.finAtencionVeteranoB.finAtencion = 0; 
        }
        else{
            nuevaFila.veteranoB.cola = ultimaFila.veteranoB.cola - 1;
            let random, demora, momentoFinAtencion = calcularFinAtencion(nuevaFila.control.reloj,distribucionAVeteranoB, distribucionBVeteranoB);
            nuevaFila.finAtencionVeteranoB.demora = demora;
            nuevaFila.finAtencionVeteranoB.finAtencion = momentoFinAtencion;
            nuevaFila.finAtencionVeteranoB.random = random;
            nuevaFila.recaudacion.gananciasDiarias += 2500;
            nuevaFila.recaudacion.gananciasNetas += 2500;
            nuevaFila.recaudacion.promedioRecaudacion = nuevaFila.recaudacion.gananciasNetas/nuevaFila.control.dia;
            let maxMomentoRefresco = Infinity;
            for(let i in ultimaFila.clientes){
                if(i.momentoRefresco < maxMomentoRefresco && i.peluquero == "Veterano B"){
                    maxMomentoRefresco = i.momentoRefresco;
                }
            }
            for(let i in ultimaFila.clientes){
                if(i.momentoRefresco == maxMomentoRefresco){
                    nuevaFila.estado = "";
                    nuevaFila.peluquero = "";
                    nuevaFila.momentoRefresco = 0;
                    nuevaFila.refresco = "";
                }
            }
            nuevaFila.esperas.esperaSimultanea = ultimaFila.esperas.esperaSimultanea - 1;
        }

    }

    if(ultimaFila.clientes.length > 0){
        for(let i in ultimaFila.clientes){
            if(i.momentoRefresco <= nuevaFila.control.reloj){
                nuevaFila.clientes[i].refresco = "Si"
                nuevaFila.recaudacion.gastosDiarios = ultimaFila.recaudacion.gananciasDiarias + 1500;
                nuevaFila.recaudacion.gananciasNetas = ultimaFila.recaudacion.gananciasNetas - 1500;
                nuevaFila.recaudacion.promedioRecaudacion = nuevaFila.recaudacion.gananciasNetas/nuevaFila.control.dia;
            }
        }
    }

    return nuevaFila;
}
