async function deleteBook(bookId){
    const registerData = {
        valorecercato: bookId,
    };
    try {
        // Invia i dati al backend Flask
        const response = await fetch('http://127.0.0.1:5000/deleteBook', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registerData)
        });

        console.log(response.message);
        location.reload();
    }catch(error){
        console.error("Errore durante l'invio dei dati:", error);
    }
}
async function deleteComment(commentId){
    const registerData = {
        valorecercato: commentId,
    };
    try {
        // Invia i dati al backend Flask
        const response = await fetch('http://127.0.0.1:5000/deleteComment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registerData)
        });

        console.log(response.message);
        location.reload();
    }catch(error){
        console.error("Errore durante l'invio dei dati:", error);
    }
}

document.addEventListener("DOMContentLoaded", async function () {
    function getQueryParameter(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    const searchTerm = getQueryParameter("utente");

    if (searchTerm) {
        const registerData = {
            valorecercato: searchTerm,
        };

        try {
            // Invia i dati al backend Flask
            const response = await fetch('http://127.0.0.1:5000/mybook', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(registerData)
            });

            const results = await response.json(); // Supponiamo che il backend restituisca un array di libri
            const resultsContainer = document.getElementById("resultssearching");
            const paginationContainer = document.querySelector(".pagination");
            const itemsPerPage = 4; // Numero di elementi per pagina
            let currentPage = 1;
            // Funzione per creare un blocco dinamico
            function createBlock(book) {
                const box = document.createElement("div");
                const insidebox = document.createElement("div");
                const image = document.createElement("img");
                const desc = document.createElement("div");
                const bookname = document.createElement("div");
                const commentoLibro = document.createElement("div");
                const deleteButton = document.createElement("i");
                const pending = document.createElement("i");
                const divView = document.createElement("div");
                // Assegna classi e ID
                box.className = "box";
                insidebox.className = "insidebox";

                divView.style.display = "flex";
                divView.style.position = "absolute";
                pending.style.width ="48px";
                pending.classList.add("material-icons");
                pending.textContent= "pending_actions";
                pending.style.color = "orange";
                pending.style.fontSize = "48px";
                if(book.isApproved == 1){
                    pending.style.display = "none";
                }

                deleteButton.classList.add("material-icons");
                deleteButton.textContent = "delete";
                deleteButton.style.color = "red";
                deleteButton.style.fontSize = "48px";
                deleteButton.style.cursor= "pointer";

                image.className = "pop";
                image.src = book.path;
                image.alt = "Book Image"; // Alt per accessibilità

                desc.className = "descrizione";

                bookname.className = "NomeLibro";
                bookname.innerHTML = `<h1>${book.bookname}</h1>`; // Contenuto dinamico

                commentoLibro.className = "commentolibro";
                commentoLibro.innerHTML = `<p>${book.bookdesc}</p>`; // Contenuto dinamico

                // Costruzione della gerarchia
                desc.appendChild(bookname);
                desc.appendChild(commentoLibro);

                insidebox.appendChild(image);
                insidebox.appendChild(desc);

                box.appendChild(insidebox);
                insidebox.appendChild(divView);
                divView.appendChild(pending);
                divView.appendChild(deleteButton);
                // Aggiungi un listener per il click sul blocco
                deleteButton.addEventListener("click", function (event) {
                    deleteBook(book.bookId);
                    event.stopPropagation();
                });
                if(book.isApproved == 1){
                    box.addEventListener("click", () => {
                        window.location.href = `bookpage.html?id=${book.bookId}`;
                    });
                }else{
                    box.addEventListener("click", () => {
                        alert("Il libro deve ancora essere approvato");
                    });
                }
                return box;
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
        } catch (error) {
            console.error("Errore durante l'invio dei dati:", error);
        }
    }
});

document.addEventListener("DOMContentLoaded", async function () {
    function getQueryParameter(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    const searchTerm = getQueryParameter("imieicommenti");

    if (searchTerm) {
        const registerData = {
            valorecercato: searchTerm,
        };

        try {
            // Invia i dati al backend Flask
            const response = await fetch('http://127.0.0.1:5000/getUsercomment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(registerData)
            });

            const results = await response.json(); // Supponiamo che il backend restituisca un array di libri
            const resultsContainer = document.getElementById("resultssearching");
            const paginationContainer = document.querySelector(".pagination");
            const itemsPerPage = 4; // Numero di elementi per pagina
            let currentPage = 1;
            
            // Funzione per creare un blocco dinamico
            function createBlock(book) {
                const commentDiv = document.createElement("div");
                const accountDiv = document.createElement("div");
                const fotoPersonaDiv = document.createElement("div");
                const nomePersonaDiv = document.createElement("div");
                const boxingDiv = document.createElement("div");
                const deleteButton = document.createElement("i");

                // Assegnazione degli ID e delle classi
                commentDiv.id = "commento";
                commentDiv.className = "Comment";
                
                deleteButton.classList.add("material-icons");
                deleteButton.textContent = "delete";
                deleteButton.style.color = "red";
                deleteButton.style.fontSize = "48px";

                accountDiv.id = "accoint";
                accountDiv.className = "Account";

                nomePersonaDiv.id = "nomepersona";
                nomePersonaDiv.className = "NomeTizio";

                boxingDiv.id = "boxingg";
                boxingDiv.className = "Boxing";

                deleteButton.style.right = "0%";
                deleteButton.style.position = "absolute";
                deleteButton.style.top = "0%";
                // Contenuto dinamico
                nomePersonaDiv.innerHTML = `<h3>Commento del libro: ${book.NomeLibro}</h3>`;
                boxingDiv.textContent = book.bookdesc;
                deleteButton.style.cursor= "pointer";
                // Costruzione della gerarchia
                accountDiv.appendChild(nomePersonaDiv);

                commentDiv.appendChild(accountDiv);
                commentDiv.appendChild(boxingDiv);

                // Aggiungi il commento al contenitore principale
                const commentContainer = document.getElementById("commentContainer");
                commentContainer.appendChild(commentDiv);
                commentDiv.appendChild(deleteButton);

                deleteButton.addEventListener("click", function (event) {
                    deleteComment(book.commentID);
                    event.stopPropagation();
                    
                });

                commentDiv.addEventListener("click", () => {
                    window.location.href = `bookpage.html?id=${book.book_id}`;
                });
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
        } catch (error) {
            console.error("Errore durante l'invio dei dati:", error);
        }
    }
});

