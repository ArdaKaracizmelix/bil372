from app.database import create_app, db
from app.routes import routes

app = create_app()
app.register_blueprint(routes)

if __name__ == '__main__':
    app.run(debug=True)
