from flask_restful import Resource, marshal_with, fields, marshal
from app import db
from app.mod_goods.model import Goods
from app.mod_docIncomin.model import DocIncomin
from app.mod_incomin.model import Incoming
from app.mod_stock.model import Stock
from app.mod_voucher_elem.model import VoucherElement

from flask import jsonify, request
from sqlalchemy import func, or_

class mod_balance(Resource):
    """Its class for get balance."""

    def get(self, id=None):
        barcode = request.args.get("bbarcode")
        parcel = request.args.get('bparcel')
        quant = request.args.get('bqunt')
        print(barcode,parcel,quant)
        resp = db.session.query(
                                Stock.ID_PARCEL,
                                Stock.price_sell_sum,
                                Stock.quant_int,
                                Goods.name,
                                Goods.barcode,
                                DocIncomin.DOC_NAME,
                                DocIncomin.date,
                                ).join(Goods).join(DocIncomin).join(Incoming).filter(Stock.quant_int < quant).group_by(Stock.ID_PARCEL)
        if (barcode != 'null') and (barcode != ''):
            print('in if statmant barcode', barcode)
            resp = resp.filter(Goods.barcode == barcode)
        if (parcel != 'null') and (parcel != ''):
            print('in if statmant parcel', parcel)
            resp = resp.filter(Stock.ID_PARCEL == parcel)

        name = list(name.get('name') for name in resp.column_descriptions)
        resp2 = list(dict(zip(name, x)) for x in resp.all())
        return jsonify(resp2)
    def post(self):
        pass

    def put(self):
        pass

    def delete(self):
        pass


