import certifi
import pycurl
import json

try:
    from io import BytesIO
except ImportError:
    from StringIO import StringIO as BytesIO


def getNameFromBarcodeApi(barcode=""):
    url = "https://barcodes.olegon.ru/api/card/name/"
    ID = "/B800400832567064278077480108110"
    #barcode= "4791045003380"
    # print(barcode)
    buffer = BytesIO()
    c = pycurl.Curl()
    c.setopt(pycurl.CAINFO, certifi.where())
    c.setopt(c.URL, url + barcode + ID)
    c.setopt(c.WRITEDATA, buffer)
    c.perform()
    c.close()
    body = buffer.getvalue()
    # print("this pered decodir ",body)
    body2 = body.decode('utf-8')
    print(type(body2))
    return json.loads(body2)

def getNameFromBarcodeGrab(barcode=""):
    from grab import Grab
    g = Grab(log_file='out.html')
    g.go('https://barcode-list.ru/')
    g.set_input_by_id("barcodeSearchField", barcode)
    g.submit()
    if g.doc.text_search(u'Наши пользователи определили следующие наименования для данного штрих'):
        l = list()
        header = ("no", "barcode", "name", "qname", "raght")
        for text in g.doc.select('..//table[contains(@class, "randomBarcodes")]/tr'):
            varlist = list()
            for word in text.select('..//td'):
                varlist.append(word.text())
            l.append(dict(zip(header, varlist)))
        return l
    else:
        # print("not found in grab")
        return [{'status': 404}]