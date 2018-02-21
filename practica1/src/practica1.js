/**
 * MemoryGame es la clase que representa nuestro juego. Contiene un array con la cartas del juego,
 * el número de cartas encontradas (para saber cuándo hemos terminado el juego) y un texto con el mensaje
 * que indica en qué estado se encuentra el juego
 */
var MemoryGame = MemoryGame || {};

/**
 * Constructora de MemoryGame
 */
MemoryGame = function(gs) {
	var graphicServer = gs;
	var cards[];
	var cardsFounds;
	var message = "MemoryGame";

	/**
	 * Inicializa el juego creando las cartas (recuerda que son 2 de cada
	 * tipo de carta), desordenándolas y comenzando el bucle de juego.
	 */
	this.initGame = function(){
		var i = 0;
		this.posiciones = [Math.floor(Math.random() * 15)];
		for(i; i < 16; i++){
			var random = Math.floor(Math.random() * 15);
			while(posiciones.indexOf(random) == -1){
				random = Math.floor(Math.random() * 15);
			}
			posiciones[i] = random;
			if(i == 0 || i == 1){
				graphicServer.draw("8-ball", posiciones[i]);
			}
			else if(i == 2 || i == 3){
				graphicServer.draw("potato", posiciones[i]);
			}
			else if(i == 4 || i == 5){
				graphicServer.draw("dinosaur", posiciones[i]);
			}
			else if(i == 6 || i == 7){
				graphicServer.draw("kronos", posiciones[i]);
			}
			else if(i == 8 || i == 9){
				graphicServer.draw("rocket", posiciones[i]);
			}
			else if(i == 10 || i == 11){
				graphicServer.draw("unicorn", posiciones[i]);
			}
			else if(i == 12 || i == 13){
				graphicServer.draw("guy", posiciones[i]);
			}
			else{
				graphicServer.draw("zeppelin", posiciones[i]);
			}
		}
		/*¿ESTO ESTÁ BIEN?*/
		this.loop;

	}

	/**
	 * Dibuja el juego, esto es: (1) escribe el mensaje con el estado actual del
	 * juego y (2) pide a cada una de las cartas del tablero que se dibujen.
	 */
	this.draw = function(){
		graphicServer.drawMesssage(message);
		/*ACABAR*/
	}


	/**
	* Es el bucle del juego. En este caso es muy sencillo: llamamos al método
	* draw cada 16ms (equivalente a unos 60fps). Esto se realizará con la función
	* setInterval de Javascript.
	*/
	this.loop = function(){
		/*DUDO HORRORES DE QUE SEA ASÍ COMO SE LLAMA A OTRA FUNCIÓN,
		* ADEMÁS NO SE A CUAL DE LOS DOS DRAWS HAY QUE LLAMAR
		*/
		setInterval(this.draw, 16000);
	}

	/**
	* Este método se llama cada vez que el jugador pulsa sobre
	* alguna de las cartas (identificada por el número que ocupan en el array de cartas
	* del juego). Es el responsable de voltear la carta y, si hay dos volteadas, comprobar
	* si son la misma (en cuyo caso las marcará como encontradas). En caso de no ser
	* la misma las volverá a poner boca abajo.
	*/
	this.onClick = function(cardId){

	}
};



/**
 * Constructora de las cartas del juego. Recibe como parámetro el nombre del sprite que representa la carta.
 * Dos cartas serán iguales si tienen el mismo sprite.
 * La carta puede guardar la posición que ocupa dentro del tablero para luego poder dibujarse
 * @param {string} id Nombre del sprite que representa la carta
 */
MemoryGameCard = function(id) {
	var sprite = id;
	var upside_down = true;
	var face_up = false;
	var found = false;

	/**
	* Da la vuelta a la carta, cambiando el estado de la misma
	*/
	this.flip = function(){
		if(upside_down == true){face_up = true; upside_down = false;}
		else if(face_up == true){face_up = false; upside_down = true;}
	}

	/**
	* Marca una carta como encontrada cambiando el estado de la misma
	*/
	this.found = function(){
		found = true;
	}

	/**
	* Compara dos cartas, devolviendo true si ambas repreentan la misma carta
	*/
	this.compareTo = function(otherCard){
		if(sprite == otherCard)
			return true;
		else
			return false;
	}
};
