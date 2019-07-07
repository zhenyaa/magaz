"""its controller for Goods."""
from flask_restful import Resource, marshal_with, fields, marshal
from app import db
from app.mod_goods.model import Goods
from app.mod_goods.addFunc import getNameFromBarcodeApi, getNameFromBarcodeGrab
from app.mod_goods.addFunc import getNameFromBarcodeApi, getNameFromBarcodeGrab
from flask import jsonify, request
from sqlalchemy import func, or_




class mod_good(Resource):
    """Its class for get goods."""

    def get(self, good_id):
        """Methods get for good with param good_id.test."""
        print(good_id)
        shablon = ("id", "barcode", "name", "grup", "delimeter")
        query1 = db.session.query(Goods.id, Goods.barcode, Goods.name, Goods.grup, Goods.delimeter) \
            .filter((Goods.name.ilike("%" + good_id + "%")) | (Goods.barcode == (good_id)) | (Goods.id == (good_id))).all()
            # .filter(or_(Goods.name.ilike(good_id))).all()
            # .filter(or_(Goods.name.like(good_id), Goods.barcode == good_id, Goods.id == good_id)).all()
        if not query1:

            return good_id, 404

        resp = {"good": list(dict(zip(shablon, x))for x in query1)}
        print(resp)
        return resp

    def post(self):
        pass

    def put(self):
        args = request.get_json(force=True)
        c = Goods.get(args.get('id'))
        c.name = args.get('name')
        c.barcode= args.get('barcode')
        db.session.commit()
        return 'ok', 200

    def delete(self):
        pass


class mod_goods(Resource):
    def get(self):
        resp = db.session.query(Goods.id, Goods.barcode, Goods.name, Goods.grup).all()
        shablon = ('id', 'barcode', 'name', 'grup')
        return {'goods': list(dict(zip(shablon, x)) for x in resp)}

    def put(self):
        args = request.get_json(force=True)
        print(args)

class mod_new_good(Resource):
    def get(self, barcode):
        outList = list()
        # print('Grab', getNameFromBarcodeGrab(barcode))
        for elem in getNameFromBarcodeGrab(barcode):
            if elem.get('status') != 404:
                print(elem)
                outList.append({'name': elem.get('name'), 'barcode': elem.get('barcode')})

        fromApi = getNameFromBarcodeApi(barcode)
        if fromApi['status'] == 200:
            print(fromApi.get('names'))
            # print(fromApi.get('status'))
            outList.append({'name': fromApi['names'][0], 'barcode': barcode})

        a = [dict(t) for t in set([tuple(d.items()) for d in outList])]
        return {'goodName': a}

    def post(self):
        args = request.get_json(force=True)
        print(args)
        a = Goods(args['newgood'].get('name'), args['newgood'].get('barcode'))
        db.session.add(a)
        db.session.commit()
        print(a)
        return {'id': a.id, 'name': a.name, }, 201
