
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
    constructor(random, demora, llegada){
        super(random, demora);
        this.llegada = llegada;
    }
}

export class AsignacionPeluquero extends Evento{
    constructor(random, peluquero){
        super(random);
        this.peluquero = peluquero;
    }
}

export class FinAtencionAprendiz extends Evento{
    constructor(random, demora, finAtencion){
        super(random, demora);
        this.finAtencion = finAtencion;
    }
}

export class FinAtencionVeteranoA extends Evento{
    constructor(random, demora, finAtencion){
        super(random, demora);
        this.finAtencion = finAtencion;
    }
}

export class FinAtencionVeteranoB extends Evento{
    constructor(random, demora, finAtencion){
        super(random, demora);
        this.finAtencion = finAtencion;
    }
}

class ObjetosPermanentes{
    constructor(estado, cola, clientesAtendidos){
        this.estado = estado;
        this.cola = cola;
        this.clientesAtendidos = clientesAtendidos;
    }
}

export class Aprendiz extends ObjetosPermanentes{
    constructor(estado, cola, clientesAtendidos){
        super (estado, cola, clientesAtendidos)
    }
}

export class VeteranoA extends ObjetosPermanentes{
    constructor(estado, cola, clientesAtendidos){
        super (estado, cola, clientesAtendidos)
    }
}

export class VeteranoB extends ObjetosPermanentes{
    constructor(estado, cola, clientesAtendidos){
        super (estado, cola, clientesAtendidos)
    }
}

export class Recaudacion{
    constructor(ganancias, gastos, gananciasNetas, promRecaudacion){
        this.ganancias = ganancias;
        this.gastos = gastos;
        this.gananciasNetas = gananciasNetas;
        this.promedioRecaudacion = promRecaudacion;
    }
}

export class Esperas{
    constructor(esperaSimultaneas, maxEsperaSimultanea){
        this.esperaSimultanea = esperaSimultaneas;
        this.maxEsperaSimultanea = maxEsperaSimultanea;
    }
}

export class Cliente{
    constructor(estado, peluquero, momentoRefresco, refresco){
        this.estado = estado;
        this.peluquero = peluquero;
        this.momentoRefresco = momentoRefresco;
        this.refresco = refresco;
    }
}