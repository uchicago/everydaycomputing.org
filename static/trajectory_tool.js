$(document).ready(function() {
    //toggle `popup` / `inline` mode
    console.log('hi');
    $.fn.editable.defaults.mode = 'popup';

    //make username editable
    $('.is_editable').editable();
    //make username editable

    //make status editable
    $('#status').editable({
        type: 'select',
        title: 'Select status',
        placement: 'right',
        value: 2,
        source: [
            {value: 1, text: 'status 1'},
            {value: 2, text: 'status 2'},
            {value: 3, text: 'status 3'}
        ]
        /*
        //uncomment these lines to send data on server
        ,pk: 1
        ,url: '/post'
        */
    });
});

 
