
(function() {
    
    window.frameSets = {};
    
    var center = {x: 550, y: 275};
    
    frameSets.SetUp = [{
        changes : [{
            type: 'add', id: 'EnterName', 
            x: center.x - Images.EnterName.width/2, 
            y: center.y - Images.EnterName.height - 50
        },{
            type: 'addHtml',
            html: '<input id="EnterNameInput" type="text" class="anim" style="width:200px" />',
            x: center.x - 100, 
            y: center.y - 40
        },{
            type: 'add', id: 'BeginClick', 
            x: center.x - Images.BeginClick.width/2, 
            y: center.y,
            css: 'clickable'
        }]
    }];
    
    frameSets.Start = [{
        changes : [
            {type: 'remove', id: 'EnterName'},
            {type: 'remove', id: 'EnterNameInput'},
            {type: 'remove', id: 'BeginClick'},
            {type: 'start', frameSet: 'TypingStart'},
            {type: 'start', frameSet: 'Explosion'}
        ]
    }];

    //---------------------------------------------------------------------------------------------
    var mTypingStart = {x: 250, y: 320};
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
    var nTableStart = {x: 800, y: 320};
    frameSets.Explosion = [{
        changes  : [{type: 'add', id: 'N_table', x: nTableStart.x, y: nTableStart.y}],
        duration : 3500
    },{
        changes  : [{type: 'replace', oId: 'N_table', nId: 'N_tablePour'}],
        duration : 2000
    },{
        changes  : [
            {type: 'replace', oId: 'N_tablePour', nId: 'N_tableTrouble'}
        ],
        duration : 1300
    },{
        changes  : [
            {type: 'replace', oId: 'M_type1', nId: 'M_listen'},
            {type: 'replace', oId: 'M_type2', nId: 'M_listen'}
        ],
        duration : 1300
    },{
        changes  : [
            {type: 'remove', id: 'N_tableTrouble'},
            {type: 'add', id: 'Table_boom', x: nTableStart.x, y: nTableStart.y - 72},
            {type: 'start', frameSet: 'StepFly'},
            {type: 'start', frameSet: 'NAfly'}
        ],
        duration : 800
    },{
        changes  : [{type: 'replace', oId: 'M_listen', nId: 'M_shock'}],
        duration : 2700
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
            {type: 'move', id: 'N_fly', x: mTypingStart.x+(naFlyStart.x-mTypingStart.x)/2, y: naFlyStart.y - 200, dur: naFlyStart.duration}
        ],
        duration : naFlyStart.duration
    },{
        changes  : [
            {type: 'move', id: 'N_fly', x: mTypingStart.x, y: naFlyStart.y, dur: naFlyStart.duration}
        ],
        duration : naFlyStart.duration
    },{
        changes  : [
            {type: 'add', id: 'MN_Crash', x: 1, y: mTypingStart.y - 110},
            {type: 'remove', id: 'M_shock'},
            {type: 'remove', id: 'N_fly'}
        ],
        duration : 2000
    },{
        changes  : [{type: 'start', frameSet: 'CentreStage'}]
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

    //---------------------------------------------------------------------------------------------
    var centreStageEnd = {x: 230, y: 230, dur: 3500};
    var tangledStart = {x: 450, y: 370};
    frameSets.CentreStage = [{
        changes  : [
            {type: 'move', id: 'MN_Crash', x: centreStageEnd.x, y: centreStageEnd.y, dur: centreStageEnd.dur},
            {type: 'move', id: 'Table_empty', x: 1300, y: centreStageEnd.y, dur: centreStageEnd.dur}
        ],
        duration : centreStageEnd.dur + 1000
    },{
        changes  : [
            {type: 'add', id: 'MN_TangleSad', x: tangledStart.x, y: tangledStart.y},
            {type: 'remove', id: 'MN_Crash'},
            {type: 'remove', id: 'Table_empty'}
        ],
        duration : 2500
    },{
        changes  : [{type: 'replace', oId: 'MN_TangleSad', nId: 'MN_TangleHappy'}],
        duration : 1500
    },{
        changes  : [{type: 'add', id: 'Heart', x: 420, y: 25}],
        duration : 1500
    },{
        changes  : [{type: 'replace', oId: 'Heart', nId: 'Heart1'}],
        duration : 1500
    },{
        changes  : [{type: 'replace', oId: 'MN_TangleHappy', nId: 'MN_TangleFrust'}],
        duration : 3000
    },{
        changes  : [{type: 'replace', oId: 'Heart1', nId: 'Heart2'}],
        duration : 1500
    },{
        changes  : [{type: 'replace', oId: 'MN_TangleFrust', nId: 'MN_TangleAngry'}],
        duration : 3000
    },{
        changes  : [{type: 'replace', oId: 'Heart2', nId: 'Heart3'}],
        duration : 1500
    },{
        changes  : [{type: 'replace', oId: 'MN_TangleAngry', nId: 'MN_TangleHappy'}],
        duration : 4000
    },{
        changes  : [{type: 'move', id: 'Heart3', x: 25, y: 25, dur: 3000}],
        duration : 3300
    },{
        changes  : [
            {type: 'remove', id: 'MN_TangleHappy'},
            {type: 'add', id: 'MN_Engage', x: 340, y: 300},
            {type: 'replace', oId: 'Heart3', nId: 'HeartInvite'}
        ],
        duration : 4000
    },{
        changes  : [
            {type: 'replace', oId: 'MN_Engage', nId: 'MN_Wedding'},
            {type: 'callback', func: 'showInfo'}
        ]
    }];
    
})();