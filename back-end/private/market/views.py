import json
import datetime
import time

from django.http import JsonResponse
from django.db import connections

from .forms import CreateProductsForm, CreateTransactionForm, CreateOrder, OrderForm, TransactionsForm, ProductsForm
from .models import Product, AssetValue, Asset, Transaction, Order
from .serializers import productData, orderData, transactionData


def update_stock(detailID, stock):
    with connections['public_db'].cursor() as cursor:
        # Example SQL query to update a table
        cursor.execute("""
            UPDATE market_detail
            SET stock = %s
            WHERE id = %s
        """, [stock, detailID])


def products(request):
    data = {"code": "404"}
    method = request.method

    if method == "GET":

        data = {
            "code": "400",

        }
        form = ProductsForm(request.GET)
        if not form.is_valid():
            return JsonResponse(data)

        offset = request.GET.get("offset") or 0
        offset = int(offset)
        limit = 200 if form.cleaned_data.get("detailID__in") else 100

        data = {
            "code": "200",
            "data": []

        }
        products = Product.objects.filter(
            **form.cleaned_data)[offset:offset + limit]
        if products:
            for product in products:
                data["data"].append(
                    productData(product)
                )
    elif method == "POST":

        data = {
            "code": "400"
        }

        form_data = json.loads(request.body)
        form = CreateProductsForm(form_data)
        if not form.is_valid():
            print(form.errors)
            return JsonResponse(data)

        assetID = form.cleaned_data.get("assetID") or None
        detailID = form.cleaned_data.get("detailID")
        creatorID = form.cleaned_data.get("creatorID")
        amount = form.cleaned_data.get("amount")
        descriptions = form.cleaned_data.get("descriptions")
        tradeableAt = form.cleaned_data.get(
            "tradeableAt") or datetime.date.today()
        deliveryMethod = form.cleaned_data.get("deliveryMethod")
        assetName = form.cleaned_data.get("assetName")

        asset = Asset.objects.get(name=assetName)
        creatorShare = AssetValue.objects.create(amount=amount, asset=asset)

        createdProduct = Product.objects.create(assetID=assetID, detailID=detailID, creatorID=creatorID,
                                                creatorShare=creatorShare, descriptions=descriptions, tradeableAt=tradeableAt, deliveryMethod=deliveryMethod ,isUnique=form.cleaned_data.get("isUnique"))
        update_stock(detailID,  Product.objects.filter(
            detailID=detailID, status=2).count())
        data = {
            "code": "200",
            "data": productData(createdProduct)
        }

    return JsonResponse(data)


def transactions(request):
    data = {}
    method = request.method

    if method == "GET":

        data = {
            "code": "400",

        }
        form = TransactionsForm(request.GET)
        if not form.is_valid():
            return JsonResponse()

        data = {
            "code": "200",
            "data": []
        }

        offset = request.GET.get("offset") or 0
        offset = int(offset)

        transactions = Transaction.objects.filter(
            **form.cleaned_data)[offset:offset + 100]
        if transactions:
            for transaction in transactions:
                data["data"].append(
                    transactionData(transaction)
                )

    elif method == "POST":

        form_data = json.loads(request.body)
        form = CreateTransactionForm(form_data)
        data = {
            "code": "400"
        }
        if not form.is_valid():
            return JsonResponse(data)

        assetName = form.cleaned_data.get("assetName")
        uniqueID = form.cleaned_data.get("uniqueID")
        userID = form.cleaned_data.get("userID")
        amount = form.cleaned_data.get("amount")

        existedTransaction = Transaction.objects.filter(uniqueID=uniqueID)

        if not existedTransaction:
            asset = Asset.objects.get(name=assetName)
            assetValue = AssetValue.objects.create(amount=amount, asset=asset)
            transaction = Transaction.objects.create(
                assetValue=assetValue, userID=userID, uniqueID=uniqueID)[0]
        else:
            transaction = existedTransaction[0]

        data = {
            "code": "200",
            "data": transactionData(transaction)
        }

    return JsonResponse(data)


def orders(request):
    data = {}
    method = request.method

    if method == "GET":

        data = {
            "code": "400",

        }
        form = OrderForm(request.GET)
        if not form.is_valid():
            return JsonResponse()

        offset = request.GET.get("offset") or 0
        offset = int(offset)

        data = {
            "code": "200",
            "data": []
        }
        orders = Order.objects.filter(**form.cleaned_data)[offset:offset + 100]
        if orders:
            for order in orders:
                data["data"].append(
                    orderData(order)
                )

    elif method == "POST":

        form_data = json.loads(request.body)
        form = CreateOrder(form_data)
        data = {
            "code": "400"
        }
        if not form.is_valid():
            return JsonResponse(data)

        assetName = form.cleaned_data.get("assetName")
        amount = form.cleaned_data.get("amount")
        productID = form.cleaned_data.get("productID")
        userID = form.cleaned_data.get("initiatorID")

        product = Product.objects.filter(
            id=productID, status=2).prefetch_related("creatorShare")
        if not product:
            return JsonResponse({"code": "4001"})
        product = product[0]

        userCredit = Transaction.getCredit(userID, assetName)
        if userCredit < amount:
            return JsonResponse({"code": "4002"})

        price = product.price()[assetName]
        if userCredit < price:
            return JsonResponse({"code": "4003"})

        assetValue = AssetValue.objects.create(
            asset=Asset.objects.get(name=assetName), amount=(abs(price) * -1))

        uniqueID = "ORDER " + str(int(time.time()))
        initialTransaction = Transaction.objects.create(
            assetValue=assetValue, userID=userID, uniqueID=uniqueID)

        product.status = 2
        product.save()

        order = Order.objects.create(
            initiatorID=userID,  product=product, initialTransaction=initialTransaction)
        data = {
            "code": "200",
            "data": orderData(order)
        }
    return JsonResponse(data)


def order(request, orderID):
    data = {}
    method = request.method

    if method == "GET":

        data = {
            "code": "400",

        }
        form = OrderForm(request.GET)
        if not form.is_valid():
            return JsonResponse(data)

        order = Order.objects.get(id=orderID, **form.cleaned_data)
        data = {
            "code": "200",
            "data": orderData(order)
        }

    return JsonResponse(data)
