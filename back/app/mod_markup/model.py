from app import db
import datetime

class Markup(db.Model):     ## таблица входящего товара

    __tablename__ = "markup"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    _persent = db.Column(db.Integer, default = 20)
    round = db.Column(db.Boolean, default = False)
    _roundOn = db.Column(db.Integer, default = 0)
    created_at = db.Column(db.DateTime, default=datetime.datetime.now, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.now, onupdate=datetime.datetime.now, nullable=False)


    def __init__(self, name, persent):
        """
        конструктор класса НАценка
        :param name: Имя наценки
        :param persent: процент наценки
        """
        self.name = name
        self._persent = persent

    def __repr__ (self):
        return "<Markup('%s', '%s')>" % (self.name, self._persent)

def insert_initial_values(*args, **kwargs):
    db.session.add(Markup(name='Основная схема наценки', persent= 30))
    db.session.add(Markup(name='Дополнительная для теста', persent=45))
    db.session.commit()

db.event.listen(Markup.__table__, 'after_create', insert_initial_values)
