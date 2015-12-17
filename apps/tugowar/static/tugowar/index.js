function eventListeners(){
    $(document).ready(function(){
        $('h3').hide();
        $('button').click(function(){
            console.log('connection exists!')
        })
    })
}

new eventListeners()  //initiates game//