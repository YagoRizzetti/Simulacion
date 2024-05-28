import "./Clases";
import "./utils/Validaciones"
import "./utils/GeneradorRandoms"
import "./utils/Calculos"

// Función para generar los datos con base en los datos del formulario
function generarDatos(datosFormulario) {
    // Verificar si los datos son válidos antes de proceder
    if (validarDatos(datosFormulario)) {
        // Aquí puedes implementar la lógica para generar los datos utilizando los valores de datosFormulario
        console.log('Generando datos...');
        console.log(datosFormulario);
        let cont = 0;
        let datosMails = [];
        let ultimoMail = new Mail(0, 0, "", 0, "", 0, 0, 0, 0);
        while (cont < datosFormulario.tamaño) {
            cont ++;
            console.log(cont)
            let rnd1 = generarRandom();
            let rnd2 = generarRandom();
            console.log(rnd1);
            console.log(rnd2);
            let tipo = calcularTipo(rnd1, datosFormulario.tipos);
            let asesor = calcularAsesor(rnd2, datosFormulario.asesor, tipo);
            let cantidad = ultimoMail.cantidaAsesores;
            let asesoresXPaciente = ultimoMail.asesoresXPaciente;
            let asesoresXAsistio = ultimoMail.asesoresXAsistio;
            let asesoresXNuncaAsistio = ultimoMail.asesoresXNuncaAsistio;
            if (asesor == "si") {
                cantidad = cantidad + 1;
                if(tipo == "Paciente"){
                    asesoresXPaciente ++;
                }
                if(tipo == "Asistio a la clinica"){
                    asesoresXAsistio ++;
                }
                if(tipo == "Nunca Asistio a la clinica"){
                    asesoresXNuncaAsistio ++;
                }
            }
            const mail = new Mail(cont, rnd1, tipo, rnd2, asesor, cantidad, asesoresXPaciente, asesoresXAsistio, asesoresXNuncaAsistio);
            
            if ((cont >= datosFormulario.rango[0] && cont <= datosFormulario.rango[1]) || cont == datosFormulario.tamaño) {
                datosMails.push(mail);
                console.log("Mail agregado:", mail);
            } else {
                console.log("Mail no agregado.");
            }

            ultimoMail = mail;
        } 
        console.log(datosMails)

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

