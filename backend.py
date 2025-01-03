from flask import Flask, jsonify, request
from flask_cors import CORS
import os
import re
from db import checkUserData
from db import addNewUser
from db import searchBooks
from db import ContenutoLibri
from db import commentiLibri
from db import RegisterBook
from db import myBook
from db import OttieniCommentiUtenti
from db import deletemyBook
from db import deletemyComment
from db import regCommento
from db import getGerne
from db import getLink
from db import get_bookad
from db import accept_bookad
from db import refuse_bookad
from db import ricercapergenere
from db import getUserData
from db import userUpdate
from db import categoryBooks
from db import getSimilar
from db import getNew
app = Flask(__name__)
CORS(app)  # Abilita CORS per evitare errori cross-origin

@app.route('/mybook', methods=['POST'])
def mybooks():
    # Ricevi i dati JSON inviati dal frontend
    data = request.json

    # Esegui un'operazione sui dati (esempio: concatenare nome e cognome)
    uusername = data.get("valorecercato")
    rows = myBook(uusername)
    print(f"Dati ricevuti: {uusername}")
    results = []
    for row in rows:
        results.append({
            "bookId": row[0],
            "bookname": row[1],
            "bookdesc": row[3],
            "isApproved" : row[6],
            "path" : row[7]
        })

       # Restituisci una risposta al frontend
    return jsonify(results)

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

@app.route('/getUserData', methods=['POST'])
def getUsersData():
    # Ricevi i dati JSON inviati dal frontend
    data = request.json

    # Esegui un'operazione sui dati (esempio: concatenare nome e cognome)
    username = data.get("valorecercato")
    Email = getUserData(username)
    email = Email[0]
    preferenze = Email[1]
    res_list = []
    res_list = re.findall('[A-Z][^A-Z]*', preferenze)
    # Stampa i dati nel terminale (debug)

    # Restituisci una risposta al frontend
    return jsonify({'email': email , 'preferenze': res_list})


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

@app.route('/getNewBook', methods=['POST'])
def getNewBooks():
        # Ricevi i dati JSON inviati dal frontend
    data = request.json

    # Esegui un'operazione sui dati (esempio: concatenare nome e cognome)
    valore = data.get("valorecercato")
    nomeUtente = data.get("nomeUtente")
    rows = getNew(valore,nomeUtente)
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

UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), 'uploads')
os.makedirs(UPLOAD_FOLDER,exist_ok = True) #Crea la cartella se non esiste

@app.route('/registerLibri', methods=['POST'])
def registerLibri():
    # Ottieni i dati inviati dal frontend
    data = request.form
    file = request.files.get("copertina")  # Ottieni il file dal form

    # Verifica che il file sia presente
    if not file or file.filename == '':
        return jsonify({'error': 'Nessun file di copertina ricevuto'}), 400

    # Percorso completo per salvare il file
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(file_path)  # Salva il file fisicamente nella cartella

    relative_path = os.path.relpath(file_path, os.path.dirname(__file__))
    relative_path = relative_path.replace("\\","/")
    # Raccogli i dati del form
    titolo = data.get("titolo")
    autore = data.get("autore")
    sinossi = data.get("sinossi")
    creato_da = data.get("creatoda")
    annoproduzione = data.get("annoproduzione")
    Generi = {
        "Horror": data.get("Horror") == 'true',
        "Letteratura": data.get("Letteratura") == 'true',
        "Romanzo": data.get("Romanzo") == 'true',
        "Fantasy": data.get("Fantasy") == 'true',
        "Romanzo di formazione": data.get("Romanzo di formazione") == 'true',
        "Fantastico": data.get("Fantastico") == 'true',
        "Giallo": data.get("Giallo") == 'true',
        "Thriller": data.get("Thriller") == 'true',
        "Racconto": data.get("Racconto") == 'true',
        "Drammatico": data.get("Drammatico") == 'true',
        "Sentimentale": data.get("Sentimentale") == 'true',
        "Storico": data.get("Storico") == 'true',
        "Gotico": data.get("Gotico") == 'true',
        "Filosofico": data.get("Filosofico") == 'true',
        "Fantascienza": data.get("Fantascienza") == 'true',
        "Politica": data.get("Politica") == 'true',
        "Economia": data.get("Economia") == 'true',
        "Diritto": data.get("Diritto") == 'true',
        "Biografia": data.get("Biografia") == 'true',
        "Casa": data.get("Casa") == 'true',
        "Arte": data.get("Arte") == 'true',
        "Poetico": data.get("Poetico") == 'true',
        "Educazione": data.get("Educazione") == 'true',
        "Viaggi": data.get("Viaggi") == 'true',
        "Psicologia": data.get("Psicologia") == 'true',
        "Religione": data.get("Religione") == 'true',
        "Salute e Benessere": data.get("Salute e Benessere") == 'true',
        "Scienza": data.get("Scienza") == 'true',
        "Sport": data.get("Sport") == 'true'
    }
    Link ={
        "Amazon" : data.get("Amazon"),
        "Feltrinelli" : data.get("Feltrinelli"),
        "Mondadori" : data.get("Mondadori")
    }
    print(Generi)
    # Salva i dati nel database (funzione definita a parte)
    RegisterBook(titolo, autore, sinossi, creato_da, Generi, relative_path,Link,annoproduzione)

    return jsonify({'message': f'Libro "{titolo}" registrato con successo, file salvato in {file_path}'})

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

