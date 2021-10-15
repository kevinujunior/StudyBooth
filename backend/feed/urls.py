from django.db.models import base
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from feed.views import (
   SectionViewSet,
   PostViewSet,
   CommentViewSet,
   LikeViewSet
)

router = DefaultRouter()
router.register("sections", SectionViewSet, basename="section-view")
router.register("posts", PostViewSet, basename="post-view")
router.register("comments", CommentViewSet, basename="comment-view")
router.register("likes", LikeViewSet, basename="like-view")





urlpatterns = [
    path("", include(router.urls)),
]
