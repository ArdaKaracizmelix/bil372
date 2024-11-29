from app.database import create_app
from app.routes import routes

app = create_app()
print("App created!")  # Debug log

app.register_blueprint(routes)
print("Blueprint registered!")  # Debug log

for rule in app.url_map.iter_rules():
    print(f"Registered route: {rule} -> {rule.endpoint}")


if __name__ == "__main__":
    app.run(debug=True)

