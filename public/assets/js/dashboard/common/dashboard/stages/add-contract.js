// add csrf token as header for every ajax request.
$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

var add_contract_route, contract;

$('.add-contract-button').on('click', function () {
    contract = $(this).data('contract');
    add_contract_route = $(this).data('url') + '?contract_image=1';

    var contract_image_holder = $('#contract-image');
    if (contract) {
        contract_image_holder.removeClass('d-none');
        contract_image_holder.attr('href', contract);
    } else {
        contract_image_holder.addClass('d-none');
    }
});

$(document).on('click', '#add-contract-button', function () {
    var vm = $(this);
    vm.text('Saving ...').prop('disabled', true);

    var formData = new FormData();
    var contract = $("#contract")[0].files[0];
    if (contract)
        formData.append('contract', contract);

    formData.append('_method', 'PUT');

    axios.post(add_contract_route, formData, {
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
            vm.text('Yes').prop('disabled', false);
            // Hide Interaction Modal.
            $('#send_mail_modal').modal('toggle');
            // Reload Current Page.
            window.location.reload();
        });
    }).catch(error => {
        Swal.fire({
            text: "OOPS! " + error.response.data.message,
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
