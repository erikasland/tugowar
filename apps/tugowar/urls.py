from django.conf.urls import url
from apps.tugowar.views import Index

urlpatterns = [
    url(r'^$', Index.as_view()),
]