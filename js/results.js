function getQueryVariable(variable) {
    var query = window.location.search.substring(1)
    var vars = query.split("&")
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=")
        if (pair[0] == variable) {
            return pair[1]
        }
    }
    return (NaN);
}

values = [];
values[0] = getQueryVariable("pdi");
values[1] = getQueryVariable("idv");
values[2] = getQueryVariable("mas");
values[3] = getQueryVariable("uai");
values[4] = getQueryVariable("lto");
values[5] = getQueryVariable("ivr");

let pdiBar = document.getElementById("pdiBar");
let idvBar = document.getElementById("idvBar");
let masBar = document.getElementById("masBar");
let uaiBar = document.getElementById("uaiBar");
let ltoBar = document.getElementById("ltoBar");
let ivrBar = document.getElementById("ivrBar");

pdiBar.style.height = (100 - values[0]) + "%";
idvBar.style.height = (100 - values[1]) + "%";
masBar.style.height = (100 - values[2]) + "%";
uaiBar.style.height = (100 - values[3]) + "%";
ltoBar.style.height = (100 - values[4]) + "%";
ivrBar.style.height = (100 - values[5]) + "%";

let pdiVal = document.getElementById("pdiVal");
let idvVal = document.getElementById("idvVal");
let masVal = document.getElementById("masVal");
let uaiVal = document.getElementById("uaiVal");
let ltoVal = document.getElementById("ltoVal");
let ivrVal = document.getElementById("ivrVal");

pdiVal.innerHTML = values[0];
idvVal.innerHTML = values[1];
masVal.innerHTML = values[2];
uaiVal.innerHTML = values[3];
ltoVal.innerHTML = values[4];
ivrVal.innerHTML = values[5];

function distance_sq(oth) {
    ans = 0;
    for (let i = 0; i < 6; ++i) {
        ans += (values[i] - oth[i]) * (values[i] - oth[i]);
    }
    return ans;
}

const k = 5; // find the closest k countries
let closest = [];
for (let i = 0; i < k; ++i) closest[i] = NaN;

for (let i = 0; i < countries.length; ++i) {
    if (isNaN(closest[k - 1]) || distance_sq(countries[closest[k - 1]].values) > distance_sq(countries[i].values)) {
        closest[k - 1] = i;
    }
    for (let j = k - 2; j >= 0; --j) {
        if (isNaN(closest[j]) || distance_sq(countries[closest[j + 1]].values) < distance_sq(countries[closest[j]].values)) {
            let tmp = closest[j];
            closest[j] = closest[j + 1];
            closest[j + 1] = tmp;
        }
    }
}

console.log("indexes of the " + k + " closest countries: " + closest);

let table = document.getElementById("countriesResults");


for (let i = 0; i<k; ++i) {
    table.innerHTML += "<tr><td>" + countries[closest[i]].name + "</td><td>" + countries[closest[i]].values[0] + "</td><td>" + countries[closest[i]].values[1] + "</td><td>" + countries[closest[i]].values[2] + "</td><td>" + countries[closest[i]].values[3] + "</td><td>" + countries[closest[i]].values[4] + "</td><td>" + countries[closest[i]].values[5] + "</td></tr>";
}
