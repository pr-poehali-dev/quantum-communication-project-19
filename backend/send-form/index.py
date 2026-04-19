import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправляет заявку с сайта на почту lstk.lp@yandex.ru"""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    body = json.loads(event.get('body', '{}'))
    name = body.get('name', '—')
    phone = body.get('phone', '—')
    object_type = body.get('object', '—')
    comment = body.get('comment', '—')

    smtp_password = os.environ.get('SMTP_PASSWORD', '')
    from_email = 'lstk.lp@yandex.ru'
    to_email = 'lstk.lp@yandex.ru'

    html = f"""
    <h2>Новая заявка с сайта ЗМК Стальной Каркас</h2>
    <table style="border-collapse:collapse;width:100%">
      <tr><td style="padding:8px;border:1px solid #ddd;background:#f5f5f5;width:150px"><b>Имя</b></td><td style="padding:8px;border:1px solid #ddd">{name}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;background:#f5f5f5"><b>Телефон</b></td><td style="padding:8px;border:1px solid #ddd">{phone}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;background:#f5f5f5"><b>Тип объекта</b></td><td style="padding:8px;border:1px solid #ddd">{object_type}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;background:#f5f5f5"><b>Комментарий</b></td><td style="padding:8px;border:1px solid #ddd">{comment}</td></tr>
    </table>
    """

    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'Заявка на расчёт от {name}'
    msg['From'] = from_email
    msg['To'] = to_email
    msg.attach(MIMEText(html, 'html'))

    with smtplib.SMTP_SSL('smtp.yandex.ru', 465) as server:
        server.login(from_email, smtp_password)
        server.sendmail(from_email, to_email, msg.as_string())

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'ok': True})
    }
