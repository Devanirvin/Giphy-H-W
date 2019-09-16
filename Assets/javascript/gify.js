$(document).ready(function() {
    var topics = ['cleveland', 'movies', 'bmw', 'hair'];
    var stillImgUrl = '';
    var animateImgUrl = '';
    var stillUrl = '';
    var animateUrl = '';
    
    var createBtn = function() {
        
        $('#button-div').empty();
        
        for (var i = 0; i < topics.length; i++) {
            
            var newButton = $('<button>');
            newButton.attr('data-name', topics[i]);
            newButton.attr('class', 'gif');
            newButton.text(topics[i]);
            $('#button-div').append(newButton);
        }
    }
    
$('#submit-btn').on('click', function(event) {
    submit();
});

var displayGif = function() {
    var buttonInput = $(this).data('name');
    var apiKey = '9vU0IE74X70ZgkLyB8WgYHbC3IXiSPFR';
    var apiUrl = 'https://api.giphy.com/v1/gifs/search?q=' + buttonInput + '&api_key=' + apiKey;
    $.ajax({
        url: apiUrl,
        method: 'GET'
    }).done(function(response) {
        $('.gifSection').empty();
        let newH1 = $('<h1>');
            newH1.html(buttonInput);
            newH1.attr('class', 'text-center');
        $('.gifSection').append(newH1);

$(".search").keydown(function(event){
    if(event.keyCode == 13){
        submit();
        $('.search').val("");
        return false
    }
});

        for (var i = 0; i < 10; i++) {
                stillImgUrl = response['data'][i]['images']['fixed_height_still']['url'];
                animateImgUrl = response['data'][i]['images']['fixed_height']['url'];
                var rating = response['data'][i]['rating'];
                var newDiv = $('<div>'); 
                var newP = $('<p>'); 
                var newImg = $('<img>');
                newImg.attr('data-still', stillImgUrl);
                newImg.attr('data-animate', animateImgUrl);
                newImg.attr('src', stillImgUrl);
                newImg.attr('data-type', 'still');
                newImg.addClass('gifImage');
                newP.html('Giphy Rating: ' + rating);
                $(newP).appendTo(newDiv)
                $(newImg).appendTo(newDiv);
                $('.gifSection').append(newDiv); 
            }
        });
    }
    var submit = function() {
        event.preventDefault();
        var inputVal = $('#userInput').val();
        topics.push(inputVal);
        createBtn();
}

    function imageChange() {          

        var state = $(this).attr("data-state");
        var animateUrl = $(this).attr("data-animate");
        var stillUrl = $(this).attr("data-still");

        if(state == "still") {
            $(this).attr("src", animateUrl);
            $(this).attr("data-state", "animate");
        }

        else if(state == "animate") {
            $(this).attr("src", stillUrl);
            $(this).attr("data-state", "still");
        }   
    }

    createBtn();
    
    $(document).on('click', '.gif', displayGif);
    $(document).on('click', '.gifImage', imageChange);
});