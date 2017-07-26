app.filter('serviceLabel', function() {
  return function(labelType) {
    var labelClass;
    if (labelType === 'ENHANCEMENT') {
      labelClass = 'label-primary';
    } else if (labelType === 'ISSUE') {
      labelClass = 'label-danger';
    } else if (labelType === 'RESOLUTION') {
      labelClass = 'label-success';
    } else if (labelType === 'REPORT') {
      labelClass = 'label-info';
    } else if (labelType === 'SCHEDULED_DOWNTIME') {
        labelClass = 'label-warning';
    } else if (labelType === 'MAINTENANCE') {
      labelClass = 'label-default';
    }
    return labelClass;
  } 
});