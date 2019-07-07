from flask_restful import Resource, marshal_with, fields, marshal, reqparse
from app import db
from app.mod_revaluation.model import RevaluationHead

parser = reqparse.RequestParser()
parser.add_argument('test', type=str, location='json')

class mod_revaluation(Resource):
    """Its class for get goods."""

    def get(self):
        pass

    def post(self):
        pass

    def put(self):
        pass

    def delete(self, id_pearent):
        pass

