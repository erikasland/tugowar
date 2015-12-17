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
            $('#start-game').hide();
            $('#enter-players').hide();
            $('img').show();
            $('#score-wrap').show();
        })
    })
}

new eventListeners()  //initiates game//