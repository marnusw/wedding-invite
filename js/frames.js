
(function() {
    
    window.SetUp = [{
        changes : [
            {type: 'add', id: 'N_table', x: 200, y: 150}
        ]
    }];

    window.Explosion = [{
        changes  : [{type: 'replace', oId: 'N_table', nId: 'N_tablePour'}],
        duration : 1000
    },{
        changes  : [{type: 'replace', oId: 'N_tablePour', nId: 'N_tableTrouble'}],
        duration : 1000
    },{
        changes  : [
            {type: 'remove', id: 'N_tableTrouble'},
            {type: 'add', id: 'Table_boom', x: 300, y: 150},
            {type: 'start', frames: NAfly}
        ],
        duration : 400
    },{
        changes  : [{type: 'replace', oId: 'Table_boom', nId: 'Table_empty'}]
    }];

    window.NAfly = [{
        changes  : [{type: 'add', id: 'N_fly', x: 300, y: 150}],
        duration : 50
    },{
        changes  : [{type: 'move', id: 'N_fly', x: 150, y: 50, dur: 200}],
        duration : 200
    },{
        changes  : [{type: 'move', id: 'N_fly', x: 1, y: 150, dur: 200}],
        duration : 200
    },{
        changes  : [{type: 'remove', id: 'N_fly'}]
    }];

})();