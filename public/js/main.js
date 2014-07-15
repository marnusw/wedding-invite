
(function($) {

var gDfrd, guests,
    guest, partner,
    inviteUrl, infoUrl;

function queryGuests() {
    gDfrd = $.get('/guest-rest', function(json) {
        guests = $.parseJSON(json);
        for (var i in guests) {
            guests[i].fullName = guests[i].name + ' ' + guests[i].surname;
            for (var j in guests[i])
            if (guests[i][j] === '' || guests[i][j] === null) {
                guests[i][j] = null;
            } else if (guests[i][j] == 'false') {
                guests[i][j] = false;
            } else if (guests[i][j] == 'true') {
                guests[i][j] = true;
            }
        }
    });
}

$(document).ready(function() {
    if ($('#invite').length) {
        queryGuests();
        $('body').css({'background':'#fff'});
        var dfrd = $.get('/js/views/animation.html');
        $.when(dfrd, gDfrd).done(function(data) {
            $('#page').html(data[0]);
            var anim = new Animation(frameSets.SetUp);
            anim.start();
        });
    }
});

$(document).on('click', '#BeginClick', function() {
    if (setupFor($('#EnterNameInput').val())) {
        var anim = new Animation(frameSets.Start);
        $('#ClickSkip').show();
        anim.start();
    }
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
    
    var today = new Date();

    guest.repliedAt = today.getFullYear() + '/' + (today.getMonth()+1) + '/' + today.getDate();
    guest.attendMorning = guest.inviteMorning && gAttend[0];
    guest.attendEvening = guest.inviteEvening && gAttend[1];
    saveToServer(guest);
    if (partner) {
        partner.repliedAt = today.getFullYear() + '/' + (today.getMonth()+1) + '/' + today.getDate();
        partner.attendMorning = partner.inviteMorning && pAttend[0];
        partner.attendEvening = partner.inviteEvening && pAttend[1];
        saveToServer(partner);
    }
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

window.showInvite = function() {
    console.log(guest);
    $.get(inviteUrl, function(data) {
        $('body').css({'background':'#000'});
        $('#page').html(data);
        var partnerName = partner ? ' en ' + partner.name : '';
        $('#invite-names').html(guest.name + partnerName);
        showRsvpForm();
    });
};

function showInfo() {
    $.get(infoUrl, function(data) {
        $('body').css({'background':'#000'});
        $('#page').html(data);
    });
}


function showRsvpForm(force) {
    if (!force && showRsvpDone()) {
        return;
    }
    $('#rsvp-form').show();
    $('#rsvp-yes').hide();
    $('#rsvp-no').hide();
    $('#guestName').html(guest.name + ':');
    partner && $('#partnerName').html(partner.name.charAt(0).toUpperCase() + partner.name.slice(1) + ':');
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
    if (!guest.viewedAt) {
        var today = new Date();
        guest.viewedAt = today.getFullYear() + '/' + (today.getMonth()+1) + '/' + today.getDate();
        saveToServer(guest);
    }
}

function saveToServer(person) {
    $.ajax({
        url: '/guest-rest/' + person.id,
        type: 'PUT',
        data: person,
        success: parseReponse
    });
}

function parseReponse(json) {
    var i, data = $.parseJSON(json),
        person = findGuest('id', data.id);
    if (!person.partner && data['partner']) {
        person.partner = data['partner'];
    }
    delete data['partner'];
    for (i in data) {
        if (data[i] === '' || data[i] === null) {
            data[i] = null;
        } else if (data[i] == 'false') {
            data[i] = false;
        } else if (data[i] == 'true') {
            data[i] = true;
        }
        person[i] = data[i];
    }
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
      if (substrRegex.test(guest.fullName) && guest.fullName !== 'jou metgesel') {
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
