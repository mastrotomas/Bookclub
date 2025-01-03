const Categorie = document.getElementById('TypeSearching');
Categorie.addEventListener('submit', async (e) => {
    e.preventDefault();
    function getQueryParameter(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    const searchTerm = getQueryParameter("query");
    
    const formData = new FormData(Categorie);
    
    let text = "";
    let array = []
    formData.forEach(tipo =>{
        text = text + tipo;
        array.push(tipo);
    })
    localStorage.setItem("Checked",JSON.stringify(array));
    window.location.href = `searchIndex.html?query=${searchTerm}&type=${text}`;
});



