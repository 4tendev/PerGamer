import json

from django.http import JsonResponse
from django.contrib.auth import login, authenticate, logout, update_session_auth_hash
from django.db.models import Q

from django_ratelimit.decorators import ratelimit

from core.settings import SESSION_COOKIE_NAME

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


@ratelimit(key=emailOrMobileInput, method=['PATCH'], block=False, rate='5/d')
@ratelimit(key=emailOrMobileInput, method=['PATCH'], block=False, rate='5/m')
@ratelimit(key=userID, method=['PUT'], block=False, rate='10/d')
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
                emailCode = form.cleaned_data.get(
                    "emailCode")
                if emailCode:
                    isCodeAcceptable = checkCode(
                        email, User.VERIFY_FOR_REGISTER, emailCode)
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
            email = form.cleaned_data.get("email")
            user = User.objects.filter(
                email=email)
            if not user:
                data = {
                    "code": "4001",
                    "message": "No USER FOUND"
                }
                return JsonResponse(data)
            emailCode = form.cleaned_data.get("emailCode")
            newPassword = form.cleaned_data.get("newPassword")
            trustedDevice = form.cleaned_data.get("trustedDevice") or False
            if emailCode:
                isCodeAcceptable = checkCode(
                    email, RESET_PASSWROD, emailCode)
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
                        data: userData(user)
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
