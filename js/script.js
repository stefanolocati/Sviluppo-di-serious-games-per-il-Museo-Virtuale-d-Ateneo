(function($) {
	$(function() {	
		
	fetch("./js/data.json")
		.then(response => {
			return response.json();
		})
		.then(data =>{
			dbCrossword = data[0]

		for (i = 0; i < Object.keys(dbCrossword).length; i++) {
			c = parseInt(i) + 1
			$("#divButtons").append("<input type='button' class='btnIntro' value='Crossword "+ c +"' id='crossword"+c+"'></input>")
		}
	
			$('.btnIntro').click(function(){
				var puzzleData = dbCrossword[this.id]
				console.log(puzzleData)
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
		});
	})
})(jQuery)

