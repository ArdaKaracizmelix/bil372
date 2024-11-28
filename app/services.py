from app.models import Promotion

def fetch_promotions_by_restaurant(restaurant_id):
    promotions = Promotion.query.filter(Promotion.applicable_restaurants.contains(str(restaurant_id))).all()
    return [promotion.to_dict() for promotion in promotions]
