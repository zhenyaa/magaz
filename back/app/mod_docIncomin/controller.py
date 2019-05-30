from flask_restful import Resource, marshal_with, fields, marshal
from app import db
import datetime
from app.mod_docIncomin.model import DocIncomin
from flask import jsonify, request

class testShablon():
    def __init__(self, id, date, updated_at, summ, number, nameId, status):
        self.id = id
        self.date = date
        self.updated_at = updated_at
        self.sum = summ
        self.number = number
        self.nameId = nameId
        self.status = status

class mod_incominDoc(Resource):

    def get(self, good_id):
        pass
    def post(self):
        newdoc = DocIncomin.create(date = datetime.datetime.today())
        print(newdoc)
        return "ok", 201

    def put(self):
        todos = request.get_json(force=True)
        args = request.args
        new = DocIncomin.get(args.get('id'))
        # print('its not update obj', new)
        # print(args)
        if args.get('status') == 'true':
            new.status = True
        if args.get('status') == 'false':
            new.status = False
        db.session.commit()
        # print('its update obj',new)
        return 'ok', 200

    def delete(self, id):
        c = DocIncomin.get(id)
        # db.session.delete(c)
        c.delete()
        return '', 204

class mod_incominDocs(Resource):
    def get(self):
        resp = db.session.query(DocIncomin).all()
        response1 = list()
        for doc in resp:
            # print(doc)
            a = testShablon(doc.id, doc.date, doc.updated_at, doc.summ, doc.number, doc.numberId, doc.status)
            # print(a.__dict__)
            response1.append(a.__dict__)
            # print('its resp',response1)
        # response1 = response1.sort()
        # print('its resp', response1)
        return jsonify(response1)