import json
import re
import requests

from django.http import JsonResponse
from django.contrib.auth import login, authenticate, logout, update_session_auth_hash
from django.db.models import Q

from django_ratelimit.decorators import ratelimit
from django.core.cache import cache

from core.settings import SESSION_COOKIE_NAME, PRIVATE_BACK_END_HOST
from market.models import Detail, Tag, acceptedPlatforms
from market.serializers import detailData

from .forms import LoginForm, RegisterForm, ResetPasswordForm, ChangePasswordForm
from .models import User
from .OTP import createCode, checkCode


def emailOrMobileInput(group, request):
    if request.method == "PATCH":
        return json.loads(request.body).get('emailOrMobile')


def userID(group, request):
    if request.method == "PUT":
        return str(request.user.id)


unKnownUserData = {
    "isKnown": False,
}


def userData(user: User):
    return {
        "isKnown": True,
    } if user.is_authenticated else unKnownUserData


@ratelimit(key=emailOrMobileInput, method=['PATCH'], block=False, rate='15/d')
@ratelimit(key=emailOrMobileInput, method=['PATCH'], block=False, rate='5/m')
@ratelimit(key=userID, method=['PUT'], block=False, rate='6/d')
def auth(request):
    user = request.user

    try:
        data = {
            "code": "405",
            "message": "Method not Allowed"
        }
        method = request.method

        if method == "GET":
            data = {
                "code": "401",
                "message": "User Unknown",
                "data": userData(user)
            }

            if user.is_authenticated:
                data = {
                    "code": "200",
                    "message": "known User",
                    "data": userData(user)
                }
        elif method == "PATCH":
            form_data = json.loads(request.body)
            form = LoginForm(form_data)
            data = {
                "code": "400",
                "message": "Cant authurize"
            }
            if not form.is_valid():
                return JsonResponse(data)
            emailOrMobile = form.cleaned_data.get("emailOrMobile").lower()
            emailOrMobileCode = form.cleaned_data.get(
                "emailOrMobileCode") or None
            password = form.cleaned_data.get("password")
            trustedDevice = form.cleaned_data.get("trustedDevice") or None
            user = User.objects.filter(
                Q(email=emailOrMobile) | Q(mobile=emailOrMobile)
            )

            if not user:
                return JsonResponse(data)

            if getattr(request, 'limited', False):
                VERIFY_FOR_LOGIN = "Login"
                if not emailOrMobileCode:
                    data = {
                        "code": "500"
                    }
                    timeRemaining = createCode(
                        emailOrMobile, VERIFY_FOR_LOGIN)
                    if timeRemaining == False:
                        return JsonResponse({"code": "4291"})
                    if timeRemaining > 0:
                        data = {
                            "code": "429",
                                    "message": "to many tries ,Code Sent",
                                    "data": {
                                        "timeRemaining": timeRemaining
                                    }
                        }
                        return JsonResponse(data)
                isCodeAcceptable = checkCode(
                    emailOrMobile, VERIFY_FOR_LOGIN, emailOrMobileCode)
                if not isCodeAcceptable:
                    if isCodeAcceptable is None:
                        data = {
                            "code": "4290",
                            "message": "ASK NEW emailCODE"
                        }
                    elif isCodeAcceptable is False:
                        data = {
                            "code": "4292",
                            "message": "Wrong emailCode Code"
                        }
                    return JsonResponse(data)

            user = authenticate(email=emailOrMobile, password=password) or authenticate(
                mobile=emailOrMobile, password=password)
            if user is None:
                return JsonResponse(data)

            login(request, user)
            if not trustedDevice:
                request.session.set_expiry(0)
            data = {
                "code": "200",
                "message": "Successfully authurized",
                "data": userData(user)
            }
        elif method == "DELETE":
            logout(request)
            data = {
                "code": "200",
                "data": unKnownUserData
            }
        elif method == "POST":

            form_data = json.loads(request.body)
            form = RegisterForm(form_data)
            data = {
                "code": "400",
                "meesage": "Invalid inputs"
            }
            if form.is_valid():
                password = form.cleaned_data.get("password")
                trustedDevice = form.cleaned_data.get(
                    "trustedDevice") or False
                email = form.cleaned_data.get("email")
                if User.objects.filter(email=email):
                    data = {
                        "code": "4002",
                        "message": "Email already exist"
                    }
                    return JsonResponse(data)
                emailOrMobileCode = form.cleaned_data.get(
                    "emailOrMobileCode")
                if emailOrMobileCode:
                    isCodeAcceptable = checkCode(
                        email, User.VERIFY_FOR_REGISTER, emailOrMobileCode)
                    if isCodeAcceptable:
                        user = User.objects.create_user(
                            password=password, email=email)
                        data = {
                            "code": "200",
                            "message": "Created",
                            "data": userData(user)
                        }
                        login(request, user)
                        if not trustedDevice:
                            request.session.set_expiry(0)

                    elif isCodeAcceptable is None:
                        data = {
                            "code": "4003",
                            "message": "ASK NEW CODE"
                        }
                    else:
                        data = {
                            "code": "4004",
                            "message": "Wrong VERIFICATION Code"
                        }
                else:
                    data = {
                        "code": "500",
                                "message": "Server Error"
                    }
                    timeRemaining = createCode(
                        email,  User.VERIFY_FOR_REGISTER)
                    if timeRemaining:
                        data = {
                            "code": "201",
                            "data": {"timeRemaining": timeRemaining, },
                            "message": "Code Sent"
                        }
        elif method == "OPTIONS":
            RESET_PASSWROD = "ResetPassword"
            form_data = json.loads(request.body)
            form = ResetPasswordForm(form_data)
            data = {
                "code": "400",
                "message": "Invalid Inputs "
            }
            if not form.is_valid():
                return JsonResponse(data)
            emailOrMobile = form.cleaned_data.get("emailOrMobile")
            user = User.objects.filter(Q(email=emailOrMobile) | Q(mobile=emailOrMobile)
                                       )
            if not user:
                data = {
                    "code": "4001",
                    "message": "No USER FOUND"
                }
                return JsonResponse(data)
            emailOrMobileCode = form.cleaned_data.get("emailOrMobileCode")
            newPassword = form.cleaned_data.get("newPassword")
            trustedDevice = form.cleaned_data.get("trustedDevice") or False
            if emailOrMobileCode:
                isCodeAcceptable = checkCode(
                    emailOrMobile, RESET_PASSWROD, emailOrMobileCode)
                if isCodeAcceptable:
                    if not newPassword:
                        return JsonResponse({"code": "400", "message": "INVALID INPUTS"})
                    user = user[0]
                    user.set_password(newPassword)
                    user.save()
                    update_session_auth_hash(request, user)
                    login(request, user)
                    data = {
                        "code": "200",
                        "message": "Password Changed",
                        "data": userData(user)
                    }
                    if not trustedDevice:
                        request.session.set_expiry(0)

                elif isCodeAcceptable is None:
                    data = {
                        "code": "4003",
                        "message": "ASK NEW CODE"
                    }
                else:
                    data = {
                        "code": "4004",
                        "message": "Wrong VERIFICATION Code"
                    }
            else:
                data = {
                    "code": "500",
                            "message": "Server Error"
                }
                timeRemaining = createCode(
                    emailOrMobile, RESET_PASSWROD)
                if timeRemaining:
                    data = {
                        "code": "201",
                        "data": {"timeRemaining": timeRemaining, },
                        "message": "Code Sent"
                    }
        elif method == "PUT":
            if getattr(request, 'limited', False):
                data = {
                    "code": "429",
                    "message": "to many tries "
                }
                return JsonResponse(data)
            user = request.user
            data = {
                "code": "401",
                "message": "User Unknown"
            }
            if not user:
                return JsonResponse(data)
            form_data = json.loads(request.body)
            form = ChangePasswordForm(form_data)
            data = {
                "code": "400",
                "message": "invalid Inputs "
            }

            if not form.is_valid():
                return JsonResponse(data)
            password = form.cleaned_data.get("password")
            newPassword = form.cleaned_data.get("newPassword")
            user = authenticate(
                email=user.email, mobile=user.mobile, password=password)
            if not user:
                data = {
                    "code": "4001",
                    "message": "invalid Password "
                }
                return JsonResponse(data)
            user.set_password(newPassword)
            user.save()
            update_session_auth_hash(request, user)
            login(request, user)
            data = {"code": "200", "message": "Password renewed",
                    "data": userData(user)}

    except Exception as e:
        print(e)
        data = {
            "code": "500",
            "message": "Server Error"
        }

    if request.user.is_authenticated:
        data["data"][SESSION_COOKIE_NAME] = request.session.session_key

    return JsonResponse(data)


