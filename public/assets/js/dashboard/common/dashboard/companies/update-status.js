// add csrf token as header for every ajax request.
$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

var update_status_route;

$('.update-status-button').on('click', function () {
    update_status_route = $(this).data('url') + '?update-status=1';
});

$(document).on('click', '#update-status-button', function () {
    var vm = $(this);
    vm.text('Saving ...').prop('disabled', true);
    $.post(update_status_route, {
        '_method': 'PUT',
        'status_id': $('#status_id').val()
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
            $('#status_id').val('');
            // Hide Interaction Modal.
            $('#update_status_modal').modal('toggle');
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
