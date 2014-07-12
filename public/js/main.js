
(function() {

$(document).ready(function() {
    var anim = new Animation(frameSets.SetUp);
    anim.start();
});

$(document).on('click', '#BeginClick', function() {
    var anim = new Animation(frameSets.Start);
//    var anim = new Animation(frameSets.NAfly);
    anim.start();
});

$(document).on('click', '#ClickReset', function() {
    $('.page-content').html('');
    var anim = new Animation(frameSets.SetUp);
    anim.start();
});

window.showInfo = function() {
    console.log('show info');
};

})();
