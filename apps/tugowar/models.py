from django.db import models

class Player(models.Model):
    username = models.CharField(max_length=255)
    wins = models.IntegerField(default=0)
    losses = models.IntegerField(default=0)

class Game(models.Model):
    player1 = models.ForeignKey(Player, related_name='play_one', default=None)
    player2 = models.ForeignKey(Player, related_name='play_two', default=None)
    clickcount = models.IntegerField(default=0)
    winner = models.CharField(max_length=255)
    loser = models.CharField(max_length=255)