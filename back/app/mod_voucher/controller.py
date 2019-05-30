from flask_restful import Resource, marshal_with, fields, marshal
from app import db
from sqlalchemy import or_
from app.mod_goods.model import Goods
from app.mod_stock.model import Stock
from app.mod_incomin.model import Incoming
from app.mod_voucher.model import Voucher
from app.mod_voucher_elem.model import VoucherElement
from flask import jsonify, request


class mod_voucher(Resource):
    """Its class for Voucher."""

    def get(self, id=None):
        """Methods get for voucher."""
        pass
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


        # db.session.bulk_save_objects(userListOfobject)
        db.session.commit()

    def put(self):
        args = request.get_json(force=True)
        print(args)

    def delete(self):
        pass