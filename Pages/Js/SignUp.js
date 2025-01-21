const signUpForm = document.querySelector('.SignUp-form');
const inputs = signUpForm.querySelectorAll('input');
const textArea = signUpForm.querySelector('textarea');
let registrationData = [];

// Read data from local storage
registrationData = getAllData('registrationData');

// Getting data from form 
signUpForm.onsubmit = (e) => {
    e.preventDefault();
    let checkEmail = registrationData.filter((data) =>
        data.email == inputs[1].value);

    if (checkEmail.length == 0) {
        registrationData.push({
            fullname: inputs[0].value,
            email: inputs[1].value,
            password: inputs[2].value,
            mobile: inputs[3].value,
            address: textArea.value,
            state: inputs[4].value,
            country: inputs[5].value,
            pincode: inputs[6].value,
        });

        insertData('registrationData', JSON.stringify(registrationData));
        swal("Registration Successfull", "Please Login", "success");
    }
    else {
        swal("Email Already Exist", "Please Try Another Email", "error");
    }
}
