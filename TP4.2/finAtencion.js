import { calcularFinAtencion, formatearTiempo } from "./calculos.js";

export const finAtencion = (ultimaFila, distribucionAAprendiz, distribucionBAprendiz, distribucionAVeteranoA, distribucionBVeteranoA, distribucionAVeteranoB, distribucionBVeteranoB) =>{
    // let nuevaFila = [[0,"",1,0,""],[0,0,0],[0,""],[0,0,0],[0,0,0],[0,0,0],["Libre",0,0],["Libre",0,0],["Libre",0,0],[0,0,0,0],[0,0],[]];
    let nuevaFila = ultimaFila;
    nuevaFila[0][0] = ultimaFila[0][0] +1;
    nuevaFila[0][1] = "Fin Atencion";
    // Fin Atencion Aprendiz
    if(ultimaFila[3][2] < ultimaFila[4][2] && ultimaFila[3][2] < ultimaFila[5][2]){
        nuevaFila[0][3] = ultimaFila[0][3] + ultimaFila[3][1];
        nuevaFila[0][4] = formatearTiempo(nuevaFila[0][3]);
        nuevaFila[6][2]++;
        if(ultimaFila[6][1] == 0){
            nuevaFila[6][0] = "Libre";
            nuevaFila[3][0] = 0;
            nuevaFila[3][1] = 0;
            nuevaFila[3][2] = 0; 
        }
        else{
            nuevaFila[6][1] = ultimaFila[6][1]-1;
            let random, demora, momentoFinAtencion = calcularFinAtencion(nuevaFila[0][3],distribucionAAprendiz, distribucionBAprendiz);
            nuevaFila[3][0] = random;
            nuevaFila[3][1] = demora;
            nuevaFila[3][2] = momentoFinAtencion;
            nuevaFila[9][0] = ultimaFila[9][0] + 1800;
            nuevaFila[9][2] = ultimaFila[9][0] + 1800;
            nuevaFila[9][3] = nuevaFila[9][2]/nuevaFila[0][2];
            let maxMomentoRefresco = Infinity;
            for(let i in ultimaFila[11]){
                if(i[2] < maxMomentoRefresco && i[1] == "Aprendiz"){
                    maxMomentoRefresco = i[2];
                }
            }
            for(let i in ultimaFila[11]){
                if(i[2] == maxMomentoRefresco){
                    nuevaFila[11][i][0] = "";
                    nuevaFila[11][i][1] = "";
                    nuevaFila[11][i][2] = 0;
                    nuevaFila[11][i][3] = "";
                }
            }
            nuevaFila[10][0] = ultimaFila[10][0] -1;
        }
    }
    // Fin Atencion Veterano A
    if(ultimaFila[4][2] < ultimaFila[3][2] && ultimaFila[4][2] < ultimaFila[5][2]){
        nuevaFila[0][3] = ultimaFila[0][3] + ultimaFila[4][1];
        nuevaFila[0][4] = formatearTiempo(nuevaFila[0][3]);
        nuevaFila[7][2]++;
        if(ultimaFila[7][1] == 0){
            nuevaFila[7][0] = "Libre";
            nuevaFila[4][0] = 0;
            nuevaFila[4][1] = 0;
            nuevaFila[4][2] = 0; 
        }
        else{
            nuevaFila[7][1] = ultimaFila[7][1]-1;
            let random, demora, momentoFinAtencion = calcularFinAtencion(nuevaFila[0][3],distribucionAVeteranoA, distribucionBVeteranoA);
            nuevaFila[4][0] = random;
            nuevaFila[4][1] = demora;
            nuevaFila[4][2] = momentoFinAtencion;
            nuevaFila[9][0] = ultimaFila[9][0] + 2500;
            nuevaFila[9][2] = ultimaFila[9][0] + 2500;
            nuevaFila[9][3] = nuevaFila[9][2]/nuevaFila[0][2];
            let maxMomentoRefresco = Infinity;
            for(let i in ultimaFila[11]){
                if(i[2] < maxMomentoRefresco && i[1] == "Veterano A"){
                    maxMomentoRefresco = i[2];
                }
            }
            for(let i in ultimaFila[11]){
                if(i[2] == maxMomentoRefresco){
                    nuevaFila[11][i][0] = "";
                    nuevaFila[11][i][1] = "";
                    nuevaFila[11][i][2] = 0;
                    nuevaFila[11][i][3] = "";
                }
            }
            nuevaFila[10][0] = ultimaFila[10][0] -1;
        }

    }
    // Fin Atencion Veterano B
    else{
        nuevaFila[0][3] = ultimaFila[0][3] + ultimaFila[5][1];
        nuevaFila[0][4] = formatearTiempo(nuevaFila[0][3]);
        nuevaFila[8][2]++;
        if(ultimaFila[8][1] == 0){
            nuevaFila[8][0] = "Libre";
            nuevaFila[5][0] = 0;
            nuevaFila[5][1] = 0;
            nuevaFila[5][2] = 0; 
        }
        else{
            nuevaFila[8][1] = ultimaFila[8][1]-1;
            let random, demora, momentoFinAtencion = calcularFinAtencion(nuevaFila[0][3],distribucionAVeteranoB, distribucionBVeteranoB);
            nuevaFila[5][0] = random;
            nuevaFila[5][1] = demora;
            nuevaFila[5][2] = momentoFinAtencion;
            nuevaFila[9][0] = ultimaFila[9][0] + 2500;
            nuevaFila[9][2] = ultimaFila[9][0] + 2500;
            nuevaFila[9][3] = nuevaFila[9][2]/nuevaFila[0][2];
            let maxMomentoRefresco = Infinity;
            for(let i in ultimaFila[11]){
                if(i[2] < maxMomentoRefresco && i[1] == "Veterano B"){
                    maxMomentoRefresco = i[2];
                }
            }
            for(let i in ultimaFila[11]){
                if(i[2] == maxMomentoRefresco){
                    nuevaFila[11][i][0] = "";
                    nuevaFila[11][i][1] = "";
                    nuevaFila[11][i][2] = 0;
                    nuevaFila[11][i][3] = "";
                }
            }
            nuevaFila[10][0] = ultimaFila[10][0] -1;
        }

    }

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
