
$(document).ready(function() {
    var anim = new Animation(frameSets.SetUp);
    anim.start();
});

$(document).on('click', '#ClickStart', function() {
    var anim = new Animation(frameSets.Start);
    anim.start();
});

$(document).on('click', '#ClickReset', function() {
    $('.page-content').html('');
    var anim = new Animation(frameSets.SetUp);
    anim.start();
});
