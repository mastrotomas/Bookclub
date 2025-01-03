const checkboxAmazon = document.getElementById("AmazonLink");
const checkboxFeltrinelli = document.getElementById("FeltrinelliLink");
const checkboxMondadori = document.getElementById("MondadoriLink");
const PhotoContaineer = document.getElementById("PhotoContainer");

PhotoContaineer.addEventListener("click", () => {
    const test2 = document.getElementById("FileUpload");
    test2.click();
})

checkboxAmazon.addEventListener("change", () =>{
    if(document.getElementById("LinkAmazonInsertion").classList.contains("linkHidded")){
        document.getElementById("LinkAmazonInsertion").classList.replace("linkHidded","linkOpened");
    }else{
        document.getElementById("LinkAmazonInsertion").classList.replace("linkOpened","linkHidded");
    }
    
})

checkboxFeltrinelli.addEventListener("change", () =>{
    if(document.getElementById("LinkFeltrinelliInsertion").classList.contains("linkHidded")){
        document.getElementById("LinkFeltrinelliInsertion").classList.replace("linkHidded","linkOpened");
    }else{
        document.getElementById("LinkFeltrinelliInsertion").classList.replace("linkOpened","linkHidded");
    }
    
})

checkboxMondadori.addEventListener("change", () =>{
    if(document.getElementById("LinkMondadoriInsertion").classList.contains("linkHidded")){
        document.getElementById("LinkMondadoriInsertion").classList.replace("linkHidded","linkOpened");
    }else{
        document.getElementById("LinkMondadoriInsertion").classList.replace("linkOpened","linkHidded");
    }
    
})

document.getElementById('RegisterBook').addEventListener('submit', async (e) => {
    e.preventDefault(); // Evita il ricaricamento della pagina
    // Raccogli i dati del form
    // Crea un oggetto FormData per inviare dati e file
    const formData = new FormData();

    // Aggiungi i dati del form
    formData.append("titolo", document.getElementById("registrazioneTitoloLibro").value);
    formData.append("autore", document.getElementById("registrazioneAutoreLibro").value);
    formData.append("sinossi", document.getElementById("registrazioneSinossiLibro").value);
    formData.append("annoproduzione", document.getElementById("registrazioneAnnoLibro").value);
    formData.append("creatoda", localStorage.getItem("nomeUtenteLoggato"));

    // Aggiungi i generi selezionati
    window.GeneridiLibro.forEach(genere => {
        formData.append(genere, document.getElementById(genere).checked);
    });

    formData.append("Amazon", document.getElementById("LinkAmazonInsertion").value);
    formData.append("Feltrinelli", document.getElementById("LinkFeltrinelliInsertion").value);
    formData.append("Mondadori", document.getElementById("LinkMondadoriInsertion").value);

    // Aggiungi il file direttamente al FormData
    const fileInput = document.getElementById("FileUpload");
    if (fileInput.files.length > 0) {
        formData.append("copertina", fileInput.files[0]);
    } else {
        alert("Seleziona una foto di copertina!");
        return;
    }
    try {
        // Invia i dati al backend Flask
        const response = await fetch('http://127.0.0.1:5000/registerLibri', {
            method: 'POST',
            body: formData
        });

        // Ricevi e mostra la risposta dal server
        const result = await response.json();
        window.location.href = `index.html`;
    } catch (error) {
        console.error('Errore durante l\'invio dei dati:', error);
        document.getElementById('response').textContent = "Errore durante la registrazione";
    }

});

window.addEventListener('DOMContentLoaded', () => {
    const CategoryCheckBoxCreation = document.getElementById("ContenitoreCheckBoxcreazioneLibro");

        window.GeneridiLibro.forEach(categoria =>{
            const label = document.createElement("label");
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.id = categoria;

            label.appendChild(checkbox);

            const Testo = document.createTextNode(categoria);
            label.appendChild(Testo);

            CategoryCheckBoxCreation.appendChild(label);
        })
    
})