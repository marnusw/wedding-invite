
(function() {
    
    window.frameSets = {};
    
    var center = {x: 550, y: 265};
    
    frameSets.SetUp = [{
        changes : [{
                type: 'add', id: 'ClickStart', 
                x: center.x - Images.ClickStart.width/2, 
                y: center.y - Images.ClickStart.height/2
        }]
    }];
    
    frameSets.Start = [{
        changes : [
            {type: 'remove', id: 'ClickStart'},
            {type: 'start', frameSet: 'TypingStart'},
            {type: 'start', frameSet: 'Explosion'}
        ]
    }];

    //---------------------------------------------------------------------------------------------
    var mTypingStart = {x: 250, y: 250};
    frameSets.TypingStart = [{
        changes  : [
            {type: 'add', id: 'M_type1', x: mTypingStart.x, y: mTypingStart.y},
            {type: 'start', frameSet: 'Typing', repeat: 20}
        ],
        duration : 300
    }];
    frameSets.Typing = [{
        changes  : [{type: 'replace', oId: 'M_type2', nId: 'M_type1'}],
        duration : 300
    },{
        changes  : [{type: 'replace', oId: 'M_type1', nId: 'M_type2'}],
        duration : 300
    }];
    
    //---------------------------------------------------------------------------------------------
    var nTableStart = {x: 800, y: 250};
    frameSets.Explosion = [{
        changes  : [{type: 'add', id: 'N_table', x: nTableStart.x, y: nTableStart.y}],
        duration : 3500
    },{
        changes  : [{type: 'replace', oId: 'N_table', nId: 'N_tablePour'}],
        duration : 2000
    },{
        changes  : [{type: 'replace', oId: 'N_tablePour', nId: 'N_tableTrouble'}],
        duration : 2000
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
    
    //---------------------------------------------------------------------------------------------
    var naFlyStart = {x: nTableStart.x - 182, y: nTableStart.y - 16, duration : 1000};
    frameSets.NAfly = [{
        changes  : [{type: 'add', id: 'N_fly', x: naFlyStart.x, y: naFlyStart.y}],
        duration : 50
    },{
        changes  : [
            {type: 'move', id: 'N_fly', x: mTypingStart.x+(naFlyStart.x-mTypingStart.x)/2, y: naFlyStart.y - 200, dur: naFlyStart.duration},
            {type: 'replace', oId: 'M_type1', nId: 'M_listen'},
            {type: 'replace', oId: 'M_type2', nId: 'M_listen'}
        ],
        duration : naFlyStart.duration
    },{
        changes  : [
            {type: 'move', id: 'N_fly', x: mTypingStart.x, y: naFlyStart.y, dur: naFlyStart.duration},
            {type: 'replace', oId: 'M_listen', nId: 'M_shock'}
        ],
        duration : naFlyStart.duration
    },{
        changes  : [
            {type: 'add', id: 'MN_Crash', x: 1, y: mTypingStart.y - 110},
            {type: 'remove', id: 'M_shock'},
            {type: 'remove', id: 'N_fly'}
        ]
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