@app.route('/deleteBook', methods=['POST'])
def deleteBook():
    # Ricevi i dati JSON inviati dal frontend
    data = request.json

    # Esegui un'operazione sui dati (esempio: concatenare nome e cognome)
    idLibro = data.get("valorecercato")
    deletemyBook(idLibro)
    print(f"Dati ricevuti: {idLibro}")

       # Restituisci una risposta al frontend
    return jsonify({'message': 'eliminati'})

@app.route('/deleteComment', methods=['POST'])
def deleteComment():
    # Ricevi i dati JSON inviati dal frontend
    data = request.json

    # Esegui un'operazione sui dati (esempio: concatenare nome e cognome)
    idCommento = data.get("valorecercato")
    deletemyComment(idCommento)
    print(f"Dati ricevutiq: {idCommento}")

       # Restituisci una risposta al frontend
    return jsonify({'message': 'eliminati'})


@app.route('/admins', methods=['POST'])
def process_admin():
    # Ricevi i dati JSON inviati dal frontend
    data = request.json

    rows = get_bookad()
    results = []
    for row in rows :
        results.append({
            "username" : row[0],
            "email" : row[1],
            "titolo" : row[2],
            "autore" : row[3],
            "descrizione": row[4],
            "id" : row[5]
        })

    # Restituisci una risposta al frontend
    return jsonify(results)

@app.route('/accept', methods=['POST'])
def accept_admin():
    # Ricevi i dati JSON inviati dal frontend
    data = request.json
    id= data.get("valorecercato")
    accept_bookad(id)
    # Restituisci una risposta al frontend
    return jsonify({'message': 'approvato'})

@app.route('/refuse', methods=['POST'])
def refuse_admin():
    # Ricevi i dati JSON inviati dal frontend
    data = request.json
    id= data.get("valorecercato")
    refuse_bookad(id)
    # Restituisci una risposta al frontend
    return jsonify({'message': 'rifiutato'})


@app.route('/updateUser', methods=['POST'])
def user_update():
    # Ottieni i dati inviati dal frontend
    data = request.form

    OGusername = data.get("usernameOriginale")
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")
    passwordconf = data.get("passwordconf")
    Generi = {
        "Horror": data.get("Horror") == 'true',
        "Letteratura": data.get("Letteratura") == 'true',
        "Romanzo": data.get("Romanzo") == 'true',
        "Fantasy": data.get("Fantasy") == 'true',
        "Romanzo di formazione": data.get("Romanzo di formazione") == 'true',
        "Fantastico": data.get("Fantastico") == 'true',
        "Giallo": data.get("Giallo") == 'true',
        "Thriller": data.get("Thriller") == 'true',
        "Racconto": data.get("Racconto") == 'true',
        "Drammatico": data.get("Drammatico") == 'true',
        "Sentimentale": data.get("Sentimentale") == 'true',
        "Storico": data.get("Storico") == 'true',
        "Gotico": data.get("Gotico") == 'true',
        "Filosofico": data.get("Filosofico") == 'true',
        "Fantascienza": data.get("Fantascienza") == 'true',
        "Politica": data.get("Politica") == 'true',
        "Economia": data.get("Economia") == 'true',
        "Diritto": data.get("Diritto") == 'true',
        "Biografia": data.get("Biografia") == 'true',
        "Casa": data.get("Casa") == 'true',
        "Arte": data.get("Arte") == 'true',
        "Poetico": data.get("Poetico") == 'true',
        "Educazione": data.get("Educazione") == 'true',
        "Viaggi": data.get("Viaggi") == 'true',
        "Psicologia": data.get("Psicologia") == 'true',
        "Religione": data.get("Religione") == 'true',
        "Salute e Benessere": data.get("Salute e Benessere") == 'true',
        "Scienza": data.get("Scienza") == 'true',
        "Sport": data.get("Sport") == 'true'
    }
    esito = userUpdate(OGusername,username, email, password, passwordconf, Generi)

    return jsonify({'username': username,'firstletter': username[0],'esito': esito})

if __name__ == '__main__':
    app.run(debug=True)