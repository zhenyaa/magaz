from flask_restful import Resource, marshal_with, fields, marshal
from app import db
from sqlalchemy import or_
from app.mod_goods.model import Goods
from app.mod_stock.model import Stock
from app.mod_incomin.model import Incoming

from flask import jsonify, request


class mod_stock(Resource):
    """Its class for get goods."""

    def get(self, id=None):
        """Methods get for good with param good_id.test."""
        shablon = ('goodName', 'goodBarcode', 'incID', 'qInt', 'qNum', 'qDiv', 'qFloat', 'qSumm')
        args = request.args
        # print(args)
        testShablon = []
        resp = db.session.query(Goods.name, Goods.barcode,Stock.ID_PARCEL, Stock.quant_int, Stock.quant_num, Stock.quant_div, Stock.quant_float, Stock.price_sell_sum)\
            .join(Stock)\
            .filter(Stock.block_level == 0)
        if args.get('barcode') != "null":
            # print('in if ', args.get('barcode'))
            resp = resp.filter(or_(Goods.name.ilike("%"+ (args.get('barcode')) +"%"), Goods.barcode == (args.get('barcode')), Stock.ID_PARCEL == (args.get('barcode'))) )
            # resp = resp.filter(Goods.barcode == (args.get('barcode')))

        # print(resp.all())
        for x in resp.column_descriptions:
            # print(x)
            testShablon.append(x.get('name'))
        r = list(dict(zip(testShablon, x))for x in resp.all())
        for c in r:
             pass
            # print(c)
        return jsonify(r)

    def post(self):
        pass

    def put(self):
        args = request.get_json(force=True)
        print(args)
        c = Goods.get(args.get('id'))
        c.name = args.get('name')
        c.barcode= args.get('barcode')
        db.session.commit()
        return 'ok', 200

    def delete(self):
        pass