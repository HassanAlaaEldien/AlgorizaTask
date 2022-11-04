// add csrf token as header for every ajax request.
$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

var add_interaction_route;
var item_id;

$('.interaction-button').on('click', function () {
    add_interaction_route = $(this).data('url');
    item_id = $(this).data('item-id');
});

$(document).on('click', '#interaction-button', function () {
    var vm = $(this);
    vm.text('Saving ...').prop('disabled', true);
    $.post(add_interaction_route, {
        'touch_points': $('#touch_points').val(),
        'action': $('#action').val(),
        'interaction_date': $('#interaction_date').val(),
        'next_interaction_date': $('#next_interaction_date').val(),
        'remarks': $('#remarks').val(),
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
            $('#touch_points').val('');
            $('#action').val('');
            $('#interaction_date').val('');
            $('#next_interaction_date').val('');
            $('#remarks').val('');
            // Hide Interaction Modal.
            $('#interaction_modal').modal('toggle');
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

$(document).on('change', '#action', function () {
    if ($(this).val() === '') {
        $('.planned-actions').addClass('d-none');
        $('#interaction_date').val('');
        $('#next_interaction_date').val('');
    } else {
        $('.planned-actions').removeClass('d-none');
    }
});
