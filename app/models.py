from app.database import db

class Promotion(db.Model):
    __tablename__ = 'Promotions'

    id = db.Column(db.Integer, primary_key=True)
    promo_code = db.Column(db.String(20), nullable=False, unique=True)
    description = db.Column(db.Text, nullable=False)
    discount_type = db.Column(db.String(20), nullable=False)
    discount_value = db.Column(db.Float, nullable=False)
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=False)
    applicable_restaurants = db.Column(db.Text, nullable=False)  # JSON
    min_order_value = db.Column(db.Float, nullable=False)
    usage_limit = db.Column(db.Integer, nullable=False)
    current_usage = db.Column(db.Integer, nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "promo_code": self.promo_code,
            "description": self.description,
            "discount_type": self.discount_type,
            "discount_value": self.discount_value,
            "start_date": self.start_date.isoformat(),
            "end_date": self.end_date.isoformat(),
            "applicable_restaurants": self.applicable_restaurants,
            "min_order_value": self.min_order_value,
            "usage_limit": self.usage_limit,
            "current_usage": self.current_usage,
        }
