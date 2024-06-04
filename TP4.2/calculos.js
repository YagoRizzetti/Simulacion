const generarRandom = () =>{
    let numeroAleatorio = 0;
    numeroAleatorio = Math.random()
    if(numeroAleatorio == 1){
        numeroAleatorio = numeroAleatorio - 0.01
    }
    return numeroAleatorio.toFixed(2); // Convierte el número en una cadena con dos decimales
}

const calcularUniforme = (random,a,b) =>{
    let resultado = 0;
    resultado = a +(random*(b-a));
    resultado = Math.round(resultado); // Redondear a un número entero
    return resultado;
}

export const calcularProximaLlegada = (reloj, a, b) =>{
    let random = 0;
    let demora = 0;
    let momentoLlegada = 0;
    random = generarRandom();
    demora = calcularUniforme(random,a,b);
    momentoLlegada = reloj + demora;
    return random,demora,momentoLlegada;
}

export const asignarPeluquero = (probabilidadAprendiz, probabilidadVeteranoA, probabilidadVeteranoB) =>{
    let random = 0;
    random = generarRandom();
    probabilidadVeteranoA = probabilidadAprendiz + probabilidadVeteranoA;
    let peluquero = "";
    if(random < probabilidadAprendiz){
        peluquero = "Aprendiz";
    } 
    if(random < probabilidadVeteranoA){
        peluquero = "Veterano A";
    }
    else{
        peluquero = "Veterano B";
    }

    return random, peluquero;
}

export const calcularFinAtencion = (reloj, distribucionA, distribucionB) =>{
    let random = 0;
    let demora = 0;
    let momentoFinAtencion = 0;
    random = generarRandom();
    demora = calcularUniforme(distribucionA, distribucionB);
    momentoFinAtencion = reloj + demora;
    return random, demora, momentoFinAtencion;
}

export const formatearTiempo = (tiempo) =>{
    let horas = Math.floor(tiempo / 3600);
    let minutos = Math.floor((tiempo % 3600) / 60);
    let segundos = tiempo % 60;
    
    // Formatear para asegurar que siempre se muestren dos dígitos
    let horasFormateadas = horas.toString().padStart(2, '0');
    let minutosFormateados = minutos.toString().padStart(2, '0');
    let segundosFormateados = segundos.toString().padStart(2, '0');
    
    relojAMostrar = `${horasFormateadas}:${minutosFormateados}:${segundosFormateados}`;
    return relojAMostrar
}