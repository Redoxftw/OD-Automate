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
  function success(pos) {
    const crd = pos.coords;
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    lat=crd.latitude;
    long=crd.longitude;
    
  }
  
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  
  navigator.geolocation.getCurrentPosition(success, error, options);
  