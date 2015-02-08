$(function() {

    var programData = [
        {
            id: 'fpoe',
            name: 'Die Freiheitlichen in Klagenfurt - FPÖ "Liste Christian Scheider" (FPÖ)',
            filePath: 'text/fpoe.md',
            url: 'http://www.christianscheider.at/aut_de_xhtml-4-projekte.php',
            text: ''
        },
        {
            id: 'spoe',
            name: 'Sozialdemokratische Partei Österreichs (SPÖ) - Dr. Maria-Luise Mathiaschitz (SPÖ)',
            filePath: 'text/spoe.md',
            url: 'http://www.spoe-klagenfurt.at/sites/klagenfurt.spoe.at/files/downloads/zukunftsprogramm_spoe_klagenfurt.pdf',
            text: ''
        },
        {
            id: 'oevp',
            name: 'Otto Umlauft - Klagenfurter Volkspartei (ÖVP)',
            filePath: 'text/oevp.md',
            url: 'http://klagenfurter-volkspartei.at/wp-content/uploads/2015/01/Wahlprogramm2015.pdf',
            text: ''
        },
        {
            id: 'gruene',
            name: 'Die Grünen Klagenfurt - Frank Frey (GRÜNE)',
            filePath: 'text/gruene.md',
            url: 'http://klagenfurt.gruene.at/wahlprogramm',
            text: ''
        },
        {
            id: 'ba',
            name: 'Bürger - Allianz Liste Albert Gunzer (BA)',
            filePath: 'text/ba.md',
            url: 'http://www.buerger-allianz.at/programm.html',
            text: ''
        },
        {
            id: 'lmw',
            name: 'Liste Mayerhofer Wilhelmine (LMW)',
            filePath: 'text/lmw.md',
            url: 'https://www.youtube.com/watch?v=HIQYRvn9rxQ',
            text: ''
        },
        {
            id: 'db',
            name: 'DIE BRUT (DB)',
            filePath: 'text/db.md',
            url: 'http://www.die-brut.at/klagenfurt-2015.html',
            text: ''
        },
        {
            id: 'linx',
            name: 'Parteilose und KPÖ (LINX)',
            filePath: 'text/linx.md',
            url: 'http://klagenfurt-anders.at/programm',
            text: ''
        }
    ];

    $.each(programData, function(index, value) {
        $.ajax({type: 'GET', url: value.filePath, dataType: 'text', success: function(data) {
            value.text = data;

            if (window.location.hash.length > 0) {
                searchField.val(window.location.hash.substring(1));
                searchField.trigger('change');
            }
        }});
    });

    var suggestions = $('#suggestions ul li');
    var searchField = $("input[name='search']");

    suggestions.on('click', function(event) {
        event.preventDefault();

        searchField.val($(this).text());
        searchField.trigger('change');
    });

    searchField.on('change keyup', function(event) {
        event.preventDefault();

        $('#results').html('');
        var searchWord = searchField.val();
        window.location.hash = searchWord;

        if (searchWord.length < 3) {
            return;
        }

        var resultCount = 0;

        $.each(programData, function(index, value) {
            $('#results').append('<h2>' + value.name + '</h2> - <a href="' + value.url + '">Programm</a>');
            $('#results').append('<ul id="' + value.id + '"></ul>');

            var lines = value.text.split('\n');

            $.each(lines, function(index, line) {
                if (line.search(new RegExp(searchWord, 'i')) > 0) {
                    resultCount++;

                    var lineMarked = line.replace(new RegExp(searchWord, 'i'), '<span class="highlight">$&</span>');
                    $('#results ul#' + value.id).append('<li>' + lineMarked + '</li>');
                }
            });
        });

        $('#statistics').html(resultCount + ' Resultate gefunden.');

    });

});
