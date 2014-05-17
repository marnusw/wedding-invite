
(function() {
    
    window.frameSets = {};
    
    var center = {x: 550, y: 265};
    
    frameSets.SetUp = [{
        changes : [
            {type: 'add', id: 'ClickStart', x: center.x - Images.ClickStart.width/2, y: center.y - Images.ClickStart.height/2}
        ]
    }];
    
    var nTableStart = {x: 800, y: 250};
    
    frameSets.Explosion = [{
        changes  : [
            {type: 'remove', id: 'ClickStart'},
            {type: 'add', id: 'N_table', x: nTableStart.x, y: nTableStart.y}
        ],
        duration : 2000
    },{
        changes  : [{type: 'replace', oId: 'N_table', nId: 'N_tablePour'}],
        duration : 1500
    },{
        changes  : [{type: 'replace', oId: 'N_tablePour', nId: 'N_tableTrouble'}],
        duration : 1500
    },{
        changes  : [
            {type: 'remove', id: 'N_tableTrouble'},
            {type: 'add', id: 'Table_boom', x: nTableStart.x, y: nTableStart.y - 72},
            {type: 'start', frameSet: 'StepFly'},
            {type: 'start', frameSet: 'NAfly'}
        ],
        duration : 3500
    },{
        changes  : [{type: 'replace', oId: 'Table_boom', nId: 'Table_empty'}]
    }];
    
    var naFlyStart = {x: nTableStart.x - 182, y: nTableStart.y - 16, duration : 450};
    frameSets.NAfly = [{
        changes  : [{type: 'add', id: 'N_fly', x: naFlyStart.x, y: naFlyStart.y}],
        duration : 50
    },{
        changes  : [{type: 'move', id: 'N_fly', x: naFlyStart.x / 2, y: naFlyStart.y - 150, dur: naFlyStart.duration}],
        duration : naFlyStart.duration
    },{
        changes  : [{type: 'move', id: 'N_fly', x: 1, y: naFlyStart.y, dur: naFlyStart.duration}],
        duration : naFlyStart.duration
    },{
        changes  : [{type: 'remove', id: 'N_fly'}]
    }];
    
    var stepFlyStart = {x: nTableStart.x - 40, y: nTableStart.y - 110, dur : 500};
    frameSets.StepFly = [{
        changes  : [{type: 'add', id: 'Step_fly', x: stepFlyStart.x, y: stepFlyStart.y}],
        duration : 50
    },{
        changes  : [{type: 'move', id: 'Step_fly', x: stepFlyStart.x - 300, y: -200, dur: stepFlyStart.dur}],
        duration : stepFlyStart.duration
    },{
        changes  : [{type: 'remove', id: 'Step_fly'}]
    }];

})();