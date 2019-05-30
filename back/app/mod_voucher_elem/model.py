from app import db
import datetime
from sqlalchemy import event


class VoucherElement(db.Model):
    __tablename__ = "voucherelem"
    id = db.Column(db.Integer, primary_key=True)



    ID_PARCEL = db.Column(db.Integer, db.ForeignKey("incoming.id"))  # Указатель на партию
    PARCEL_PERENT = db.relationship('Incoming', backref="voucherelemI")  # must by class name in relationship

    ID_VOUCHER = db.Column(db.Integer, db.ForeignKey("voucher.id"))
    VOUCHER_PERENT = db.relationship('Voucher', backref="voucherelemD")

    PRICE_SELL_COST = db.Column(db.Float) # цена за товар
    PRICE_SELL_SUM = db.Column(db.Float) # сумма за товар
    QUANT_INT = db.Column(db.Integer)
    QUANT_NUM = db.Column(db.Integer)
    QUANT_DIV = db.Column(db.Integer)

    block_level = db.Column(db.Integer, default=0)

    created_at = db.Column(db.DateTime, default=datetime.datetime.now, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.now, onupdate=datetime.datetime.now, nullable=False)


    def __init__(self, PRICE_SELL_COST: float, PRICE_SELL_SUM, QUANT_INT, QUANT_NUM, QUANT_DIV):
        """Constructor  method for VOUCHER ELEMENT
         :rtype: object
         :param PRICE_SELL_COST: цена за товар
         :param PRICE_SELL_SUM: сумма за товар
         :param QUANT_INT: целое количество
         :param QUANT_NUM: дробное количество
         :param QUANT_DIV: делитель

        """
        self.QUANT_DIV = QUANT_DIV
        self.QUANT_NUM = QUANT_NUM
        self.QUANT_INT = QUANT_INT
        self.PRICE_SELL_SUM = PRICE_SELL_SUM
        self.PRICE_SELL_COST = PRICE_SELL_COST







    _repr_hide = ['created_at', 'updated_at']


    def __repr__(self):
        values = ', '.join("%s=%r" % (n, getattr(self, n)) for n in self.__table__.c.keys() if n not in self._repr_hide)
        return "%s(%s)" % (self.__class__.__name__, values)

def after_insert_listener(mapper, connection, target):
    """обновление данных установка делитель, и расчет количества в десятичном виде """
    # voucher_table = VoucherElement.__table__
    # nameFortarget = 'РЧ-' + str(target.id).zfill(6)
    # print(target)
    # # print(len(target.listOfProduct))
    # if target.name_voucher is None:
    #     connection.execute(
    #         voucher_table.update().
    #             where(voucher_table.c.id == target.id).
    #             values(name_voucher= nameFortarget)
    #     )
event.listen(VoucherElement, 'after_insert', after_insert_listener)