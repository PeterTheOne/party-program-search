$(function() {

    var programData = [
        {
            id: 'spoe',
            name: 'Sozialdemokratische Partei Österreichs (SPÖ) - Dr. Maria-Luise Mathiaschitz (SPÖ)',
            filePath: 'text/spoe.md',
            text: ''
        },
        {
            id: 'gruene',
            name: 'Die Grünen Klagenfurt - Frank Frey (GRÜNE)',
            filePath: 'text/gruene.md',
            text: ''
        },
        {
            id: 'buerger-allianz',
            name: 'Bürger - Allianz Liste Albert Gunzer (BA)',
            filePath: 'text/buerger-allianz.md',
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

        $('article div').html('');
        var searchWord = searchField.val().toLowerCase();

        if (searchWord.length < 3) {
            return;
        }


        $.each(programData, function(index, value) {
            $('article div').append('<h3>' + value.name + '</h3>');
            var list = $('article div').append('<ul></ul>');

            var lines = value.text.split('\n');

            $.each(lines, function(index, line) {
                var lineLower = line.toLowerCase();

                if (lineLower.search(new RegExp(searchWord)) > 0) {
                    list.append('<li>' + line + '</li>');
                }
            });
        });

    });

});
