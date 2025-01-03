async function getCommentForBooks(bookId){
    const registerData = {
        valorecercato: bookId,
    };
    try {
        // Invia i dati al backend Flask
        const response = await fetch('http://127.0.0.1:5000/getBookComment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registerData)
        });
        const results = await response.json();
        const resultsContainer = document.getElementById("resultssearching");
        const paginationContainer = document.querySelector(".pagination");
        const itemsPerPage = 4; // Numero di elementi per pagina
        let currentPage = 1;

        function createBlock(book) {
            const commentDiv = document.createElement("div");
            const accountDiv = document.createElement("div");
            const fotoPersonaDiv = document.createElement("div");
            const nomePersonaDiv = document.createElement("div");
            const boxingDiv = document.createElement("div");

            // Assegnazione degli ID e delle classi
            commentDiv.id = "commento";
            commentDiv.className = "Comment";

            accountDiv.id = "accoint";
            accountDiv.className = "Account";

            fotoPersonaDiv.id = "fotopersona";
            fotoPersonaDiv.className = "fototizio";

            nomePersonaDiv.id = "nomepersona";
            nomePersonaDiv.className = "NomeTizio";

            boxingDiv.id = "boxingg";
            boxingDiv.className = "Boxing";

            // Contenuto dinamico
            nomePersonaDiv.innerHTML = `<h3>${book.username}</h3>`;
            boxingDiv.textContent = book.contenuto;

            // Costruzione della gerarchia
            accountDiv.appendChild(fotoPersonaDiv);
            accountDiv.appendChild(nomePersonaDiv);

            commentDiv.appendChild(accountDiv);
            commentDiv.appendChild(boxingDiv);

            // Aggiungi il commento al contenitore principale
            const commentContainer = document.getElementById("commentContainer");
            commentContainer.appendChild(commentDiv);

            return commentDiv;
        }
        
        // Funzione per mostrare i blocchi della pagina corrente
        function showPage(page) {
            const start = (page - 1) * itemsPerPage;
            const end = start + itemsPerPage;

            // Pulisce il contenitore
            resultsContainer.innerHTML = "";

            // Mostra i blocchi della pagina corrente
            results.slice(start, end).forEach((book) => {
                const block = createBlock(book);
                resultsContainer.appendChild(block);
            });

            // Aggiorna i pulsanti di navigazione
            document.querySelectorAll(".pagination button").forEach((button, index) => {
                button.classList.toggle("active", index + 1 === page);
            });
        }

        // Funzione per creare i pulsanti di navigazione
        function createPagination() {
            const totalPages = Math.ceil(results.length / itemsPerPage);
            paginationContainer.innerHTML = ""; // Pulisce i pulsanti esistenti
            for (let i = 1; i <= totalPages; i++) {
                const button = document.createElement("button");
                button.textContent = i;
                if (i === currentPage) button.classList.add("active");
                button.addEventListener("click", () => {
                    currentPage = i;
                    showPage(currentPage);
                });
                paginationContainer.appendChild(button);
            }
        }

        // Inizializza la paginazione
        createPagination();
        showPage(currentPage);
    }catch(error){
        console.error("Errore durante l'invio dei dati:", error);
    }
}

async function getGenreForBooks(bookId){
    const registerData = {
        valorecercato: bookId,
    };
    try {
        // Invia i dati al backend Flask
        const response = await fetch('http://127.0.0.1:5000/getGenreBook', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registerData)
        });
        const results = await response.json();
        let testoinsieme = '';
        let generi = []
        results.forEach(book =>{
            testoinsieme += book.Genere;
            testoinsieme += ' ';
            generi.push(book.Genere);
        })
        document.getElementById("GenereLibro").textContent = testoinsieme;
        document.getElementById("GenereLibro").style.wordSpacing = "10px";
        getSimilarBook(generi,bookId);
    }catch(error){
        console.error("Errore durante l'invio dei dati:", error);
    }
}

