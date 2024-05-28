
export class DatosFormulario {
    constructor(tiempo, aprendiz, veteranoA, veteranoB, llegadaClientes, rango) {
        this.tiempo = tiempo;
        this.aprendiz = aprendiz;
        this.veteranoA = veteranoA;
        this.veteranoB = veteranoB;
        this.llegadaClientes = llegadaClientes;
        this.rango = rango;
    }
}

export class Control{
    constructor(evento, dia, reloj){
        this.evento = evento;
        this.dia = dia;
        this.reloj = reloj;
    }
}

export class Evento{
    constructor(rnd,demora){
        this.random = rnd;
        this.demora = demora;
    }
}

export class LlegadaCliente extends Evento{
    constructor(demora, llegada){
        super(random, demora);
        this.llegada = llegada;
    }
}

export class AsignacionPeluquero extends Evento{
    constructor(peluquero){
        super(random);
        this.peluquero = peluquero;
    }
}

export class FinAtencionAprendiz extends Evento{
    constructor(demora, finAtencion){
        super(random, demora);
        this.finAtencion = finAtencion;
    }
}

export class FinAtencionVeteranoA extends Evento{
    constructor(demora, finAtencion){
        super(random, demora);
        this.finAtencion = finAtencion;
    }
}

export class FinAtencionVeteranoB extends Evento{
    constructor(demora, finAtencion){
        super(random, demora);
        this.finAtencion = finAtencion;
    }
}
