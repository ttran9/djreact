from django.urls import path

from .views import ArticleListView, ArticleDetailView, ArticleCreateView


urlpatterns = [
    path('create', ArticleCreateView.as_view()),
    path('<pk>', ArticleDetailView.as_view()),
    path('', ArticleListView.as_view()),
]
