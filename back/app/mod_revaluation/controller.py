from flask_restful import Resource, marshal_with, fields, marshal, reqparse
from app import db
from app.mod_revaluation.model import RevaluationHead, Revaluation
from app.mod_goods.model import Goods
from app.mod_incomin.model import Incoming
from app.mod_stock.model import Stock
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
                               Goods.name).outerjoin(Goods).filter(Revaluation.parent_id == id)

        print(res.all())
        name = list(name.get('name') for name in res.column_descriptions)
        resp = list(dict(zip(name, x)) for x in res.all())
        print('resp !!!!',resp)
        return jsonify(resp)

    def post(self):
        res = request.get_json(force=True)
        res2 = res.get('elem')
        print(res2.get("new"))
        print(res2.get("old"))
        print(res2.get("parentId"))
        reval_head = RevaluationHead.get(res2['parentId'])
        reval_obj = Revaluation(price_cost_before= res2['old']['price_sell_sum'],
                                price_cost_after= res2['new']['newCostStr'])

        db.session.add(reval_obj)
        db.session.flush()
        reval_head.children.append(reval_obj)
        incom = Incoming.get(res2['old']['ID_PARCEL'])
        incom.revaluation.append(reval_obj)
        stock_obj = Stock.get(res2['old']['id'])
        stock_obj.revaluation.append(reval_obj)
        db.session.commit()
        return "ok", 201

    def delete(self, id=None):
        Revaluation.get(id).delete()
        return 'ok', 200
