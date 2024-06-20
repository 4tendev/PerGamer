from django import forms


CodeField = forms.CharField(required=False , min_length=6 , max_length=6)
mobileCodeField = forms.CharField(required=False)
trustedDeviceField = forms.BooleanField(required=False)
emailField = forms.EmailField(required=True)
passwordField = forms.CharField(max_length=100, min_length=8, required=True)


emailOrMobileField=forms.CharField( max_length=50, required=True)

class LoginForm(forms.Form):
    emailOrMobile = emailOrMobileField
    password = passwordField
    emailOrMobileCode = CodeField
    trustedDevice = trustedDeviceField   


class RegisterForm(forms.Form):
    password = passwordField
    email = emailField
    emailCode = CodeField
    trustedDevice = trustedDeviceField


class ResetPasswordForm(forms.Form):
    email = emailField
    newPassword = forms.CharField(max_length=100, min_length=8, required=False)
    emailCode = CodeField


class ChangePasswordForm(forms.Form):
    password = passwordField
    newPassword = forms.CharField(max_length=100, min_length=8, required=False)


