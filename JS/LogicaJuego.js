// Obtener los jugadores del almacenamiento local
/*Este código JavaScript está obteniendo los datos de los jugadores almacenados en el almacenamiento local del navegador.*/
var jugadores = JSON.parse(localStorage.getItem('jugadores'));

// Función para mostrar los jugadores y sus colores
function mostrarJugadores() {
    var jugadoresContenedor = $('#jugadores');/*Selecciona el contenedor de jugadores usando su ID y
                                             /lo almacena en la variable jugadoresContenedor*/
    jugadoresContenedor.html(''); // Limpiar el contenido anterior
    /*la función se asegura de que el contenedor de jugadores esté vacío al principio, para luego actualizarlo con los 
    jugadores actuales durante la ejecución de la función. Esto garantiza que no se acumulen jugadores anteriores y 
    que solo se muestren los jugadores actuales en la página.*/


    // Iterar sobre el array de jugadores
    $.each(jugadores, function (index, jugador) {
        // Crear un div para representar al jugador y establecer su texto con el nombre del jugador
        var divJugador = $('<div class="jugador">')
            .text('Jugador ' + (index + 1) + ': ' + jugador.nombre)
            .append($('<p>').text('Pulsar dado').addClass('pulsarDado'));
        // Establecer el color del texto del div según el color de la ficha del jugador
        divJugador.css('color', jugador.color);

        // Crear una ficha (un div) con la clase correspondiente al color del jugador
        var ficha = $('<div class="ficha ' + jugador.color + '">');

        // Agregar la ficha al contenedor del jugador
        divJugador.append(ficha);

        // Agregar el jugador al contenedor de jugadores
        jugadoresContenedor.append(divJugador);

        // Crear un botón para lanzar el dado y configurar su estilo
        var dadoButton = $('<button class="dadoButton" style="background: transparent; border: none; padding: 0; margin: 0;">' +
            '<img src="imagenes/dados-4.gif" alt="Descripción de la imagen" style="height: 40px; width: 40px; object-fit: cover;">' +
            '</button>');

        divJugador.append(dadoButton); // Agregar el botón de dado al jugador

    });
}


var ganadorEncontrado = false; // Un booleano que indica si se ha encontrado un ganador.
var totalJugadores = jugadores.length; // Almacena el número total de jugadores en el juego.
var jugadoresFinalizados = 0; // Un contador que lleva el registro de cuántos jugadores han completado el juego. Se inicializa en 0.

//Array para almacenar los jugadores finalizados
var jugadoresFinalizadosArray = [];/* Esta línea declara una variable llamada jugadoresFinalizadosArray y la inicializa como un 
           array vacío []. Esta variable se utiliza para almacenar información sobre los jugadores que han finalizado el juego.*/
var primerJugadorGanador = true;//Esta variable se utiliza para controlar si ya ha habido un jugador ganador.


// Función para mover la ficha del jugador actual
function moverFicha(jugadorIndex, resultadoDado) {

    var ficha = $('.ficha').eq(jugadorIndex);// Seleccionar la ficha del jugador actual
    var posicionActual = parseInt(ficha.css('left'), 10); // Obtener la posición actual de la ficha en el eje horizontal
    var nuevaPosicion = posicionActual + (resultadoDado * 37);// Calcular la nueva posición de la ficha sumando el resultado del dado por 37

    // Verificar si la ficha ya llegó a la posición final
    if (ficha.hasClass('final')) {
        return; // Si ya llegó, salir de la función sin hacer nada
    }

    var animacion = ficha.animate({
        left: nuevaPosicion + 'px'
    }, 1000, function () // Animar la ficha hacia la nueva posición durante 1000 milisegundos (1 segundo)
    {

        // Verificar si el jugador ha pasado los 1020 píxeles
        if (nuevaPosicion >= 1020) {
            // Mostrar alerta solo para el primer jugador ganador
            if (primerJugadorGanador) {
                alert('¡Ha ganado el jugador ' + (jugadorIndex + 1) + '!');
                primerJugadorGanador = false; // Cambiar el estado para que no se muestre más la alerta
            }
            // Establecer la posición de la ficha en 1030px y añadir la clase 'final'
            ficha.css('left', '1030px');
            ficha.addClass('final');


            // Agregar el jugador al array de jugadores finalizados
            jugadoresFinalizadosArray.push({
                nombre: jugadores[jugadorIndex].nombre,
                posicion: nuevaPosicion

            });
            // Verificar si todos los jugadores han llegado a la meta
            if (jugadoresFinalizadosArray.length === totalJugadores) {
                alert('¡Todos los jugadores han llegado a la meta! FIN DEL JUEGO');
            } else {
                // Mostrar mensaje de la posición del jugador
                ficha.addClass('final');
                // Si otro jugador llega después del ganador, mostrar mensaje de su posición
                alert('Jugador ' + (jugadorIndex + 1) + ' ha quedado en la posición ' + jugadoresFinalizadosArray.length + '.');
            }

            // Llamar a la función para rellenar la tabla
            llenarTabla();
            /*La función moverFicha se encarga de mover la ficha de un jugador en el tablero de juego según el resultado del dado 
            y de manejar las acciones asociadas cuando un jugador llega a la posición final.
            Aquí está el resumen de lo que hace la función:
            -Obtención de la ficha y su posición actual: La función selecciona la ficha del jugador actual utilizando su índice y 
            obtiene su posición actual en el eje horizontal.
            -Cálculo de la nueva posición: Calcula la nueva posición de la ficha sumando el resultado del dado multiplicado
             por un valor específico.
            -Verificación de la posición final: Verifica si la ficha ha llegado a la posición final. Si lo ha hecho, 
             no realiza ninguna acción adicional y sale de la función.
            -Animación de la ficha: Anima la ficha para moverla hacia la nueva posición durante un período de tiempo determinado.
            Manejo de acciones al llegar a la posición final: Cuando la ficha llega a la posición final, realiza las siguientes acciones:
            Muestra una alerta si el jugador es el primer ganador.
            Establece la posición de la ficha en la posición final.
            Agrega la clase final a la ficha para indicar que ha llegado a la posición final.
            Agrega al jugador al array de jugadores finalizados, almacenando su nombre y posición.
            Verifica si todos los jugadores han llegado a la meta y muestra una alerta si es así.
            Muestra un mensaje con la posición del jugador si todavía hay jugadores que no han llegado a la meta.
            Llama a la función llenarTabla para actualizar la tabla con la información de los jugadores finalizados.
            En resumen, la función moverFicha gestiona el movimiento de la ficha de un jugador en el tablero de juego y las acciones asociadas
            cuando un jugador alcanza la posición final del tablero.*/

        }
    });
}


