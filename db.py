import  mysql.connector
import re

def getConnection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="Root@Esame123",
        database="bookclub"
    )
#Se ritorna 0 lutente non esiste, 1 tutto ok, 2 password errata, 3 se è admin
def checkUserData(username,password):
    conn = getConnection()
    cursor = conn.cursor()
    query = "SELECT count(*) FROM users WHERE username = %s AND password = %s"
    cursor.execute(query, (username,password))
    rows = cursor.fetchone()
    if(rows[0] == 0):
        queryusername = "SELECT count(*) FROM users WHERE username = %s"
        cursor.execute(queryusername, (username,))
        ciao = cursor.fetchone()
        if(ciao[0] == 1):
            cursor.close()
            conn.close()
            return 2
        else:
            cursor.close()
            conn.close()
            return 0
    else:
        queryadmin="SELECT e_admin FROM users WHERE username = %s"
        cursor.execute(queryadmin,(username,))
        ad=cursor.fetchone()
        if(ad[0] == 1) :
            cursor.close()
            conn.close()
            return 3
        else :
            cursor.close()
            conn.close()
            return rows[0]

def addNewUser(username,email,password):
    conn = getConnection()
    cursor = conn.cursor()
    e="SELECT COUNT(*) FROM users WHERE username= %s"
    cursor.execute(e,(username,))
    num_u=cursor.fetchone()
    e1="SELECT COUNT(*) FROM users WHERE email= %s"
    cursor.execute(e1,(email,))
    num_e=cursor.fetchone()
    if (num_e == 1 or num_u == 1):
        return 0
    else:
        query = "INSERT INTO users (username, email,password,e_admin) VALUES (%s,%s,%s,%s)"
        cursor.execute(query, (username,email,password,False))
        conn.commit()
        cursor.close()
        conn.close()
        return 1
    

def searchBooks(titoloLibro):
    conn = getConnection()
    cursor = conn.cursor()
    query = "SELECT * FROM books WHERE titolo LIKE %s AND isApproved = 1;"
    cursor.execute(query, (f"%{titoloLibro}%",))
    rows = cursor.fetchall()
    cursor.close()
    conn.close()
    return rows

def categoryBooks(titoloLibro):
    conn = getConnection()
    cursor = conn.cursor()
    query = "SELECT * FROM books a JOIN book_genres b ON a.id = b.book_id JOIN genres c ON b.genre_id = c.genre_id WHERE isApproved = 1 AND c.name = %s;"
    cursor.execute(query, (titoloLibro,))
    rows = cursor.fetchall()
    cursor.close()
    conn.close()
    return rows

def ricercapergenere(titoloLibro,type):
    res_list = []
    res_list = re.findall('[A-Z][^A-Z]*', type)
    stringa = ""
    
    for i in range(len(res_list)):
        if(stringa == ""):
            stringa = '%s'
        else:
            stringa = stringa + ',' + '%s'
    
    conn = getConnection()
    cursor = conn.cursor()

    if(len(res_list) == 1):
        query = f"SELECT DISTINCT id,titolo,descrizione,imagePath FROM books a JOIN book_genres b ON a.id = b.book_id JOIN genres c ON b.genre_id = c.genre_id WHERE titolo LIKE %s AND isApproved = 1 AND c.name = {stringa}"
    else:
        query = f"SELECT DISTINCT id,titolo,descrizione,imagePath  FROM books a JOIN book_genres b ON a.id = b.book_id JOIN genres c ON b.genre_id = c.genre_id WHERE titolo LIKE %s AND isApproved = 1 AND c.name IN ({stringa})"
    parametri = (f"%{titoloLibro}%",) + tuple(res_list)
    cursor.execute(query, parametri)
    rows = cursor.fetchall()
    cursor.close()
    conn.close()
    return rows

def myBook(username):
    conn = getConnection()
    cursor = conn.cursor()
    getIdFromUsername = "SELECT id FROM users WHERE username = %s"
    cursor.execute(getIdFromUsername,(username,))
    idpersona = cursor.fetchone()
    query = "SELECT * FROM books WHERE Aggiunto_da = %s"
    cursor.execute(query, (idpersona))
    rows = cursor.fetchall()
    cursor.close()
    conn.close()
    return rows

