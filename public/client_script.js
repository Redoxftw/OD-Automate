let user_latitude, user_longitude, user_location_error_code;

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

function success(GeolocationPosition) {
  user_latitude = GeolocationPosition.coords.latitude
  user_longitude = GeolocationPosition.coords.longitude
}

function error(GeolocationPositionError) {
  user_location_error_code = GeolocationPositionError.message;
  console.log(user_location_error_code)
}

const student_registration_number = document.getElementById('regsitrationInput');
const student_name = document.getElementById('nameInput');

student_registration_number.addEventListener('input', () => {
  student_registration_number.value = student_registration_number.value.toUpperCase();
  document.getElementById('displaystatus').innerText = "";
});

student_name.addEventListener('input', () => {
  student_name.value = student_name.value.toUpperCase();
});

navigator.geolocation.getCurrentPosition(success, error, options);
const verifyButton = document.getElementById('verify_button');

const sentAuth = async () => {
  if (!user_location_error_code) {
    try {
      const res = await fetch(`/api/olduser/auth/${student_registration_number.value}/${student_name.value}/${user_latitude}/${user_longitude}`);
      const result = await res.json();
      modifyStatus(result);
    } catch (error) {
      console.error(error);
    }
  }
  else {
    document.getElementById('displaystatus').innerText = `ERR_MSG : ${user_location_error_code}`;
    document.getElementById('displaystatus').style.color = 'red';
    document.getElementById('displaystatus').style.fontSize = '16px';
  };
}

const lodaing_message = () => {
  document.getElementById('displaystatus').innerHTML = `<img id="buffer-icon" src="https://www.msha.gov/sites/default/files/images/loading2.gif" style="
  mix-blend-mode: color-burn;
  width: 70px;">`;
  setTimeout(sentAuth, 2000);
}
verifyButton.addEventListener('click', lodaing_message);


const modifyStatus = (result) => {
  document.getElementById('buffer-icon').style.visibility = "hidden";
  if (result.status === 'Verified') {
    document.getElementById('displaystatus').innerText = `${result.status}`;
    document.getElementById('displaystatus').style.color = 'green';
  } else {
    document.getElementById('displaystatus').innerText = `${result.status}`;
    document.getElementById('displaystatus').style.color = 'red';
  }
};
