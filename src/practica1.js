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
	this.graphicServer = gs;
	this.cards[];
	this.cardsFounds;
	this.message = "MemoryGame";

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
			if(i == 0 || i == 1)
				this.cards[posiciones[i]] = new MemoryGameCard("8-ball");

			else if(i == 2 || i == 3)
				this.cards[posiciones[i]] = new MemoryGameCard("potato");
			
			else if(i == 4 || i == 5)
				this.cards[posiciones[i]] = new MemoryGameCard("dinosaur");
			
			else if(i == 6 || i == 7)
				this.cards[posiciones[i]] = new MemoryGameCard("kronos");
			
			else if(i == 8 || i == 9)
				this.cards[posiciones[i]] = new MemoryGameCard("rocket");
			
			else if(i == 10 || i == 11)
				this.cards[posiciones[i]] = new MemoryGameCard("unicorn");
			
			else if(i == 12 || i == 13)
				this.cards[posiciones[i]] = new MemoryGameCard("guy");
			
			else
				this.cards[posiciones[i]] = new MemoryGameCard("zeppelin");
			
		}
		this.loop();
	}

	/**
	 * Dibuja el juego, esto es: (1) escribe el mensaje con el estado actual del
	 * juego y (2) pide a cada una de las cartas del tablero que se dibujen.
	 */
	this.draw = function(){
		this.graphicServer.drawMesssage(this.message);
		var i = 0;
		for(i; i < 16; i++){
			this.cards[i].draw(gs, i);
		}
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
		this.draw();
		//setInterval(this.draw, 16000);
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
	this.id = id;
	this.state = "down";
	
	/**
	* Da la vuelta a la carta, cambiando el estado de la misma
	*/
	this.flip = function(){
		if(this.state === "down"){this.state = "up";}
		else if(this.state == "up"){this.state = "down";}
	}

	/**
	* Marca una carta como encontrada cambiando el estado de la misma
	*/
	this.found = function(){
		this.state = "foud";
	}

	/**
	* Compara dos cartas, devolviendo true si ambas repreentan la misma carta
	*/
	this.compareTo = function(otherCard){
		if(this.id === otherCard)
			return true;
		else
			return false;
	}

	/**
	* Dibuja la carta de acuerdo al estado en el que se encuentra.
	* Recibe como parámetros el servidor gráfico y la posición en la que se encuentra en
	* el array de cartas del juego (necesario para dibujar una carta).
	*/
	this.draw = function(gs, pos){
		if(this.state === "down")
			gs.draw("back", pos);
		else
			gs.draw(this.id, pos);
	}
};
