(function($) {
	$(function() {	
	//Caricamento dei dati da file Json
	fetch("./js/data.json")
		.then(response => {
			return response.json();
		})
		.then(data =>{
			dbCrossword = data[0]

		// Generazione di N bottoni (con N = numero di cruciverba nel file Json)
		for (i = 0; i < Object.keys(dbCrossword).length; i++) {
			c = parseInt(i) + 1
			$("#divButtons").append("<input type='button' class='btnIntro' value='Crossword "+ c +"' id='crossword"+c+"'></input>")
		}
	
			// Funzione che carica la struttura e il motore del cruciverba
			$('.btnIntro').click(function(){
				var puzzleData = dbCrossword[this.id];
				$('#puzzle-wrapper').crossword(puzzleData);
			})

			// Funzione che in base alle dimensioni dello schermo mostra/nasconde determinate sezioni HTML
			$(".btnIntro").click(function(){
				mod=1
				$("#cluescontainer").fadeIn(1200, "linear");
				if (window.innerWidth<900){
					$("#puzzle-clues").hide();
					$("#solution").hide();
					$("#dropdownicon").show();
				}
				else{
					$("#puzzle-clues").show();
					$("#solution").show();
					$("#dropdownicon").hide();
				}
				$("#puzzle").fadeIn(1200, "linear");
				$(".intro").hide();
			})
		});
	})
})(jQuery)

