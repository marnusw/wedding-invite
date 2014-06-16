
(function($) {

$(document).ready(function() {
    resetAnimation();
    $('#ClickSkip').click();
});

$(document).on('click', '#BeginClick', function() {
    var anim = new Animation(frameSets.Start);
    anim.start();
});

$(document).on('click', '#ClickReset', function() {
    resetAnimation();
});

$(document).on('click', '#ClickSkip', function() {
    Animation.stopAll();
    $('.page-content').html('');
    var anim = new Animation(frameSets.JumpToEnd);
    anim.start();
    showInfo();
});

function resetAnimation() {
    $('.page-content').html('');
    $('#ClickReset').toggle();
    $('#ClickSkip').toggle();
    var anim = new Animation(frameSets.SetUp);
    anim.start();
}

window.showInfo = function() {
    $('#ClickReset').toggle();
    $('#ClickSkip').toggle();
    
    $.get('/js/views/detail.html', function(data) {
        $('.page-content').append(data);
    });
};

})($);
