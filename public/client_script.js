let user_latitude, user_longitude, user_location_error_code;

const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
};

function success(GeolocationPosition) {
    user_latitude = GeolocationPosition.coords.latitude;
    user_longitude = GeolocationPosition.coords.longitude;
}

function error(GeolocationPositionError) {
    user_location_error_code = GeolocationPositionError.message;
}

const student_registration_number =
    document.getElementById("regsitrationInput");
const student_name = document.getElementById("nameInput");

student_registration_number.addEventListener("input", () => {
    student_registration_number.value =
        student_registration_number.value.toUpperCase();
    document.getElementById(
        "status-container"
    ).innerHTML = ` <div class="spinner">
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
</div>`;
});

student_name.addEventListener("input", () => {
    student_name.value = student_name.value.toUpperCase();
});

navigator.geolocation.getCurrentPosition(success, error, options);
const verifyButton = document.getElementById("verify_button");

const sentAuth = async () => {
    if (!user_location_error_code) {
        try {
            const res = await fetch(
                `/api/auth/${student_registration_number.value}/${student_name.value}/${user_latitude}/${user_longitude}`
            );
            const result = await res.json();
            modifyStatus(result);
        } catch (error) {
            console.error(error);
        }
    } else {
        sendErrorReport();
        document.getElementById(
            "status-container"
        ).innerHTML = `<div class="status-container">
    <span id="displaystatus" style="color: red; font-size: 14px;">ERR_MSG : ${user_location_error_code}</span>
    <br><br>
    <span style="color: red;font-weight: 700;">ALERT : </span><span style="color: red;">OD will not be provided </span>
    </div>`;
    }
};

const lodaing_message = () => {
    document.getElementsByClassName("spinner")[0].style.display = "block";
    setTimeout(sentAuth, 1000);
};
verifyButton.addEventListener("click", lodaing_message);

const modifyStatus = (result) => {
    if (result.status === "Verified") {
        document.getElementById(
            "status-container"
        ).innerHTML = `<div class="status-container">
    <h1 id="displaystatus" style="color: green; font-size: 28px;">Verified</h1>
    </div>`;
    } else {
        document.getElementById(
            "status-container"
        ).innerHTML = `<div class="status-container">
    <h1 id="displaystatus" style="color: red; font-size: 28px;">Not Found</h1>
    </div>`;
    }
};

const sendErrorReport = async () => {
    try {
        const response = await fetch(
            `/api/reporterror/${student_registration_number.value}/${student_name.value}/${user_location_error_code}`
        );
    } catch (error) {
        console.error(error);
    }
};
