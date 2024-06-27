from django import forms
from datetime import datetime, timedelta

CodeField = forms.CharField(required=False, min_length=6, max_length=6)
mobileCodeField = forms.CharField(required=False)
trustedDeviceField = forms.BooleanField(required=False)
emailField = forms.EmailField(required=True)
passwordField = forms.CharField(max_length=100, min_length=8, required=True)


emailOrMobileField = forms.CharField(max_length=50, required=True)


class LoginForm(forms.Form):
    emailOrMobile = emailOrMobileField
    password = passwordField
    emailOrMobileCode = CodeField
    trustedDevice = trustedDeviceField


class RegisterForm(forms.Form):
    password = passwordField
    email = emailField
    emailOrMobileCode = CodeField
    trustedDevice = trustedDeviceField


class ResetPasswordForm(forms.Form):
    emailOrMobile = emailOrMobileField
    newPassword = forms.CharField(max_length=100, min_length=8, required=False)
    emailOrMobileCode = CodeField


class ChangePasswordForm(forms.Form):
    password = passwordField
    newPassword = forms.CharField(max_length=100, min_length=8, required=False)


amountField = forms.FloatField(required=True, min_value=0.01)
idField = forms.IntegerField(min_value=1, required=True)
assetNameField = forms.ChoiceField(
    choices=[
        ("SATOSHI", "SATOSHI"),
        ("USDT", "USDT"),
        ("TOMAN", "TOMAN")
    ], required=True)


class ProductForm(forms.Form):
    assetID = forms.CharField(max_length=50, required=False)
    detailID = idField
    amount = amountField
    assetName = assetNameField
    descriptions = forms.JSONField(required=False)
    dayLeftToSend = forms.IntegerField(min_value=0, required=True)
    deliveryMethod = forms.ChoiceField(
        choices=[
            (1, "Trade"),
            (2, "Gift"),
        ], required=True)

    def clean(self):
        cleaned_data = super().clean()
        current_date = datetime.now()
        if cleaned_data.get('dayLeftToSend') is not None:
            tradeableAt = current_date + \
                timedelta(days=cleaned_data.get("dayLeftToSend"))
            cleaned_data["tradeableAt"] = tradeableAt.date().isoformat()
        return cleaned_data