def getNew(valore,nomeUtente):
    conn = getConnection()
    cursor = conn.cursor()
    if(valore == 0):
        query = "SELECT id,titolo,imagePath FROM books"
        cursor.execute(query)
    elif(valore == 1):
        query = "SELECT id,titolo,imagePath FROM books ORDER BY clicked DESC"
        cursor.execute(query)
    else:
        queryPreferenze = "SELECT preferenze FROM users WHERE username = %s"
        cursor.execute(queryPreferenze,(nomeUtente,))
        Preferences = cursor.fetchone()
        if(Preferences[0]):
            res_list = []
            res_list = re.findall('[A-Z][^A-Z]*', Preferences[0])
            stringa = ""
        
            for i in range(len(res_list)):
                if(stringa == ""):
                    stringa = '%s'
                else:
                    stringa = stringa + ',' + '%s'

            queryTotale = f"SELECT DISTINCT id,titolo,imagePath FROM books a JOIN book_genres b ON a.id = b.book_id JOIN genres c ON b.genre_id = c.genre_id WHERE isApproved = 1 AND c.name IN ({stringa})"
            params = tuple(res_list)
            cursor.execute(queryTotale,params)
        else:
            query = "SELECT id,titolo,imagePath FROM books"
            cursor.execute(query)
    rows = cursor.fetchall()
    cursor.close()
    conn.close()
    return rows

def ContenutoLibri(idLibro):
    conn = getConnection()
    cursor = conn.cursor()
    queryIncremento = "UPDATE books SET clicked = clicked + 1 WHERE id = %s"
    cursor.execute(queryIncremento,(idLibro,))
    conn.commit()
    query = "SELECT titolo,autore,descrizione,data_pubblicazione,imagePath FROM books WHERE id = %s"
    cursor.execute(query, (idLibro,))
    rows = cursor.fetchall()
    cursor.close()
    conn.close()
    return rows

def getSimilar(arrayGeneri,iddanonusare):
    stringa = ""
    for i in range(len(arrayGeneri)):
        if(stringa == ""):
            stringa = '%s' 
        else:
            stringa = stringa + ',' + '%s' 
            
    conn = getConnection()
    cursor = conn.cursor()
    query = f"SELECT DISTINCT id,titolo,imagePath  FROM books a JOIN book_genres b ON a.id = b.book_id JOIN genres c ON b.genre_id = c.genre_id WHERE isApproved = 1 AND c.name IN ({stringa}) AND a.id != %s"
    parametri = tuple(arrayGeneri) + (iddanonusare,)
    cursor.execute(query, parametri)
    rows = cursor.fetchall()
    cursor.close()
    conn.close()
    return rows

def getUserData(username):
    conn = getConnection()
    cursor = conn.cursor()
    query = "SELECT email,Preferenze FROM users WHERE username = %s "
    cursor.execute(query, (username,))
    rows = cursor.fetchone()
    cursor.close()
    conn.close()
    return rows

def userUpdate(OGusername,username,email,password,passwordconf,Generi):
    filtrati = {key: value for key, value in Generi.items() if value}
    array = ""
    for nomeLink, urlLink in filtrati.items():
        array = array + nomeLink
    print(array)
    conn = getConnection()
    cursor = conn.cursor()
    queryControllo = "SELECT password FROM users WHERE username = %s"
    cursor.execute(queryControllo,(OGusername,))
    passwordcheck = cursor.fetchone()
    if(passwordcheck[0] == passwordconf):
        if(password != "undefined"):
            if(password):
                query = "UPDATE users SET username = %s, email = %s, password = %s, Preferenze = %s WHERE username = %s"
                cursor.execute(query, (username,email,password,array,OGusername,))
                conn.commit()
                cursor.close()
                conn.close()
                return 1
            else:
                return 0
        else:
            query = "UPDATE users SET username = %s, email = %s, Preferenze = %s WHERE username = %s"
            cursor.execute(query, (username,email,array,OGusername))
            conn.commit()
            cursor.close()
            conn.close()
            return 1
    else:
        cursor.close()
        conn.close()
        return 0
    

def commentiLibri(idLibro):
    conn = getConnection()
    cursor = conn.cursor()
    query = "SELECT contenuto,username FROM commenti a JOIN users b ON a.user_id = b.id WHERE book_id = %s"
    cursor.execute(query, (idLibro,))
    rows = cursor.fetchall()
    cursor.close()
    conn.close()
    return rows

