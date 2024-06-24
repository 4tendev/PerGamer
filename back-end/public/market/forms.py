from django import forms


class ProductsForm(forms.Form):
    tags = forms.JSONField(required=False)
    contains = forms.CharField(min_length=3, max_length=50, required=False)
    appid = forms.IntegerField(required=False)
    offset = forms.IntegerField(required=False)
