from flask_restful import Resource, marshal_with, fields, marshal
from app import db
from app.mod_markup.model import Markup
from app.mod_goods.addFunc import getNameFromBarcodeApi, getNameFromBarcodeGrab
from flask import jsonify, request,send_file
from app.mod_label.label_generator import GenLabel, LabelGenerator


class mod_label(Resource):
    """Its class for get goods."""

    def get(self, id=None):
        """Methods get for genarate label."""
        args = request.args.get('label')
        print(type(args))
        print(type(args[0]))



    def post(self):
        args = request.get_json()
        labelData = args.get('label')
        GenLabel(labelData)
        LabelGenerator(labelData).save()
        return send_file('../testLabel1.pdf', cache_timeout=0)

    def put(self):
        pass

    def delete(self):
        pass


