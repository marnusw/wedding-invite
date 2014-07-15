
(function() {
    
    window.Images = {
        EnterName : {
            src : '/img/EnterName.png',
            height: 75,
            width: 551
        },
        BeginClick : {
            src : '/img/Begin.png',
            height: 70,
            width: 156
        },
        
        N_table : {
            src : '/img/N table.png',
            height: 189,
            width: 219
        },
        N_tablePour : {
            src : '/img/N pouring.png',
            height: 189,
            width: 219
        },
        N_tableTrouble : {
            src : '/img/N trouble.png',
            height: 189,
            width: 219
        },
        N_fly : {
            src : '/img/N flies.png',
            height: 145,
            width: 157
        },
        
        M_type1 : {
            src : '/img/M type 1.png',
            height: 190,
            width: 199
        },
        M_type2 : {
            src : '/img/M type 2.png',
            height: 190,
            width: 199
        },
        M_listen : {
            src : '/img/M listen.png',
            height: 190,
            width: 199
        },
        M_shock : {
            src : '/img/M shock.png',
            height: 190,
            width: 199
        },
        
        MN_Crash : {
            src : '/img/CRASH.png',
            height: 300,
            width: 487
        },
        MN_TangleSad : {
            src : '/img/Knot1.png',
            height: 160,
            width: 154
        },
        MN_TangleHappy : {
            src : '/img/Knot2.png',
            height: 160,
            width: 154
        },
        MN_TangleFrust : {
            src : '/img/M frustrated.png',
            height: 160,
            width: 154
        },
        MN_TangleAngry : {
            src : '/img/M angry.png',
            height: 160,
            width: 154
        },
        
        MN_Engage : {
            src : '/img/Big Question.png',
            height: 244,
            width: 240
        },
        
        Heart : {
            src : '/img/Heart large.png',
            height: 411,
            width: 493
        },
        Heart1 : {
            src : '/img/Skryf 1.png',
            height: 411,
            width: 493
        },
        Heart2 : {
            src : '/img/Skryf 2.png',
            height: 411,
            width: 493
        },
        Heart3 : {
            src : '/img/Skryf 3.png',
            height: 411,
            width: 493
        },
        
        Step_fly : {
            src : '/img/Step fly.png',
            height: 75,
            width: 68
        },
        
        Table_boom : {
            src : '/img/Table boom.png',
            height: 261,
            width: 232
        },
        Table_empty : {
            src : '/img/Table empty.png',
            height: 261,
            width: 220
        }
    };

    // Preload all images
    var i, preload = [];
    for (i in Images) {
        preload[i] = new Image();
        preload[i].src = Images[i].src;
    }

})();
