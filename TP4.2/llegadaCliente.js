import { calcularProximaLlegada, asignarPeluquero, calcularFinAtencion, formatearTiempo } from "./calculos.js";

export const llegadaCliente = (ultimaFila, distribucionALlegada, distribucionBLlegada, probabilidadAprendiz, probabilidadVeteranoA, probabilidadVeteranoB, distribucionAAprendiz, distribucionBAprendiz, distribucionAVeteranoA, distribucionBVeteranoA, distribucionAVeteranoB, distribucionBVeteranoB) =>{
    // let nuevaFila = [[0,"",1,0,""],[0,0,0],[0,""],[0,0,0],[0,0,0],[0,0,0],["Libre",0,0],["Libre",0,0],["Libre",0,0],[0,0,0,0],[0,0],[]];
    let nuevaFila = ultimaFila;
    nuevaFila[0][0] = ultimaFila[0][0] + 1;
    nuevaFila[0][1] = "Llegada Cliente";
    nuevaFila[0][3] = ultimaFila[0][3] + ultimaFila[1][1];
    nuevaFila[0][4] = formatearTiempo(nuevaFila[0][3]);
    let randomLlegada , demoraLlegada , momentoLlegada = calcularProximaLlegada(nuevaFila[0][3],distribucionALlegada, distribucionBLlegada);
    nuevaFila[1][0] = randomLlegada;
    nuevaFila[1][1] = demoraLlegada;
    nuevaFila[1][2] = momentoLlegada;
    let randomPeluquero, peluquero = asignarPeluquero(probabilidadAprendiz,probabilidadVeteranoA,probabilidadVeteranoB);
    nuevaFila[2][0] = randomPeluquero;
    nuevaFila[2][1] = peluquero;
    if(peluquero == "Aprendiz"){
        if(ultimaFila[6][0] == "Libre"){
            nuevaFila[6][0] = "Ocupado"
            nuevaFila[3][0], nuevaFila[3][1] , nuevaFila[3][2] = calcularFinAtencion(nuevaFila[0][3],distribucionAAprendiz, distribucionBAprendiz)
        }
        else{
            nuevaFila[6][1] ++;
            nuevaFila[10][0] ++;            
            if(nuevaFila[10][0] > ultimaFila[10][1]){
                nuevaFila[10][1] = ultimaFila[10][1] + 1;
            }
            let momentoRefresco = nuevaFila[0][3] + 1800;
            let nuevoClienteEnEspera = ["En Espera","Aprendiz",momentoRefresco,"No"];
            if(ultimaFila[11].length == 0){
                nuevaFila[11].push(nuevoClienteEnEspera);
            }
            for(let i in ultimaFila[11]){
                if(i[0] == ""){
                    nuevaFila[11][i][0] = nuevoClienteEnEspera[0];
                    nuevaFila[11][i][1] = nuevoClienteEnEspera[1];
                    nuevaFila[11][i][2] = nuevoClienteEnEspera[2];
                    nuevaFila[11][i][3] = nuevoClienteEnEspera[3];
                    break
                }
                else{
                    nuevaFila[11].push(nuevoClienteEnEspera);
                }
            } 
        }
    }
    if(peluquero == "Veterano A"){
        if(ultimaFila[7][0] == "Libre"){
            nuevaFila[7][0] = "Ocupado"
            nuevaFila[4][0], nuevaFila[4][1] , nuevaFila[4][2] = calcularFinAtencion(nuevaFila[0][3],distribucionAVeteranoA, distribucionBVeteranoA)
        }
        else{
            nuevaFila[7][1] ++;
            nuevaFila[10][0] ++;
            if(nuevaFila[10][0] > ultimaFila[10][1]){
                nuevaFila[10][1] = ultimaFila[10][1] + 1;
            }
            let momentoRefresco = nuevaFila[0][3] + 1800;
            let nuevoClienteEnEspera = ["En Espera","Veterano A",momentoRefresco,"No"];
            if(ultimaFila[11].length == 0){
                nuevaFila[11].push(nuevoClienteEnEspera);
            }
            for(let i in ultimaFila[11]){
                if(i[0] == ""){
                    nuevaFila[11][i][0] = nuevoClienteEnEspera[0];
                    nuevaFila[11][i][1] = nuevoClienteEnEspera[1];
                    nuevaFila[11][i][2] = nuevoClienteEnEspera[2];
                    nuevaFila[11][i][3] = nuevoClienteEnEspera[3];
                    break
                }
                else{
                    nuevaFila[11].push(nuevoClienteEnEspera);
                }
            } 
        }

    }
    if(peluquero == "Veterano B"){
        if(ultimaFila[8][0] == "Libre"){
            nuevaFila[8][0] = "Ocupado"
            nuevaFila[5][0], nuevaFila[5][1] , nuevaFila[5][2] = calcularFinAtencion(nuevaFila[0][3],distribucionAVeteranoB, distribucionBVeteranoB)
        }
        else{
            nuevaFila[8][1] ++;
            nuevaFila[10][0] ++;
            if(nuevaFila[10][0] > ultimaFila[10][1]){
                nuevaFila[10][1] = ultimaFila[10][1] + 1;
            }
            let momentoRefresco = nuevaFila[0][3] + 1800;
            let nuevoClienteEnEspera = ["En Espera","Veterano B",momentoRefresco,"No"];
            if(ultimaFila[11].length == 0){
                nuevaFila[11].push(nuevoClienteEnEspera);
            }
            for(let i in ultimaFila[11]){
                if(i[0] == ""){
                    nuevaFila[11][i][0] = nuevoClienteEnEspera[0];
                    nuevaFila[11][i][1] = nuevoClienteEnEspera[1];
                    nuevaFila[11][i][2] = nuevoClienteEnEspera[2];
                    nuevaFila[11][i][3] = nuevoClienteEnEspera[3];
                    break
                }
                else{
                    nuevaFila[11].push(nuevoClienteEnEspera);
                }
            } 
        }
    }
    // Controlando momento de refresco
    if(ultimaFila[11].length > 0){
        for(let i in ultimaFila[11]){
            if(i[2]<=nuevaFila[0][3]){
                nuevaFila[11][i][3] = "Si"
                nuevaFila[9][1] = ultimaFila[9][1] + 1500;
                nuevaFila[9][2] = ultimaFila[9][2] - 1500;
                nuevaFila[9][3] = nuevaFila[9][2]/nuevaFila[0][2];
            }
        }
    }
    return nuevaFila;
}