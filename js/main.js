
$(document).ready(function() {
    var anim = new Animation(frameSets.SetUp);
    anim.start();
});

$(document).on('click', '#ClickStart', function() {
    var anim = new Animation(frameSets.Explosion);
    anim.start();
});
