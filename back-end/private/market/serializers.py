from .models import Product, Transaction, Order, Asset, AssetValue


def productData(product: Product):
    return {
        "id": product.id,
        "assetID": product.assetID,
        "creatorID": product.creatorID,
        "amount": product.creatorShare.amount,
        "asset": product.creatorShare.asset.name,
        "descriptions": product.descriptions or [],
        "tradeableAt": product.tradeableAt,
        "deliveryMethod": product.deliveryMethod,
        "detailID": product.detailID,
        "status":  product.status

    }


def transactionData(transaction: Transaction):
    return {
        "id": transaction.id,
        "amount": transaction.assetValue.amount,
        "asset": transaction.assetValue.asset.name,
        "uniqueID": transaction.uniqueID
    }


def orderData(order: Order):
    return {
        "id": order.id
    }
