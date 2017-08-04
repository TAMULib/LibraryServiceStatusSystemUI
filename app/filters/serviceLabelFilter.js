app.filter('serviceLabel', function () {
    return function (labelType) {
        var labelClass;
        switch (labelType) {
        case 'ENHANCEMENT':
            labelClass = 'label-primary';
            break;
        case 'ISSUE':
            labelClass = 'label-danger';
            break;
        case 'RESOLUTION':
            labelClass = 'label-success';
            break;
        case 'REPORT':
            labelClass = 'label-info';
            break;
        case 'SCHEDULED_DOWNTIME':
            labelClass = 'label-warning';
            break;
        case 'MAINTENANCE':
            labelClass = 'label-default';
            break;
        }
        return labelClass;
    };
});
