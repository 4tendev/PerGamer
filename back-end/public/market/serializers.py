from .models import Detail ,Tag

def tagData(tag: Tag):
    return tag.value
    


def detailData(detail: Detail):
    return {

        "id": detail.id,
        "img": detail.imageLink(),
        "title": detail.title,
        "tags" : [ tagData(tag) for tag in detail.tags.all()  ]
    }

