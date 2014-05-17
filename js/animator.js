
(function() {

window.setUpAnimation = function() {
    var anim = new Animation(SetUp);
    anim.start();
};

window.runAnimation = function () {
    var anim = new Animation(Explosion);
    anim.start();
};

/**
 * The constructor takes a frames object. Then run start() to kick off the animation.
 * 
 * @param {Array} frames An array of frame objects describing the animation.
 * @returns {_L2.Animation}
 */
var Animation = function(frames) {
    this.frames = frames;
    this.counter = 0;
    var base = this;

    this.start = function() {
        this.processFrame();
    };

    var procFrame = this.processFrame = function() {
        if (base.counter >= base.frames.length) {
            return; // End of the animation.
        }
        var c, frame = base.frames[base.counter++];
        for (c in frame.changes) {
            var change = frame.changes[c];
            switch (change.type) {
                case 'add'     : base.add(change.id, change.x, change.y); break;
                case 'replace' : base.replace(change.oId, change.nId); break;
                case 'move'    : base.move(change.id, change.x, change.y, change.dur); break;
                case 'remove'  : base.remove(change.id); break;
                case 'start'   : base.startNewAnim(change.frames); break;
                default : throw 'Unknown animation change type: ' + change.type;
            }
        }
        if (frame.duration) {
            setTimeout(procFrame, frame.duration);
        }
    };

    this.add = function(id, x, y) {
        var attrs = Images[id],
            img = $('<img class="anim" id="'+id+'" src="'+attrs.src+'" height="'+attrs.height+'" width="'+attrs.width+'">');
        img.appendTo('.page-content')
           .offset({
               left : x,
               top : y
           });
    };

    this.replace = function(oId, nId) {
        var attrs = Images[nId];
        $('#'+oId).attr('id', nId)
                  .attr('src', attrs.src)
                  .attr('height', attrs.height)
                  .attr('width', attrs.width);
    };

    this.move = function(id, x, y, dur) {
        $('#'+id).animate({left: x, top: y}, dur, 'linear');
    };

    this.remove = function(id) {
        $('#'+id).remove();
    };

    this.startNewAnim = function(frames) {
        var anim = new Animation(frames);
        anim.start();
    };
};

})();
