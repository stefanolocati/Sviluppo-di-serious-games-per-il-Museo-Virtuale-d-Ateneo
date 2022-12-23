(function ($) {
    $(function () {
        //Caricamento dei dati da file Json
        fetch("./js/data.json")
            .then(response => {
                return response.json();
            })
            .then(data => {
                dbData = data[0]
                dbCrossword = data[0]['crosswords'][0]

                $("#divButtons").append("<input type='button' value='Cruciverba' id='btnCrossword' class='btnStyle'>")
                $("#divButtons").append("<input type='button' value='Impiccato' id='btnHangman' class='btnStyle'><br>");

                // Generazione di N bottoni (con N = numero di cruciverba nel file Json)
                for (i = 0; i < Object.keys(dbCrossword).length; i++) {
                    c = parseInt(i) + 1
                    $("#divButtons").append("<input type='button' class='btnIntro' value='Cruciverba " + c + "' id='crossword" + c + "' style='display:none'></input>")
                }

                // Funzione che carica la struttura e il motore del cruciverba
                $('.btnIntro').click(function () {
                    var puzzleData = dbCrossword[this.id];
                    $('#puzzle-wrapper').crossword(puzzleData);
                })

                // Funzione che in base alle dimensioni dello schermo mostra/nasconde determinate sezioni HTML
                $(".btnIntro").click(function () {
                    mod = 1
                    $(".crosswordpuzzlecontainer").show();
                    $("#cluescontainer").fadeIn(1200, "linear");
                    if (window.innerWidth < 900) {
                        $("#puzzle-clues").hide();
                        $("#solution").hide();
                        $("#dropdownicon").show();
                    } else {
                        $("#puzzle-clues").show();
                        $("#solution").show();
                        $("#dropdownicon").hide();
                    }
                    $("#puzzle").fadeIn(1200, "linear");
                    $(".intro").hide();
                })

                $("#btnHangman").click(function () {
                    var hangmanData = dbData['hangman'];
                    $('#hangmancontainer').hangman(hangmanData);
                    $("#hangmancontainer").show();
                    $(".intro").hide();
                })

                $("#btnCrossword").click(function () {
                    $('.btnIntro').toggle(400);
                    $('#btnHangman').toggle(400);

                    if (this.value == 'Cruciverba'){
                        this.value = 'Indietro'
                    }else{
                        this.value = 'Cruciverba'
                    }
                })
            });
    })
})(jQuery)

