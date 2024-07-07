export const generarRandom = () =>{
    let numeroAleatorio = Math.random()
    if(numeroAleatorio == 1){
        numeroAleatorio = numeroAleatorio - 0.01
    }
    return numeroAleatorio.toFixed(2); // Convierte el número en una cadena con dos decimales
} 
