function eventListeners(){
    $(document).ready(function(){
        $('#enter-players').hide();
        $('img').hide();
        $('#score-wrap').hide();
        $('#start-game').click(function(){
            $('#start-game').hide();
            $('#enter-players').show();
        })
        $('#start-tug').click(function(){
            $('#onewon').hide();
            $('#twoform').hide();
            $('#player_form').submit(function(){
                $.post('/startgame', $(this).serialize(), function(res){
                    $('#one_score').replaceWith('<h3 id="one_score">' + res.player_one + ': ' + res.player_one_wins + '|' + res.player_one_losses +' </h3>')
                    $('#player2score').replaceWith('<h3 id="player2score">' + res.player_two + ': ' + res.player_two_wins + '|' + res.player_two_losses + ' </h3>')
                    $('#onewon').replaceWith('<div id="newgameonecss"><a id="onewon" href="endgame/1/' + res.game_id + '/' + res.player_one_id + '/' + res.player_two_id + '">New Game</a></div>') 
                    $('#twowon').replaceWith('<div id="newgametwocss"><a id="twowon" href="endgame/2/' + res.game_id + '/' +res.player_one_id + '/' + res.player_two_id + '">New Game</a></div>') 
                    $('#newgameonecss').hide();
                    $('#newgametwocss').hide();
                    $('#start-game').hide();
                    $('#enter-players').hide();
                    $('img').show();
                    $('#score-wrap').show();
                    $(document).keypress(function(event){
                        if(event.keyCode == 108){
                            $('#main-img').css('margin-left', imageMovement.move(1, res.game_id, res.player_one_id, res.player_two_id) + 'em')
                        }else if(event.keyCode == 115){
                            $('#main-img').css('margin-left', imageMovement.move(-1, res.game_id, res.player_one_id, res.player_two_id) + 'em')
                        }
                    })
                })
                return false
            })
        })
    })
}

var imageMovement = function(){  //Handles movement of tug of war image
    this.total = 18
    this.clicks = 0

    this.move = function(num, game_id, player_one_id, player_two_id){  //Adds or subtracts one from total depending on which player calls it
        if(this.total == 0){
            miscGameLogic.endGame(1, game_id, player_one_id, player_two_id, this.clicks)
            miscGameLogic.playAgainChoice(1)
        }else if(this.total == 36){
            miscGameLogic.endGame(2, game_id, player_one_id, player_two_id, this.clicks)
            miscGameLogic.playAgainChoice(2)
        }else{
            this.total += num
            this.clicks += 1
            return this.total
        }
    }
}

var miscGameLogic = function(){

    this.getCookie = function(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    this.clickCountAjax = function(clicks){
        $.ajax({
            headers: {
                'Content-Type':'application/json',
                'X-CSRFToken': miscGameLogic.getCookie('csrftoken')
            },
            url:  'click',
            type: "GET",
            data: {clicktotal: clicks},
        });
    }

    this.endGame = function(victor, game_id, player_one_id, player_two_id, clicks){
        $.ajax({
            headers: {
                'Content-Type':'application/json',
                'X-CSRFToken': miscGameLogic.getCookie('csrftoken')
            },
            url: 'endgame',
            type: 'get', 
            data: {gameid: game_id, play2id: player_two_id, play1id: player_one_id, vict: victor, gameclicks: clicks},
        });
    }

    this.playAgainChoice = function(winner){
        alert('Player ' + winner + ': FLAWLESS VICTORY!')
        var new_game_choice = confirm('Another round?')
        location.reload()
    }
}

new eventListeners();
var imageMovement = new imageMovement();
var miscGameLogic = new miscGameLogic();