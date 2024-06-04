
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

export class Fila{
    /**
 * Clase que representa una fila en algún contexto específico.
 * @param {number} numero - Número de la fila.
 * @param {Control} control - Objeto de tipo Control.
 * @param {string} relojAMostrar - Cadena que representa la hora en la fila.
 * @param {LlegadaCliente} llegadaCliente - Objeto de tipo LlegadaCliente.
 * @param {AsignacionPeluquero} asignacionPeluquero - Objeto de tipo AsignacionPeluquero.
 * @param {FinAtencionAprendiz} finAtencionAprendiz - Objeto de tipo FinAtencionAprendiz.
 * @param {FinAtencionVeteranoA} finAtencionVeteranoA - Objeto de tipo FinAtencionVeteranoA.
 * @param {FinAtencionVeteranoB} finAtencionVeteranoB - Objeto de tipo FinAtencionVeteranoB.
 * @param {Aprendiz} aprendiz - Objeto de tipo Aprendiz.
 * @param {VeteranoA} veteranoA - Objeto de tipo VeteranoA.
 * @param {VeteranoB} veteranoB - Objeto de tipo VeteranoB.
 * @param {Recaudacion} recaudacion - Objeto de tipo Recaudacion.
 * @param {Esperas} esperas - Objeto de tipo Esperas.
 * @param {Array<Cliente>} clientes - Array de objetos Cliente.
 */
    constructor(numero, control, relojAMostrar, llegadaCliente, asignacionPeluquero, finAtencionAprendiz, finAtencionVeteranoA, finAtencionVeteranoB, aprendiz, veteranoA, veteranoB, recaudacion, esperas, clientes){
    this.numero = numero;
    this.control = control;
    this.relojAMostrar = relojAMostrar;
    this.llegadaCliente = llegadaCliente;
    this.asignacionPeluquero = asignacionPeluquero;
    this.finAtencionAprendiz = finAtencionAprendiz;
    this.finAtencionVeteranoA = finAtencionVeteranoA;
    this.finAtencionVeteranoB = finAtencionVeteranoB;
    this.aprendiz = aprendiz;
    this.veteranoA = veteranoA;
    this.veteranoB = veteranoB;
    this.recaudacion = recaudacion;
    this.esperas = esperas;
    this.clientes = clientes;
    }

    // Setters con anotaciones de tipo 'any'
    set numero(numero) {
        this.numero = numero;
      }

    set control(control){
        this.control = control;
    }
    set relojAMostrar(relojAMostrar){
        this.relojAMostrar = relojAMostrar;
    }
    set llegadaCliente(llegadaCliente){
        this.llegadaCliente = llegadaCliente;
    }
    set asignacionPeluquero(asignacionPeluquero){
        this.asignacionPeluquero = asignacionPeluquero;
    }
    set finAtencionAprendiz(finAtencionAprendiz){
        this.finAtencionAprendiz = finAtencionAprendiz;
    }
    set finAtencionVeteranoA(finAtencionVeteranoA){
        this.finAtencionVeteranoA = finAtencionVeteranoA;
    }
    set finAtencionVeteranoB(finAtencionVeteranoB){
        this.finAtencionVeteranoB = finAtencionVeteranoB;
    }
    set aprendiz(aprendiz){
        this.aprendiz = aprendiz;
    }
    set veteranoA(veteranoA){
        this.veteranoA = veteranoA;
    }
    set veteranoB(veteranoB){
        this.veteranoB = veteranoB;
    }
    set recaudacion(recaudacion){
        this.recaudacion = recaudacion;
    }
    set esperas(esperas){
        this.esperas = esperas;
    }
    set clientes(clientes){
        this.clientes = clientes;
    }

}

export class Control{
    /**
    * @param {string} evento 
    * @param {number} dia 
    * @param {number} reloj 
    */
    constructor(evento, dia, reloj){
        this.evento = evento;
        this.dia = dia;
        this.reloj = reloj;
    }

    set evento(evento){
        this.evento = evento;
    }
    set dia(dia){
        this.dia = dia;
    }
    set reloj(reloj){
        this.reloj = reloj;
    }
}

export class Evento{
    /**
    * @param {Float32Array} rnd 
    * @param {number} demora 
    */
    constructor(rnd,demora){
        this.random = rnd;
        this.demora = demora;
    }
    set random(random){
        this.random = random;
    }
    set demora(demora){
        this.demora = demora;
    }
}

export class LlegadaCliente extends Evento{
    /**
    * @param {number} llegada 
    */

