import redis
from random import randint
from typing import Union


from .kavenegar import *

from django.core.validators import EmailValidator
from django.core.exceptions import ValidationError
from django.core.mail import send_mail

from core.settings import REDIS_URL, EMAIL_HOST_USER, DOMAIN

redis_client = redis.from_url(REDIS_URL, decode_responses=True)


def key_creator(address: str, verify_for: str) -> str:
    return address+","+verify_for


def isEmail(address: str) -> bool:
    validator = EmailValidator()
    try:
        validator(address)
        return True
    except ValidationError:
        return False


def createCode(address: str, verify_for: str) -> Union[None, bool, int]:
    '''
      int for remaing time   ---
      None for creation Error   ---
      False for max tries passed 
      '''
    key = key_creator(address, verify_for)
    if redis_client.exists(key):
        return int(redis_client.ttl(key))
    else:
        CODE_TIME_VALIDITY = 300
        code = str(randint(99999, 999999))
        if isEmail(address):
            try:
                subject = f'Email Verification {DOMAIN} {verify_for}'
                message = f'Here is the code: {code} to verify your access to {address}.'
                from_email = EMAIL_HOST_USER
                recipient_list = [address]
                response = send_mail(
                    subject, message, from_email, recipient_list)
                if response == 1:
                    redis_client.setex(key, CODE_TIME_VALIDITY, code)
                    return CODE_TIME_VALIDITY
                else:
                    return None
            except Exception as e:
                print(e)
                return None
        else:
            try:
                mobileSentKey = key+"SMSSENT"
                sentCount = redis_client.get(mobileSentKey)
                if sentCount and int(sentCount)  > 3:
                    return False
                api = KavenegarAPI()
                params = {
                    'receptor': address,
                    'template': 'verify',
                    'token': code,
                    'type': 'sms',
                }
                response = api.verify_lookup(params)
                if response[0]['status'] == 1 or response[0]['status'] == 4 or response[0]['status'] == 5 or response[0]['status'] == 10:
                    if sentCount:
                        redis_client.incr(mobileSentKey)
                    else:
                        redis_client.setex(mobileSentKey, 60*60*24, 1)
                    redis_client.setex(key, CODE_TIME_VALIDITY, code)
                    return CODE_TIME_VALIDITY
                return None
            except APIException as smserror:
                print(6)
                print(smserror)
                return None
            except HTTPException as smserror:
                print(7)
                print(smserror)
                return None


def checkCode(address, verify_for, code) ->  Union[None, bool]:
    '''
    None for not existing Key ---
    False for wrong code ----
    True passed

    '''
    key = key_creator(address, verify_for)
    answer = redis_client.get(key)
    if not answer:
        return None
    failed_key = key+"FAILED"
    if answer == str(code):
        redis_client.delete(key)
        redis_client.delete(failed_key)
        return True
    failed_try = redis_client.get(failed_key)
    if failed_try:
        redis_client.incr(failed_key)
        if int(failed_try) > 9:
            redis_client.delete(key)
            redis_client.delete(failed_key)
            return None
    else:
        time = redis_client.ttl(key)
        if time:
            redis_client.setex(failed_key, int(time), 1)
    return False
