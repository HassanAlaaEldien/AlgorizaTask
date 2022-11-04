"use strict";

var KTYearRepeater = function () {
    var t, e, n = function () {
        t.querySelectorAll("tbody tr").forEach(((t, e) => {
            const n = t.querySelector("td:first-child input"),
                o = t.querySelector("td:nth-child(2) input"),
                a = t.querySelector("td:nth-child(3) input"),
                i = n.getAttribute("id"),
                r = o.getAttribute("id"),
                p = a.getAttribute("id");
            n.setAttribute("name", "financial_data[" + e + "][" + i + "]");
            o.setAttribute("name", "financial_data[" + e + "][" + r + "]");
            a.setAttribute("name", "financial_data[" + e + "][" + p + "]");
        }))
    };
    return {
        init: function () {
            t = document.getElementById("kt_create_new_year_fields"), function () {
                const o = document.getElementById("kt_create_new_year_add"),
                    i = t.querySelector("tbody tr td:first-child").innerHTML,
                    r = t.querySelector("tbody tr td:nth-child(2)").innerHTML,
                    v = t.querySelector("tbody tr td:nth-child(3)").innerHTML,
                    c = t.querySelector("tbody tr td:last-child").innerHTML;
                var d;
                e = $(t).DataTable({
                    info: !1,
                    order: [],
                    ordering: !1,
                    paging: !1,
                    lengthChange: !1
                }), o.addEventListener("click", (function (t) {
                    t.preventDefault(), d = e.row.add([i, r, v, c]).draw().node(), n()
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
var KTBankRepeater = function () {
    var t, e, n = function () {
        t.querySelectorAll("tbody tr").forEach(((t, e) => {
            const n = t.querySelector("td:first-child input"),
                o = t.querySelector("td:nth-child(2) input"),
                a = t.querySelector("td:nth-child(3) input"),
                z = t.querySelector("td:nth-child(4) input"),
                i = n.getAttribute("id"),
                r = o.getAttribute("id"),
                p = a.getAttribute("id"),
                l = z.getAttribute("id");
            n.setAttribute("name", "banks_data[" + e + "][" + i + "]");
            o.setAttribute("name", "banks_data[" + e + "][" + r + "]");
            a.setAttribute("name", "banks_data[" + e + "][" + p + "]");
            z.setAttribute("name", "banks_data[" + e + "][" + l + "]");
        }))
    };
    return {
        init: function () {
            t = document.getElementById("kt_create_new_bank_fields"), function () {
                const o = document.getElementById("kt_create_new_bank_add"),
                    i = t.querySelector("tbody tr td:first-child").innerHTML,
                    r = t.querySelector("tbody tr td:nth-child(2)").innerHTML,
                    v = t.querySelector("tbody tr td:nth-child(3)").innerHTML,
                    a = t.querySelector("tbody tr td:nth-child(4)").innerHTML,
                    c = t.querySelector("tbody tr td:last-child").innerHTML;
                var d;
                e = $(t).DataTable({
                    info: !1,
                    order: [],
                    ordering: !1,
                    paging: !1,
                    lengthChange: !1
                }), o.addEventListener("click", (function (t) {
                    t.preventDefault(), d = e.row.add([i, r, v, a, c]).draw().node(), n()
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
var KTShareHolderRepeater = function () {
    var t, e, n = function () {
        t.querySelectorAll("tbody tr").forEach(((t, e) => {
            const n = t.querySelector("td:first-child input"),
                o = t.querySelector("td:nth-child(2) input"),
                i = n.getAttribute("id"),
                r = o.getAttribute("id");
            n.setAttribute("name", "shareholders[" + e + "][" + i + "]");
            o.setAttribute("name", "shareholders[" + e + "][" + r + "]");
        }))
    };
    return {
        init: function () {
            t = document.getElementById("kt_create_new_shareholder_fields"), function () {
                const o = document.getElementById("kt_create_new_shareholder_add"),
                    i = t.querySelector("tbody tr td:first-child").innerHTML,
                    r = t.querySelector("tbody tr td:nth-child(2)").innerHTML,
                    c = t.querySelector("tbody tr td:last-child").innerHTML;
                var d;
                e = $(t).DataTable({
                    info: !1,
                    order: [],
                    ordering: !1,
                    paging: !1,
                    lengthChange: !1
                }), o.addEventListener("click", (function (t) {
                    t.preventDefault(), d = e.row.add([i, r, c]).draw().node(), n()
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
var KTPersonsRepeater = function () {
    var t, e, n = function () {
        t.querySelectorAll("tbody tr").forEach(((t, e) => {
            const n = t.querySelector("td:first-child input"),
                o = t.querySelector("td:nth-child(2) input"),
                a = t.querySelector("td:nth-child(3) input"),
                z = t.querySelector("td:nth-child(4) input"),
                v = t.querySelector("td:nth-child(5) input"),
                i = n.getAttribute("id"),
                r = o.getAttribute("id"),
                p = a.getAttribute("id"),
                l = z.getAttribute("id"),
                m = v.getAttribute("id");
            n.setAttribute("name", "persons[" + e + "][" + i + "]");
            o.setAttribute("name", "persons[" + e + "][" + r + "]");
            a.setAttribute("name", "persons[" + e + "][" + p + "]");
            z.setAttribute("name", "persons[" + e + "][" + l + "]");
            v.setAttribute("name", "persons[" + e + "][" + m + "]");
        }))
    };
    return {
        init: function () {
            t = document.getElementById("kt_create_new_persons_fields"), function () {
                const o = document.getElementById("kt_create_new_persons_fields_add"),
                    i = t.querySelector("tbody tr td:first-child").innerHTML,
                    r = t.querySelector("tbody tr td:nth-child(2)").innerHTML,
                    g = t.querySelector("tbody tr td:nth-child(3)").innerHTML,
                    h = t.querySelector("tbody tr td:nth-child(4)").innerHTML,
                    j = t.querySelector("tbody tr td:nth-child(5)").innerHTML,
                    c = t.querySelector("tbody tr td:last-child").innerHTML;
                var d;
                e = $(t).DataTable({
                    info: !1,
                    order: [],
                    ordering: !1,
                    paging: !1,
                    lengthChange: !1
                }), o.addEventListener("click", (function (t) {
                    t.preventDefault(), d = e.row.add([i, r, g, h, j, c]).draw().node(), n()
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
var KTSupplierRepeater = function () {
    var t, e, n = function () {
        t.querySelectorAll("tbody tr").forEach(((t, e) => {
            const n = t.querySelector("td:first-child input"),
                o = t.querySelector("td:nth-child(2) input"),
                z = t.querySelector("td:nth-child(3) input"),
                k = t.querySelector("td:nth-child(4) input"),
                u = t.querySelector("td:nth-child(5) input"),
                i = n.getAttribute("id"),
                r = o.getAttribute("id"),
                b = z.getAttribute("id"),
                q = k.getAttribute("id"),
                g = u.getAttribute("id");
            n.setAttribute("name", "suppliers[" + e + "][" + i + "]");
            o.setAttribute("name", "suppliers[" + e + "][" + r + "]");
            z.setAttribute("name", "suppliers[" + e + "][" + b + "]");
            k.setAttribute("name", "suppliers[" + e + "][" + q + "]");
            u.setAttribute("name", "suppliers[" + e + "][" + g + "]");
        }))
    };
    return {
        init: function () {
            t = document.getElementById("kt_create_supplier_fields"), function () {
                const o = document.getElementById("kt_create_supplier_fields_add"),
                    i = t.querySelector("tbody tr td:first-child").innerHTML,
                    r = t.querySelector("tbody tr td:nth-child(2)").innerHTML,
                    l = t.querySelector("tbody tr td:nth-child(3)").innerHTML,
                    p = t.querySelector("tbody tr td:nth-child(4)").innerHTML,
                    y = t.querySelector("tbody tr td:nth-child(5)").innerHTML,
                    c = t.querySelector("tbody tr td:last-child").innerHTML;
                var d;
                e = $(t).DataTable({
                    info: !1,
                    order: [],
                    ordering: !1,
                    paging: !1,
                    lengthChange: !1
                }), o.addEventListener("click", (function (t) {
                    t.preventDefault(), d = e.row.add([i, r, l, p, y, c]).draw().node(), n()
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
            t = document.querySelector("#kt_add_company_form");
            e = document.querySelector("#kt_add_company_submit");
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

                        var form = document.getElementById('kt_add_company_form');
                        var formSubmitUrl = form.getAttribute('action');
                        var listUrl = form.getAttribute('data-list-route');
                        var reloadPage = parseInt(form.getAttribute('data-reload'));

                        var formData = new FormData();
                        $('#kt_add_company_form').serializeArray().map(function (v) {
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
    KTYearRepeater.init()
    KTBankRepeater.init()
    KTShareHolderRepeater.init()
    KTPersonsRepeater.init()
    KTSupplierRepeater.init()
}));

