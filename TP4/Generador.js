import "./Clases";
import "./utils/Validaciones"
import "./utils/GeneradorRandoms"
import "./utils/Calculos"
import { Aprendiz, Cliente, Control, Esperas, Evento, Fila, FinAtencionAprendiz, FinAtencionVeteranoA, FinAtencionVeteranoB, LlegadaCliente, Recaudacion, VeteranoA, VeteranoB } from "./Clases";
import { calcularMomentoLlegada } from "./utils/Calculos";
import { generarRandom } from "./utils/GeneradorRandoms";
import { calcularProximaLlegada , asignarPeluquero, calcularFinAtencion} from "./Eventos/llegadaCliente";
import { ocuparPeluquero } from "./EstadosPeluquero/ocupar";
import { liberarPeluquero } from "./EstadosPeluquero/liberar";

// Función para generar los datos con base en los datos del formulario
function generarDatos(datosFormulario) {
    // Verificar si los datos son válidos antes de proceder
    if (validarDatos(datosFormulario)) {
        // Aquí puedes implementar la lógica para generar los datos utilizando los valores de datosFormulario
        console.log('Generando datos...');
        console.log(datosFormulario);
        let distribucionAprendiz = [datosFormulario.Aprendiz[1], datosFormulario.Aprendiz[2]]
        let distribucionVeteranoA = [datosFormulario.VeteranoA[1], datosFormulario.VeteranoA[2]]
        let distribucionVeteranoB= [datosFormulario.VeteranoB[1], datosFormulario.VeteranoB[2]]
        const dias = datosFormulario.tiempo;
        let dia = 0;
        let reloj = 0;
        let numeroFila = 0;
        let ultimaFila = false;
        let Aprendiz = new Aprendiz("Libre",0,0);
        let VeteranoA = new VeteranoA("Libre",0,0);
        let VeteranoB = new VeteranoB("Libre",0,0);
        let esperas = new Esperas(0,0);
        let filasAMostrar = [Fila];
        // estructura de la lista (nombre del evento, segundos)
        let controlEventos = [Control];
        let controlClientes = [0, Cliente];
        let proximaLlegada = new LlegadaCliente(0,0,0);
        let finAtencionAprendiz = new FinAtencionAprendiz(0,0,0);
        let finAtencionVeteranoA = new FinAtencionVeteranoA(0,0,0);
        let finAtencionVeteranoB = new FinAtencionVeteranoB(0,0,0);
        let recaudacion = new Recaudacion(0,0,0,0);
        let peluqueroAsignado = "";
        let peluqueroFinAtencion = "";
        let demoraAtencion = 0;
        let finAtencion = 0;
        let rndFinAtencion = 0;
        while (dia < dias && numeroFila <= 100000) {
            numeroFila ++;
            reloj = reloj + (controlEventos[0].reloj - reloj);
            // Evento Llegada de Cliente
            if(controlEventos[0].evento = "llegada Cliente" || numeroFila == 1){
                // Calculando y guardando la proxima llegada
                calcularProximaLlegada(datosFormulario.LlegadaClientes[0], datosFormulario.LlegadaClientes[1], controlEventos, proximaLlegada);
                // Generando la asignacion del peluquero para el cliente que acaba de llegar
                if(controlEventos[0].evento = "llegada Cliente"){
                    asignarPeluquero(peluqueroAsignado, datosFormulario.Aprendiz[0], datosFormulario.VeteranoA[0]);
                    // Verificando si el peluquero esta libre
                    if(verificarEstadoPeluquero(peluqueroAsignado, Aprendiz, VeteranoA, VeteranoB)){
                        // Calcular Fin de Atencion del Peluquero
                        calcularFinAtencion(rndFinAtencion, reloj, demoraAtencion, finAtencion, peluqueroAsignado, distribucionAprendiz, distribucionVeteranoA, distribucionVeteranoB, finAtencionAprendiz, finAtencionVeteranoA, finAtencionVeteranoB);
                        ocuparPeluquero(peluqueroAsignado, Aprendiz, VeteranoA, VeteranoB);
                    }
                    // Si el Peluquero Esta Ocupado
                    else{
                        // Generando Nuevo Cliente
                        generarNuevoCliente(controlClientes, esperas, peluqueroAsignado, reloj);
                        // Actualizando la cola del peluquero Asignado
                        aumentarColaPeluqueroAsignado(peluqueroAsignado, Aprendiz, VeteranoA, VeteranoB);
                        // Gestionando las Esperas
                        esperas.esperaSimultanea ++;
                        if (esperas.esperaSimultanea > esperas.maxEsperaSimultanea){
                            esperas.maxEsperaSimultanea = esperas.esperaSimultanea
                        }
                    }
                }
                peluqueroAsignado = "";
            }
            // Evento Fin de Atencion
            if(controlEventos[0].evento = "Fin Atencion"){
                verificarFinAtencionPeluquero(peluqueroFinAtencion, reloj, finAtencionAprendiz, finAtencionVeteranoA, finAtencionVeteranoB);
                // Controlar cola de Peluquero que termino de Atender (si no tiene clientes en cola)
                if(controlarColaPeluquero(peluqueroFinAtencion, Aprendiz, VeteranoA, VeteranoB)){
                    liberarPeluquero(peluqueroFinAtencion, Aprendiz, VeteranoA, VeteranoB);
                }
                else{
                // Calculando el Proximo Fin de Atencion para el nuevo cliente
                calcularFinAtencion(rndFinAtencion, reloj, demoraAtencion, finAtencion, peluqueroAsignado, distribucionAprendiz, distribucionVeteranoA, distribucionVeteranoB, finAtencionAprendiz, finAtencionVeteranoA, finAtencionVeteranoB);
                }
                // actualizando datos de espera, recaudacion y del objeto peluquero 
                esperas.esperaSimultanea --;
                sacarClienteDeEspera(peluqueroFinAtencion,controlClientes);
                actualizarRecaudacion(peluqueroFinAtencion, recaudacion,"Ganancia",dia);
                reducirColaPeluquero(peluqueroFinAtencion, Aprendiz, VeteranoA, VeteranoB);
                aumentarclientesAtendidosPeluquero(peluqueroFinAtencion, Aprendiz, VeteranoA, VeteranoB);
            }
            controlEventos.shift();
            
            if ((numeroFila >= datosFormulario.rango[0] && numeroFila <= datosFormulario.rango[1]) || ultimaFila) {
                const fila = new Fila();
                filasAMostrar.push(fila);
                console.log("Fila agregado:", fila);
            } else {
                console.log("Fila no agregado.");
            }
        } 

        let tablaMails = document.querySelector('.tbody');

        // Limpiamos el contenido actual de la tabla
        tablaMails.innerHTML = '';
    
        // Iteramos sobre la lista de mails y creamos las filas de la tabla
        datosMails.forEach(mail => {
            let fila = tablaMails.insertRow();
    
            // Insertamos las celdas con la información de cada mail
            fila.insertCell().textContent = mail.numero;
            fila.insertCell().textContent = mail.random1;
            fila.insertCell().textContent = mail.tipo;
            fila.insertCell().textContent = mail.random2;
            fila.insertCell().textContent = mail.asesor;
            fila.insertCell().textContent = mail.cantidaAsesores;
            fila.insertCell().textContent = mail.asesoresXPaciente;
            fila.insertCell().textContent = mail.asesoresXAsistio;
            fila.insertCell().textContent = mail.asesoresXNuncaAsistio;
        });



        // Por ejemplo, puedes realizar cálculos, operaciones, etc.
    } else {
        console.log('Los datos ingresados no son válidos.');
        // Aquí puedes mostrar un mensaje al usuario indicando que los datos no son válidos
    }
}

