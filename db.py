import  mysql.connector


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
  