import { calcularProximaLlegada } from "./calculos.js";

export const aperturaNegocio = (nuevaFila, ultimaFila, distribucionALlegada, distribucionBLlegada) =>{
    let relojAMostrar = "00:00:00";
    let evento = "Inicio Jornada";
    let random = 0;
    let demoraLlegada = 0;
    let momentoLlegada = 0;
    random , demoraLlegada , momentoLlegada = calcularProximaLlegada(0,distribucionALlegada, distribucionBLlegada);
    nuevaFila.numero = ultimaFila.numero + 1;
    nuevaFila.control.evento = evento;
    nuevaFila.control.dia = ultimaFila.control.dia + 1;
    nuevaFila.control.reloj = 0;
    nuevaFila.relojAMostrar = relojAMostrar;
    nuevaFila.llegadaCliente.random = random;
    nuevaFila.llegadaCliente.demora = demoraLlegada;
    nuevaFila.llegadaCliente.llegada = momentoLlegada;
    nuevaFila.recaudacion.gananciasDiarias = 0;
    nuevaFila.recaudacion.gastosDiarios = 0;
    nuevaFila.recaudacion.gananciasNetas = ultimaFila.recaudacion.gananciasNetas;
    nuevaFila.recaudacion.promedioRecaudacion = ultimaFila.recaudacion.gananciasNetas/nuevaFila.control.dia;
    nuevaFila.esperas.esperaSimultanea = ultimaFila.esperas.esperaSimultanea;
    nuevaFila.esperas.maxEsperaSimultanea = ultimaFila.esperas.maxEsperaSimultanea;
    nuevaFila.clientes = ultimaFila.clientes;

    return nuevaFila;
}