import os
from flask import Flask, jsonify
from flask_cors import CORS
from app.services.sheet_service import SheetService

app = Flask(__name__)
CORS(app)

@app.route('/api/v1/sheets/parameto_roleta')
def get_parameto_roleta():
    try:
        data = SheetService().get_sheet_data("parameto_roleta")
        return jsonify({"values": data})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/v1/sheets/dados_roleta')
def get_dados_roleta():
    try:
        data = SheetService().get_sheet_data("dados_roleta")
        return jsonify({"values": data})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
