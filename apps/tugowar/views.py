from django.shortcuts import render
from django.views.generic import View
from .forms import Player1, Player2
class Index(View):
    def get(self, request):
        player1 = Player1()
        player2 = Player2()
        return render(request, 'tugowar/index.html', {'player1': player1, 'player2' : player2})