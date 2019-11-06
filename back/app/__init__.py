
from flask import Flask, render_template
from flask_restful import Api

from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
# from flask_alembic import Alembic
from flask_migrate import Migrate, MigrateCommand
from flask_script import Manager
# from back import config

app = Flask(__name__, static_url_path="", template_folder="../static", static_folder="../static")
api = Api(app)
CORS(app, resources={r"/*": {"origins": "*"}})
app.config.from_object('config')


db = SQLAlchemy(app)
migrate = Migrate(app, db) # , compare_type=True,  for change type
migrate.init_app(app,db)
print(app.root_path)
# manager = Manager(app)
# manager.add_command('db', MigrateCommand)
# alembic.init_app(app, run_mkdir=False)

# Sample HTTP error handling
@app.errorhandler(404)
def not_found(error):
    return "page not found" , 404

@app.route('/')
@app.route('/index',  methods=['GET', 'POST'] )
def index():
    return render_template("index.html")


from app.mod_goods.controller import mod_good as good_module
from app.mod_goods.controller import mod_goods as goods_module

api.add_resource(goods_module, '/goods/')
api.add_resource(good_module, '/good/', '/good/<string:good_id>')

from app.mod_docIncomin.controller import mod_incominDoc as incDoc_module
from app.mod_docIncomin.controller import mod_incominDocs as incDocs_module

api.add_resource(incDoc_module, '/incdoc/', '/incdoc/<id>')
api.add_resource(incDocs_module, '/incdocs/')

from app.mod_markup.controller import mod_markup as markUp_module
api.add_resource(markUp_module, '/markup/', '/markup/<id>')

from app.mod_incomin.controller import mod_incomin as incomin_module
api.add_resource(incomin_module, '/incomin/', '/incomin/<id_pearent>')

from app.mod_goods.controller import mod_new_good as NewGood
api.add_resource(NewGood, '/newgood/', '/newgood/<barcode>')

from app.mod_stock.controller import  mod_stock as stock_module
api.add_resource(stock_module, '/stock/', '/stock/<id>' )

from app.mod_voucher.controller import mod_voucher as voucher_module
api.add_resource(voucher_module, '/voucher/', '/voucher/<id>')

from app.mod_label.controller import mod_label as label_module
api.add_resource(label_module, '/label/' )

from app.mod_revaluation.controller import mod_revaluation as rev_module
api.add_resource(rev_module, '/rev/', '/rev/<id>')

from app.mod_voucher_elem.controller import mod_voucher_elem as Velem_module
api.add_resource(Velem_module, '/goodsold/', '/goodsold/<id>' )

from app.mod_revaluation.controller import mod_revaluationElem as revElem_module
api.add_resource(revElem_module, '/relem/', '/relem/<id>' )

from app.mod_balance.controller import mod_balance as Balance_module
api.add_resource(Balance_module, '/balance/', '/balance/<id>')

db.create_all()
