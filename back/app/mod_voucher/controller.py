from flask_restful import Resource, marshal_with, fields, marshal
from app import db
from sqlalchemy import or_
from app.mod_goods.model import Goods
from app.mod_stock.model import Stock
from app.mod_incomin.model import Incoming
from app.mod_voucher.model import Voucher
from app.mod_voucher_elem.model import VoucherElement
from flask import jsonify, request
from app.mod_voucher.printer_voucher import printVoucher
import datetime


class mod_voucher(Resource):
    """Its class for Voucher."""

    def get(self, id=None):
        """Methods get for voucher."""
        date1 = datetime.datetime.strptime(request.args.get("getStartDate"), "%a %b %d %Y").date()
        date2 = datetime.datetime.strptime(request.args.get("getEndDate"), "%a %b %d %Y").date()
        print(date1, date2)
        req = db.session.query(Voucher.id,Voucher.name_voucher, Voucher.quant_velem, Voucher.amount_price_sum, Voucher.amount_customer_sum, Voucher.amount_customer_change, Voucher.type_pay, Voucher.created_at)
        req = req.filter(Voucher.created_at.between(date1, date2))
        name = list(name.get('name') for name in req.column_descriptions)
        print(name)
        resp = list(dict(zip(name, x)) for x in req.all())
        print(resp)
        return jsonify(resp)



    def post(self):
        args1 = request.get_json(force=True)
        args = args1.get('data')
        listOfItem = args['listOfProduct']
        userListOfobject = []
        newVoucher = Voucher(args.get('customerSum'), args.get('priceSum'), args.get('customerChange'),args.get('typeOfPay'))
        db.session.add(newVoucher)
        for elem in listOfItem:
            Inc = Incoming.get(elem.get('ID_PARCEL'))#: Incoming
            stock_elem = Stock.get_by_ID_PARCEL(elem.get('ID_PARCEL'))#: Stock
            stock_elem.quant_update(elem['newQuant'].get('qant_int'), elem['newQuant'].get('quant_div'))
            newVoucherElement = VoucherElement(elem.get('price_sell_sum'), elem['newSum'].get('newSumFloat'), elem['newQuant'].get('qant_int'), elem['newQuant'].get('quant_div'), elem.get('quant_div'))
            userListOfobject.append(newVoucherElement)
            Inc.VOUCHER_ELEM.append(newVoucherElement)
            newVoucher.VOUCHER_ELEM.append(newVoucherElement)
            db.session.add(newVoucherElement)
        newVoucher.getQuantChild()# calc quant children
        # printVoucher(args)
        db.session.commit()
        return "OK" , 200

    def put(self):
        args = request.get_json(force=True)
        print(args)

    def delete(self):
        pass