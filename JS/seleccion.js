var opcionesSeleccionadas = [];// Array para almacenar las opciones seleccionadas

function redireccionar() {

    // Obtengo el valor seleccionado del elemento con el id 'numeroJugadores'
    var numeroJugadores = document.getElementById('numeroJugadores').value;

    // Verifico si se ha seleccionado un número de jugadores
    if (numeroJugadores !== "") {
        /// Si se ha seleccionado un número de jugadores, lo agrego al array 'opcionesSeleccionadas'
        opcionesSeleccionadas.push(numeroJugadores);

        // Redirecciono a otra página con el número de jugadores como parámetro en la URL
        window.location.href = "seleccion_color.html?num_jugadores=" + encodeURIComponent(numeroJugadores);
    } else {
        // Si no se ha seleccionado un número de jugadores, mostrar un mensaje de alerta
        alert("Por favor selecciona el número de jugadores antes de continuar.");
    }

    /*La función redireccionar() se activa cuando se hace clic en el botón de aceptar en la página. Su propósito es obtener
    el número de jugadores seleccionado por el usuario y redirigir a otra página (seleccionar_color.html) 
    con ese número de jugadores como parámetro en la URL.*/
}
//


/* Array de colores permitidos :aquí se define un array llamado coloresPermitidos que contiene los nombres 
de los colores permitidos para seleccionar. Esto proporciona una lista de opciones válidas para que los jugadores elijan 
sus colores.*/
var coloresPermitidos = ['rojo', 'azul', 'verde', 'amarillo'];

/* Función para crear los campos de selección de color esta función acepta un parámetro numJugadores, 
//que indica el número de campos de selección de color que se deben crear.*/
function crearCamposColor(numJugadores) {
    // Obtener el contenedor donde se agregarán los campos de selección de color
    var contenedor = document.getElementById('contenedorColores');
    // Limpiar el contenido anterior del contenedor
    contenedor.innerHTML = ''; // Limpiar el contenido anterior


    /*Inicializar un arreglo para almacenar los colores seleccionados por cada jugador
    Este array se utilizará para rastrear qué colores han sido seleccionados por cada jugador durante el juego. 
    Cada índice en el array corresponderá a un color específico en el array coloresPermitidos. */
    var coloresSeleccionados = new Array(coloresPermitidos.length).fill(false);
    

    //Se inicia un bucle for que iterará numJugadores veces para crear campos para cada jugador.
    for (var i = 1; i <= numJugadores; i++) {
        // Creo un elemento label para mostrar el nombre del jugador
        var label = document.createElement('label');
        label.textContent = 'Jugador ' + i + ': ';
        /*Este elemento label mostrará el nombre del jugador. El texto de este label se establece dinámicamente para mostrar
         "Jugador 1:", "Jugador 2:", etc.*/

        // Crear un input para que el usuario pueda ingresar el nombre del jugador
        var inputNombre = document.createElement('input');
        inputNombre.type = 'text';//Con este input el usuario pueda ingresar el nombre del jugador
        inputNombre.placeholder = 'Nombre del jugador ' + i;//Con este input e establece un marcador de posición dinámico 
        inputNombre.id = 'nombreJugador' + i; //Con este input se asigna un id único a cada input para identificarlo más tarde 
        
        // Crear un select para que el usuario pueda elegir el color del jugador
        var selectColor = document.createElement('select');
        selectColor.name = 'colorJugador' + i; // Establecer un nombre único para el select
        selectColor.id = 'colorJugador' + i;// Establecer un id único para el select

        // Agregar opciones de color al desplegable
        for (var j = 0; j < coloresPermitidos.length; j++) {
            var color = coloresPermitidos[j];
            var option = document.createElement('option');//Crear un elemento option
            option.value = color;//// Establecer el valor del option como el nombre del color
            option.textContent = color;// Establecer el texto visible del option como el nombre del color
            option.classList.add(color); // Agregar clase CSS al option para darle estilo 
            selectColor.appendChild(option);// Agregar el option al select
        }
        /*Se inicia un bucle for para recorrer el array coloresPermitidos, que contiene los nombres de los colores 
        que el usuario puede elegir.
        En cada iteración del bucle, se crea un elemento <option> que representará una opción de color en el menú desplegable.
        Se establece el valor (value) del <option> como el nombre del color.
        Se establece el texto visible del <option> como el nombre del color.
        Se agrega una clase CSS al <option> para darle estilo. 
        Finalmente, se agrega el <option> al <select>.*/

        // Deshabilitar la opción del color seleccionado para evitar repeticiones
        selectColor.addEventListener('change', function (event) {
            // Obtener el índice del color seleccionado en el array coloresPermitidos
            var selectedIndex = coloresPermitidos.indexOf(event.target.value);
            // Marcar el color seleccionado como 'true' en el array coloresSeleccionados
            coloresSeleccionados[selectedIndex] = true;
            

            //Se inicia un bucle for que recorre todos los select de colores de los demás jugadores.
            for (var k = 1; k <= numJugadores; k++) {
                if (k !== i) {
                    var otherSelect = document.getElementById('colorJugador' + k);
                    otherSelect.querySelectorAll('option').forEach(function (option) {
                        if (option.value === event.target.value) {
                            option.disabled = true;
                        }
                    });
                }
            }
        });

        label.appendChild(inputNombre); // Añadir el input al label
        label.appendChild(selectColor); // Añadir el select al label
        contenedor.appendChild(label); // Agregar el label al contenedor de colores
        contenedor.appendChild(document.createElement('br')); // Agregar un salto de línea al contenedor
        
    }
}

