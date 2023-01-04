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

                $("#divButtons").append("<input type='button' value='Cruciverba' id='btnCrossword' class='btnStyle' alt='Cruciverba'>")
                $("#divButtons").append("<input type='button' value='Impiccato' id='btnHangman' class='btnStyle' alt='Impiccato'><br>");
                $("#divLanguage").append("<input type='button' value='It' id='btnLanguage' class='btnStyle' alt='Lingua'><br>");

                // Generazione di N bottoni (con N = numero di cruciverba nel file Json)
                for (i = 0; i < Object.keys(dbCrossword).length; i++) {
                    c = parseInt(i) + 1
                    $("#divButtons").append("<input type='button' class='btnIntro' value='Cruciverba " + c + "' id='crossword" + c + "' style='display:none'></input>")
                }

                // Funzione che carica la struttura e il motore del cruciverba
                $('.btnIntro').click(function () {
                    var puzzleData = dbCrossword[this.id];
                    $('#puzzle-wrapper').crossword(puzzleData, document.getElementById('btnLanguage').value);
                })

                $('#btnLanguage').click(function(){
                    if (this.value == 'It'){
                        this.value = 'En'
                        $('#btnHangman').val('Hangman')
                        if (document.getElementById('btnCrossword').value != 'Indietro') {
                            $('#btnCrossword').val('Crossword')
                        }else{
                            $('#btnCrossword').val('Back')
                        }
                        for (i=0; i<document.getElementsByClassName('btnIntro').length; i++){
                            document.getElementsByClassName('btnIntro')[i].value = document.getElementsByClassName('btnIntro')[i].value.replace('Cruciverba', 'Crossword')
                        }
                    }else{
                        this.value = 'It'
                        $('#btnHangman').val('Impiccato')
                        if (document.getElementById('btnCrossword').value != 'Back') {
                            $('#btnCrossword').val('Cruciverba')
                        }else{
                            $('#btnCrossword').val('Indietro')
                        }
                        for (i=0; i<document.getElementsByClassName('btnIntro').length; i++){
                            document.getElementsByClassName('btnIntro')[i].value = document.getElementsByClassName('btnIntro')[i].value.replace('Crossword', 'Cruciverba')
                        }
                    }
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
                    if (document.getElementById('btnLanguage').value == 'It'){
                        var hangmanData = dbData['hangman-it'];
                    }else{
                        var hangmanData = dbData['hangman-en'];
                    }

                    $('#hangmancontainer').hangman(hangmanData, document.getElementById('btnLanguage').value );
                    $("#hangmancontainer").show();
                    $(".intro").hide();
                })

                $("#btnCrossword").click(function () {
                    $('.btnIntro').toggle(400);
                    $('#btnHangman').toggle(400);

                    if (this.value == 'Cruciverba'){
                        this.value = 'Indietro'
                    }else if (this.value == 'Indietro'){
                        this.value = 'Cruciverba'
                    }else if (this.value == 'Crossword'){
                        this.value = 'Back'
                    }else if (this.value == 'Back'){
                        this.value = 'Crossword'
                    }
                })
            });
    })
})(jQuery)

