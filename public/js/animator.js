
/**
 * The constructor takes a frames object. Then run start() to kick off the animation.
 * 
 * @param {Array} frames An array of frame objects describing the animation.
 * @returns {_L2.Animation}
 */
window.Animation = function(frames, repeat) {
    var base = this;
    
    this.key = Animation.key++;
    Animation.anims[this.key] = base;
    
    this.timer = false;
    this.stopped = false;
    this.repeat = repeat || 0;
    this.frames = frames;
    this.counter = 0;
    
    this.start = function() {
        this.processFrame();
    };
    this.stop = function() {
        delete Animation.anims[base.key];
        Animation.stop[base.key] = true;
    };

    this.processFrame = function() {
        if (Animation.stop[base.key]) {
            base.stop();
            return;
        }
        if (base.counter >= base.frames.length) {
            if (!base.repeat) {
                base.stop();
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
                case 'add'      : base.add(change.id, change.x, change.y, change.css); break;
                case 'replace'  : base.replace(change.oId, change.nId); break;
                case 'move'     : base.move(change.id, change.x, change.y, change.dur); break;
                case 'remove'   : base.remove(change.id); break;
                case 'start'    : base.startNewAnim(change.frameSet, change.repeat); break;
                case 'addHtml'  : base.addHtml(change.html, change.x, change.y); break;
                case 'callback' : window[change.func](); break;
                default : throw 'Unknown animation change type: ' + change.type;
            }
        }
        if (frame.duration) {
            setTimeout(base.processFrame, frame.duration);
        } else {
            base.stop();
        }
    };

    this.add = function(id, x, y, css) {
        var attrs = Images[id],
            img = $('<img class="anim '+css+'" id="'+id+'" src="'+attrs.src+'" height="'+attrs.height+'" width="'+attrs.width+'">');
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

    this.addHtml = function(html, x, y) {
        $(html).appendTo('.page-content')
               .css({
                   left : x,
                   top : y
               });
    };

    this.startNewAnim = function(frameSet, repeat) {
        new Animation(frameSets[frameSet], repeat).start();
    };
};

window.Animation.anims = {};
window.Animation.stop = {};
window.Animation.key = 0;

window.Animation.stopAll = function() {
    var a, anims = window.Animation.anims;
    for (a in anims) {
        anims[a].stop();
    }
};
