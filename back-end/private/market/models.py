from django.db import models
from django.core.exceptions import BadRequest

import datetime


class Asset(models.Model):
    acceptAbleAssets = [
        ("SATOSHI", "SATOSHI"),
        ("USDT", "USDT"),
        ("TOMAN", "TOMAN")
    ]
    name = models.CharField(
        max_length=7, choices=acceptAbleAssets, unique=True)
    decimal =models.IntegerField(default=0)

    def __str__(self):
        return self.name

    def rate(self, convertingAsset):
        if self.name == convertingAsset.name:
            return 1

        rates = {
            ("BTC", "USDT"): 63_000,
            ("USDT", "BTC"): 1 / 63_000,
            ("BTC", "TOMAN"): 4_000_000_000,
            ("TOMAN", "BTC"): 1 / 4_000_000_000,
            ("USDT", "TOMAN"): 60_000_000,
            ("TOMAN", "USDT"): 1 / 60_000_000,
        }

        rate = rates.get((self.name, convertingAsset.name))
        if rate is None:
            raise BadRequest("NOT SUPPORTED ASSET")

        return rate


class AssetValue(models.Model):
    amount = models.FloatField()
    asset = models.ForeignKey(Asset,  on_delete=models.PROTECT)

    def __str__(self):
        return str(self.amount) + " " + str(self.asset)


class Product(models.Model):

    stats = [
        (1, "Draft"),
        (2, "In Sale"),
        (3, "Processing"),
        (4, "Sold"),
    ]

    deliveryMethods = [
        (1, "Trade"),
        (2, "Gift"),
    ]

    assetID = models.CharField( max_length=50)
    detailID = models.IntegerField()
    creatorID = models.BigIntegerField()
    status = models.IntegerField(choices=stats, default=2)
    creatorShare = models.ForeignKey(AssetValue,  on_delete=models.PROTECT)
    descriptions = models.JSONField(null=True)
    deliveryMethod = models.IntegerField(choices=deliveryMethods)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    tradeableAt = models.DateTimeField(default=datetime.date.today)
    isUnique=models.BooleanField(default=True)

    def __str__(self):
        return str(self.creatorID) + " "+str(self.creatorShare) + " " + str(self.detailID)

    def price(self):
        price = {}
        for asset in Asset.objects.all():
            price[asset.name] = self.creatorShare.amount * \
                self.creatorShare.asset.rate(asset) * 1.05 * \
                (1.1 if asset.name == "TOMAN" else 1)
        return price


class Transaction(models.Model):
    assetValue = models.ForeignKey(AssetValue,  on_delete=models.PROTECT)
    userID = models.BigIntegerField()
    uniqueID = models.CharField(unique=True, max_length=255)

    def __str__(self) -> str:
        return str(self.assetValue) + " " + self.uniqueID

    def getCredit(userID: int, assetName: str):
        credit = 0.00
        transactions = Transaction.objects.filter(
            assetValue__asset__name=assetName, userID=userID).prefetch_related("assetValue")
        if transactions:
            for transaction in transactions:
                credit += transaction.assetValue.amount
        return credit


class Order (models.Model):
    stats = [
        (1, "Processing"),
        (2, "Done"),
        (3, "Canceled")
    ]
    initiatorID = models.BigIntegerField()
    initiatorRecieved = models.BooleanField(null=True, blank=True)
    sellerSent = models.BooleanField(null=True, blank=True)
    sellerDeliverAt = models.DateField(null=True, blank=True)
    status = models.IntegerField(choices=stats, default=1)
    product = models.ForeignKey(
        Product,null=False,  on_delete=models.PROTECT)
    initialTransaction = models.OneToOneField(
        Transaction,  null=False, related_name=("initiatedOrder"), on_delete=models.PROTECT)
    finalTransaction = models.OneToOneField(Transaction, null=True, related_name=(
        "finalizedOrder"), on_delete=models.PROTECT)
