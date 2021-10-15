from django.db.models import base
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from users.views import (
   UserViewSet
)

router = DefaultRouter()
router.register("userview", UserViewSet, basename="user-view")



urlpatterns = [
    path("", include(router.urls)),
]
