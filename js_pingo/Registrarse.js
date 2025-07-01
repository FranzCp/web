(function () {
    'use strict'

    var form = document.getElementById('registroForm');

    form.addEventListener('submit', function (event) {
        var password = document.getElementById('password');
        var confirmPassword = document.getElementById('confirmPassword');
        var confirmPasswordFeedback = document.getElementById('confirmPasswordFeedback');

        if (password.value !== confirmPassword.value) {
            confirmPassword.setCustomValidity('Las contraseñas no coinciden.');
            confirmPassword.classList.add('is-invalid');
        } else {
            confirmPassword.setCustomValidity(''); 
            confirmPassword.classList.remove('is-invalid');
            confirmPassword.classList.add('is-valid'); 
        }

        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        }

        form.classList.add('was-validated');
    }, false);

    var password = document.getElementById('password');
    var confirmPassword = document.getElementById('confirmPassword');

    password.addEventListener('keyup', validatePasswordMatch);
    confirmPassword.addEventListener('keyup', validatePasswordMatch);

    function validatePasswordMatch() {
        var password = document.getElementById('password');
        var confirmPassword = document.getElementById('confirmPassword');
        var confirmPasswordFeedback = document.getElementById('confirmPasswordFeedback');

        if (confirmPassword.value === '') { 
            confirmPassword.setCustomValidity('');
            confirmPassword.classList.remove('is-invalid', 'is-valid');
        } else if (password.value !== confirmPassword.value) {
            confirmPassword.setCustomValidity('Las contraseñas no coinciden.');
            confirmPassword.classList.add('is-invalid');
            confirmPassword.classList.remove('is-valid');
        } else {
            confirmPassword.setCustomValidity('');
            confirmPassword.classList.remove('is-invalid');
            confirmPassword.classList.add('is-valid');
        }
    }

})();