// Función para rellenar la tabla con los jugadores finalizados
function llenarTabla() {
    var tabla = $('#tablaJugadoresFinalizados tbody');
    tabla.empty(); // Limpiar la tabla antes de llenarla de nuevo

    // Iterar sobre el array de jugadores finalizados y agregar cada jugador a la tabla
    jugadoresFinalizadosArray.forEach(function (jugador, index) {
        var fila = $('<tr>');// Crear una nueva fila para cada jugador
        fila.append($('<td>').text(jugador.nombre)); // Agregar el nombre del jugador como una celda de la fila
        fila.append($('<td>').text(index + 1));// Agregar el número de posición del jugador como una celda de la fila
        tabla.append(fila);// Agregar la fila a la tabla
    });
    /*La función llenarTabla() toma la información de los jugadores que han finalizado el juego y la muestra en una tabla en el
     documento HTML, mostrando el nombre del jugador y su posición en la lista de jugadores finalizados.*/
}



// Función para reiniciar las fichas cuando se hace clic en el botón "Reiniciar"
$(document).ready(function () {
    mostrarJugadores(); // Mostrar los jugadores al cargar la página

    // Establecer un controlador de eventos para el clic en el botón "Reiniciar"
    $('#btn3').click(function () {
        // Llamar a la función para reiniciar las fichas
        reiniciarFichas();
    });

});

function reiniciarFichas() {
    var posicionInicial = 255; // Posición inicial deseada para las fichas
    $(".ficha").stop().css({ left: posicionInicial }); // Reiniciar posición de todas las fichas
    $(".ficha").animate({ left: posicionInicial }, 1000); // Animar todas las fichas hacia la posición inicial
    $('#tablaJugadoresFinalizados tbody').empty(); // Vaciar la tabla de jugadores finalizados
    var posicionInicial = 255; // Posición inicial deseada para las fichas
    $(".ficha").stop().css({ left: posicionInicial }); // Reiniciar posición de todas las fichas
    $(".ficha").animate({ left: posicionInicial }, 1000); // Animar todas las fichas hacia la posición inicial

    // Eliminar la clase 'final' de todas las fichas para permitir que se muevan nuevamente
    $(".ficha").removeClass('final');

    /*Esta función asegura que cuando el documento HTML esté completamente cargado, se mostrarán los jugadores en la página
    y se configurará un controlador de eventos para el botón "Reiniciar", de modo que cuando se haga clic en él, 
    se reiniciarán las fichas de los jugadores , se vaciará la tabla y los jugadores podrán volver a jugar  */
}

// Función para simular lanzamiento de dado y mover las fichas
$(document).on('click', '.dadoButton', function () {
    var jugadorIndex = $(this).parent().index(); // Obtener el índice del jugador dentro de su contenedor
    var jugador = jugadores[jugadorIndex];//Obtener el objeto jugador correspondiente al índice

    var resultado = Math.floor(Math.random() * 6) + 1; // Generar un número aleatorio del 1 al 6
    alert('Ha salido ' + resultado);// Mostrar el resultado del lanzamiento de dado al usuario mediante una alerta

    // Mover la ficha del jugador actual utilizando la función moverFicha(), pasando el índice del jugador
    // y el resultado del lanzamiento del dado como parámetros
    moverFicha(jugadorIndex, resultado);
    /*cuando se hace clic en un botón de dado, esta función genera un número aleatorio del 1 al 6, muestra este número
     al usuario en una alerta y luego llama a la función moverFicha() para mover la ficha del jugador correspondiente 
     según el resultado del lanzamiento del dado.*/
});
