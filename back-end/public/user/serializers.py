from .models import User

unKnownUserData = {
    "isKnown": False,
}


def userData(user: User):
    return {
        "isKnown": True,
        "canSell": user.canSell,
        "email": user.email[:2] + '***' + user.email[-3:] if user.email else None,
        "mobile": user.mobile[:2] + '***' + user.mobile[-3:] if user.mobile else None,
        "kycLevel": user.kycLevel,
        "id64": user.id64,
        "tradeURL": user.tradeURL,
        "steamAPIKey": user.steamAPIKey,
    } if user.is_authenticated else unKnownUserData
