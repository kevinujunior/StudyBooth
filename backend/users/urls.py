from django.db.models import base
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from users.views import (
   UserViewSet,
   UserFollowingViewSet,
)

router = DefaultRouter()
router.register("userview", UserViewSet, basename="user-view")
router.register("followingview", UserFollowingViewSet, basename="following-view")
# router.register("followerview", UserFollowerViewSet, basename="follower-view")



urlpatterns = [
    path("", include(router.urls)),
]
