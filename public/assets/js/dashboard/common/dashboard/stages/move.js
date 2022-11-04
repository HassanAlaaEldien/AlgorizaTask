// add csrf token as header for every ajax request.
$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

var move_route;

$('.move-button').on('click', function () {
    move_route = $(this).data('url') + '?move=1';
});

$(document).on('click', '#move-button', function () {
    var vm = $(this);
    vm.text('Saving ...').prop('disabled', true);
    $.post(move_route, {
        '_method': 'PUT',
        'stage': $('#stage').val()
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
            // Empty all inputs.
            $('#stage').val('');
            // Hide Interaction Modal.
            $('#move_modal').modal('toggle');
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
