let lat;
let long;
const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

function success(pos) {
  const crd = pos.coords;

  console.log("Your current position is:");
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(`More or less ${crd.accuracy} meters.`);
  lat = crd.latitude;
  long = crd.longitude;
}

function error(err) {
  alert('Allow Location Access to Site')
}

navigator.geolocation.getCurrentPosition(success, error, options);

let regValue = document.getElementById('regsitrationInput');
let nameValue = document.getElementById('nameInput');

regValue.addEventListener('input', () => {
  regValue.value = regValue.value.toUpperCase();
  document.getElementById('displaystatus').innerText = "";
});

nameValue.addEventListener('input', () => {
  nameValue.value = nameValue.value.toUpperCase();
});

let verifyOldBtn = document.getElementById('old');

const sentAuth = async () => {
  if (lat === undefined) {
    alert('Allow Location Access to Site')
    navigator.geolocation.getCurrentPosition(success, error, options);
  } else {

    try {
      const res = await fetch(`/api/olduser/auth/${regValue.value}/${nameValue.value}/${lat}/${long}`);
      const result = await res.json();
      modifyStatus(result);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
};

verifyOldBtn.addEventListener('click', sentAuth);

const modifyStatus = (result) => {
  if (result.status === 'Verified') {
    document.getElementById('displaystatus').innerText = `${result.status}`;
    document.getElementById('displaystatus').style.color = 'green';
  } else {
    document.getElementById('displaystatus').innerText = `${result.status}`;
    document.getElementById('displaystatus').style.color = 'red';
  }
};

