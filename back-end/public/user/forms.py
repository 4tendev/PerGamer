from django import forms


emailCodeField = forms.CharField(required=False)
mobileCodeField = forms.CharField(required=False)
trustedDeviceField = forms.BooleanField(required=False)
emailField = forms.EmailField(required=True)
passwordField = forms.CharField(max_length=100, min_length=8, required=True)


emailOrMobileField=forms.CharField( max_length=50, required=True)

class LoginForm(forms.Form):
    emailOrMobile = emailOrMobileField
    password = passwordField
    emailCode = emailCodeField
    mobileCode = mobileCodeField
    trustedDevice = trustedDeviceField   


class RegisterForm(forms.Form):
    password = passwordField
    email = emailField
    emailCode = emailCodeField
    trustedDevice = trustedDeviceField


class ResetPasswordForm(forms.Form):
    email = emailField
    newPassword = forms.CharField(max_length=100, min_length=8, required=False)
    emailCode = emailCodeField


class ChangePasswordForm(forms.Form):
    password = passwordField
    newPassword = forms.CharField(max_length=100, min_length=8, required=False)


