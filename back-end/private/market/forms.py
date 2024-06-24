from django import forms
from .models import Asset, Product

assetNameField = forms.ChoiceField(
    choices=Asset.acceptAbleAssets, required=True)
amountField = forms.FloatField(required=True, min_value=0.000001)
idField = forms.IntegerField(min_value=1, required=True)




class CreateProductsForm(forms.Form):
    assetID = forms.CharField(max_length=50, required=False)
    detailID = idField
    creatorID = idField
    amount = amountField
    assetName = assetNameField
    descriptions = forms.JSONField()
    tradeableAt = forms.DateField(required=False)
    deliveryMethod = forms.ChoiceField(
        choices=Product.deliveryMethods, required=True)



class CreateTransactionForm(forms.Form):
    assetName = assetNameField
    amount = amountField
    userID = idField
    uniqueID = forms.CharField(max_length=255, required=True)


class CreateOrder(forms.Form):
    initiatorID = idField
    productID = idField
    assetName = assetNameField
    amount = amountField


class OrderForm(forms.Form):
    initiatorID = forms.IntegerField(required=False)
    product__creatorID = forms.IntegerField(required=False)

    def clean(self):
        cleaned_data = super().clean()
        cleaned_data = {key: value for key,
                        value in cleaned_data.items() if value }
        return cleaned_data


class OrdersForm(forms.Form):
    initiatorID = forms.IntegerField(required=False)
    product__creatorID = forms.IntegerField(required=False)

    def clean(self):
        cleaned_data = super().clean()
        cleaned_data = {key: value for key,
                        value in cleaned_data.items() if value }
        return cleaned_data


class TransactionsForm(forms.Form):
    userID = forms.IntegerField(required=False)

    def clean(self):
        cleaned_data = super().clean()
        cleaned_data = {key: value for key,
                        value in cleaned_data.items() if value }
        return cleaned_data

class ProductsForm(forms.Form):
    creatorID = forms.IntegerField(required=False)
    deliveryMethod = forms.IntegerField(required=False)
    tradeableAt = forms.DateField( required=False)
    status = forms.ChoiceField( choices=Product.stats, required=False)
    detailID__in= forms.JSONField(required=False)

    def clean(self):
        cleaned_data = super().clean()
        cleaned_data = {key: value for key,
                        value in cleaned_data.items() if value }
        return cleaned_data    
