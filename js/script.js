(function($) {
	
	//var puzzleData = dbCrossword['crossword1'];
	$(function() {	
		for (i = 0; i < Object.keys(dbCrossword).length; i++) {
			c = parseInt(i) + 1
			$("#divIntro").append("<input type='button' class='btnIntro' value='Crossword "+ c +"' id='crossword"+c+"'></input>")
		}
		
		/*var puzzleData = [
			{
			   clue: "Pappagalli",
			   answer: "pippo",
			   position: 1,
			   orientation: "across",
			   startx: 1,
			   starty: 1
		   },
			{
			   clue: "Not a one ___ motor, but a three ___ motor",
			   answer: "phase",
			   position: 3,
			   orientation: "across",
			   startx: 7,
			   starty: 1
		   },
		   {
			   clue: "Created from a separation of charge",
			   answer: "capacitance",
			   position: 5,
			   orientation: "across",
			   startx: 1,
			   starty: 3
		   },
		   {
			   clue: "The speeds of engines without and accelaration",
			   answer: "idlespeeds",
			   position: 8,
			   orientation: "across",
			   startx: 1,
			   starty: 5
		   },
		   {
			   clue: "Complex resistances",
			   answer: "impedances",
			   position: 10,
			   orientation: "across",	
			   startx: 2,
			   starty: 7
		   },
		   {
			   clue: "This device is used to step-up, step-down, and/or isolate",
			   answer: "transformer",
			   position: 13,
			   orientation: "across",
			   startx: 1,
			   starty: 9
		   },
		   {
			   clue: "Type of ray emitted frm the sun",
			   answer: "gamma",
			   position: 16,
			   orientation: "across",
			   startx: 1,
			   starty: 11
		   },
		   {
			   clue: "C programming language operator",
			   answer: "cysan",
			   position: 17,
			   orientation: "across",
			   startx: 7,
			   starty: 11
		   },
		   {
			   clue: "Defines the alpha-numeric characters that are typically associated with text used in programming",
			   answer: "ascii",
			   position: 1,
			   orientation: "down",
			   startx: 1,
			   starty: 1
		   },
		   {
			   clue: "Generally, if you go over 1kV per cm this happens",
			   answer: "arc",
			   position: 2,
			   orientation: "down",
			   startx: 5,
			   starty: 1
		   },
		   {
			   clue: "Control system strategy that tries to replicate the human through process (abbr.)",
			   answer: "ann",
			   position: 4,
			   orientation: "down",
			   startx: 9,
			   starty: 1
		   },
		   {
			   clue: "Greek variable that usually describes rotor positon",
			   answer: "theta",
			   position: 6,
			   orientation: "down",
			   startx: 7,
			   starty: 3
		   },
		   {
			   clue: "Electromagnetic (abbr.)",
			   answer: "em",
			   position: 7,
			   orientation: "down",
			   startx: 11,
			   starty: 3
		   },
		   {
			   clue: "No. 13 across does this to a voltage",
			   answer: "steps",
			   position: 9,
			   orientation: "down",
			   startx: 5,
			   starty: 5
		   },
		   {
			   clue: "Emits a lout wailing sound",
			   answer: "siren",
			   position: 11,
			   orientation: "down",
			   startx: 11,
			   starty: 7
		   },
		   {
			   clue: "Information technology (abbr.)",
			   answer: "it",
			   position: 12,
			   orientation: "down",
			   startx: 1,
			   starty: 8
		   },
		   {
			   clue: "Asynchronous transfer mode (abbr.)",
			   answer: "atm",
			   position: 14,
			   orientation: "down",
			   startx: 3,
			   starty: 9
		   },
		   {
			   clue: "Offset current control (abbr.)",
			   answer: "occ",
			   position: 15,
			   orientation: "down",
			   startx: 7,
			   starty: 9
		   }
	   ]*/
			$('.btnIntro').click(function(){
				var puzzleData = dbCrossword[this.id]
				$('#puzzle-wrapper').crossword(puzzleData);
			})

			$(".btnIntro").click(function(){
				mod=1
				$("#cluescontainer").fadeIn(1200, "linear");
				if (window.innerWidth<900){
					$("#puzzle-clues").hide();
					$("#dropdownicon").show();
				}
				else{
					$("#puzzle-clues").show();
					$("#dropdownicon").hide();
				}
				$("#puzzle").fadeIn(1200, "linear");
				$(".intro").hide();
			})
	})
})(jQuery)

