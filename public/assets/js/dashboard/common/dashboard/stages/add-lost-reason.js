// add csrf token as header for every ajax request.
$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

var add_lost_reason_route;

$('.add-lost-reason-button').on('click', function () {
    add_lost_reason_route = $(this).data('url') + '?lost-reason=1';
    $('#lost_reason').val($(this).data('lost-reason'));
    $('#sub_lost_reason').val($(this).data('sub-lost-reason'));
});

$(document).on('click', '#add-lost-reason-button', function () {
    var vm = $(this);
    vm.text('Saving ...').prop('disabled', true);
    $.post(add_lost_reason_route, {
        '_method': 'PUT',
        'lost_reason': $('#lost_reason').val(),
        'sub_lost_reason': $('#sub_lost_reason').val()
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
