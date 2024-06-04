import { calcularProximaLlegada } from "./calculos.js";

export const aperturaNegocio = (ultimaFila, distribucionALlegada, distribucionBLlegada) =>{
    let nuevaFila = ultimaFila;
    let relojAMostrar = "00:00:00";
    let evento = "Inicio Jornada";
    let random , demoraLlegada , momentoLlegada = calcularProximaLlegada(0,distribucionALlegada, distribucionBLlegada);
    nuevaFila[0][0] = ultimaFila[0][0] + 1;
    nuevaFila[0][1] = evento;
    nuevaFila[0][2] = ultimaFila[0][2] + 1;
    nuevaFila[0][3] = 0;
    nuevaFila[0][4] = relojAMostrar;
    nuevaFila[1][0] = random;
    nuevaFila[1][1] = demoraLlegada;
    nuevaFila[1][2] = momentoLlegada;
    nuevaFila[9][0] = 0;
    nuevaFila[9][1] = 0;
    nuevaFila[9][2] = ultimaFila[9][2];
    nuevaFila[9][3] = ultimaFila[9][3];
    nuevaFila[10][0] = ultimaFila[10][0];
    nuevaFila[10][1] = ultimaFila[10][1];
    nuevaFila[11] = ultimaFila[11];
    return nuevaFila;
}