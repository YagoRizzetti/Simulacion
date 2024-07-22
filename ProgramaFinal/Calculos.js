import { generarRandom } from "./GeneradorRandoms.js";

export const calcularCantidad = (cantidadDeVentas) => {
let rnd = 0;
let cantidad = 0;
let resultado = [];
rnd = generarRandom();
if(rnd==1){
    rnd = rnd - 0.01
}
let i = 0;
let b = 4;
let porcentaje = 0;
while(i <= 7){
    porcentaje+=cantidadDeVentas[i];
    if(rnd<porcentaje){
        break;
    }
    b++
    i++
}
if(b==4){
    cantidad = "Menos de 5"
}
else{
    cantidad = b;
}
resultado.push(rnd);
resultado.push(cantidad);
return resultado
}

const calcularTipo = (rnd, probTipo) => {
    let tipo = "";
    if(rnd < probTipo[0]){
        tipo = "Compacto";
        return tipo
    }
    if(rnd < (probTipo[0] + probTipo[1])){
        tipo = "Mediano";
        return tipo
    }
    else{
        tipo = "Lujo";
    }
    return tipo
}

export const venderAutos = (cantidad,probTipo) =>{
    let ventas = [];
    if(cantidad!="Menos de 5"){
        let i = 0;
        while(i<=10){
            i++
            let rndTipo = 0;
            let tipo = "";
            let rndPrecio = "";
            let precio = 0;
            if(i<=cantidad){
                rndTipo = generarRandom();
                tipo = calcularTipo(rndTipo,probTipo);
                if(tipo == "Compacto"){
                    precio = 250;
                }
                if(tipo == "Mediano"){
                    rndPrecio = generarRandom();
                    if(rndPrecio < 0.4){
                        precio = 400;
                    }
                    else{
                        precio = 500;
                    }
                }
                if(tipo == "Lujo"){
                    rndPrecio = generarRandom();
                    if(rndPrecio < 0.35){
                        precio = 1000;
                    }
                    if(rndPrecio < 0.75){
                        precio = 1500;
                    }
                    else{
                        precio = 2000;
                    }
                }    
            }
            ventas.push(rndTipo);
            ventas.push(tipo);
            ventas.push(rndPrecio);
            ventas.push(precio);
        }
    }
    else{
        ventas = [];
    }
    return ventas
}

export const calcularEstadisticasVendedor = (cantidadVendidas, ventas, estadisticasAnterior,mes) =>{
    let cantidadCompacto = 0;
    let cantidadMediano = 0;
    let cantidadLujo = 0;
    let total = 0;
    let totalAcumulado = estadisticasAnterior[4];
    let totalPromedio = 0;
    let i = 0;
    while(i<=39){
        if(ventas[i] == "Compacto"){
            cantidadCompacto ++;
            total += ventas[i+2];
        }
        if(ventas[i] == "Mediano"){
            cantidadMediano ++;
            total += ventas[i+2];
        }
        if(ventas[i] == "Lujo"){
            cantidadLujo ++;
            total += ventas[i+2];
        }
        i++
    }
    if(cantidadVendidas>10){
        total +=6000;
    }
    totalAcumulado += total;
    totalPromedio = totalAcumulado/mes;
    let vendedor = [cantidadCompacto,cantidadMediano,cantidadLujo,total,totalAcumulado,totalPromedio];
    return vendedor
}

export const calcularEstadisticaGeneral = (vendedor1,vendedor2,vendedor3,ultimaEstadistica,mes) =>{
    let total = vendedor1+vendedor2+vendedor3;
    let totalAcumulado = ultimaEstadistica[0]+total;
    let totalPromedio = totalAcumulado/mes;
    let estadisticasGeneral = [totalAcumulado,totalPromedio];
    return estadisticasGeneral;
}