// Obtener el número de jugadores de la URL
var parametrosURL = new URLSearchParams(window.location.search);
// Crear un nuevo objeto URLSearchParams para extraer los parámetros de la URL actual
var numJugadores = parseInt(parametrosURL.get('num_jugadores'));
// Obtener el valor del parámetro 'num_jugadores' de la URL y convertirlo a un número entero.


// Llamar a la función para crear los campos de color al cargar la página
window.onload = function () {
    // Esta función se ejecutará cuando la página se haya cargado completamente
    // La función crearCamposColor() se invoca con el número de jugadores obtenido de la URL
    crearCamposColor(numJugadores);
};

// Función para guardar los nombres de jugadores y colores seleccionados
function guardarColores() {
    var jugadores = [];// Crear un array para almacenar la información de cada jugador

    // Obtener los nombres y colores seleccionados por cada jugador
    for (var i = 1; i <= numJugadores; i++) {
         // Obtener los elementos de input y select correspondientes al jugador actual
        var nombreInput = document.getElementById('nombreJugador' + i);
        var colorSelect = document.getElementById('colorJugador' + i);
        // Obtener el nombre y color seleccionados por el jugador actual
        var nombreJugador = nombreInput.value;
        var colorJugador = colorSelect.value;
        // Crear un objeto jugador con el nombre y color seleccionados
        var jugador = {
            nombre: nombreJugador,
            color: colorJugador
        };
        // Agregar el objeto jugador al array de jugadores
        jugadores.push(jugador);
    }
    function guardarColor() {
        var color = document.getElementById('colorPicker').value;
        // Aquí puedes realizar la acción para guardar el color seleccionado junto con la opción correspondiente en tu sistema
        // Por ahora, simplemente mostraremos el color seleccionado
        alert("Color seleccionado: " + color);
        // Aquí podrías redirigir a otra página o hacer cualquier otra acción necesaria después de guardar el color
    }
    // Almacenar los datos en localStorage
    localStorage.setItem('jugadores', JSON.stringify(jugadores));

    // Redireccionar a la página de visualización de fichas
    window.location.href = 'Tablero.html';
    /*Esta función guardarColores() se encarga de recopilar la información (nombre y color) de cada jugador 
    y almacenarla en el almacenamiento local (localStorage).
    Se itera a través de los jugadores utilizando un bucle for, 
    obteniendo los valores de los campos de entrada de nombre (nombreJugador) y los campos de selección de color (colorJugador)
    para cada jugador.
    Se crea un objeto jugador para cada jugador, que contiene el nombre y el color seleccionado.
    Estos objetos jugador se agregan a un array llamado jugadores.
    El array jugadores se convierte a una cadena JSON utilizando JSON.stringify() y se almacena en el almacenamiento local 
    con la clave 'jugadores'.
    Finalmente, se redirecciona al usuario a la página de visualización de fichas (visualizar_fichas.html).*/
}

