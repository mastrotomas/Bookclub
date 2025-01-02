const slides = document.querySelectorAll(".slides img");
const form = document.getElementById('dataForm');
const registerform = document.getElementById('registerForm');

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
})



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