    constructor(random, demora, llegada){
        super(random, demora);
        this.llegada = llegada;
    }
    set random(random){
        this.random = random;
    }
    set demora(demora){
        this.demora = demora;
    }
    set llegada(llegada){
        this.llegada = llegada;
    }
}

export class AsignacionPeluquero extends Evento{
        /**
    * @param {string} peluquero 
    */

    constructor(random, peluquero){
        super(random);
        this.peluquero = peluquero;
    }
    set random(random){
        this.random = random;
    }
    set peluquero(peluquero){
        this.peluquero = peluquero;
    }
}

export class FinAtencionAprendiz extends Evento{
        /**
    * @param {number} finAtencion 
    */
    constructor(random, demora, finAtencion){
        super(random, demora);
        this.finAtencion = finAtencion;
    }
    set random(random){
        this.random = random;
    }
    set demora(demora){
        this.demora = demora;
    }
    set finAtencion(finAtencion){
        this.finAtencion = finAtencion;
    }
}

export class FinAtencionVeteranoA extends Evento{
    /**
    * @param {number} finAtencion 
    */

    constructor(random, demora, finAtencion){
        super(random, demora);
        this.finAtencion = finAtencion;
    }
    set random(random){
        this.random = random;
    }
    set demora(demora){
        this.demora = demora;
    }
    set finAtencion(finAtencion){
        this.finAtencion = finAtencion;
    }

}

export class FinAtencionVeteranoB extends Evento{
    /**
    * @param {number} finAtencion 
    */

    constructor(random, demora, finAtencion){
        super(random, demora);
        this.finAtencion = finAtencion;
    }
    set random(random){
        this.random = random;
    }
    set demora(demora){
        this.demora = demora;
    }
    set finAtencion(finAtencion){
        this.finAtencion = finAtencion;
    }

}

class ObjetosPermanentes{
        /**
    * @param {string} estado 
    * @param {number} cola 
    * @param {number} clientesAtendidos 
    */
    constructor(estado, cola, clientesAtendidos){
        this.estado = estado;
        this.cola = cola;
        this.clientesAtendidos = clientesAtendidos;
    }
    
    set estado(estado){
        this.estado = estado;
    }
    set cola(cola){
        this.cola = cola;
    }
    set clientesAtendidos(clientesAtendidos){
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
    /**
    * @param {number} ganancias 
    * @param {number} gastos
    * @param {number} gananciasNetas
    * @param {Float32Array} promRecaudacion
    */
    constructor(ganancias, gastos, gananciasNetas, promRecaudacion){
        this.gananciasDiarias = ganancias;
        this.gastosDiarios = gastos;
        this.gananciasNetas = gananciasNetas;
        this.promedioRecaudacion = promRecaudacion;
    }
    set gananciasDiarias(gananciasDiarias){
        this.gananciasDiarias = gananciasDiarias;
    }
    set gastosDiarios(gastosDiarios){
        this.gastosDiarios = gastosDiarios;
    }
    set gananciasNetas(gananciasNetas){
        this.gananciasNetas = gananciasNetas;
    }
    set promedioRecaudacion(promedioRecaudacion){
        this.promedioRecaudacion = promedioRecaudacion;
    }
}

export class Esperas{
    /**
    * @param {number} esperaSimultaneas
    * @param {number} maxEsperaSimultanea
    */
    constructor(esperaSimultaneas, maxEsperaSimultanea){
        this.esperaSimultanea = esperaSimultaneas;
        this.maxEsperaSimultanea = maxEsperaSimultanea;
    }
    set esperaSimultanea(esperaSimultanea){
        this.esperaSimultanea = esperaSimultanea;
    }
    set maxEsperaSimultanea(maxEsperaSimultanea){
        this.maxEsperaSimultanea = maxEsperaSimultanea;
    }
}

export class Cliente{
        /**
    * @param {number} numero 
    * @param {string} estado 
    * @param {string} peluquero 
    * @param {number} momentoRefresco 
    * @param {string} refresco
    */
    constructor(numero, estado, peluquero, momentoRefresco, refresco){
        this.numero = numero;
        this.estado = estado;
        this.peluquero = peluquero;
        this.momentoRefresco = momentoRefresco;
        this.refresco = refresco;
    }
    set numero(numero){
        this.numero = numero;
    }
    set estado(estado){
        this.estado = estado;
    }
    set peluquero(peluquero){
        this.peluquero = peluquero;
    }
    set momentoRefresco(momentoRefresco){
        this.momentoRefresco = momentoRefresco;
    }
    set refresco(refresco){
        this.refresco = refresco;
    }
}