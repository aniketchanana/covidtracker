const COVID__COUNTRIES = 'https://covid19.mathdro.id/api/countries';
const COUNTRY__MENU = document.getElementById('all__countries');
const CONFIRMED = document.getElementById('confirmedcases');
const RECOVERED = document.getElementById('recoveredcases');
const DEATHS = document.getElementById('deathcases');


document.querySelector('body').onload = function() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET',COVID__COUNTRIES,true);
    xhr.send();
    xhr.onload = function() {
        if(this.status === 200 && this.readyState === 4) {
            populateCountries(JSON.parse(this.responseText).countries);
        }
    }

    getCountryData('ind');
}

function getCountryData(countryCode) {
    let xhrCountry = new XMLHttpRequest()
    xhrCountry.open('GET',COVID__COUNTRIES+'/'+countryCode);
    xhrCountry.send();
    xhrCountry.onload = function() {
        if(this.status === 200 && this.readyState === 4) {
            let {confirmed,recovered,deaths} = JSON.parse(this.responseText);
            displayResult(confirmed.value,recovered.value,deaths.value)
        }
    }
}


function displayResult(confirmed,recovered,deaths) {
    CONFIRMED.textContent = confirmed;
    RECOVERED.textContent = recovered;
    DEATHS.textContent = deaths;
}
function populateCountries(allCountries) {
    for(let i = 0 ; i<allCountries.length ; i++) {
        var opt = document.createElement('option');
        opt.value = allCountries[i].iso3;
        opt.innerHTML = allCountries[i].name;
        if(allCountries[i].name === 'India') {
            opt.selected = true;
        }
        opt.setAttribute('class','country__option')
        COUNTRY__MENU.appendChild(opt);
    }
}

COUNTRY__MENU.addEventListener('change',function(e) {
    let code = e.target.value;
    // let select = e.target;
    // DISPLAY__COUNTRY.textContent = select.options[select.selectedIndex].text;
    getCountryData(e.target.value);
})
