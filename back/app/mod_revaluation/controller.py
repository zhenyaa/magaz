from flask_restful import Resource, marshal_with, fields, marshal, reqparse
from app import db
from app.mod_revaluation.model import RevaluationHead, Revaluation
from app.mod_goods.model import Goods
from flask import jsonify, request
from flask_cors import cross_origin

class mod_revaluation(Resource):
    """Its class for get goods."""

    def get(self):
        res = db.session.query(RevaluationHead.id,
                               RevaluationHead.DOC_NAME,
                               RevaluationHead.QUANT_NUM,
                               RevaluationHead.AMOUNT_BUY_BEFORE,
                               RevaluationHead.AMOUNT_BUY_AFTER,
                               RevaluationHead.DIFF_PER,
                               RevaluationHead.DIFF_QUANT,
                               RevaluationHead.updated_at,
                               RevaluationHead.status)
        name = list(name.get('name') for name in res.column_descriptions)
        resp = list(dict(zip(name, x)) for x in res.all())
        return jsonify(resp)

    def post(self):
        print(request.get_json(force=True))
        a = RevaluationHead.create()
        a.setDOCname()

    def put(self):
        pass

    def patch(self):
        pass

    def delete(self, id=None):
        print(id)
        print(request.args.get('sessionId'))
        d = request.args.get('sessionId')
        print(RevaluationHead.get(d))
        RevaluationHead.get(d).delete()
        return '', 204


class mod_revaluationElem(Resource):

    def get(self, id=None):
        print('its id',id)
        res = db.session.query(Revaluation.id,
                               Revaluation.PRICE_COST_BEFORE,
                               Revaluation.AMOUNT_SUM_BEFORE,
                               Revaluation.PRICE_COST_AFTER,
                               Revaluation.AMOUNT_SUM_AFTER,
                               Revaluation.ID_PARCEL,
                               Goods.name).join(Goods).filter(Revaluation.parent_id == id)
        name = list(name.get('name') for name in res.column_descriptions)
        resp = list(dict(zip(name, x)) for x in res.all())
        print('resp !!!!',resp)
        return jsonify(resp)
