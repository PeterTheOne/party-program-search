$(function() {

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

            $('#statistics').html('');
            return;
        }

        var resultCount = 0;

        $.each(programData, function(index, value) {
            var partyHeadline = '<h2>' + value.name + '</h2>';
            if (value.url) {
                partyHeadline += '- <a href="' + value.url + '">Programm</a>';
            }

            $('#results').append(partyHeadline);
            $('#results').append('<ul id="' + value.id + '"></ul>');

            var lines = value.text.split('\n');

            $.each(lines, function(index, line) {
                if (line.search(new RegExp(searchWord, 'i')) > -1) {
                    resultCount++;

                    var lineMarked = line.replace(new RegExp(searchWord, 'i'), '<span class="highlight">$&</span>');
                    $('#results ul#' + value.id).append('<li>' + lineMarked + '</li>');
                }
            });
        });

        $('#statistics').html(resultCount + ' Resultate gefunden.');

    });

});
