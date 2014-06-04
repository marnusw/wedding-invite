
/**
 * The constructor takes a frames object. Then run start() to kick off the animation.
 * 
 * @param {Array} frames An array of frame objects describing the animation.
 * @returns {_L2.Animation}
 */
window.Animation = function(frames, repeat) {
    var base = this;
    
    this.repeat = repeat || 0;
    this.frames = frames;
    this.counter = 0;
    
    this.start = function() {
        this.processFrame();
    };

    var procFrame = this.processFrame = function() {
        if (base.counter >= base.frames.length) {
            if (!base.repeat) {
                return; // End of the animation.
            } else {
                base.counter = 0;
                --base.repeat;
            }
        }
        var c, frame = base.frames[base.counter++];
        for (c in frame.changes) {
            var change = frame.changes[c];
            switch (change.type) {
                case 'add'      : base.add(change.id, change.x, change.y); break;
                case 'replace'  : base.replace(change.oId, change.nId); break;
                case 'move'     : base.move(change.id, change.x, change.y, change.dur); break;
                case 'remove'   : base.remove(change.id); break;
                case 'start'    : base.startNewAnim(change.frameSet, change.repeat); break;
                case 'callback' : window[change.func](); break;
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
           .css({
               left : x,
               top : y
           });
    };

    this.replace = function(oId, nId) {
        var attrs = Images[nId],
            img = $('#'+oId);
        if (img.length) {
            img.attr('id', nId)
               .attr('src', attrs.src)
               .attr('height', attrs.height)
               .attr('width', attrs.width);
        }
    };

    this.move = function(id, x, y, dur) {
        var img = $('#'+id);
        if (img.length) {
            img.animate({left: x, top: y}, dur, 'linear');
        }
    };

    this.remove = function(id) {
        var img = $('#'+id);
        if (img.length) {
            img.remove();
        }
    };

    this.startNewAnim = function(frameSet, repeat) {
        new Animation(frameSets[frameSet], repeat).start();
    };
};
