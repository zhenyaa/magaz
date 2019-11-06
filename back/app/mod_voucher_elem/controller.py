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


class mod_voucher_elem(Resource):
    """Its class for Voucher."""

    def get(self, id=None):
        """Methods get for voucher."""
        res = db.session.query(VoucherElement.ID_PARCEL,
                               VoucherElement.ID_VOUCHER,
                               VoucherElement.PRICE_SELL_COST,
                               VoucherElement.PRICE_SELL_SUM,
                               VoucherElement.QUANT_INT,
                               VoucherElement.QUANT_NUM,
                               VoucherElement.QUANT_DIV,
                               VoucherElement.created_at,
                               Goods.name,
                               Goods.barcode).join(Incoming, VoucherElement.PARCEL_PERENT).join(Goods)
        if id:
            res = res.filter(VoucherElement.ID_VOUCHER == id)
        name = list(name.get('name') for name in res.column_descriptions)
        resp = list(dict(zip(name, x)) for x in res.all())
        return jsonify(resp)


    def post(self):
        pass

    def put(self):
        pass
    def delete(self):
        pass