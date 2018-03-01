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
	this.bussy = false;
	this.graphicServer = gs;
	this.cards = [];
	this.cardsFounds = 0;
	this.message = "MemoryGame";

	/**
	 * Inicializa el juego creando las cartas (recuerda que son 2 de cada
	 * tipo de carta), desordenándolas y comenzando el bucle de juego.
	 */
	this.initGame = function(){
		var i = 0;
		this.posiciones = [];
	
		this.cards[0] = new MemoryGameCard("8-ball");
		this.cards[1] = new MemoryGameCard("8-ball");
	
		this.cards[2] = new MemoryGameCard("potato");
		this.cards[3] = new MemoryGameCard("potato");
	
		this.cards[4] = new MemoryGameCard("dinosaur");
		this.cards[5] = new MemoryGameCard("dinosaur");
	
		this.cards[6] = new MemoryGameCard("kronos");
		this.cards[7] = new MemoryGameCard("kronos");
	
		this.cards[8] = new MemoryGameCard("rocket");
		this.cards[9] = new MemoryGameCard("rocket");
	
		this.cards[10] = new MemoryGameCard("unicorn");
		this.cards[11] = new MemoryGameCard("unicorn");
	
		this.cards[12] = new MemoryGameCard("guy");
		this.cards[13] = new MemoryGameCard("guy");
	
		this.cards[14] = new MemoryGameCard("zeppelin");
		this.cards[15] = new MemoryGameCard("zeppelin");

		this.shuffle();
		this.loop();
	}

	this.shuffle = function(){
		var current = this.cards.length;
		var temp, random;

		 while (0 !== current) {
		    random = Math.floor(Math.random() * current);
		    current -= 1;

		    temp = this.cards[current];
		    this.cards[current] = this.cards[random];
		    this.cards[random] = temp;
  		}
	}

	/**
	 * Dibuja el juego, esto es: (1) escribe el mensaje con el estado actual del
	 * juego y (2) pide a cada una de las cartas del tablero que se dibujen.
	 */
	this.draw = function(){
		this.graphicServer.drawMessage(this.message);
		var i = 0;
		for(i; i < 16; i++){
			this.cards[i].draw(this.graphicServer, i);
		}

	}


	/**
	* Es el bucle del juego. En este caso es muy sencillo: llamamos al método
	* draw cada 16ms (equivalente a unos 60fps). Esto se realizará con la función
	* setInterval de Javascript.
	*/
	this.loop = function(){
		setInterval(this.draw.bind(this), 8);
	}

	/**
	* Este método se llama cada vez que el jugador pulsa sobre
	* alguna de las cartas (identificada por el número que ocupan en el array de cartas
	* del juego). Es el responsable de voltear la carta y, si hay dos volteadas, comprobar
	* si son la misma (en cuyo caso las marcará como encontradas). En caso de no ser
	* la misma las volverá a poner boca abajo.
	*/
	this.onClick = function(cardId){
		if(!this.bussy){
			if(cardId != null && cardId >= 0 && cardId <= 15){
				if(this.cards[cardId].getState() != "up" && this.cards[cardId].getState() != "found"){
					this.cards[cardId].flip();
					var fns = false;
					var i = 0;
					for(i; i < 16 && !fns; i++){
						if(this.cards[i].getState() === "up" && i != cardId){
							if(this.cards[i].getId() === this.cards[cardId].getId()){
								this.cards[i].found();
								this.cards[cardId].found();
								this.message = "Match found!!";
								this.cardsFounds += 2;
								fns = true;
							}else{
								fns = true;
								this.message = "Try again";
								var that = this;
								var j = i;
								//bloquear eventos de raton
								this.bussy = true;
								setTimeout(function(){
												//desbloquear eventos de rator
												that.cards[j].flip();
												that.cards[cardId].flip();	
												that.message = "MemoryGame";
												that.bussy = false;
											},900);

							}
						}
					}

					if(this.cardsFounds === 16)
						this.message = "You win!!"
				}
			}
		}
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
		if(this.state === "down")
			this.state = "up";

		else if(this.state === "up")
			this.state = "down";
	}

	/**
	 * Devuelve el id
	 */
	this.getId = function(){
	 	var that = this;
	 	return that.id;
	}

	/**
	 * Devuelve el estado
	 */
	this.getState = function(){
	 	var that = this;
	 	return that.state;
	}

	/**
	 * Marca una carta como encontrada cambiando el estado de la misma
	 */
	this.found = function(){
		this.state = "found";
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