def get_valid_filename(filename):
    # Replace any illegal characters with an underscore
    filename = re.sub(r'[^a-zA-Z0-9._-]', '_', filename)
    # Truncate the file name if it is too long
    if len(filename) > 255:
        filename = filename[:255]
    return filename


def process_assets(asset_list, appid):
    target_list = []
    for asset in asset_list:
        try:
            assetid = asset["assetid"]
            name = asset["market_hash_name"]
            tags = asset["tags"]
            cache_key = f"detail_{get_valid_filename(name)}_{appid}"
            detailId = cache.get(cache_key)
            if detailId is None:
                detail = Detail.objects.filter(title=name, appid=appid)
                if detail:
                    detailId = detail[0].id
                    cache.set(cache_key, detailId, timeout=864000)
            if not detailId:
                imagename = get_valid_filename(asset["market_hash_name"])
                descriptions = asset.get("descriptions", [])
                if asset["icon_url"] and asset["icon_url_large"]:
                    image_url = 'https://community.cloudflare.steamstatic.com/economy/image/' + \
                        asset["icon_url"]
                    image_big_url = 'https://community.cloudflare.steamstatic.com/economy/image/' + \
                        asset["icon_url_large"]
                else:
                    continue
                newDetail = Detail.objects.create(
                    imageURL=image_url, imageBigURL=image_big_url, imageName=imagename, title=name, appid=appid, descriptions=descriptions)
                try:
                    for tag in tags:
                        tag_name = tag["localized_category_name"]
                        tag_value = tag["localized_tag_name"]

                        tag_instance = Tag.objects.get_or_create(
                            name=tag_name, value=tag_value, appid=appid)
                        newDetail.tags.add(tag_instance[0])
                    detailId = newDetail.id
                except Exception as e:
                    newDetail.delete()
                    continue
            target_list.append({"assetId":  assetid, "tradable": asset["marketable"], "title": asset["market_hash_name"], "imageURL": (
                'https://community.cloudflare.steamstatic.com/economy/image/' + asset["icon_url"]), "detailID": detailId})
        except Exception as e:
            print(e)
            continue
    return target_list


