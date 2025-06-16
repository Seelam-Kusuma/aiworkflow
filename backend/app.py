from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  

@app.route('/sum', methods=['POST'])
def calculate_sum():
    data = request.json
    result = data['a'] + data['b']
    return jsonify({'sum': result})

@app.route('/square', methods=['POST'])
def calculate_square():
    data = request.json
    result = data['value'] ** 2
    return jsonify({'square': result})

if __name__ == '__main__':
    app.run(debug=True)
