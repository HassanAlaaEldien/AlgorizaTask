"use strict";

var KTEmailRepeater = function () {
    var t, e, n = function () {
        t.querySelectorAll("tbody tr").forEach(((t, e) => {
            const n = t.querySelector("td:first-child input"),
                i = n.getAttribute("id");
            n.setAttribute("name", "emails[" + e + "][" + i + "]");
        }))
    };
    return {
        init: function () {
            t = document.getElementById("kt_create_new_email_fields"), function () {
                const o = document.getElementById("kt_create_new_email_add"),
                    i = t.querySelector("tbody tr td:first-child").innerHTML,
                    c = t.querySelector("tbody tr td:last-child").innerHTML;
                var d;
                e = $(t).DataTable({
                    info: !1,
                    order: [],
                    ordering: !1,
                    paging: !1,
                    lengthChange: !1
                }), o.addEventListener("click", (function (t) {
                    t.preventDefault(), d = e.row.add([i, c]).draw().node(), n()
                }))
            }(), n(), KTUtil.on(t, '[data-kt-action="field_remove"]', "click", (function (t) {
                t.preventDefault();
                const n = t.target.closest("tr");
                Swal.fire({
                    text: "Are you sure you want to delete this field ?",
                    icon: "warning",
                    showCancelButton: !0,
                    buttonsStyling: !1,
                    confirmButtonText: "Yes, delete!",
                    cancelButtonText: "No, cancel",
                    customClass: {
                        confirmButton: "btn fw-bold btn-danger",
                        cancelButton: "btn fw-bold btn-active-light-primary"
                    }
                }).then((function (t) {
                    t.value ? Swal.fire({
                        text: "You have deleted it!.",
                        icon: "success",
                        buttonsStyling: !1,
                        confirmButtonText: "Ok, got it!",
                        customClass: {confirmButton: "btn fw-bold btn-primary"}
                    }).then((function () {
                        e.row($(n)).remove().draw()
                    })) : "cancel" === t.dismiss && Swal.fire({
                        text: "It was not deleted.",
                        icon: "error",
                        buttonsStyling: !1,
                        confirmButtonText: "Ok, got it!",
                        customClass: {confirmButton: "btn fw-bold btn-primary"}
                    })
                }))
            }))
        }
    }
}();
var KTCreateCompany = function () {
    var t, e, i;
    return {
        init: function () {
            t = document.querySelector("#kt_add_status_form");
            e = document.querySelector("#kt_add_status_submit");
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

                        var form = document.getElementById('kt_add_status_form');
                        var formSubmitUrl = form.getAttribute('action');
                        var listUrl = form.getAttribute('data-list-route');
                        var reloadPage = parseInt(form.getAttribute('data-reload'));

                        var formData = new FormData();
                        $('#kt_add_status_form').serializeArray().map(function (v) {
                            if (v.value || v.name === 'program_id')
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
    KTCreateCompany.init()
    KTEmailRepeater.init()
}));

