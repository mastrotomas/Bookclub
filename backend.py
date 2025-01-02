from flask import Flask, jsonify, request
from flask_cors import CORS
from db import checkUserData
from db import addNewUser

app = Flask(__name__)
CORS(app) 

@app.route('/effettualogin', methods=['POST'])
def effettualogin():
    # Ricevi i dati JSON inviati dal frontend
    data = request.json

    # Esegui un'operazione sui dati (esempio: concatenare nome e cognome)
    username = data.get("username")
    password = data.get("password")
    esito = checkUserData(username,password)
    initialnameletter = username[0]
    # Stampa i dati nel terminale (debug)
    print(f"Dati ricevuti: {data}")

    # Restituisci una risposta al frontend
    return jsonify({'esito': esito, 'initialnameletter': initialnameletter,'username': username})

@app.route('/registerUtente', methods=['POST'])
def registerUtente():
    # Ricevi i dati JSON inviati dal frontend
    data = request.json

    # Esegui un'operazione sui dati (esempio: concatenare nome e cognome)
    uusername = data.get("username")
    email = data.get("email")
    password = data.get("password")
    a=addNewUser(uusername,email,password)
    
    # Stampa i dati nel terminale (debug)
    print(f"Dati ricevuti: {data}")

       # Restituisci una risposta al frontend
    if (a==1) :
        return jsonify({'message': 'Utente Registrato con Successo!','color': 'green'})
    else :
        return jsonify({'message': 'Utente già registrato','color': 'red'})

if __name__ == '__main__':
    app.run(debug=True)