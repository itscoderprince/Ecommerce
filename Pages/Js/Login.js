const loginForm = document.querySelector('.login-form');
const LoginBtn = loginForm.querySelector('button');
let inputs = loginForm.querySelectorAll('input');

let registrationData = getAllData('registrationData');

loginForm.onsubmit = (e) => {
    e.preventDefault();
    let matchedUser = registrationData.find((data) => data.email === inputs[0].value);
    if (matchedUser) {
        if (matchedUser.password === inputs[1].value) {

            LoginBtn.innerHTML = ' <i class="fa fa-sign-in-alt"></i> Wait..';

            localStorage.setItem('__au__', inputs[0].value);
            setTimeout(() => {
                window.location = '../index.html'
            }, 500);

        }
        else {
            swal("Password Incorrect", "Please Try Again", "error");
        }
    }
    else {
        swal("Email Not Found", "Please Try Another Email", "error");
    }
};
