"use strict";

var ImportCompany = function () {
    var t, e, i;
    return {
        init: function () {
            t = document.querySelector("#kt_companies_import_form");
            e = document.querySelector("#kt_companies_import_submit");
            i = FormValidation.formValidation(t, {
                fields: {
                    name: {validators: {notEmpty: {message: "Name is required"}}}
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

                        var form = document.getElementById('kt_companies_import_form');
                        var formSubmitUrl = form.getAttribute('action');
                        var reloadPage = parseInt(form.getAttribute('data-reload'));

                        var formData = new FormData();
                        $('#kt_companies_import_form').serializeArray().map(function (v) {
                            if (v.value)
                                formData.append(v.name, v.value);
                        });
                        var import_file = $("#import_file")[0].files[0];
                        if (import_file)
                            formData.append('sheet', import_file);

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
    ImportCompany.init()
}));