def inventory(request):
    user = request.user
    if not user.canSell:
        data = {
            "code": "400"
        }
        return JsonResponse(data)
    method = request.method
    if method == "GET":
        cache_key = user.id64 + "INVENTORY"
        invetories = cache.get(cache_key)
        if invetories is not None:
            data = {
                "code": "200",
                "invetories": invetories
            }
            return JsonResponse(data)
        invetories = []
        for platform in acceptedPlatforms:
            appid = platform[0]
            platformInvetoris = {
                "tradeableAssets": [], "notTradeableAssets": []}
            url = (
                f'''https://api.steampowered.com/IEconService/GetInventoryItemsWithDescriptions/v1/?key={user.steamAPIKey}&steamid={user.id64}&appid={appid}&contextid=2&get_descriptions=true''')
            try:
                response = requests.get(url=url)
                assets = response.json()
                assets = assets["response"]
                descriptions = assets["descriptions"]
                assets = assets["assets"]
                for item1 in assets:
                    for item2 in descriptions:
                        if item1['classid'] == item2['classid'] and item1['instanceid'] == item2['instanceid']:
                            item1.update(item2)
                            break
                notTradeableAssets = [
                    item for item in assets if item['marketable'] != 1]
                tradeableAssets = [
                    item for item in assets if item['tradable'] == True]
                platformInvetoris["notTradeableAssets"] = process_assets(
                    notTradeableAssets, appid)
                platformInvetoris["tradeableAssets"] = process_assets(
                    tradeableAssets, appid)
                invetories.append({platform[1]: platformInvetoris})
            except Exception as e:
                print(e)
                continue
        cache.set(cache_key, invetories, 600)
        data = {
            "code": "200",
            "invetories": invetories
        }
        return JsonResponse(data)


def store(request):
    user = request.user
    if not user.canSell:
        data = {
            "code": "400"
        }
        return JsonResponse(data)
    method = request.method
    if method == "GET":
        creatorID = user.id
        response = requests.get(
            f"{PRIVATE_BACK_END_HOST}/market/products/?creatorID={creatorID}")
        products = response.json()["data"]
        data = {
            "code": "200",
            "data": {"details": [],
                     "products": []
                     }
        }
        if len(products):
            detailsID = set([product.detailID for product in products])
            for product in products:
                data["data"]["products"].append(
                    product
                )
            details = Detail.objects.filter(id__in=[detailsID])
            for detail in details:
                data["data"]["details"].append(
                    detailData(detail)
                )
    return JsonResponse(data)
