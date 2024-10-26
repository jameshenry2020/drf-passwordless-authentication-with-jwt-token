import requests
from drfpasswordless.settings import api_settings
from django.conf import settings as django_setting
from rest_framework_simplejwt.tokens import RefreshToken
import http.client
import mimetypes
from codecs import encode









def send_sms_with_callback_token(user, mobile_token, **kwargs):
    
    conn = http.client.HTTPSConnection("my.kudisms.net")
    base_string = kwargs.get('mobile_message', api_settings.PASSWORDLESS_MOBILE_MESSAGE)
    try:
        to_number = getattr(user, api_settings.PASSWORDLESS_USER_MOBILE_FIELD_NAME)
        dataList = []
        boundary = 'wL36Yn8afVp8Ag7AmP8qZ0SA4n1v9T'
        dataList.append(encode('--' + boundary))
        dataList.append(encode('Content-Disposition: form-data; name=token;'))

        dataList.append(encode('Content-Type: {}'.format('text/plain')))
        dataList.append(encode(''))

        dataList.append(encode(django_setting.SMS_API_KEY))
        dataList.append(encode('--' + boundary))
        dataList.append(encode('Content-Disposition: form-data; name=senderID;'))

        dataList.append(encode('Content-Type: {}'.format('text/plain')))
        dataList.append(encode(''))

        dataList.append(encode(django_setting.SENDER_ID))
        dataList.append(encode('--' + boundary))
        dataList.append(encode('Content-Disposition: form-data; name=recipients;'))

        dataList.append(encode('Content-Type: {}'.format('text/plain')))
        dataList.append(encode(''))

        dataList.append(encode(str(to_number)))
        dataList.append(encode('--' + boundary))
        dataList.append(encode('Content-Disposition: form-data; name=message;'))

        dataList.append(encode('Content-Type: {}'.format('text/plain')))
        dataList.append(encode(''))

        dataList.append(encode(base_string % mobile_token.key))
        dataList.append(encode('--'+boundary+'--'))
        dataList.append(encode(''))
        body = b'\r\n'.join(dataList)
        payload = body
        headers = {
        'Content-type': 'multipart/form-data; boundary={}'.format(boundary) 
        }
        conn.request("POST", "/api/corporate", payload, headers)
        res = conn.getresponse()
        data = res.read()
        print(data.decode("utf-8"))
        return True
    except KeyError:
        raise ValueError("Couldn't send SMS.")
    

def create_authentication_token(user):
    """ Default way to create an authentication token"""
    new_user=None
    refresh = RefreshToken.for_user(user)
    if user.profile.completed:
        new_user=False
    else:
        new_user=True

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
        'new_account':new_user
    }
