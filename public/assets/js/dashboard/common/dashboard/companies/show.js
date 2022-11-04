// add csrf token as header for every ajax request.
$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

$('.list-transactions-button').on('click', function () {
    $('#edit-route').attr('href', $(this).data('edit-url'));

    var show_route = $(this).data('show-url');
    $.get(show_route).done(function (respond) {
        // Customer Info Section.
        var customer_info = $('#customer-info');
        if (respond.data.customer?.name !== undefined) {
            customer_info.parent().parent().parent().removeClass('d-none');
            customer_info.empty().append(
                '<td>' + respond.data.customer.name + '</td>' +
                '<td>' + respond.data.customer.email + '</td>' +
                '<td>' + respond.data.customer.mobile + '</td>'
            )
        } else {
            customer_info.parent().parent().parent().addClass('d-none');
        }
        // Other Info Section
        var remark = respond.data.latest_interaction?.remarks !== undefined ? respond.data.latest_interaction?.remarks : '-';
        var program = respond.data.company.program_id ? respond.data.company.program?.name : '-';
        var username = respond.data.company.user_id ? respond.data.company.user?.name : '-';
        $('#other-info').empty().append(
            '<td>' + remark + '</td>' +
            '<td>' + program + '</td>' +
            '<td>' + respond.data.company.stage + '</td>' +
            '<td>' + respond.data.company.status.name + '</td>' +
            '<td>' + username + '</td>'
        )
        // Interactions Section.
        var interactions = $('#interactions');
        interactions.empty();
        if (respond.data.interactions.total) {
            respond.data.interactions.data.forEach(function (interaction) {
                var interaction_date = interaction.interaction_date
                    ? moment(interaction.interaction_date).format("YYYY-MM-DD HH:MM A") : '-';
                var next_interaction_date = interaction.next_interaction_date
                    ? moment(interaction.next_interaction_date).format("YYYY-MM-DD HH:MM A") : '-';
                interactions.append(
                    '<tr>' +
                    '<td>' + interaction.touch_points + '</td>' +
                    '<td>' + interaction_date + '</td>' +
                    '<td>' + moment(interaction.created_at).format("YYYY-MM-DD HH:MM A") + '</td>' +
                    '<td>' + next_interaction_date + '</td>' +
                    '<td>' + interaction.action + '</td>' +
                    '<td>' + interaction.remarks + '</td>' +
                    '<td>' + interaction.user.name + '</td>' +
                    '</tr>'
                );
            });
        }
    });
});
