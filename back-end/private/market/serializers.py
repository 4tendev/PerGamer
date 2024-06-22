from .models import Product , Transaction,Order,Asset,AssetValue



def productData(product: Product):
    return {
        "id": product.id,
        "assetID": product.assetID,
        "creatorID": product.creatorID,
        "amount": product.creatorShare.amount,
        "asset": product.creatorShare.asset.name,
        "descriptions": product.descriptions,
        "tradeableAt": product.tradeableAt,
        "deliveryMethod": product.deliveryMethod

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
