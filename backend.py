from flask import Flask, jsonify, request
from flask_cors import CORS
import os
import re
from db import checkUserData
from db import addNewUser
from db import searchBooks
from db import ContenutoLibri
from db import commentiLibri
from db import OttieniCommentiUtenti
from db import regCommento
from db import getGerne
from db import getLink

from db import ricercapergenere

from db import categoryBooks
from db import getSimilar

app = Flask(__name__)
CORS(app)  # Abilita CORS per evitare errori cross-origin

@app.route('/getUsercomment', methods=['POST'])
def CommentiUtenti():
    # Ricevi i dati JSON inviati dal frontend
    data = request.json

    # Esegui un'operazione sui dati (esempio: concatenare nome e cognome)
    uusername = data.get("valorecercato")
    rows = OttieniCommentiUtenti(uusername)
    print(f"Dati ricevuti: {uusername}")
    results = []
    for row in rows:
        results.append({
            "bookdesc": row[3],
            "username": row[6],
            "commentID": row[0],
            "book_id": row[2],
            "NomeLibro": row[13]
        })

       # Restituisci una risposta al frontend
    return jsonify(results)

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

@app.route('/getBookContent', methods=['POST']) 
def getBookContent():
    # Ricevi i dati JSON inviati dal frontend
    data = request.json

    # Esegui un'operazione sui dati (esempio: concatenare nome e cognome)
    idLibro = data.get("valorecercato")
    rows = ContenutoLibri(idLibro)
    print(f"Dati ricevuti: {idLibro}")
    print(f"Dati ricevuti: {rows}")
    results = []
    for row in rows:
        results.append({
            "bookname": row[0],
            "bookauthor": row[1],
            "bookdesc": row[2],
            "data_pubblicazione": row[3],
            "path": row[4]
        })

       # Restituisci una risposta al frontend
    return jsonify(results)

@app.route('/getBookComment', methods=['POST']) 
def coomentBookss():
    # Ricevi i dati JSON inviati dal frontend
    data = request.json

    # Esegui un'operazione sui dati (esempio: concatenare nome e cognome)
    idLibro = data.get("valorecercato")
    rows = commentiLibri(idLibro)
    print(f"Dati ricevuti: {idLibro}")
    print(f"Dati ricevuti: {rows}")
    results = []
    for row in rows:
        results.append({
            "contenuto": row[0],
            "username": row[1]
        })

       # Restituisci una risposta al frontend
    return jsonify(results)

@app.route('/getGenreBook', methods=['POST']) 
def genreBookss():
    # Ricevi i dati JSON inviati dal frontend
    data = request.json

    # Esegui un'operazione sui dati (esempio: concatenare nome e cognome)
    idLibro = data.get("valorecercato")
    rows = getGerne(idLibro)
    results = []
    for row in rows:
        results.append({
            "Genere": row[0]
        })

       # Restituisci una risposta al frontend
    return jsonify(results)

@app.route('/getSimilarBook', methods=['POST']) 
def similarBookss():
    # Ricevi i dati JSON inviati dal frontend
    data = request.json

    # Esegui un'operazione sui dati (esempio: concatenare nome e cognome)
    arrayGeneri = data.get("valorecercato",[])
    iddanonusare = data.get("idlibrodaevitare")
    rows = getSimilar(arrayGeneri,iddanonusare)
    results = []
    for row in rows:
        results.append({
            "id" : row[0],
            "titolo": row[1],
            "imagePath": row[2]
        })

       # Restituisci una risposta al frontend
    return jsonify(results)

@app.route('/getLinkBook', methods=['POST']) 
def LinkBookss():
    # Ricevi i dati JSON inviati dal frontend
    data = request.json

    # Esegui un'operazione sui dati (esempio: concatenare nome e cognome)
    idLibro = data.get("valorecercato")
    rows = getLink(idLibro)
    results = []
    for row in rows:
        results.append({
            "nomeLink": row[0],
            "link": row[1]
        })

       # Restituisci una risposta al frontend
    return jsonify(results)

@app.route('/regCommento', methods=['POST']) 
def registrazioneCommento():
    # Ricevi i dati JSON inviati dal frontend
    data = request.json

    # Esegui un'operazione sui dati (esempio: concatenare nome e cognome)
    Commento = data.get("Commento")
    BookID = data.get("BookId")
    creatore = data.get("Creatore")
    risultato = regCommento(Commento,BookID,creatore)

    # Stampa i dati nel terminale (debug)
    print(f"Dati ricevuti: {data}")

       # Restituisci una risposta al frontend
    return jsonify({'message': risultato})

if __name__ == '__main__':
    app.run(debug=True)