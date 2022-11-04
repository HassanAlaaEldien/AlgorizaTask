"use strict";
var KTAccountSettingsProfileDetails = function () {
    var t, e, i;
    return {
        init: function () {
            t = document.querySelector("#kt_account_change_password_form");
            e = document.querySelector("#kt_account_change_password_submit");
            i = FormValidation.formValidation(t, {
                fields: {
                    password: {validators: {notEmpty: {message: "Current password is required"}}},
                    new_password: {validators: {notEmpty: {message: "New password is required"}}},
                    new_password_confirmation: {validators: {notEmpty: {message: "Password confirmation is required"}}},
                }, plugins: {
                    trigger: new FormValidation.plugins.Trigger,
                    submitButton: new FormValidation.plugins.SubmitButton,
                    bootstrap: new FormValidation.plugins.Bootstrap5({
                        rowSelector: ".fv-row", eleInvalidClass: "", eleValidClass: ""
                    })
                }
            });
            e.addEventListener("click", (function (n) {
                n.preventDefault();
                i.validate().then((function (i) {
                    if ("Valid" === i) {
                        e.setAttribute("data-kt-indicator", "on");
                        e.disabled = 1;

                        var form = document.getElementById('kt_account_change_password_form');
                        var formSubmitUrl = form.getAttribute('action');

                        var formData = new FormData();
                        $('#kt_account_change_password_form').serializeArray().map(function (v) {
                            if (v.value)
                                formData.append(v.name, v.value);
                        });

                        axios.post(formSubmitUrl, formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        }).then(function (response) {
                            Swal.fire({
                                text: response.data.data.message,
                                icon: "success",
                                buttonsStyling: false,
                                confirmButtonText: "Ok, got it!",
                                customClass: {confirmButton: "btn btn-primary"}
                            }).then(function () {
                                // Release button
                                e.removeAttribute("data-kt-indicator");
                                e.disabled = 0;
                            });
                        }).catch(error => {
                            Swal.fire({
                                text: "OOPS! " +
                                    (error.response.data.hasOwnProperty('errors') ? error.response.data.errors.email[0] : error.response.data.message),
                                icon: "error",
                                buttonsStyling: false,
                                confirmButtonText: "Ok, got it!",
                                customClass: {confirmButton: "btn btn-primary"}
                            }).then(function () {
                                // Release button
                                e.removeAttribute("data-kt-indicator");
                                e.disabled = 0;
                            });
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
    KTAccountSettingsProfileDetails.init()
}));
