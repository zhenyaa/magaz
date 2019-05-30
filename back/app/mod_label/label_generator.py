from reportlab.graphics.barcode import code128
from reportlab.lib.units import mm
from reportlab.pdfgen import canvas
from reportlab.pdfbase import ttfonts
from reportlab.pdfbase import pdfmetrics
import re


def GenLabel(data):
    MyFontObject = ttfonts.TTFont('Arial', 'Arial.ttf')
    pdfmetrics.registerFont(MyFontObject)
    pdfmetrics.registerFont(ttfonts.TTFont('Arial-Bold', 'arialbd.ttf'))
    c = canvas.Canvas("testLabel1.pdf")
    c.setPageSize((30*mm, 20*mm))
    print(data)
    for row in data:
        for label in range(int(row['QUANT_LABEL'])):
            startForCost = (30 - (len(str(row.get('_cost_price')))))/2
            c.setFont('Arial', 7)
            c.drawString(0,17*mm, row['name'])
            c.drawString(startForCost, 14 * mm, str(row['_cost_price']))
            barcode = code128.Code128(row['incId'], barHeight=8*mm,barWidth = 1.2)
            barcode.drawOn(c, -3 * mm, 4 * mm)
            c.drawString(35, 1 * mm, str(row['incId']))
            c.showPage()
    # barcode = code128.Code128("123456789")
    # barcode.drawOn(c, 2*mm, 20*mm)
    # c.showPage()
    # return c
    c.save()
    return True

class LabelGenerator:

    def __init__(self, data, sizePW = 30, sizePH = 20):
        self.data = data
        self.sizePW = sizePW
        self.sizePH = sizePH
        self.page = self.gen_page(sizePW, sizePH)
        self.writeToPage(self.page, self.data)

    def save(self):
        self.page.save()
        return True

    def gen_page(self, sizePW, sizePH):
        MyFontObject = ttfonts.TTFont('Arial', 'Arial.ttf')
        pdfmetrics.registerFont(MyFontObject)
        pdfmetrics.registerFont(ttfonts.TTFont('Arial-Bold', 'arialbd.ttf'))
        page = canvas.Canvas("testLabel1.pdf")
        page.setPageSize((sizePW * mm, sizePH * mm))
        return page

    def writeToPage(self, page, data):
        for labelObj in data:
            for label in range(int(labelObj['QUANT_LABEL'])):
                page.setFont('Arial', 8)
                page.drawString(1, 16 * mm, labelObj['name'])
                page.setFont('Arial-Bold', 9)
                page.drawString(self.calcStartPosition(labelObj) * mm,
                                11 * mm,
                                self.formatCost(labelObj['_cost_price']))

                page.setFont('Arial', 8)
                barcode = code128.Code128(labelObj['incId'], barHeight=5 * mm, barWidth=1.2)
                barcode.drawOn(page, -3 * mm, 4 * mm)
                page.drawString(35, 1 * mm, str(labelObj['incId']))
                page.showPage()


    def calcStartPosition(self, obj):
        sPos = self.sizePW - len(self.formatCost(obj['_cost_price']))
        return sPos/2

    def formatCost(self, cost):
        outCost = str(cost)
        if not re.findall(r'[.,]\d+', outCost):
            outCost = outCost + ',00'
        if not re.findall(r'[.,]\d{2}', outCost):
            outCost = outCost + "0"
        outCost = re.sub(r'\.', ",", outCost)

        return str(outCost)







