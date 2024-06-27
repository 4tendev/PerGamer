import requests
import json

from django.http import JsonResponse
from django.db.models import Q

from .models import acceptedPlatforms, Tag, Detail
from .forms import ProductsForm
from .serializers import detailData

from core.settings import PRIVATE_BACK_END_HOST


def platforms(request):

    data = {"code": "200", "data": []}

    for appid, game in acceptedPlatforms:
        tags = Tag.objects.filter(appid=appid).filter(Q(Details__stock__gt=0)).distinct()
        tags_dict = {}
        if tags:
            for tag in tags:
                if tag.name not in tags_dict:
                    tags_dict[tag.name] = []
                tags_dict[tag.name].append(tag.value)

        data["data"].append({"game": game, "appid": appid, "tags": tags_dict})

    return JsonResponse(data)


def market(request):
    data = {
        "code": "400"
    }
    if not request.method == "GET":
        return JsonResponse(data)

    form = ProductsForm(request.GET)
    if not form.is_valid():
        print(form.errors)
        return JsonResponse(data)

    detailFilter = {"stock__gt": 0}
    appid = form.cleaned_data.get("appid")
    tags = form.cleaned_data.get("tags")
    contains = form.cleaned_data.get("contains")
    offset = form.cleaned_data.get("offset") or 0

    if appid:
        detailFilter["appid"] = appid
    if tags:
        filteredTags = Tag.objects.filter(value__in=tags)
        if filteredTags:
            detailFilter["tags__in"] = [tag.id for tag in filteredTags]
        else:
            return JsonResponse({"code": "200", "data": []})

    if contains:
        tags = Tag.objects.filter(value__icontains=contains)
        details = Detail.objects.filter(**detailFilter).filter(Q(tags__in=tags) | Q(title__icontains=contains)
                                                               ).prefetch_related('tags').order_by("-importantLevel", "-pk").distinct()[offset:offset+30]
    else:
        details = Detail.objects.filter(**detailFilter).prefetch_related(
            'tags').order_by("-importantLevel", "-pk").distinct()[offset:offset+30]

    data = {
        "code": "200",
        "data": {"details": [],
                 "products": []
                 }
    }
    if details:
        for detail in details:
            data["data"]["details"].append(
                detailData(detail)
            )

        detailID__in = json.dumps([detail.id for detail in details])
        response = requests.get(
            f"{PRIVATE_BACK_END_HOST}/market/products/?detailID__in={detailID__in}&status=2")
        products = response.json()["data"]
        if len(products):
            for product in products:
                data["data"]["products"].append(
                    product
                )

    return JsonResponse(data)

