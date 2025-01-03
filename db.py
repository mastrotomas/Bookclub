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

