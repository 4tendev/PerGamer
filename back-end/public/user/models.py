from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin


class CustomUserManager(BaseUserManager):

    def create_user(self,mobileNumber=None, email=None, password=None, **extra_fields):
        if not email and not mobileNumber:
            raise ValueError('The Email or mobile field must be set')
        email = self.normalize_email(email) if email else None
        user = self.model(email=email,mobileNumber=mobileNumber, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None , **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(None ,email, password, **extra_fields)
    
VERIFY_FOR_REGISTER="Registration"

class User(AbstractBaseUser, PermissionsMixin):

    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    canSell=models.BooleanField(default=False)
    email = models.EmailField(unique=True,null=True,blank=True)
    mobile=models.CharField(max_length=11, null=True,blank=True,unique=True)
    kycLevel=models.IntegerField(default=0)
    id64=models.CharField(null=True,max_length=30,blank=True)
    tradeURL=models.URLField(max_length=80,null=True,blank=True)
    steamAPIKey=models.CharField( max_length=80,null=True,blank=True)
    USERNAME_FIELD = 'email'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = []
    objects = CustomUserManager()

    VERIFY_FOR_REGISTER = VERIFY_FOR_REGISTER

    def __str__(self):
        return  self.mobile or self.email 

class KYC(models.Model) : 
    IdNumber=models.CharField( max_length=10,null=True,blank=True)
    rejectionReasson=models.CharField( max_length=50,null=True,blank=True)
    fileName=models.CharField( max_length=30,null=False)
    isAccepted=models.BooleanField(null=True)
    user = models.ForeignKey(User, related_name="KYCs", on_delete=models.PROTECT)

class BankCard (models.Model) :
    cardNumber=models.CharField( max_length=20,unique=True )
    user= models.ForeignKey(User,related_name="BankCards", on_delete=models.PROTECT) 
    isAccepted=models.BooleanField(null=True)   