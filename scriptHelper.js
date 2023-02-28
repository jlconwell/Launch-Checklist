// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   // Here is the HTML formatting for our mission target div.
   /*
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: </li>
                    <li>Diameter: </li>
                    <li>Star: </li>
                    <li>Distance from Earth: </li>
                    <li>Number of Moons: </li>
                </ol>
                <img src="">
   */

    const divTarget = document.getElementById("missionTarget");

    divTarget.innerHTML =`
            <h2>Mission Destination</h2>
            <ol>
            <li>Name: ${name}</li>
            <li>Diamter: ${diameter}</li>
            <li>Star: ${star}</li>
            <li>Distance from Earth: ${distance}</li>
            <li>Number of Moons: ${moons}</li>
            </ol>
            <img src="${imageUrl}"/>
        `;
}

function validateInput(testInput) {
    if (testInput === "") {
        return "Empty";
    }

    if (isNaN(testInput)) {
        return "Not a Number";
    }

    if (!isNaN(testInput)) {
        return "Is a Number";
    }
   
}


function formSubmission(document, list, pilot, copilot, fuelLevel, cargoMass) {
    let pilotStatus = document.getElementById("pilotStatus");
    let copilotStatus = document.getElementById("copilotStatus");
    let fuelStatus = document.getElementById("fuelStatus");
    let cargoStatus = document.getElementById("cargoStatus");
    let header2 = document.getElementById("launchStatus");

    if (validateInput(pilot) === "Empty" || validateInput(copilot) === "Empty" || validateInput(fuelLevel) === "Empty" || validateInput(cargoMass) === "Empty") {
        alert("All fields required.")
    } else if (validateInput(pilot) === "Is a Number" || validateInput(copilot) === "Is a Number") {
        alert ("Only enter letters for Pilot and/or Co-pilot");
    } else if (validateInput(fuelLevel) === "Not a Number" || validateInput(cargoMass) === "Not a Number") {
        alert ("Only enter numbers for Fuel Level and/or Cargo Mass");
    } else {
        list.style.visibility = "visible";
        pilotStatus.innerHTML = `${pilot} Ready.`
        copilotStatus.innerHTML = `${copilot} Ready.`
    }

    // if (validateInput(pilot) === "Empty" || validateInput(pilot) === "Is a Number") {
    //     alert("Pilot Name required. Enter only letters!");
    // };

    // if (validateInput(copilot) === "Empty" || validateInput(copilotName) === "Is a Number") {
    //     alert("Co-pilot name required. Enter only letters!");
    // };

    // if (validateInput(fuelLevel) === "Empty" || validateInput(fuelLevel) === "Not a Number") {
    //     alert("Fuel Level required.  Enter only numbers!");
    // };

    // if (validateInput(cargoMass) === "Empty" || validateInput(cargoMass) === "Not a Number") {
    //     alert("Cargo Mass required.  Enter only numbers!");
    // };

    
   
    
    if (fuelLevel < 10000 && cargoMass <= 10000) {
        // list.style.visibility = "visible";
        // pilotStatus.innerHTML = `${pilot} is Ready.`;
        // copilotStatus.innerHTML = `${copilot} is Ready.`;
        header2.innerHTML = "Shuttle not ready for launch.";
        header2.style.color = "red";
        fuelStatus.innerHTML = "Not enough fuel for the journey.";
        cargoStatus.innerHTML = "Cargo mass low enough for launch.";
    };
    
    if (fuelLevel < 10000 && cargoMass > 10000) {
        header2.innerHTML = "Shuttle not ready for launch.";
        header2.style.color = "red";
        cargoStatus.innerHTML = "Too much mass for Shuttle to take off.";
        fuelStatus.innerHTML = "Not enough fuel for the journey.";
    }

    if (cargoMass > 10000 && fuelLevel >= 10000) {
        // pilotStatus.innerHTML = `${pilot} is Ready.`;
        // copilotStatus.innerHTML = `${copilot} is Ready.`;
        // list.style.visibility = "visible";
        header2.innerHTML = "Shuttle not ready for launch.";
        header2.style.color = "red";
        cargoStatus.innerHTML = "Too much mass for Shuttle to take off.";
        fuelStatus.innerHTML = "Fuel Level high enough for launch.";
    };

    if (fuelLevel >= 10000 && cargoMass <= 10000) {
        // pilotStatus.innerHTML = `${pilot} is Ready.`;
        // copilotStatus.innerHTML = `${copilot} is Ready.`;
        list.style.visibility = "hidden";
        header2.style.color = "green";
        header2.innerHTML = "Shuttle is ready for launch.";
        cargoStatus.innerHTML = "Fuel Level high enough for launch.";
        fuelStatus.innerHTML = "Cargo mass is low enough for launch.";
    }


}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
        return response.json();
        });

    return planetsReturned;
}

function pickPlanet(planets) {
    let randomSelect = Math.floor(Math.random() * planets.length + 1);
    return planets[randomSelect];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
