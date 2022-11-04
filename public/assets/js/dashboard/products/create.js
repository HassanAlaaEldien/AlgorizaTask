"use strict";

$(function () {
    bsCustomFileInput.init();
});

// Initialize Tagify components.
new Tagify(
    document.querySelector("#tags")
);

var CreateProduct = function () {
    var form, submitButton, validation;
    return {
        init: function () {
            form = document.querySelector("#add_product_form");
            submitButton = document.querySelector("#add_product_submit");
            validation = FormValidation.formValidation(form, {
                fields: {},
                plugins: {
                    trigger: new FormValidation.plugins.Trigger,
                    submitButton: new FormValidation.plugins.SubmitButton,
                    bootstrap: new FormValidation.plugins.Bootstrap5({
                        rowSelector: ".fv-row", eleInvalidClass: "", eleValidClass: ""
                    })
                }
            });
            submitButton.addEventListener("click", (function (n) {
                n.preventDefault();
                validation.validate().then((function (i) {
                    if ("Valid" === i) {
                        $('#add_product_submit .indicator-progress').removeClass('d-none');
                        submitButton.disabled = 1;

                        var form = document.getElementById('add_product_form');
                        var formSubmitUrl = form.getAttribute('action');
                        var listUrl = form.getAttribute('data-list-route');
                        var reloadPage = parseInt(form.getAttribute('data-reload'));

                        var formData = new FormData();
                        $('#add_product_form').serializeArray().map(function (v) {
                            if (v.value)
                                formData.append(v.name, v.value);
                        });
                        var image = $("#image")[0].files[0];
                        if (image)
                            formData.append('image', image);

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
                                $('#add_product_submit .indicator-progress').addClass('d-none');
                                submitButton.disabled = 0;

                                if (reloadPage === 1)
                                    window.location.href = listUrl;
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
                                $('#add_product_submit .indicator-progress').addClass('d-none');
                                submitButton.disabled = 0;
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

CreateProduct.init()


