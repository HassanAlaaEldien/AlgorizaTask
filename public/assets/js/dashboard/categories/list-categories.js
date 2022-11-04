var parent_category_input = $('#parent_category');
parent_category_input.select2({
    ajax: {
        url: parent_category_input.data('list-url'),
        dataType: 'json',
        delay: 250,
        data: function (params) {
            return {
                name: params.term, // search term
                page: params.page
            };
        },
        processResults: function (data, params) {
            // parse the results into the format expected by Select2
            // since we are using custom formatting functions we do not need to
            // alter the remote JSON data, except to indicate that infinite
            // scrolling can be used
            params.page = params.page || 1;

            return data;
        },
        cache: true
    },
    escapeMarkup: function (markup) {
        return markup;
    }, // let our custom formatter work
    templateResult: function (repo) {
        if (repo.loading) return repo.text;
        var markup = "<div class='select2-result-repository clearfix'>" +
            "<div class='select2-result-repository__meta'>" +
            "<div class='select2-result-repository__title'>" + repo.name + "</div>" +
            "</div>" +
            "</div>";
        return markup;
    }, // omitted for brevity, see the source of this page
    templateSelection: function (repo) {
        if (repo.id === '') { // adjust for custom placeholder values
            return 'Search categories....';
        }
        return repo.name || repo.element.label;
    } // omitted for brevity, see the source of this page
});
