import { aperturaNegocio } from "./aperturaNegocio.js";
import { llegadaCliente } from "./llegadaCliente.js";
import { finAtencion } from "./finAtencion.js";
import { validarDatos } from "./Validaciones.js";
import { crearTabla } from "./GenrarTabla.js";

const esllegadaCliente = (ultimaFila) =>{
    if(ultimaFila[0][3] < ultimaFila[1][2]){
        if(ultimaFila[1][2] <= ultimaFila[3][2] && ultimaFila[1][2] <= ultimaFila[3][2] && ultimaFila[1][2] <= ultimaFila[3][2]){
            return true
        }
    }
    return false
}

const esFinAtencion = (ultimaFila) =>{
    if(ultimaFila[0][3] < ultimaFila[3][2] || ultimaFila[0][3] < ultimaFila[4][2] || ultimaFila[0][3] < ultimaFila[5][2] ){
        if(ultimaFila[1][2] >= ultimaFila[3][2] || ultimaFila[1][2] >= ultimaFila[4][2] || ultimaFila[1][2] >= ultimaFila[5][2]){
            return true
        }
    }
    return false
}

const esUltimoClienteDelDia = (ultimaFila) =>{
    if(ultimaFila[3][2] == 0 && ultimaFila[4][2] == 0 && ultimaFila[5][2] == 0 && ultimaFila[10][0] == 0){
        return true
    }
    return false
}