def RegisterBook(titolo, autore, sinossi, creato_da, Generi, file_path, Link, annoproduzione):
    filtrati = {key: value for key, value in Generi.items() if value}  # Filtra i generi selezionati

    conn = getConnection()
    cursor = conn.cursor()
    try:
        getIdFromUsername = "SELECT id FROM users WHERE username = %s"
        cursor.execute(getIdFromUsername,(creato_da,))
        idpersona = cursor.fetchone()
        # Inserisci il libro nella tabella "books"
        query = """
        INSERT INTO books (titolo, autore, descrizione,data_pubblicazione, imagePath, aggiunto_da)
        VALUES (%s, %s, %s,%s, %s, %s)
        """
        cursor.execute(query, (titolo, autore, sinossi,annoproduzione, file_path, creato_da))
        last_id = cursor.lastrowid
        cursor.execute("UPDATE books SET Aggiunto_da = %s WHERE id = %s",(idpersona[0],last_id,))

        # Inserisci i generi nella tabella di associazione
        for nomefiltrati in filtrati:
            query2 = "SELECT genre_id FROM genres WHERE name = %s"
            cursor.execute(query2, (nomefiltrati,))
            idgenere = cursor.fetchone()

            if idgenere:
                id_gen = idgenere[0]
                query3 = "INSERT INTO book_genres (book_id, genre_id) VALUES (%s, %s)"
                cursor.execute(query3, (last_id, id_gen))

        for nomeLink, urlLink in Link.items():
            if urlLink:
                queryLink = "INSERT INTO BookLink (book_id,nomeLink,link) VALUE (%s,%s,%s)"
                cursor.execute(queryLink,(last_id,nomeLink,urlLink))

        conn.commit()
    except Exception as e:
        conn.rollback()
        print(f"Errore durante l'inserimento nel database: {e}")
    finally:
        cursor.close()
        conn.close()


def OttieniCommentiUtenti(username):
    conn = getConnection()
    cursor = conn.cursor()
    query = "SELECT * FROM commenti a JOIN users b ON a.user_id = b.id JOIN books c ON a.book_id = c.id WHERE username = %s"
    cursor.execute(query, (username,))
    rows = cursor.fetchall()
    cursor.close()
    conn.close()
    return rows

def deletemyBook(idLibro):
    conn = getConnection()
    cursor = conn.cursor()
    query = "DELETE FROM books WHERE id = %s"
    cursor.execute(query, (idLibro,))
    conn.commit()
    cursor.close()
    conn.close()


def deletemyComment(idCommento):
    conn = getConnection()
    cursor = conn.cursor()
    query = "DELETE FROM commenti WHERE id = %s"
    cursor.execute(query, (idCommento,))
    conn.commit()
    cursor.close()
    conn.close()

def regCommento(Commento,BookID,creatore):
    if(Commento):
        conn = getConnection()
        cursor = conn.cursor()
        nome = "SELECT id FROM users WHERE username = %s"
        cursor.execute(nome, (creatore,))
        iddausare = cursor.fetchone()
        query = "INSERT INTO commenti (user_id,book_id,contenuto) VALUES (%s,%s,%s)"
        cursor.execute(query, (iddausare[0],BookID,Commento))
        conn.commit()
        cursor.close()
        conn.close()
        return 1
    else:
        return 0


def getGerne(idLibro):
    conn = getConnection()
    cursor = conn.cursor()
    query = "SELECT name FROM book_genres a JOIN genres b ON a.genre_id = b.genre_id WHERE book_id = %s"
    cursor.execute(query, (idLibro,))
    rows = cursor.fetchall()
    cursor.close()
    conn.close()
    return rows

def getLink(idLibro):
    conn = getConnection()
    cursor = conn.cursor()
    query = "SELECT nomeLink,link FROM BookLink WHERE book_id = %s"
    cursor.execute(query, (idLibro,))
    rows = cursor.fetchall()
    cursor.close()
    conn.close()
    return rows

def get_bookad():
    conn = getConnection()
    cursor = conn.cursor()
    cursor.execute("SELECT u.username, u.email, b.titolo,b.autore, b.descrizione, b.id FROM books AS b JOIN users AS u ON b.Aggiunto_Da=u.id where b.isApproved=0")
    rows = cursor.fetchall()
    cursor.close()
    conn.close()
    return rows


def accept_bookad(id) :
    conn = getConnection()
    cursor = conn.cursor()
    query ="UPDATE books SET isApproved = True WHERE id=%s"
    cursor.execute(query,(id,))
    conn.commit()
    cursor.close()
    conn.close()

def refuse_bookad(id) :
    conn = getConnection()
    cursor = conn.cursor()
    query ="DELETE FROM books WHERE id=%s"
    cursor.execute(query,(id,))
    conn.commit()
    cursor.close()
    conn.close()
