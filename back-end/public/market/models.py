from django.db import models

acceptedPlatforms=[
        (570,"DOTA2"),
        (730,"CS2"),
        (440,"TF2")
    ]


class Tag(models.Model):
    importantTagName=["Hero","Rarity","Exterior","Weapon"]
    importantTagValue=["Bundle","Courier"]
    name=models.CharField( max_length=100)
    value=models.CharField( max_length=100)
    appid=models.IntegerField(choices=acceptedPlatforms )
    importantNumber=models.IntegerField(default=1)
    def __str__(self):
        return self.name + " "+self.value
    
    def save(self, *args, **kwargs):
        if  self.value in Tag.importantTagValue :
            self.importantNumber =3
        elif self.name in Tag.importantTagName:
            self.importantNumber =2
        super(Tag, self).save(*args, **kwargs)

class Detail(models.Model):

    title =models.CharField( max_length=100)
    tags = models.ManyToManyField(Tag,blank=True,related_name="Details")
    imageName =models.CharField( max_length=100)
    imageURL=models.TextField(null=False ,blank=False)
    imageBigURL=models.TextField(null=False ,blank=False)
    stock=models.IntegerField(default=0)
    appid=models.IntegerField(choices=acceptedPlatforms ,default=570)
    uploaded=models.BooleanField(default=False)
    importantLevel=models.IntegerField(default=1)

    def imageLink (self,Big=False):
        if self.uploaded :
            return "https://pergamermedia.pergamer.com/ProductImage/" + self.imageName
        elif Big :
            return self.imageBigURL
        else : 
            return self.imageURL
        
    def invetoryLink(self):
        return (str(self.appid)  + "_") +("2" if self.appid != 753 else "6") + "_"
            
    def __str__(self):
        return self.title
    


        
