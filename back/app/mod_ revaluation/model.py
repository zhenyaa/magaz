
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





class RevaluationHead(db.Model, CRUDMixin):
    """
    Класс акты переоценки голова
    имя документа
    дата
    коли. позиций
    сумма до
    сумма после
    раз в %
    раз в грн

    """
    __tablename__ = "revaluation_head"

    id = db.Column(db.Integer, primary_key=True)
    DOC_NAME = db.Column(db.String)
    QUANT_NUM = db.Column(db.Integer)

    AMOUNT_BUY_BEFORE = db.Column(db.Float, default = 1) # сумма до
    AMOUNT_BUY_AFTER = db.Column(db.Float, default=1)  # сумма после

    DIFF_PER = db.Column(db.Float, default=1)  # разница проценты
    DIFF_QUANT = db.Column(db.Float, default=1)  # разница в валюте

    date = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.now, onupdate=datetime.datetime.now, nullable=False)
    # nameId = db.column_property('PN-' +  (db.cast(id, db.String)))
    status = db.Column(db.Boolean, default=False)

    children = db.relationship("Revaluation", backref="revaluation_head_1")

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






class Revaluation(db.Model, CRUDMixin):
    """
    Класс акты переоценки тело

    код партии
    документ прихода
    цена от. до
    сумма от до
    цена после
    сумма после

    """
    __tablename__ = "revaluation"

    id = db.Column(db.Integer, primary_key=True)
    DOC_INC_NAME = db.Column(db.String)

    PRICE_COST_BEFORE = db.Column(db.Float, default=1)  # цена до
    AMOUNT_SUM_BEFORE = db.Column(db.Float, default=1)  # сумма до

    PRICE_COST_AFTER = db.Column(db.Float, default=1)  # цена после
    AMOUNT_SUM_AFTER = db.Column(db.Float, default=1)  # сумма после


    ID_PARCEL = db.Column(db.Integer, db.ForeignKey("incoming.id"))  # Указатель на партию
    PARCEL_PERENT = db.relationship('Incoming', backref="revaluationI")

    ID_GOOD = db.Column(db.Integer, db.ForeignKey("goods.id"))  # Указатель на партию
    GOOD_PERENT = db.relationship('Goods', backref="revaluationG")

    ID_STOCK = db.Column(db.Integer, db.ForeignKey("stock.id"))  # Указатель на партию
    STOCK_PERENT = db.relationship('Stock', backref="revaluationS")

    parent_id = db.Column(db.Integer, db.ForeignKey('revaluation_head.id'))
    parent = db.relationship("RevaluationHead", back_populates="revaluation_H")


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


