import { calcularProximaLlegada, asignarPeluquero, calcularFinAtencion, formatearTiempo } from "./calculos.js";
import { Cliente } from "./Clases.js";

export const llegadaCliente = (nuevaFila, ultimaFila, distribucionALlegada, distribucionBLlegada, probabilidadAprendiz, probabilidadVeteranoA, probabilidadVeteranoB, distribucionAAprendiz, distribucionBAprendiz, distribucionAVeteranoA, distribucionBVeteranoA, distribucionAVeteranoB, distribucionBVeteranoB) =>{
    // let nuevaFila = [[0,"",1,0,""],[0,0,0],[0,""],[0,0,0],[0,0,0],[0,0,0],["Libre",0,0],["Libre",0,0],["Libre",0,0],[0,0,0,0],[0,0],[]];
    nuevaFila = ultimaFila;
    nuevaFila.numero = ultimaFila.numero + 1;
    nuevaFila.control.evento = "Llegada Cliente";
    nuevaFila.control.reloj = ultimaFila.control.reloj + ultimaFila.llegadaCliente.llegada;
    nuevaFila.relojAMostrar = formatearTiempo(nuevaFila.control.reloj);
    let randomLlegada , demoraLlegada , momentoLlegada = calcularProximaLlegada(nuevaFila.control.reloj, distribucionALlegada, distribucionBLlegada);
    nuevaFila.llegadaCliente.random = randomLlegada;
    nuevaFila.llegadaCliente.demora = demoraLlegada;
    nuevaFila.llegadaCliente.llegada = momentoLlegada;
    let randomPeluquero, peluquero = asignarPeluquero(probabilidadAprendiz,probabilidadVeteranoA,probabilidadVeteranoB);
    nuevaFila.asignarPeluquero.random = randomPeluquero;
    nuevaFila.asignarPeluquero.peluquero = peluquero;
    if(peluquero == "Aprendiz"){
        if(ultimaFila.aprendiz.estado == "Libre"){
            nuevaFila.aprendiz.estado = "Ocupado"
            nuevaFila.finAtencionAprendiz.random, nuevaFila.finAtencionAprendiz.demora , nuevaFila.finAtencionAprendiz.finAtencion = calcularFinAtencion(nuevaFila.control.reloj,distribucionAAprendiz, distribucionBAprendiz)
        }
        else{
            nuevaFila.aprendiz.cola ++;
            nuevaFila.esperas.esperaSimultanea ++;            
            if(nuevaFila.esperas.esperaSimultanea > ultimaFila.esperas.maxEsperaSimultanea){
                nuevaFila.esperas.maxEsperaSimultanea ++;
            }
            let momentoRefresco = nuevaFila.control.reloj + 1800;
            let nuevoClienteEnEspera = new Cliente("En Espera","Aprendiz",momentoRefresco,"No");
            if(ultimaFila.clientes.length == 0){
                nuevaFila.clientes.push(nuevoClienteEnEspera);
            }
            for(let i in ultimaFila.clientes){
                if(i.estado == ""){
                    nuevaFila.clientes[i].estado = nuevoClienteEnEspera.estado;
                    nuevaFila.clientes[i].peluquero = nuevoClienteEnEspera.peluquero;
                    nuevaFila.clientes[i].momentoRefresco = nuevoClienteEnEspera.momentoRefresco;
                    nuevaFila.clientes[i].refresco = nuevoClienteEnEspera.refresco;
                    break
                }
                else{
                    nuevaFila.clientes.push(nuevoClienteEnEspera);
                }
            } 
        }
    }
    if(peluquero == "Veterano A"){
        if(ultimaFila.veteranoA.estado == "Libre"){
            nuevaFila.veteranoA.estado = "Ocupado"
            nuevaFila.finAtencionVeteranoA.random, nuevaFila.finAtencionVeteranoA.demora , nuevaFila.finAtencionVeteranoA.finAtencion = calcularFinAtencion(nuevaFila.control.reloj,distribucionAVeteranoA, distribucionBVeteranoA)
        }
        else{
            nuevaFila.veteranoA.cola ++;
            nuevaFila.esperas.esperaSimultanea ++;            
            if(nuevaFila.esperas.esperaSimultanea > ultimaFila.esperas.maxEsperaSimultanea){
                nuevaFila.esperas.maxEsperaSimultanea ++;
            }
            let momentoRefresco = nuevaFila.control.reloj + 1800;
            let nuevoClienteEnEspera = new Cliente("En Espera","Veterano A",momentoRefresco,"No");
            if(ultimaFila.clientes.length == 0){
                nuevaFila.clientes.push(nuevoClienteEnEspera);
            }
            for(let i in ultimaFila.clientes){
                if(i.estado == ""){
                    nuevaFila.clientes[i].estado = nuevoClienteEnEspera.estado;
                    nuevaFila.clientes[i].peluquero = nuevoClienteEnEspera.peluquero;
                    nuevaFila.clientes[i].momentoRefresco = nuevoClienteEnEspera.momentoRefresco;
                    nuevaFila.clientes[i].refresco = nuevoClienteEnEspera.refresco;
                    break
                }
                else{
                    nuevaFila.clientes.push(nuevoClienteEnEspera);
                }
            } 
        }

    }
    if(peluquero == "Veterano B"){
        if(ultimaFila.veteranoB.estado == "Libre"){
            nuevaFila.veteranoB.estado = "Ocupado"
            nuevaFila.finAtencionVeteranoB.random, nuevaFila.finAtencionVeteranoB.demora , nuevaFila.finAtencionVeteranoB.finAtencion = calcularFinAtencion(nuevaFila.control.reloj,distribucionAVeteranoB, distribucionBVeteranoB)
        }
        else{
            nuevaFila.veteranoB.cola ++;
            nuevaFila.esperas.esperaSimultanea ++;            
            if(nuevaFila.esperas.esperaSimultanea > ultimaFila.esperas.maxEsperaSimultanea){
                nuevaFila.esperas.maxEsperaSimultanea ++;
            }
            let momentoRefresco = nuevaFila.control.reloj + 1800;
            let nuevoClienteEnEspera = new Cliente("En Espera","Veterano B",momentoRefresco,"No");
            if(ultimaFila.clientes.length == 0){
                nuevaFila.clientes.push(nuevoClienteEnEspera);
            }
            for(let i in ultimaFila.clientes){
                if(i.estado == ""){
                    nuevaFila.clientes[i].estado = nuevoClienteEnEspera.estado;
                    nuevaFila.clientes[i].peluquero = nuevoClienteEnEspera.peluquero;
                    nuevaFila.clientes[i].momentoRefresco = nuevoClienteEnEspera.momentoRefresco;
                    nuevaFila.clientes[i].refresco = nuevoClienteEnEspera.refresco;
                    break
                }
                else{
                    nuevaFila.clientes.push(nuevoClienteEnEspera);
                }
            } 
        }
    }
    return nuevaFila;
}