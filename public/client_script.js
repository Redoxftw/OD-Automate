let regValue = document.getElementById('regsitrationInput');
let nameValue = document.getElementById('nameInput')

regValue.addEventListener('input', () => {
    regValue.value = regValue.value.toUpperCase();
    document.getElementById('displaystatus').innerText =""
});
nameValue.addEventListener('input', () => {
    nameValue.value = nameValue.value.toUpperCase();
});
let verifyOldBtn = document.getElementById('old');

const sentAuth = async () => {

    try {
        const res = await fetch(`/api/olduser/auth/${regValue.value}/${nameValue.value}/${lat}/${long}`);
        const result = await res.json()
        modifyStatus(result)
        console.log(result)
    } catch (error) {
        console.error(error)
    }
}
verifyOldBtn.addEventListener('click', sentAuth)

const modifyStatus = (result) => {
    if (result.status==='Verified') {
        document.getElementById('displaystatus').innerText = `${result.status}`
        document.getElementById('displaystatus').style.color='green';
        
    } else {
        document.getElementById('displaystatus').innerText = `${result.status}`
        document.getElementById('displaystatus').style.color='red';
    }
}
const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };
  let lat;
  let long;
 

  
  navigator.geolocation.getCurrentPosition(success, error, options);
  function requestLocationPermission() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        function(position) {
          // Do something with the user's location
          console.log("Latitude: " + position.coords.latitude);
          console.log("Longitude: " + position.coords.longitude);
          lat=crd.latitude;
          long=crd.longitude;
        },
        function(error) {
          if (error.code === 1) {
            // The user denied location permission
            alert("Please enable location services in your device settings.");
          } else {
            // Handle other errors
            console.error("Error getting location:", error);
          }
        }
      );
    } else {
      alert("Geolocation is not supported in this browser.");
    }
  }
  
  // Call the function to request location permission
  requestLocationPermission();
  