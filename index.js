const slides = document.querySelectorAll(".slides img");
const form = document.getElementById('dataForm');
const registerform = document.getElementById('registerForm');
window.GeneridiLibro = ["Racconto","Letteratura","Romanzo","Fantasy",
    "Romanzo di Formazione","Fantastico","Giallo","Thriller",
    "Drammatico","Sentimentale","Storico","Gotico","Filosofico",
    "Horror","Fantascienza","Politica","Economia","Diritto",
    "Biografia","Casa","Arte","Poetico","Educazione","Viaggi",
    "Psicologia","Religione","Salute e Benessere","Scienza","Sport"];
let slideIndex = 0;
let intervalId = null;

document.addEventListener("DOMContentLoaded", initializeSlider);
const sideBar = document.getElementById("sideBar");
const Logi = document.getElementById("buttonLogin");
const Regi = document.getElementById("register");
const RegiS = document.getElementById("registerScreen");
const LoginS = document.getElementById("LoginScreen");
const sideBarExi = document.getElementById("sideBarExit");
const blacklayer = document.getElementById("blackLayer");
const boi = document.getElementById("corpo");
const responseLogin = document.getElementById("response");
const ToolLogin = document.getElementById("loggedTool");
const buttonExit = document.getElementById("exitButton");
const searchInput = document.getElementById("searchINput");

function initializeSlider() {
    if (slides.length > 0) {
        slides[slideIndex].classList.add("displaySlide");
        intervalId = setInterval(nextSlide, 5000);
    }
}

function showSlide(index) {
    if (index >= slides.length) {
        slideIndex = 0;
    }
    else if (index < 0) {
        slideIndex = slides.length - 1;
    }

    slides.forEach(slide => {
        slide.classList.remove("displaySlide");
    });
    slides[slideIndex].classList.add("displaySlide");
}

function prevSlide() {
    clearInterval(intervalId);
    intervalId = setInterval(nextSlide, 5000);
    slideIndex--;
    showSlide(slideIndex);
}

function nextSlide() {
    clearInterval(intervalId);
    intervalId = setInterval(nextSlide, 5000);
    slideIndex++;
    showSlide(slideIndex);
}





register.addEventListener("click", () => {

    if (RegiS.classList.contains("Registrazione")) {
        LoginS.classList.replace("LoginAppear", "Login");
        blacklayer.classList.toggle("blackLayerEnabled");
        boi.classList.toggle("scrollBlock");
        RegiS.classList.replace("Registrazione", "RegistrazioneAppear");
        blacklayer.classList.toggle("blackLayerEnabled");
        boi.classList.toggle("scrollBlock");
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
    }

})

Logi.addEventListener("click", () => {

    if (LoginS.classList.contains("Login")) {
        LoginS.classList.replace("Login", "LoginAppear");
        blacklayer.classList.toggle("blackLayerEnabled");
        boi.classList.toggle("scrollBlock");
    } else {
        LoginS.classList.replace("LoginAppear", "Login");
        blacklayer.classList.toggle("blackLayerEnabled");
        boi.classList.toggle("scrollBlock");
    }

})

blacklayer.addEventListener("click", () => {

    if (sideBar.classList.contains("sideBar") && LoginS.classList.contains("LoginAppear")) {
        LoginS.classList.replace("LoginAppear", "Login");
        blacklayer.classList.toggle("blackLayerEnabled");
        boi.classList.toggle("scrollBlock");
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
    } else if (sideBar.classList.contains("SideMenuEnabled") && LoginS.classList.contains("Login")) {
        sideBarExi.classList.replace("buttonMorph", "buttonStyle");
        openNav();
    } else if (sideBar.classList.contains("sideBar") && LoginS.classList.contains("Login") && RegiS.classList.contains("RegistrazioneAppear")) {
        registrationBack();
    }


})


function passaggioCategoria(text){
    window.location.href = `searchIndex.html?category=${text}`;
}


searchInput.addEventListener("keydown", async function (event) {
    if (event.key === "Enter") {
        event.preventDefault(); //inmpedisce che search funzioni come form e invii dati ricaricando la pagina. senno le funzioni sotto non vanno.
        const searchTerm = searchInput.value;
        if (searchTerm) {
            // Reindirizza alla nuova pagina con il termine di ricerca nell'URL
            window.location.href = `searchIndex.html?query=${encodeURIComponent(searchTerm)}`;
        }
    }
})



