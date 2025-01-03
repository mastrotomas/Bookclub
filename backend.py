from flask import Flask, jsonify, request
from flask_cors import CORS

from db import checkUserData
from db import addNewUser
from db import searchBooks
from db import ricercapergenere
from db import categoryBooks

app = Flask(__name__)
CORS(app)  # Abilita CORS per evitare errori cross-origin


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

@app.route('/books', methods=['POST']) 
def books():
    # Ricevi i dati JSON inviati dal frontend
    data = request.json

    # Esegui un'operazione sui dati (esempio: concatenare nome e cognome)
    titoloLibro = data.get("valorecercato")
    rows = searchBooks(titoloLibro)
    print(f"Dati ricevuti: {titoloLibro}")
    results = []
    for row in rows:
        results.append({
            "bookId": row[0],
            "bookname": row[1],
            "bookdesc": row[3],
            "imagePath": row[7]
        })

       # Restituisci una risposta al frontend
    return jsonify(results)

@app.route('/categoriadeilibri', methods=['POST']) 
def libricategory():
    # Ricevi i dati JSON inviati dal frontend
    data = request.json

    # Esegui un'operazione sui dati (esempio: concatenare nome e cognome)
    titoloLibro = data.get("valorecercato")
    rows = categoryBooks(titoloLibro)
    print(f"Dati ricevuti: {titoloLibro}")
    results = []
    for row in rows:
        results.append({
            "bookId": row[0],
            "bookname": row[1],
            "bookdesc": row[3],
            "imagePath": row[7]
        })

       # Restituisci una risposta al frontend
    return jsonify(results)

@app.route('/bookspergenere', methods=['POST']) 
def bookspergenere():
    # Ricevi i dati JSON inviati dal frontend
    data = request.json

    # Esegui un'operazione sui dati (esempio: concatenare nome e cognome)
    titoloLibro = data.get("valorecercato")
    type = data.get("generevalore")
    rows = ricercapergenere(titoloLibro,type)
    print(f"Dati ricevuti: {type}")
    results = []
    for row in rows:
        results.append({
            "bookId": row[0],
            "bookname": row[1],
            "bookdesc": row[2],
            "imagePath": row[3]
        })

       # Restituisci una risposta al frontend
    return jsonify(results)




if __name__ == '__main__':
    app.run(debug=True)