// add csrf token as header for every ajax request.
$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

// Initialize Tagify components on the above inputs
new Tagify(
    document.querySelector("#kt_tagify_1")
);

var send_mail_route;

$('.send-mail-button').on('click', function () {
    send_mail_route = $(this).data('url');
    $('#kt_tagify_1').val($(this).data('contacts'));
});

$(document).on('click', '#send-mail-button', function () {
    var vm = $(this);
    vm.text('Sending ...').prop('disabled', true);
    $.post(send_mail_route, {
        'mails': JSON.parse($('#kt_tagify_1').val())
    }).done(function (response) {
        Swal.fire({
            text: response.data.message,
            icon: "success",
            buttonsStyling: false,
            confirmButtonText: "Ok, got it!",
            customClass: {confirmButton: "btn btn-primary"}
        }).then(function () {
            // Release button
            vm.text('Yes').prop('disabled', false);
            // Hide Interaction Modal.
            $('#send_mail_modal').modal('toggle');
            // Reload Current Page.
            window.location.reload();
        });
    }).fail(function (error) {
        Swal.fire({
            text: "OOPS! " + error.responseJSON.message,
            icon: "error",
            buttonsStyling: false,
            confirmButtonText: "Ok, got it!",
            customClass: {confirmButton: "btn btn-primary"}
        }).then(function () {
            // Release button
            vm.text('Yes').prop('disabled', false);
        });
    });
});
