from app import db
import datetime
from sqlalchemy import event
from sqlalchemy.event import listen
from app.mod_goods.model import Goods

class Stock(db.Model):
    """
    класс для продаж

    :param id: это целое количество
    :param quant_int: это целое количество
    :param quant_num: дробное количество чеслитель
    :param quant_div: дробное количество знаменатель
    :param quant_float: количество в виде десятичной дроби
    :param price_buy_sum: цена закупочная
    :param price_sell_sum: цена отпускная
    :param rate_sell_buy: отношение закупочной цені к отпускной
    :param amount_buy_sum: сумма закупочная
    :param amount_sell_sum: сумма отпускная
    :param block_level: бллокировка остатков, 0-нет блокировки, 1 - резерв, 2 - блокировка по документу
    """
    __tablename__ = "stock"
    id = db.Column(db.Integer, primary_key=True)
    ID_GOOD = db.Column(db.Integer, db.ForeignKey("goods.id")) # указатель на товар
    GOOD_PERENT = db.relationship('Goods', backref="stockG")  # must by class name in relationship
    ID_PARCEL = db.Column(db.Integer, db.ForeignKey("incoming.id"))# Указатель на партию
    PARCEL_PERENT = db.relationship('Incoming', backref="stockI")  # must by class name in relationship
    ID_DOC = db.Column(db.Integer, db.ForeignKey("docIncomin.id"))# указатель на документ прихода
    DOC_PERENT = db.relationship('DocIncomin', backref="stockD")  # must by class name in relationship

    quant_int = db.Column(db.Integer, default = 1) # целое количество
    quant_num = db.Column(db.Integer, default = 1) # дробное количество чеслитель
    quant_div = db.Column(db.Integer, default = 1) # дробное количество знаменатель, не редактировать!
    quant_float = db.Column(db.Float, default = 1) # количество в виде десятичной дроби
    price_buy_sum = db.Column(db.Float, default = 1) # цена закупочная
    price_sell_sum = db.Column(db.Float, default = 1)# цена отпускная
    rate_sell_buy = db.Column(db.Float, default = 1)# отношение закупочной цені к отпускной
    amount_buy_sum = db.Column(db.Float, default = 1) # сумма закупочная
    amount_sell_sum = db.Column(db.Float, default = 1) # сумма отпускная
    block_level = db.Column(db.Integer, default = 0) # бллокировка остатков, 0-нет блокировки, 1 - резерв, 2 - блокировка по документу, 3-блок по  NULL остатку


    created_at = db.Column(db.DateTime, default=datetime.datetime.now, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.now, onupdate=datetime.datetime.now, nullable=False)


    def __init__(self, quant_int, quant_num, price_buy_sum, price_sell_sum ):
        """Constructor  method for Stock
         :rtype: object
         :param quant_int: это целое количество
         :param quant_num: это дробное количество
         :param price_buy_sum: это закупочная цена
         :param price_sell_sum: это отпускная цена
        """
        self.quant_int = quant_int
        self.quant_num = quant_num
        self.price_buy_sum = price_buy_sum
        self.price_sell_sum = price_sell_sum

    _repr_hide = ['created_at', 'updated_at']

    def __repr__(self):
        values = ', '.join("%s=%r" % (n, getattr(self, n)) for n in self.__table__.c.keys() if n not in self._repr_hide)
        return "%s(%s)" % (self.__class__.__name__, values)

    def quant_update(self, quant_int: int, quant_num: int):
        """
        метод для удаления(продажи) товара с остатка

        :param quant_int: целое количество
        :param quant_num: дробное количество
        :type quant_int: int
        :type quant_num: int
        """
        self.quant_int = int(self.quant_int) - int(quant_int)
        if (int(self.quant_num) - int(quant_num)) < 0:
            self.quant_int = int(self.quant_int) - 1
            self.quant_num = int(self.quant_div) + int(self.quant_num) - int(quant_num)

            print('if',int(self.quant_num) - int(quant_num))
        else:
            self.quant_num = int(self.quant_num) - int(quant_num)




    @classmethod
    def get_by_ID_PARCEL(cls, PARCEL_ID):
        return cls.query.filter_by(ID_PARCEL = PARCEL_ID).first()



    # def update(self, commit=True, **kwargs):
    #     for attr, value in kwargs.iteritems():
    #         setattr(self, attr, value)
    #     return commit and self.save() or self





def after_insert_listener(mapper, connection, target):
    """обновление данных установка делитель, и расчет количества в десятичном виде """
    good = Goods.get(target.ID_GOOD)
    try:
        fForVal = target.quant_int + (target.quant_num / good.delimeter)# calc float quant
    except ZeroDivisionError:
        good_table = Goods.__table__
        connection.execute(
            good_table.update().
            where(good_table.c.id == good.id).
            values(delimeter = 1)
        )
        fForVal = target.quant_int + (target.quant_num / 1)

    stock_table = Stock.__table__
    connection.execute(
        stock_table.update().
            where(stock_table.c.id == target.id).
            values(quant_div=good.delimeter).
            values(quant_float= fForVal)
    )

event.listen(Stock, 'after_insert', after_insert_listener)



@event.listens_for(Stock, 'after_update')
def receive_after_update(mapper, connection, target):
    link_table = Stock.__table__
    print("after update")
    if target.quant_int == 0 and target.quant_num ==0:
        connection.execute(
            link_table.update().
                where(link_table.c.id == target.id).
                values(block_level = 3)
        )

