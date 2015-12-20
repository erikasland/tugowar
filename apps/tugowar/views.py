from django.shortcuts import render, redirect
from django.views.generic import View
from .forms import Player1, Player2
from django.http import JsonResponse
from apps.tugowar.models import Player, Game

class Index(View): # renders main page
    def get(self, request):
        player1 = Player1()
        player2 = Player2()
        return render(request, 'tugowar/index.html', {'player1': player1, 'player2' : player2})

class StartGame(View):
    def post(self, request):
        playerone = Player.objects.get_or_create(username = request.POST['onename'])[0]
        playertwo = Player.objects.get_or_create(username = request.POST['twoname'])[0]
        new_game = Game.objects.create(player1 = playerone, player2 = playertwo, clickcount = 0, winner = '', loser='')
        return JsonResponse({'player_one': playerone.username, 'player_two': playertwo.username, 'player_one_wins': new_game.player1.wins, 'player_two_wins': new_game.player2.wins, 'player_one_losses': new_game.player1.losses, 'player_two_losses': new_game.player2.losses, 'player_one_id': playerone.id, 'player_two_id': playertwo.id, 'game_id': new_game.id})

class EndGame(View):
    def get(self, request):
        gameid = request.GET.get('gameid')
        playeroneid = request.GET.get('play1id')
        playertwoid = request.GET.get('play2id')
        victor = request.GET.get('vict')
        clicks = request.GET.get('gameclicks')
        self.UpdateClickCount(gameid, clicks)
        if int(victor) == 1:  ##player one
            self.TallyUpScore(1, playeroneid, playertwoid)
            self.UpdateGameStats(1, gameid)
        else:  ##player two
            pass
            self.TallyUpScore(2, playeroneid, playertwoid)
            self.UpdateGameStats(2, gameid)
        return JsonResponse({'status': True})


    def TallyUpScore(self, num, playeroneid, playertwoid):
        if int(num) == 1:
            updatep1 = Player.objects.filter(id = playeroneid)[0]
            updatep1.wins += 1
            updatep1.save()
            updatep2 = Player.objects.filter(id = playertwoid)[0]
            updatep2.losses += 1
            updatep2.save()
        else:
            updatep1 = Player.objects.filter(id = playeroneid)[0]
            updatep1.losses += 1
            updatep1.save()
            updatep2 = Player.objects.filter(id = playertwoid)[0]
            updatep2.wins += 1
            updatep2.save()

    def UpdateGameStats(self, num, gameid):
        if int(num == 1):
            curr_game = Game.objects.filter(id = gameid)[0]
            curr_game.winner = curr_game.player1.username
            curr_game.loser = curr_game.player2.username
            curr_game.save()
        else:
            curr_game = Game.objects.filter(id = gameid)[0]
            curr_game.winner = curr_game.player2.username
            curr_game.loser = curr_game.player1.username
            curr_game.save()
        return redirect('/')

    def UpdateClickCount(self, gameid, clicks):
        curr_game = Game.objects.filter(id = gameid)[0]
        curr_game.clickcount = clicks
        curr_game.save()
        return JsonResponse({'status': True})

