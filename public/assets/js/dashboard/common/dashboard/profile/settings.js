"use strict";
var KTAccountSettingsProfileDetails = function () {
    var t, e, i;
    return {
        init: function () {
            t = document.querySelector("#kt_account_profile_details_form");
            e = document.querySelector("#kt_account_profile_details_submit");
            i = FormValidation.formValidation(t, {
                fields: {
                    name: {validators: {notEmpty: {message: "Name is required"}}},
                    email: {
                        validators: {
                            notEmpty: {message: 'Email field is required'},
                            emailAddress: {message: 'Please, enter a valid email address'}
                        }
                    }
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

                        var form = document.getElementById('kt_account_profile_details_form');
                        var formSubmitUrl = form.getAttribute('action');

                        var formData = new FormData();
                        $('#kt_account_profile_details_form').serializeArray().map(function (v) {
                            if (v.value)
                                formData.append(v.name, v.value);
                        });
                        var avatar = $("#avatar")[0].files[0];
                        if (avatar)
                            formData.append('avatar', avatar);

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
                                window.location.reload();
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