// Función para generar los datos con base en los datos del formulario
export const generarDatos = (datosFormulario) => {
    // Verificar si los datos son válidos antes de proceder
    if (validarDatos(datosFormulario)) {
        // Aquí puedes implementar la lógica para generar los datos utilizando los valores de datosFormulario
        console.log('Generando datos...');
        console.log(datosFormulario);
        let distribucionAAprendiz = datosFormulario.aprendiz[1];
        let distribucionBAprendiz = datosFormulario.aprendiz[2];
        let distribucionAVeteranoA = datosFormulario.veteranoA[1];
        let distribucionBVeteranoA =  datosFormulario.veteranoA[2];
        let distribucionAVeteranoB = datosFormulario.veteranoB[1];
        let distribucionBVeteranoB = datosFormulario.veteranoB[2];
        let distribucionALlegada = datosFormulario.llegadaClientes[0];
        let distribucionBLlegada = datosFormulario.llegadaClientes[1];
        let probabilidadAprendiz = datosFormulario.aprendiz[0];
        let probabilidadVeteranoA = datosFormulario.veteranoA[0];
        let probabilidadVeteranoB = datosFormulario.veteranoB[0];
        const dias = datosFormulario.tiempo;
        let dia = 1;
        let reloj = 0;
        // let relojAMostrar = "";
        const duracionJornada = 60 * 60 * 8;
        let apertura = true;
        let numeroFila = 0;
        // estructura ultimaFila = [[numero,evento,dia,reloj(segundos),relojAmostrar],[random,demora,momentoLllegada],[random,peluqueroAsignado],[random,demora,FinAtencionAprendiz],[random,demora,FinAtencionVeteranoA],[random,demora,FinAtencionVeteranoB],[Estado,cola,clientesAtendidos],[Estado,cola,clientesAtendidos],[Estado,cola,clientesAtendidos],[gananciasDiarias,GastosDiarios,GananciasNetas,GananciasPromedio],[esperasSimultaneas,MaxEsperasSimultaneas],[[Estado,Peluquero,momentoRefresco,refresco]]]
        let ultimaFila = [[0,"",0,0,""],[0,0,0],[0,""],[0,0,0],[0,0,0],[0,0,0],["Libre",0,0],["Libre",0,0],["Libre",0,0],[0,0,0,0],[0,0],[]];
        // let aperturaNegocio = true;
        // let finJornada = false;
        // let aprendiz = new Aprendiz("Libre",0,0);
        // let veteranoA = new VeteranoA("Libre",0,0);
        // let veteranoB = new VeteranoB("Libre",0,0);
        // let esperas = new Esperas(0,0);
        let filasAMostrar = [];
        let finJornada = false;
        // let controlEventos = [Control];
        // let controlClientes = [Cliente];
        // let proximaLlegada = new LlegadaCliente(0,0,0);
        // let finAtencionAprendiz = new FinAtencionAprendiz(0,0,0);
        // let finAtencionVeteranoA = new FinAtencionVeteranoA(0,0,0);
        // let finAtencionVeteranoB = new FinAtencionVeteranoB(0,0,0);
        // let recaudacion = new Recaudacion(0,0,0,0);
        // let peluqueroAsignado = new AsignacionPeluquero(0,"");
        // let peluqueroFinAtencion = "";
        while((ultimaFila[0][2] < dias && finJornada == false) || numeroFila <= 1000 ){
            numeroFila++;
            if(ultimaFila[0][3] >= duracionJornada){
                finJornada = true;
            }
            // Cuando Abre El Negocio
            if(apertura){
                let nuevaFila = ultimaFila;
                nuevaFila = aperturaNegocio(ultimaFila, distribucionALlegada, distribucionBLlegada);
                apertura = false;
                ultimaFila = nuevaFila;
                continue;
            } 
            
            // Cuando Llega Un Cliente
            if(esllegadaCliente(ultimaFila)){
                let nuevaFila = ultimaFila;
                nuevaFila = llegadaCliente(ultimaFila, distribucionALlegada, distribucionBLlegada, probabilidadAprendiz, probabilidadVeteranoA, probabilidadVeteranoB, distribucionAAprendiz, distribucionBAprendiz, distribucionAVeteranoA, distribucionBVeteranoA, distribucionAVeteranoB, distribucionBVeteranoB);
                ultimaFila = nuevaFila;
            }

            // Cuando Fin Atencion
            if(esFinAtencion(ultimaFila)){
                let nuevaFila = ultimaFila;
                nuevaFila = finAtencion(ultimaFila, distribucionAAprendiz, distribucionBAprendiz, distribucionAVeteranoA, distribucionBVeteranoA, distribucionAVeteranoB, distribucionBVeteranoB);
                ultimaFila = nuevaFila;
            }

            //UltimoCliente de la Jornada
            if(finJornada){
                if(esUltimoClienteDelDia(ultimaFila)){
                    apertura = true;
                }    
            }

            // Agregando fila a la lista de filas a Mostrar
            if(numeroFila >= datosFormulario.rango[0] && numeroFila <= datosFormulario.rango[1]){
                filasAMostrar.push(ultimaFila);
                console.log("Fila agregado:", ultimaFila);
            } else {
                console.log("Fila no agregado.");
            }
            
        } 
        filasAMostrar.push(ultimaFila);
        let maxEsperaSimultanea = ultimaFila[10][1];
        crearTabla(maxEsperaSimultanea);

        let tablaFilas = document.querySelector('.tbody');

        // Limpiamos el contenido actual de la tabla
        tablaFilas.innerHTML = '';
    
        // Iteramos sobre la lista de Filas y creamos las filas de la tabla
        filasAMostrar.forEach(fila => {
            let row = tablaFilas.insertRow();
            row.insertCell().textContent = fila[0][0];
            row.insertCell().textContent = fila[0][1];
            row.insertCell().textContent = fila[0][2];
            row.insertCell().textContent = fila[0][3];
            row.insertCell().textContent = fila[0][4];
            row.insertCell().textContent = fila[1][0];
            row.insertCell().textContent = fila[1][1];
            row.insertCell().textContent = fila[1][2];
            row.insertCell().textContent = fila[2][0];
            row.insertCell().textContent = fila[2][1];
            row.insertCell().textContent = fila[3][0];
            row.insertCell().textContent = fila[3][1];
            row.insertCell().textContent = fila[3][2];
            row.insertCell().textContent = fila[4][0];
            row.insertCell().textContent = fila[4][1];
            row.insertCell().textContent = fila[4][2];
            row.insertCell().textContent = fila[5][0];
            row.insertCell().textContent = fila[5][1];
            row.insertCell().textContent = fila[5][2];
            row.insertCell().textContent = fila[6][0];
            row.insertCell().textContent = fila[6][1];
            row.insertCell().textContent = fila[6][2];
            row.insertCell().textContent = fila[7][0];
            row.insertCell().textContent = fila[7][1];
            row.insertCell().textContent = fila[7][2];
            row.insertCell().textContent = fila[8][0];
            row.insertCell().textContent = fila[8][1];
            row.insertCell().textContent = fila[8][2];
            row.insertCell().textContent = fila[9][0];
            row.insertCell().textContent = fila[9][1];
            row.insertCell().textContent = fila[9][2];
            row.insertCell().textContent = fila[9][3];
            row.insertCell().textContent = fila[10][0];
            row.insertCell().textContent = fila[10][1];

            // Agregar columnas para cada cliente
            for (let i = 0; i < maxEsperaSimultanea; i++) {
                if (i < fila[11].length) {
                    // Si hay un cliente en esta posición, mostrar sus atributos
                    row.insertCell().textContent = fila[11][i][0];
                    row.insertCell().textContent = fila[11][i][1];
                    row.insertCell().textContent = fila[11][i][2];
                    row.insertCell().textContent = fila[11][i][3];
                }
            }
        });



        // Por ejemplo, puedes realizar cálculos, operaciones, etc.
    } else {
        console.log('Los datos ingresados no son válidos.');
        // Aquí puedes mostrar un mensaje al usuario indicando que los datos no son válidos
    }
}
