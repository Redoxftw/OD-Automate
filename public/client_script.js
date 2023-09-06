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

let student_registration_number = document.getElementById('regsitrationInput');
let student_name = document.getElementById('nameInput');

student_registration_number.addEventListener('input', () => {
  student_registration_number.value = student_registration_number.value.toUpperCase();
  document.getElementById('displaystatus').innerText = "";
});

student_name.addEventListener('input', () => {
  student_name.value = student_name.value.toUpperCase();
});

navigator.geolocation.getCurrentPosition(success, error, options);
let verifyOldBtn = document.getElementById('old');

const sentAuth = async () => {
  if (!user_location_error_code) {
    try {
      document.getElementById('displaystatus').innerText ="Loading....";
      document.getElementById('displaystatus').style.color = 'rgb(31, 125, 233)';
      const res = await fetch(`/api/olduser/auth/${student_registration_number.value}/${student_name.value}/${user_latitude}/${user_longitude}`);
      const result = await res.json();
      modifyStatus(result);
    } catch (error) {
      console.error(error);
    }
  }
  else {
    alert(`ERR_MSG : ${user_location_error_code}`)
    alert('Allow location access to continue.')
  };
}
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
