"use strict";
var KTSigninGeneral = function () {
    var t, e, i;
    return {
        init: function () {
            t = document.querySelector("#kt_sign_in_form");
            e = document.querySelector("#kt_sign_in_submit");
            i = FormValidation.formValidation(t, {
                fields: {
                    email: {
                        validators: {
                            notEmpty: {message: "Email address is required"},
                            emailAddress: {message: "The value is not a valid email address"}
                        }
                    }, password: {validators: {notEmpty: {message: "The password is required"}}}
                },
                plugins: {
                    trigger: new FormValidation.plugins.Trigger,
                    bootstrap: new FormValidation.plugins.Bootstrap5({rowSelector: ".fv-row"})
                }
            });
            e.addEventListener("click", (function (n) {
                n.preventDefault();
                i.validate().then((function (i) {
                    if ("Valid" === i) {
                        e.setAttribute("data-kt-indicator", "on");
                        e.disabled = 1;

                        var form = document.getElementById('kt_sign_in_form');
                        var formSubmitUrl = form.getAttribute('action');
                        FormValidation.utils.fetch(formSubmitUrl, {
                            method: 'POST',
                            dataType: 'json',
                            params: {
                                email: form.querySelector('[name="email"]').value,
                                password: form.querySelector('[name="password"]').value,
                                type: 'admin',
                                _token: $('meta[name="csrf-token"]').attr('content')
                            }
                        }).then(function (response) { // Return valid JSON
                            // Release button
                            e.removeAttribute("data-kt-indicator");
                            e.disabled = 0;

                            if (response.status_code === 200) {
                                Swal.fire({
                                    text: response.data.message,
                                    icon: "success",
                                    buttonsStyling: false,
                                    confirmButtonText: "Ok, got it!",
                                    customClass: {confirmButton: "btn btn-primary"}
                                }).then(function () {
                                    window.location.href = response.data.layout_route;
                                });
                            } else {
                                Swal.fire({
                                    text: "OOPS! " +
                                        (response.hasOwnProperty('errors') ? response.errors.email[0] : response.message),
                                    icon: "error",
                                    buttonsStyling: false,
                                    confirmButtonText: "Ok, got it!",
                                    customClass: {confirmButton: "btn btn-primary"}
                                });
                            }
                        });
                    } else {
                        Swal.fire({
                            text: "Sorry, looks like there are some errors detected, please try again.",
                            icon: "error",
                            buttonsStyling: false,
                            confirmButtonText: "Ok, got it!",
                            customClass: {confirmButton: "btn btn-primary"}
                        })
                    }
                }))
            }));
        }
    }
}();

KTUtil.onDOMContentLoaded((function () {
    KTSigninGeneral.init()
}));
