
(function($) {

var gDfrd, guests,
    guest, partner,
    inviteUrl, infoUrl;

function queryGuests() {
    gDfrd = $.get('/guest-rest', function(json) {
        guests = $.parseJSON(json);
        for (var i in guests) {
            guests[i].fullName = guests[i].name + ' ' + guests[i].surname;
        }
    });
}

$(document).ready(function() {
    if ($('#invite').length) {
        queryGuests();
        resetAnimation();
    }
});

$(document).on('click', '#BeginClick', function() {
    if (setupFor($('#EnterNameInput').val())) {
        var anim = new Animation(frameSets.Start);
        anim.start();
    }
});

$(document).on('click', '#ClickReset', function() {
    resetAnimation();
});

$(document).on('click', '#ClickSkip', function() {
    Animation.stopAll();
    showInvite();
});

$(document).on('click', '#ShowInvite', function() {
    showInvite();
});

$(document).on('click', '#MoreInfo', function() {
    showInfo();
});

$(document).on('click', '#Resubmit', function() {
    showInvite();
    showRsvpForm(true);
});

$(document).on('click', '#rsvp-submit', function() {
    var gAttend = extractRsvp('guest'),
        pAttend;
    if (partner) {
        pAttend = extractRsvp('partner');
    }
    
    if (!gAttend[0] && !gAttend[1] && !gAttend[2]) {
        alert("Dui asseblief aan of jy die troue sal kan bywoon.");
        return false;
    }
    if (partner && !pAttend[0] && !pAttend[1] && !pAttend[2]) {
        alert("Dui asseblief aan of jou metgesel die troue sal kan bywoon.");
        return false;
    }
    
    guest.attendMorning = guest.inviteMorning && gAttend[0];
    guest.attendEvening = guest.inviteEvening && gAttend[1];
    if (partner) {
        partner.attendMorning = partner.inviteMorning && pAttend[0];
        partner.attendEvening = partner.inviteEvening && pAttend[1];
    }
    saveToServer();
    showRsvpDone();
    return false;
});

$(document).on('click', '.rsvp-change', function() {
    showRsvpForm(true);
});

function extractRsvp(type) {
    if ($('input[name="guestRsvp"]').length) {
        var attend = $('input[name="'+type+'Rsvp"]:checked').val() == 'true' ? true : false;
        return [attend, attend, !attend];
    } else {
        return [
            $('input[name="'+type+'RsvpMorn"]').prop('checked'),
            $('input[name="'+type+'RsvpEven"]').prop('checked'),
            $('input[name="'+type+'RsvpNo"]').prop('checked')
        ];
    }
}

function resetAnimation() {
    $('body').css({'background':'#fff'});
    var dfrd = $.get('/js/views/animation.html');
    $.when(dfrd, gDfrd).done(function(data) {
        $('#page').html(data[0]);
        $('#ClickReset').hide();
        $('#ClickSkip').show();
        var anim = new Animation(frameSets.SetUp);
        anim.start();
    });
}

window.showInvite = function() {
    $('#ClickReset').show();
    $('#ClickSkip').hide();
    
    $.get(inviteUrl, function(data) {
        $('#page').html(data);
        $('body').css({'background':'#000'});
        showRsvpForm();
    });
};

function showInfo() {
    $('#ClickReset').show();
    $('#ClickSkip').hide();
    
    $.get(infoUrl, function(data) {
        $('#page').html(data);
        $('body').css({'background':'#000'});
    });
}


function showRsvpForm(force) {
    if (!force && showRsvpDone()) {
        return;
    }
    $('#rsvp-form').show();
    $('#rsvp-yes').hide();
    $('#rsvp-no').hide();
    var partnerName = '';
    if (partner) {
        $('#partnerName').html(partner.name.charAt(0).toUpperCase() + partner.name.slice(1) + ':');
        partnerName = ' en ' + partner.name;
    }
    $('#guestName').html(guest.name + ':');
    $('#invite-names').html(guest.name + partnerName);
}

function showRsvpDone() {
    $('#rsvp-form').hide();
    if (guest.attendMorning || guest.attendEvening || (partner && (partner.attendMorning || partner.attendEvening))) {
        $('#rsvp-yes').show();
        $('#rsvp-no').hide();
    } else if (guest.attendMorning !== null || guest.attendEvening !== null || 
            (partner && (partner.attendMorning !== null || partner.attendEvening !== null))) {
        $('#rsvp-yes').hide();
        $('#rsvp-no').show();
    } else {
        return false;
    }
    return true;
}


function setupFor(fullName) {
    guest = findGuest('fullName', fullName);
    if (!guest) {
        return false;
    }
    partner = findPartner(guest);
    
    if (guest.inviteMorning && guest.inviteEvening) {
        inviteUrl = partner ? '/js/views/invite-both.html' : '/js/views/invite-both-single.html';
        infoUrl = '/js/views/info-both.html';
    } else if (guest.inviteMorning) {
        inviteUrl = partner ? '/js/views/invite-morn.html' : '/js/views/invite-morn-single.html';
        infoUrl = '/js/views/info-morn.html';
    } else {
        inviteUrl = partner ? '/js/views/invite-even.html' : '/js/views/invite-even-single.html';
        infoUrl = '/js/views/info-even.html';
    }
    saveViewTimeToServer();
    return true;
}

function saveViewTimeToServer() {
    console.log(guest);
}

function saveToServer() {
    console.log(guest, partner);
}

function findGuest(field, value) {
    for (var i in guests) {
        if (guests[i][field] === value) {
            return guests[i];
        }
    }
    return false;
}

function findPartner(guest) {
    if (guest.partner) {
        return findGuest('id', guest.partner);
    } else if (guest.partnerAllowed) {
        return {
            name: "jou metgesel",
            attendMorning: null,
            attendEvening: null
        };
    }
    return undefined;
}

// Typeahead

var substringMatcher = function(guests) {
  return function findMatches(q, cb) {
    var matches, substrRegex, fullName;
 
    // an array that will be populated with substring matches
    matches = [];
 
    // regex used to determine if a string contains the substring `q`
    substrRegex = new RegExp(q, 'i');
 
    // iterate through the pool of strings and for any string that
    // contains the substring `q`, add it to the `matches` array
    $.each(guests, function(i, guest) {
      if (substrRegex.test(guest.fullName)) {
        // the typeahead jQuery plugin expects suggestions to a
        // JavaScript object, refer to typeahead docs for more info
        matches.push({ value: guest.fullName });
      }
    });
 
    cb(matches);
  };
};
 
window.addTypeahead = function() {
    $('.typeahead').typeahead({
        hint: true,
        highlight: true,
        minLength: 1
    },{
        name: 'guests',
        displayKey: 'value',
        source: substringMatcher(guests)
    });
};

})($);
