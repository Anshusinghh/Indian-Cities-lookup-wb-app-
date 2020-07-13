let search=document.getElementById("search");
let searchlist=document.getElementById("searchlist");
search.addEventListener("input",()=>searchcities(search.value));

const searchcities=async searchtext=>{
    var res= await fetch("in.json");
    const cities=await res.json();
    
    
    let matches=cities.filter(city=>{
        const regex=new RegExp(`^${searchtext}`,'gi');
        return city.city.match(regex);
    });
    if(searchtext.length===0){
        matches=[];
        searchlist.innerHTML="";
    }
    outputHTML(matches);
};
function outputHTML(matches){
    if(matches.length>0){
        html = matches.map(match => `
        <button class="card" data-city="${match.city}" data-admin="${match.admin}" data-lat="${match.lat}" data-lng="${match.lng}"
        data-population="${match.population}" data-capital="${match.capital}">
        <h4>${match.city}<span class="state ">(${match.admin})</span></h4>
        <small>Latitude: ${match.lat}/longitude:${match.lng}</small>
        </button>
        `).join('');
        searchlist.innerHTML=html;
        const cards=document.querySelectorAll(".card");
        cards.forEach(card=>{
            card.addEventListener("click",showresult);
        });
        
        }
    
}
function showresult(event){
    let card=event.currentTarget;
    let result=document.querySelector("#finalresult");
    let carddata=card.dataset;
    if(carddata.capital==='admin'){
        carddata.capital='Yes';
    }
    else{
        carddata.capital='No';
    }
    const show=`
    <div class="result">
    <h4>${carddata.city}<br><span class="state ">(${carddata.admin})</span></h4>
    <div class="capital">capital: <span>${carddata.capital}</span> </div>
    <div class="popu">population:<span>${carddata.population}</span></div>
    <small>Lat: ${carddata.lat}/long:${carddata.lng}</small>
    </div>
    `;
    result.innerHTML=show;
    searchlist.innerHTML="";
    search.value='';
}
