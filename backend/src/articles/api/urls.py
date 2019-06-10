from django.urls import path

from .views import ArticleListView, ArticleDetailView, ArticleCreateView, ArticleUpdateView, ArticleDeleteView


urlpatterns = [
    path('create', ArticleCreateView.as_view()),
    path('update/<pk>', ArticleUpdateView.as_view()),
    path('delete/<pk>', ArticleDeleteView.as_view()),
    path('<pk>', ArticleDetailView.as_view()),
    path('', ArticleListView.as_view()),
]
