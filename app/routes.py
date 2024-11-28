from flask import Blueprint, request, jsonify
from app.models import Promotion
from app.database import db

routes = Blueprint('routes', __name__)

@routes.route('/promotions', methods=['GET'])
def get_promotions():
    promotions = Promotion.query.all()
    return jsonify([promotion.to_dict() for promotion in promotions])

@routes.route('/promotions', methods=['POST'])
def create_promotion():
    data = request.json
    try:
        new_promo = Promotion(
            promo_code=data['promo_code'],
            description=data['description'],
            discount_type=data['discount_type'],
            discount_value=data['discount_value'],
            start_date=data['start_date'],
            end_date=data['end_date'],
            applicable_restaurants=data['applicable_restaurants'],
            min_order_value=data['min_order_value'],
            usage_limit=data['usage_limit'],
            current_usage=0,
        )
        db.session.add(new_promo)
        db.session.commit()
        return jsonify({"message": "Promotion created successfully!"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@routes.route('/promotions/<int:id>', methods=['DELETE'])
def delete_promotion(id):
    promotion = Promotion.query.get(id)
    if not promotion:
        return jsonify({"error": "Promotion not found"}), 404
    db.session.delete(promotion)
    db.session.commit()
    return jsonify({"message": "Promotion deleted successfully!"})
