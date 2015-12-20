from django.conf.urls import url
from apps.tugowar.views import Index, StartGame, EndGame

urlpatterns = [
    url(r'^endgame$', EndGame.as_view()),
    url(r'^startgame$', StartGame.as_view()),
    url(r'^$', Index.as_view()),
]