from flask_restful import Resource, marshal_with, fields, marshal, reqparse
from app import db
from app.mod_incomin.model import Incoming
from app.mod_docIncomin.model import DocIncomin
from app.mod_goods.model import Goods
from app.mod_goods.addFunc import getNameFromBarcodeApi, getNameFromBarcodeGrab
from flask import jsonify, request


parser = reqparse.RequestParser()
parser.add_argument('test', type=str, location='json')

class mod_incomin(Resource):
    """Its class for get goods."""

    def get(self, id_pearent=None):
        """Methods get for good with param good_id.test."""
        if not id_pearent:
            print("pass")
        else:
            header = ('name', 'barcode', 'delimeter','incId', '_cost_price', 'quantity')
            resp = db.session.query(Goods.name, Goods.barcode, Goods.delimeter,Incoming.id, Incoming._cost_price, Incoming.quantity).join(Incoming).filter(Incoming.parent_id == id_pearent).all()
            return {'incomin': list(dict(zip(header, x))for x in resp)}
        pass
    def post(self):
        #good_id, _purchase_cost, _cost_price, _persent, quantity
        args = request.get_json(force=True)
        newincRow = args['test'][0]
        print(newincRow)
        good = Goods.get(newincRow.get('id'))
        print(good)
        good.delimeter = newincRow.get('delimeter')
        perent = DocIncomin.query.get(int(newincRow['_perent']))
        new = Incoming(newincRow['id'],newincRow['_purchase_cost'],newincRow['_cost_price'], newincRow['_persent'], newincRow['quantyty'], newincRow.get('_fractional_number', 0) )
        perent.children.append(new)
        db.session.add(new)
        perent.recalc()
        # db.session.flush()
        db.session.commit()

        resp = db.session.query(Goods.name, Goods.barcode, Goods.delimeter,Incoming.id, Incoming._cost_price, Incoming.quantity).join(Incoming).filter(Incoming.id == new.id).all()
        print(resp)
        header = ('name', 'barcode', 'delimeter', 'incId', '_cost_price', 'quantity')
        return {'incomin': list(dict(zip(header, x)) for x in resp)}
        print(new)

    def put(self):
        pass

    # def delete(self, id_pearent=None):
    #
    #     args = request.get_json(force=True)
    #     print(args)
    #     return 'ok', 200

    def delete(self, id_pearent):

        c = Incoming.get(id_pearent)
        per = DocIncomin.get(c.parent_id)
        c.delete()
        if isinstance(per, DocIncomin):
            per.recalc()
        return '', 204

    def patch(self, id_pearent=None):
        print(request.get_json(force=True))
        data = request.get_json(force=True)['params']['elem']
        incElem = Incoming.get(id_pearent)
        print(incElem)
        print(data)

        incElem._cost_price = data['_cost_price']
        incElem.quantity = data['quantyty']
        incElem._fractional_number = data['_fractional_number']
        db.session.commit()
        return '', 200

