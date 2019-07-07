from app import db
import datetime
from sqlalchemy import event, events
from flask import abort
# from app.mod_docIncomin.model import DocIncomin as dInc
from app.mod_stock.model import Stock
from app.mod_goods.model import Goods
# from app.mod_docIncomin.model import DocIncomin

class CRUDMixin(object):
    __table_args__ = {'extend_existing': True}

    @classmethod
    def query(cls):
        return db.session.query(cls)

    @classmethod
    def get(cls, _id):
        """

        :rtype: object
        """
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


class Incoming(db.Model, CRUDMixin):
    """Класс вкодящих товаров связан с документом.

        Attributes:
        id: укозатель на обект.
        good_id: указатель на товар.
        good_perent: указатель на документ.
        _purchase_cost: цена закупочная.
        _cost_price: цена отпускная.
        _persent: процент.
        quantity: количество.
        _fractional_number: дробное количество.

    """

    __tablename__ = "incoming"
    id = db.Column(db.Integer, primary_key=True)
    good_id = db.Column(db.Integer, db.ForeignKey("goods.id"))
    good_perent = db.relationship('Goods', backref="incomingG")  # must by class name in relationship
    _purchase_cost = db.Column(db.Float)  #цена закупочная
    _cost_price = db.Column(db.Float)  #цена отпускная
    _persent = db.Column(db.Float)  #процент наценки
    quantity = db.Column(db.Integer)  #количество
    _fractional_number = db.Column(db.Integer, default = 0) #дробное количество

    quantity_for_realiz = db.Column(db.Integer)  # количество для продажи
    _fractional_number_for_realiz = db.Column(db.Integer, default=0)  # дробное количество для продажи

    availability = db.Column(db.Boolean, default=False) # доступ к продаже
    created_at = db.Column(db.DateTime, default=datetime.datetime.now, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.now, onupdate=datetime.datetime.now, nullable=False)


    # goodinrealiz = db.relationship("GoodInRealization", backref = "incoming")

    parent_id = db.Column(db.Integer, db.ForeignKey('docIncomin.id', ondelete='CASCADE'))
    perent = db.relationship('DocIncomin', backref = "incomingD")# must by class name in relationship
    stocks = db.relationship("Stock", backref="incomingST")  # must by class name in relationship'
    VOUCHER_ELEM = db.relationship("VoucherElement", backref="incomingVE")  # must by class name in relationship'

    def __init__(self, good_id:int, _purchase_cost:float, _cost_price:float, _persent:float, quantity:int, _fractional_number:int ):
        """
            Конструктор класса входящих товаров, связан с входящими документами.
        :param good_id: ссылка на товар
        :param _purchase_cost: цена закупочная
        :param _cost_price: цена отпускная
        :param _persent: процент наценки
        :param quantity: количество
        :param _fractional_number: дробное количество
        """
        self.good_id = good_id
        self._purchase_cost = _purchase_cost
        self._cost_price = _cost_price
        self._persent = _persent
        self.quantity = quantity
        self._fractional_number = _fractional_number

        self.quantity_for_realiz = quantity
        self._fractional_number_for_realiz = _fractional_number

    _repr_hide = ['created_at', 'updated_at']
    def __repr__(self):
        values = ', '.join("%s=%r" % (n, getattr(self, n)) for n in self.__table__.c.keys() if n not in self._repr_hide)
        return "%s(%s)" % (self.__class__.__name__, values)
    # def __repr__ (self):
    #     return "<Incoming('%s', '%s', '%s', '%s', '%s')>" % (self.good_id, self._purchase_cost, self._cost_price, self._persent, self.quantity)


    def write_in_stock(self):
        if self.stocks:
            return True
        else:
            return False

    def add_to_stock(self):
        from app.mod_docIncomin.model import DocIncomin
        newStock = Stock(self.quantity, self._fractional_number, self._purchase_cost, self._cost_price)

        good = Goods.get(self.good_id)
        docINc = DocIncomin.get(self.parent_id)

        good.stocks.append(newStock)
        docINc.stocks.append(newStock)
        self.stocks.append(newStock)
        db.session.add(newStock)
        db.session.commit()


        # for obj in db.session.query(cls):
        #     print(obj)

# def append_event(target, value, initiator):
#     # print('event target {0}'.format(target))
#     print('its value in incoming',value)
#     # print(initiator)
#     # target.calc_quant_child()
#     # target.calc_sum()
#     target.recalc()
# event.listen(Incoming.parent_id, 'set', append_event)
#
# @event.listens_for(Incoming, 'after_insert')
# def receive_after_insert(mapper, connection, target):
#     from app.mod_docIncomin.model import DocIncomin
#     Docincomin_table = DocIncomin.__table__
#     print("event after insert")
#     print(mapper)
#     print(connection)
#     print(target)
#     # event for event in docIncoming
#     connection.execute(
#             Docincomin_table.update().
#                 where(Docincomin_table.c.id == target.parent_id).
#                 values(QUANT_NUM =1)
#
#         )


# def set_perentID_event(target, value, oldvalue, initiator):
#     # event for set perent_id
#     print('set_perentID_event',target)
#     print('set_perentID_event',value)
#     from app.mod_docIncomin.model import DocIncomin
#     per = DocIncomin.get(value)
#     if isinstance(per, DocIncomin):
#         per.recalc()
#     print('set_perentID_event', per)
# event.listen(Incoming.parent_id, 'set', set_perentID_event)
#
# @event.listens_for(Incoming, 'after_delete')
# def receive_after_delete(mapper, connection, target):
#     Docincomin_table = 'docIncomin'
#     print("event after delete")
#     print(mapper)
#     print(connection)
#     print(target)
#
#
#
