from flask_restful import Resource, marshal_with, fields, marshal
from app import db
from app.mod_markup.model import Markup
from app.mod_goods.addFunc import getNameFromBarcodeApi, getNameFromBarcodeGrab
from flask import jsonify


class mod_markup(Resource):
    """Its class for get goods."""

    def get(self, id=None):
        """Methods get for good with param good_id.test."""
        if not id:
            print(db.session.query(Markup.name, Markup._persent).all())
            return 'all', 200
        if id:
            resp = db.session.query(Markup.name, Markup._persent).filter(Markup.id == id).all()
            header = ('name', 'persent')
            return {'markup':dict(zip(header, x)) for x in resp}
    def post(self):
        pass

    def put(self):
        pass

    def delete(self):
        pass


