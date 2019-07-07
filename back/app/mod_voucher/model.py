from app import db
import datetime
from sqlalchemy import event


class Voucher(db.Model):
    __tablename__ = "voucher"
    id = db.Column(db.Integer, primary_key=True)

    name_voucher = db.Column(db.String) # название документа. после инита
    quant_velem = db.Column(db.Float) # количество товаров, после инита
    amount_customer_sum = db.Column(db.Float) # сумма от покупателя
    amount_price_sum = db.Column(db.Float) # сумма покупки
    amount_bay_sum = db.Column(db.Float)  # сумма закупочная, после инита
    amount_customer_change = db.Column(db.Float) # сдача
    type_pay = db.Column(db.Integer, default = 0) # тип оплаты, о=наличка, 1=безнал
    block_level = db.Column(db.Integer, default=0)

    VOUCHER_ELEM = db.relationship("VoucherElement", backref="voucherVE")  # must by class name in relationship'

    created_at = db.Column(db.DateTime, default=datetime.datetime.now, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.now, onupdate=datetime.datetime.now, nullable=False)


    def __init__(self, amount_customer_sum, amount_price_sum, amount_customer_change, type_pay):
        """Constructor  method for Stock

         :rtype: object
         :param amount_customer_sum: сумма от покупателя
         :param amount_price_sum: сумма покупки
         :param amount_customer_change: сдача
         :param type_pay: тип покупки нал, безнал
        """
        self.type_pay = type_pay
        self.amount_customer_change = amount_customer_change
        self.amount_price_sum = amount_price_sum
        self.amount_customer_sum = amount_customer_sum





    _repr_hide = ['created_at', 'updated_at']


    def __repr__(self):
        values = ', '.join("%s=%r" % (n, getattr(self, n)) for n in self.__table__.c.keys() if n not in self._repr_hide)
        return "%s(%s)" % (self.__class__.__name__, values)

    def getQuantChild(self):
        self.quant_velem = (len(self.VOUCHER_ELEM))
        db.session.commit()



def after_insert_listener(mapper, connection, target):
    """обновление данных установка делитель, и расчет количества в десятичном виде """
    voucher_table = Voucher.__table__
    nameFortarget = 'РЧ-' + str(target.id).zfill(6)
    print(target)
    # print(len(target.listOfProduct))
    if target.name_voucher is None:
        connection.execute(
            voucher_table.update().
                where(voucher_table.c.id == target.id).
                values(name_voucher= nameFortarget)
        )
event.listen(Voucher, 'after_insert', after_insert_listener)