document.addEventListener("DOMContentLoaded", async function () {
    // Funzione per ottenere i parametri della query string
    function getQueryParameter(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    const searchTerm = getQueryParameter("query"); // Ottieni il termine di ricerca
    const searchtype = getQueryParameter("type");
    const category = getQueryParameter("category");

    if (searchtype) {
        const registerData = {
            valorecercato: searchTerm,
            generevalore: searchtype,
        };

        try {
            const response = await fetch('http://127.0.0.1:5000/bookspergenere', {
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

                // Assegna classi e ID
                box.className = "box";
                insidebox.className = "insidebox";

                image.className = "pop";
                image.src = book.imagePath;
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

                // Aggiungi un listener per il click sul blocco
                box.addEventListener("click", () => {
                    window.location.href = `bookpage.html?id=${book.bookId}`;
                });

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
    }else if(searchTerm){
        const registerData = {
            valorecercato: searchTerm,
        };

        try {
            const response = await fetch('http://127.0.0.1:5000/books', {
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

                // Assegna classi e ID
                box.className = "box";
                insidebox.className = "insidebox";

                image.className = "pop";
                image.src = book.imagePath;
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

                // Aggiungi un listener per il click sul blocco
                box.addEventListener("click", () => {
                    window.location.href = `bookpage.html?id=${book.bookId}`;
                });

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
    }else if(category){
        const registerData = {
            valorecercato: category,
        };

        try {
            const response = await fetch('http://127.0.0.1:5000/categoriadeilibri', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(registerData)
            });

            const results = await response.json(); // Supponiamo che il backend restituisca un array di libri
            document.getElementById("checkboxCategory").style.display ="none";
            document.getElementById("containerSearchingBox").style.justifyContent = "center";
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

                // Assegna classi e ID
                box.className = "box";
                insidebox.className = "insidebox";

                image.className = "pop";
                image.src = book.imagePath;
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

                // Aggiungi un listener per il click sul blocco
                box.addEventListener("click", () => {
                    window.location.href = `bookpage.html?id=${book.bookId}`;
                });

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


function openNav() {
    sideBar.classList.toggle("SideMenuEnabled");
    blacklayer.classList.toggle("blackLayerEnabled");
    boi.classList.toggle("scrollBlock");
}
function closeRegistration() {
    RegiS.classList.replace("RegistrazioneAppear", "Registrazione");
    blacklayer.classList.toggle("blackLayerEnabled");
    boi.classList.toggle("scrollBlock");
}
function registrationBack() {
    RegiS.classList.replace("RegistrazioneAppear", "Registrazione");
    blacklayer.classList.toggle("blackLayerEnabled");
    boi.classList.toggle("scrollBlock");
    LoginS.classList.replace("Login", "LoginAppear");
    blacklayer.classList.toggle("blackLayerEnabled");
    boi.classList.toggle("scrollBlock");
    document.getElementById("registerusername").value = "";
    document.getElementById("registeremail").value = "";
    document.getElementById("registerpassword").value = "";
}
function loginEffettuato(e_ad) {
    localStorage.setItem("isLoggedIn", "true");
    LoginS.classList.replace("LoginAppear", "Login");
    blacklayer.classList.toggle("blackLayerEnabled");
    boi.classList.toggle("scrollBlock");
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";

    Logi.classList.replace("material-icons", "hiddenbutton");
    document.getElementById("loggedTool").style.display = "block";
    if (e_ad==3)
    {
        localStorage.setItem("isAdmin", "true");
        document.getElementById("manageRequest").style.display= "block";
    }

}
function Logout() {
    localStorage.setItem("isLoggedIn", "false");
    Logi.classList.replace("hiddenbutton", "material-icons");
    document.getElementById("loggedTool").style.display = "none";
    window.location.href = `index.html`;
    localStorage.removeItem("nomeUtenteLoggato");
    localStorage.removeItem("isAdmin");
}

function goHome(){
    window.location.href = `index.html`;
}

buttonExit.addEventListener("click", () => {
    Logout();
})

window.addEventListener('DOMContentLoaded', () => {
    function getQueryParameter(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    if (localStorage.getItem("isLoggedIn") === 'true' && localStorage.getItem("isAdmin")==="true") {
        Logi.classList.replace("material-icons", "hiddenbutton");
        document.getElementById("loggedTool").style.display = "block";
        document.getElementById('buttonoLogin').textContent = localStorage.getItem("initialnameletter");
        document.getElementById("manageRequest").style.display = "block"; 
    } else if (localStorage.getItem("isLoggedIn") === 'true'){
        Logi.classList.replace("material-icons", "hiddenbutton");
        document.getElementById("loggedTool").style.display = "block";
        document.getElementById('buttonoLogin').textContent = localStorage.getItem("initialnameletter");
    }
    const contenitore = document.getElementById("SideBarContent");
    GeneridiLibro.forEach(categoria =>{
        const tasto = document.createElement("div");
        tasto.classList.add("elementoSideBar");
        tasto.textContent = categoria;
        tasto.addEventListener("click", () =>{
            window.location.href = `searchIndex.html?category=${categoria}`;
        })
        contenitore.appendChild(tasto);
    })
    const CategoryCheckBox = document.getElementById("ContainerCheckBoxCategory");
    const searchTerm = getQueryParameter("query");
    const catTerm = getQueryParameter("type");
    if(searchTerm || catTerm){

        GeneridiLibro.forEach(categoria =>{
            const label = document.createElement("label");
            label.textContent = categoria;
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.id = categoria;
            checkbox.value = categoria;
            checkbox.name = categoria;

            if(isIn(checkbox.id)){
                checkbox.checked = true;
            }

            label.appendChild(checkbox);
            CategoryCheckBox.appendChild(label);
        })
        localStorage.removeItem("Checked");
    }
})

function isIn(test){
    const savedData = localStorage.getItem("Checked");
    let count;
    if(savedData){
        const myArray = JSON.parse(savedData);
        myArray.forEach(chec =>{
            if(test == chec){
                count = true;
            }
        })
    }
    return count;
}

document.addEventListener("DOMContentLoaded", function () {
    const boxes = document.querySelectorAll(".results .box");
    const itemsPerPage = 4;
    const paginationContainer = document.querySelector(".pagination");
    let currentPage = 1;

    // Calcola il numero di pagine necessarie
    const totalPages = Math.ceil(boxes.length / itemsPerPage);

    // Funzione per mostrare i box della pagina corrente
    function showPage(page) {
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;

        // Nascondi tutti i box
        boxes.forEach((box, index) => {
            box.style.display = index >= start && index < end ? "block" : "none";
        });

        // Aggiorna i pulsanti di navigazione
        document.querySelectorAll(".pagination button").forEach((button, index) => {
            button.classList.toggle("active", index + 1 === page);
        });
    }

    //Funzione per creare i pulsanti di navigazione
    function createPagination() {
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
});

document.addEventListener("DOMContentLoaded", function () {
    const comments = document.querySelectorAll(".ContenitoreCommenti .Comment");
    const itemsPerPage = 4;
    const paginationContainer = document.querySelector(".pagination");
    let currentPage = 1;

    // Calcola il numero di pagine necessarie
    const totalPages = Math.ceil(comments.length / itemsPerPage);

    // Funzione per mostrare i commenti della pagina corrente
    function showPage(page) {
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;

        // Nascondi tutti i commenti
        comments.forEach((comment, index) => {
            comment.style.display = index >= start && index < end ? "block" : "none";
        });

        // Aggiorna i pulsanti di navigazione
        document.querySelectorAll(".pagination button").forEach((button, index) => {
            button.classList.toggle("active", index + 1 === page);
        });
    }

    // Funzione per creare i pulsanti di navigazione
    function createPagination() {
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
});

// Aggiungi un listener per l'invio del form
form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Evita il ricaricamento della pagina

    // Raccogli i dati del form
    const formData = {
        username: document.getElementById("username").value,
        password: document.getElementById("password").value
    };

    try {
        // Invia i dati al backend Flask
        const response = await fetch('http://127.0.0.1:5000/effettualogin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        // Ricevi e mostra la risposta dal server
        const result = await response.json();
        if (result.esito == 3 || result.esito == 1) {
            document.getElementById('response').textContent = "Login Effettuato";
            document.getElementById('response').style.opacity = 1;
            setTimeout(() => {
                document.getElementById('response').style.opacity = 0;
            }, 5000);
            loginEffettuato(result.esito);
            document.getElementById('buttonoLogin').textContent = result.initialnameletter;
            localStorage.setItem("initialnameletter", result.initialnameletter);
            localStorage.setItem("nomeUtenteLoggato", result.username);
            location.reload();
        } else if (result.esito == 2) {
            document.getElementById('response').textContent = "Password Errata";
            document.getElementById('response').style.opacity = 1;
            setTimeout(() => {
                document.getElementById('response').style.opacity = 0;
            }, 5000);
        } else {
            document.getElementById('response').textContent = "Utente non registrato";
            document.getElementById('response').style.opacity = 1;
            setTimeout(() => {
                document.getElementById('response').style.opacity = 0;
            }, 5000);
        }
    } catch (error) {
        console.error('Errore durante l\'invio dei dati:', error);
    }

});

registerform.addEventListener('submit', async (e) => {
    e.preventDefault(); // Evita il ricaricamento della pagina

    // Raccogli i dati del form
    const registerData = {
        username: document.getElementById("registerusername").value,
        email: document.getElementById("registeremail").value,
        password: document.getElementById("registerpassword").value
    };

    try {
        // Invia i dati al backend Flask
        const response = await fetch('http://127.0.0.1:5000/registerUtente', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registerData)
        });

        // Ricevi e mostra la risposta dal server
        const result = await response.json();
        document.getElementById('response').textContent = result.message;
        document.getElementById('response').style.color = result.color;
        document.getElementById('response').style.opacity = 1;
        setTimeout(() => {
            document.getElementById('response').style.opacity = 0;
        }, 5000);
    } catch (error) {
        console.error('Errore durante l\'invio dei dati:', error);
        document.getElementById('response').textContent = "Errore durante la registrazione";
    }

    registrationBack();
});



