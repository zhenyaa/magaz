from app import db
# from flask_sqlalchemy import Col
from flask import abort


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


class Goods(db.Model, CRUDMixin):    # таблица номенклатурі
    __tablename__ = "goods"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    barcode = db.Column(db.Integer)
    grup = db.Column(db.String)
    delimeter = db.Column(db.Integer, default=1)
    incoming = db.relationship("Incoming", backref="goods")  # must by class name in relationship'
    stocks = db.relationship("Stock", backref="goodsST")  # must by class name in relationship'

    def __init__(self, name, barcode):
        self.name = name
        self.barcode = barcode

    _repr_hide = ['created_at', 'updated_at']

    def __repr__(self):
        values = ', '.join("%s=%r" % (n, getattr(self, n)) for n in self.__table__.c.keys() if n not in self._repr_hide)
        return "%s(%s)" % (self.__class__.__name__, values)


def insert_initial_values(*args, **kwargs):
    db.session.add(Goods(name='low', barcode="22554"))
    db.session.add(Goods(name='medium', barcode="25464"))
    db.session.add(Goods(name='high', barcode="544656465"))
    db.session.add(Goods(name='Cola', barcode="544656464"))
    db.session.add(Goods(name='baunty', barcode="544656463"))
    db.session.add(Goods(name='kent', barcode="544656462"))
    db.session.commit()

db.event.listen(Goods.__table__, 'after_create', insert_initial_values)
