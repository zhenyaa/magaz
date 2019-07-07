from escpos import printer
# xprinter = printer.File(r"/dev/usb/lp0")

def printVoucher(data):
    xprinter = printer.File(r"/dev/usb/lp0")
    xprinter.charcode("CIRILLIC2")


    xprinter.set(
        align="center",
        font='b',
        width=1,
        height=1

    )
    xprinter.text("ЧЕК № 1\n")
    xprinter.control("VT", 1)

    print("its data in print voucher", data)
    for good in data['listOfProduct']:
        xprinter.set(align='LEFT')
        xprinter.text(good.get('name'))
        xprinter.text('    ')
        xprinter.text(str(good.get('price_sell_sum')))
        xprinter._raw(b'\x0a')
        print(good)
    xprinter.set(width=2, height=2)
    xprinter.text(u"Сумма")
    xprinter.text(str(data.get('priceSum')))
    xprinter.set(width=1, height=1)
    xprinter.text(u"\n")
    xprinter.text(u"НАЛИЧНЫЕ\t")
    xprinter.text(data.get('customerSum'))
    xprinter.text(u"\n")
    xprinter.set(text_type='B', width=2)
    xprinter.text(u'СДАЧА\t')
    xprinter.text(str(data.get('customerChange')))
    xprinter.text(u"\n")
    xprinter.set(align='LEFT')
    xprinter.text(u'лево')
    xprinter.flush()
    xprinter.set(align='RIGHT')
    xprinter.text(u'право')



    xprinter.cut()
