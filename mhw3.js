/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*Prima API in pratica è un database di cibi americani quindi si devono cercare in inglese, gia sono riuscito a cercare tramite il nome devo prendere i primi tre e metterli in modo che si vedono le calorie*/

/* Siti dove vedere il funzionamento e cibi di questa api
https://rapidapi.com/msilverman/api/nutritionix-nutrition-database/
https://www.nutritionix.com/brands/grocery?page=3
 
 trovare tanti tipi di api, una lista enorme
 https://github.com/public-apis/public-apis/blob/master/README.md
 */
const form =document.querySelector('#Mangiare');
form.addEventListener('submit', search);

function search(event)
{
    //impediamo il comportamento di default del submit
    event.preventDefault();
    
    //leggiamo valori campo di testo 
    const cibo= document.querySelector('#food');
    const valore_cibo=encodeURIComponent(cibo.value);
    console.log('Eseguo ricerca: ' + valore_cibo);  //cerca mentos, cheddar, pasta, beef, fish, kinder, ma anche nomi di piatti specifici
    
    const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Host': 'nutritionix-api.p.rapidapi.com',
		'X-RapidAPI-Key': '857553cdc4mshfe9d2a532c83a6fp1737a6jsn616560f71ded'
	}
};

fetch('https://nutritionix-api.p.rapidapi.com/v1_1/search/'+valore_cibo+'?fields=item_name%2Citem_id%2Cbrand_name%2Cnf_calories%2Cnf_total_fat', options)/* .then(response => response.json()).then(response => console.log(response)).catch(err => console.error(err));*/
        .then(onResponse).then(onJson).catch(err => console.error(err)); 




}


/*--------FUNZIONI DEL FETCH------------------*/
 function onError(error){
     console.log('Error: '+ error);  //per gestire l'errore
 }
 
 function onResponse(response){
     return response.json();  //per ritornarci degli oggetti tipo liste o mappe
 }
 
function onJson(json){
    console.log('JSON ricevuto');
    const menu = document.querySelector('#Alimentari');
    menu.innerHTML='';
    let num_results = json.total_hits; //questo dato l'ho visto con F12 nel sito con API inserita
    if(num_results > 10 ) num_results = 3; //qui mettiamo quante informazioni deve dare
    
   
    console.log(json);
    
    for (let i=0; i<num_results; i++)
    {
        const nome = json.hits[i].fields['item_name']; //le mappe si vedono con F12 nel sito mettendo il mouse sul nome che ti interessa ti appare dove è collocato ad esempio hits[i].fields
        const brand =json.hits[i].fields['brand_name'];
        const calorie = json.hits[i].fields['nf_calories'];
        const grassi = json.hits[i].fields['nf_total_fat'];
       // console.log(nome);
        let j= i+1;
        
        const dieta=document.createElement('div');
        dieta.textContent='ELEMENTO '+j+': Nome= '+nome+', Marca= '+ brand+', Calorie= '+calorie+', Grassi= '+grassi;
        menu.appendChild(dieta);
        //per appenderlo alla section iniziale devi creare un altro elemento modificargli il testo con textContent e poi appenderlo al contenitore sopra
    }
    
}
 
 



/*---------SECONDA API--------------*/
const Spotify =document.querySelector('#Spotify');   //prendo l'elemento form che si riferisce a spotify
Spotify.addEventListener('submit', ricerca);

const client_id='fc84ec54290a4506b35598a56e8efd25';
const client_secret='6db08c170f7f42e0ad9d52dcd7884daa';
let token;

function onTokenResponse(response){
    return response.json();  //se va bene chiama onTokenJson
    }

function onTokenJson(json){
    //imposta il token globale, cioe quello che viene restituito
    token=json.access_token;
    console.log(token);
    }





//Alla'apertura della pagina chiediamo il token;

fetch(`https://accounts.spotify.com/api/token`,
{ 
    method:"post",
    body:'grant_type=client_credentials', 
    headers:{
        
        'Content-Type':'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
    }
    
}
        ).then(onTokenResponse).then(onTokenJson);




function ricerca(event)
{
    //impediamo il comportamento di default del submit
    event.preventDefault();
    
    //leggiamo valori campo di testo 
    const autore= document.querySelector('#Artista');
    const valore_artista=encodeURIComponent(autore.value);
    console.log('Eseguo ricerca: ' + valore_artista);  //cerca mentos, cheddar, pasta, beef, fish, kinder, ma anche nomi di piatti specifici
    
    //eseguiamo la richiesta 
    fetch("https://api.spotify.com/v1/search?type=album&q=" + valore_artista,
    {
        headers:
                {
                    'Authorization' : 'Bearer ' + token
                }
    }
            ).then(onResponse).then(onTJson);
}


function onTJson(Json){
    console.log(Json);
    //albums.items[1].artists[0].name
    console.log('JSON ricevuto');
    const playlist = document.querySelector('#Musiche');
    playlist.innerHTML='';
    
    //let num_results = json.albums.limit; //questo dato l'ho visto con F12 nel sito con API inserita
    //if(num_results > 10 ) num_results = 3; //qui mettiamo quante informazioni deve dare
    
   
    //console.log(num_results);
   
   
    for (let i=0; i<10; i++)
    {
        const nome =Json.albums.items[i].artists[0].name; //le mappe si vedono con F12 nel sito mettendo il mouse sul nome che ti interessa ti appare dove è collocato ad esempio hits[i].fields
       
       // console.log(nome);
        let j= i+1;
        
        const autore=document.createElement('div');
        autore.textContent=' Autore '+j+': ' +nome+'.';
        playlist.appendChild(autore);
        //per appenderlo alla section iniziale devi creare un altro elemento modificargli il testo con textContent e poi appenderlo al contenitore sopra
    }
    
}

