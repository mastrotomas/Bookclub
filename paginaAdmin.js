async function accettaLibro(id)
{
    const registerData = {
        valorecercato: id,
    };

    try 
    {
        const response = await fetch('http://127.0.0.1:5000/accept', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registerData)
        });

        const results = await response.json(); // Supponiamo che il backend restituisca un array di libri
        location.reload();
    } catch (error) {
        console.error("Errore durante l'invio dei dati:", error);
    }
}

async function rifiutaLibro(id)
{
    const registerData = {
        valorecercato: id,
    };

    try 
    {
        const response = await fetch('http://127.0.0.1:5000/refuse', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registerData)
        });

        const results = await response.json(); // Supponiamo che il backend restituisca un array di libri
        location.reload();
    } catch (error) {
        console.error("Errore durante l'invio dei dati:", error);
    }
}

document.addEventListener("DOMContentLoaded", async function () {
    // Funzione per ottenere i parametri della query string
    function getQueryParameter(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    const bookId = getQueryParameter("admin");

    if (bookId) {

        const registerData = {
            valorecercato: bookId,
        };

        try {
            const response = await fetch('http://127.0.0.1:5000/admins', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(registerData)
            });

            const results = await response.json(); // Supponiamo che il backend restituisca un array di libri
            results.forEach(book => {
                const body= document.getElementById("adminPage");
                const riga = document.createElement("tr");
                const username1 = document.createElement("td");
                const email1 = document.createElement("td");
                const titolo1 = document.createElement("td");
                const autore = document.createElement("td");
                const descrizione = document.createElement("td");
                const bottoni = document.createElement("td");
                const bottone1 = document.createElement("button");
                const bottone2= document.createElement("button");
                riga.id="id_riga";
                bottoni.id="id_bottone";
                username1.textContent= book.username;
                email1.textContent=book.email;
                titolo1.textContent=book.titolo;
                autore.textContent=book.autore;
                descrizione.textContent=book.descrizione;
                bottone1.textContent="Approva";
                bottone2.textContent="Rifiuta";
                bottone1.className="button approve";
                bottone2.className="button reject";
                body.appendChild(riga);
                riga.appendChild(username1);
                riga.appendChild(email1);
                riga.appendChild(titolo1);
                riga.appendChild(autore);
                riga.appendChild(descrizione);
                riga.appendChild(bottoni);
                bottoni.appendChild(bottone1);
                bottoni.appendChild(bottone2);
                bottone1.addEventListener("click", ()=>{
                    accettaLibro(book.id);
                });
                bottone2.addEventListener("click", ()=>{
                    rifiutaLibro(book.id);
                });
            })
            
        } catch (error) {
            console.error("Errore durante l'invio dei dati:", error);
        }
    }
});