async function getSimilarBook(generi,id){
    const registerData = {
        valorecercato: generi,
        idlibrodaevitare: id,
    };
    try {
        // Invia i dati al backend Flask
        const response = await fetch('http://127.0.0.1:5000/getSimilarBook', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registerData)
        });
        const results = await response.json();
        const scrollDiv = document.getElementById("scrollDiv");
        results.forEach(book =>{
            const libro = document.createElement("div");
            const image = document.createElement("img");
            const nomeLibro = document.createElement("div");
            const name = document.createElement("p");
            libro.className = "book";

            nomeLibro.className = "bookName";
            image.src = book.imagePath;
            name.textContent = book.titolo;
            scrollDiv.appendChild(libro);
            libro.appendChild(image);
            libro.appendChild(nomeLibro);
            nomeLibro.appendChild(name);

            libro.addEventListener("click", () => {
                window.location.href = `bookpage.html?id=${book.id}`;
            });
        })

    }catch(error){
        console.error("Errore durante l'invio dei dati:", error);
    }
}

async function getLinkForBooks(bookId){
    const registerData = {
        valorecercato: bookId,
    };
    try {
        // Invia i dati al backend Flask
        const response = await fetch('http://127.0.0.1:5000/getLinkBook', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registerData)
        });
        const results = await response.json();
        const divbottoni = document.getElementById("divPerBottoniLink");

        results.forEach(link =>{
            let linkVar = link.link + "";
            if(!linkVar.startsWith('https://')){
                linkVar = 'https://' + linkVar;
            }
            const button = document.createElement("button");
            button.className = "buttonStyle";
            button.textContent = link.nomeLink;
            button.addEventListener("click", () =>{
                window.open(linkVar, '_blank');
            })
            divbottoni.appendChild(button);
        })
    }catch(error){
        console.error("Errore durante l'invio dei dati:", error);
    }
}


document.addEventListener("DOMContentLoaded", async function () {
    // Funzione per ottenere i parametri della query string
    function getQueryParameter(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    const bookId = getQueryParameter("id");

    if (bookId) {

        const registerData = {
            valorecercato: bookId,
        };

        try {
            const response = await fetch('http://127.0.0.1:5000/getBookContent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(registerData)
            });

            const results = await response.json(); // Supponiamo che il backend restituisca un array di libri
            const titololibro = document.getElementById("TitoloLibro");
            titololibro.textContent = results[0].bookname;
            const autorelibro = document.getElementById("AutoreLibro");
            autorelibro.textContent = results[0].bookauthor;
            const sinossilibro = document.getElementById("SinossiLibro");
            sinossilibro.textContent = results[0].bookdesc;
            const data_pubblicazione = document.getElementById("AnnoProduzione");
            const Data = new Date(results[0].data_pubblicazione)
            data_pubblicazione.textContent = Data.toISOString().split('T')[0];
            const Copertina = document.getElementById("ImmagineCopertina");
            Copertina.src = results[0].path;
            getCommentForBooks(bookId);
            getGenreForBooks(bookId);
            getLinkForBooks(bookId);
            
        } catch (error) {
            console.error("Errore durante l'invio dei dati:", error);
        }
    }
});

document.getElementById('addComment').addEventListener('submit', async (e) => {
    if(localStorage.getItem("nomeUtenteLoggato")){
    e.preventDefault();
    function getQueryParameter(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    const searchTerm = getQueryParameter("id");
    const registerDataa = {
        Commento: document.getElementById("registrazioneCommentoLibro").value,
        BookId: searchTerm,
        Creatore: localStorage.getItem("nomeUtenteLoggato")
    };

    try {
        // Invia i dati al backend Flask
        const response = await fetch('http://127.0.0.1:5000/regCommento', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registerDataa)
        });

        // Ricevi e mostra la risposta dal server
        const result = await response.json();
        if(result.message == 0){
            document.getElementById("registrazioneCommentoLibro").placeholder = "Inserisci un commento";
        }else{
        location.reload();
        }
    } catch (error) {
        console.error('Errore durante l\'invio dei dati:', error);
        document.getElementById('response').textContent = "Errore durante la registrazione";
    }
    }else{
        e.preventDefault();
        document.getElementById('rispostaNonLoggato').style.opacity = 1;
        setTimeout(() => {
            document.getElementById('rispostaNonLoggato').style.opacity = 0;
        }, 5000);
    }
});
