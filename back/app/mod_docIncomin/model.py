
from app import db
import datetime
from sqlalchemy.ext.hybrid import hybrid_property
from flask import abort
from app.mod_incomin.model import Incoming
from sqlalchemy import event, events
from app.mod_stock.model import Stock
from app.mod_goods.model import Goods

class CRUDMixin(object):
    __table_args__ = {'extend_existing': True}

    @classmethod
    def query(cls):
        return db.session.query(cls)


    @classmethod
    def get(cls, _id):
        if any((isinstance(_id, str) and _id.isdigit(),
                isinstance(_id, (int, float))),):
            return cls.query.get(int(_id))
        return None

    @classmethod
    def get_by(cls, **kwargs):
        return cls.query.filter_by(**kwargs).first()

    @classmethod
    def get_or_404(cls, _id):
        rv = cls.get(_id)
        if rv is None:
            abort(404)
        return rv

    @classmethod
    def get_or_create(cls, **kwargs):
        r = cls.get_by(**kwargs)
        if not r:
            r = cls(**kwargs)
            db.session.add(r)
        return r

    @classmethod
    def create(cls, **kwargs):
        instance = cls(**kwargs)
        return instance.save()

    def update(self, commit=True, **kwargs):
        for attr, value in kwargs.iteritems():
            setattr(self, attr, value)
        return commit and self.save() or self

    def save(self, commit=True):
        db.session.add(self)
        if commit:
            try:
                db.session.commit()
            except Exception:
                db.session.rollback()
                raise
        return self

    def delete(self, commit=True):
        db.session.delete(self)
        return commit and db.session.commit()



class DocIncomin(db.Model, CRUDMixin):
    """
    Класс акты оприходования

    """
    __tablename__ = "docIncomin"

    id = db.Column(db.Integer, primary_key=True)
    DOC_NAME = db.Column(db.String)
    QUANT_NUM = db.Column(db.Integer)
    PRICE_ALL_SUM = db.Column(db.Integer)
    date = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.now, onupdate=datetime.datetime.now, nullable=False)
    # nameId = db.column_property('PN-' +  (db.cast(id, db.String)))
    status = db.Column(db.Boolean, default=False)
    children = db.relationship(Incoming,  backref = "docIncomin", passive_deletes=True) # must by class name in relationship
    stocks = db.relationship("Stock", backref="docIncominST")  # must by class name in relationship'

    def __init__(self, date):
        """
Конструктор сласса Актов оприходования
        :param date: дата создания
        """
        self.date = date

    _repr_hide = ['created_at', 'updated_at']

    def __repr__(self):
        values = ', '.join("%s=%r" % (n, getattr(self, n)) for n in self.__table__.c.keys() if n not in self._repr_hide)
        return "%s(%s)" % (self.__class__.__name__, values)

    @hybrid_property
    def number(self):
        if self.QUANT_NUM == None:
            self.QUANT_NUM = (len(self.children))
            db.session.commit()
            return len(self.children)  # @note: use when non-dynamic relationship
        else:
            return  self.QUANT_NUM

    def recalc(self):
        self.QUANT_NUM = (len(self.children))
        sum = 0
        for s in self.children:
            try:
                sum += (float(s._cost_price) * float(s.quantity)) + (
                            float(s._cost_price) / float(s.good_perent.delimeter) * float(s._fractional_number))
            except:
                sum += (float(s._cost_price) * float(s.quantity))

        self.PRICE_ALL_SUM = float("{0:.2f}".format(sum))
        db.session.commit()

    @classmethod
    def head_recalc(cls):
        a = db.session.query(cls).all()
        for obj in a:
            obj.recalc()
        # for obj in db.session.query(cls):
        #     print(obj)



    @hybrid_property
    def numberId(self):
        if self.DOC_NAME ==None:
            resp = 'ПН-'
            new = resp + str(self.id).zfill(6)
            self.DOC_NAME = new
            db.session.commit()
            return new
        else:
            return self.DOC_NAME

    @hybrid_property
    def summ(self):
        if self.PRICE_ALL_SUM ==None:
            sum = 0
            for s in self.children:
                try:
                    sum += (int(s._cost_price) * int(s.quantity)) + (int(s._cost_price) / int(s.good_perent.delimeter) * int(s._fractional_number))
                except:
                    sum += (s._cost_price * s.quantity)
            self.PRICE_ALL_SUM = sum
            db.session.commit()
            return sum
        else:
            return self.PRICE_ALL_SUM

    def calc_sum(self):
        sum = 0
        for namber in self.children:
            try:
                sum += (int(namber._cost_price) * int(namber.quantity)) + (
                            int(namber._cost_price) / int(namber.good_perent.delimeter) * int(namber._fractional_number))
            except:
                sum += (namber._cost_price * namber.quantity)
        self.PRICE_ALL_SUM = sum
        db.session.commit()

    def calc_quant_child(self):
        self.QUANT_NUM = (len(self.children))
        db.session.commit()


def receive_modified(target, value, oldvalue, initiator):
    if value != oldvalue:
        print(value, oldvalue)
        if  target.stocks:
            if value ==True:
                for obj in target.stocks:
                    obj.block_level = 0
            else:
                print('have children', target.stocks)
                # target.stocks.block_level =
                for obj in target.stocks:
                    obj.block_level = 2
            db.session.flush()
        else:
            objects = target.children
            # print(objects)
            obj = []
            for x in objects:  # type: Incoming
                good = Goods.get(x.good_id)
                inc = Incoming.get(x.id)
                docInc = DocIncomin.get(x.parent_id)
                newStock = Stock(x.quantity, x._fractional_number,x._purchase_cost, x._cost_price)
                good.stocks.append(newStock)
                inc.stocks.append(newStock)
                docInc.stocks.append(newStock)
                obj.append(newStock)
            # print(obj)

            db.session.bulk_save_objects(obj)
            db.session.commit()


event.listen(DocIncomin.status, 'set', receive_modified)
