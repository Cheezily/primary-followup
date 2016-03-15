function startQuiz() {

  var userID;

  var candidates = [{id: 1, display: 'Hillary Clinton'},
    {id: 2, display: 'Bernie Sanders'}, {id: 3, display: 'Ted Cruz'},
    {id: 4, display: 'Donald Trump'}, {id: 5, display: 'John Kasich'},
    {id: 6, display: 'Marco Rubio'}];

  var traits = [{id: 1, display: 'Honest'}, {id: 2, display: 'Trustworthy'},
    {id: 3, display: 'Experienced'}, {id: 4, display: 'Intelligent'},
    {id: 5, display: 'Principled'}, {id: 6, display: 'Pragmatic'},
    {id: 7, display: 'Idealistic'}, {id: 8, display: 'Passionate'},
    {id: 9, display: 'Outsider'}, {id: 10, display: 'Compassionate'},
    {id: 11, display: 'None of the above'}];

  var issues = [{id: 1, display: 'Immigration'},
   {id: 2, display: 'Income Inequality'}, {id: 3, display: 'Abortion'},
   {id: 4, display: 'Taxes'}, {id: 5, display: 'The National Debt'},
   {id: 6, display: 'Terrorism'}, {id: 7, display: 'The Economy'},
   {id: 8, display: 'The Environment'}, {id: 9, display: 'Healthcare'},
   {id: 10, display: 'Criminal Justice'}, {id: 11, display: 'Education'},
   {id: 12, display: 'Privacy/Data Security'}, {id: 13, display: 'Moral Values'},
   {id: 14, display: 'Corruption in Government'}];

   var validID = [8097, 6217, 7723, 8263, 7661, 7910, 6292, 3749, 2735, 9617,
     3923, 5873, 7347, 6958, 3872, 2721, 8634, 1979, 3910, 1734, 3082, 4587,
     4135, 5010, 2757, 1910, 8944, 7912, 1424, 3153, 6818, 9007, 9843, 9508,
     6636, 6615, 8033, 8395, 2955, 6764, 4459, 6129, 6773, 5738, 5085, 1540,
     3411, 2491, 5447, 1976, 7426, 9265, 6419, 3262, 5039, 9955, 3396, 5394,
     6677, 2447, 5558, 4390, 3131, 8437, 9999];

  var responses = {};
  var questionNumber = 0; //used as a step counter for the whole script
  var fadeDelay = 300; //time in ms for questions to transition

  $('#consentButton').click(function() {
    $('#consentButton').hide();
    $('.container').show();
  });


  $('.next').click(function() {

    //console.log("QN: " + questionNumber);

    if (questionTest(questionNumber)) {
      //questionNumber++;
      console.log(JSON.stringify(responses));

      cycleQuestions(questionNumber, questionNumber + 1);
      showQuestionOptions(questionNumber);
      questionNumber++;
      $('.warning').text('');
    } else {

    }
  });


  function showQuestionOptions(questionAsked) {

    questionAsked++;

    console.log("QN: " + questionNumber);

    if (questionAsked === 0) {
      //This is the consent statement. No options required.
    }

    if (questionAsked === 1) {
      //This is a simple question. No options required.
    }

    if (questionAsked === 2) {
      //This is a simple question. No options required.
    }

    if (questionAsked === 3) {
      //This is a simple question. No options required.
    }

    if (questionAsked === 4) {
      //This is a simple question. No options required.
    }

    if (questionAsked === 5) {
      //This is a simple question. No options required.
    }

    if (questionAsked === 6) {
      var candidateList = candidates.slice(0);
      $('.q6List').append(showList("candidateList", randomize(candidateList),
       "radio"));
       showArray(candidateList);
    }

    if (questionAsked === 7) {
      var candidateID = Number(responses["prefer2"] - 1);
      faveCand = candidates[candidateID].display;
      //console.log("candID: " + candidateID + " faveCand: " + faveCand);
      $('.faveCandidate').prepend(faveCand);
    }

    if (questionAsked === 8) {
      //This is a simple question. No options required.
    }

    if (questionAsked === 9) {
      //This is a simple question. No options required.
    }

    if (questionAsked === 10) {
      //This is a simple question. No options required.
    }

    if (questionAsked === 11) {
      //This is a simple question. No options required.
    }

    if (questionAsked === 12) {
      //This is a simple question. No options required.
    }

    if (questionAsked === 13) {
      //This is a simple question. No options required.
    }

    if (questionAsked === 14) {
      //This is a simple question. No options required.
    }

    if (questionAsked === 15) {
      var traitList = randomize(traits.slice(0, traits.length - 1));
      traitList[traitList.length] = traits[traits.length - 1];
      $('.q15List').append(showList("traits2", traitList, "checkbox"));
    }

    if (questionAsked === 16) {
      var issueList = issues.slice(0);
      $('.q16List').append(showList("issues2", randomize(issueList), "radio"));
    }

    if (questionAsked === 17) {
      var faveIssue = '';
      var issueID = Number(responses["issues2"] - 1);
      faveIssue = issues[issueID].display;
      $('.faveIssue').text(faveIssue.toLowerCase());
    }

    if (questionAsked === 18) {
      //This is a simple question. No options required.
    }

    if (questionAsked === 19) {
      //This is a simple question. No options required.
    }

    if (questionAsked === 20) {
      //This is a simple question. No options required.
    }

    if (questionAsked === 21) {
      //This is a simple question. No options required.
    }

    if (questionAsked === 22) {
      responses['time'] = new Date();
      submitData(responses);
      $('.next').fadeOut(600);
    }

  };


  function questionTest(questionAnswered) {

    if (questionAnswered === 0) return true;

    if (questionAnswered === 1) {
      console.log("id: " + $('#userID').val() + " index: " + validID.indexOf(parseInt($('#userID').val())));
      if (validID.indexOf(parseInt($('#userID').val())) != -1) {
        responses['userID'] = $('#userID').val();
        return true;
      } else {
        $('.warning').text("That's not a valid ID.  Please try again or ask Dr. Milita for help.");
        return false;
      }
    }

    if (questionAnswered === 2) {
      if ($('input[name=vote2]:checked').val()) {
        responses["vote2"] = $('input[name=vote2]:checked').val();
        if (responses['vote2'] === "1") {
          //whether question 2 is displayed is based on the
          //response to question 1. '99' means no response given.
          responses['vote_other'] = '99';
          cycleQuestions(questionNumber, questionNumber + 3);
          questionNumber = questionNumber + 2;
          //showQuestionOptions(questionNumber);
        }
        return true;
      } else {
        $('.warning').text('Please select an option to continue.');
        return false;
      }
    }

    if (questionAnswered === 3) {
      if ($('input[name=vote_other]:checked').val()) {
        responses["vote_other"] = $('input[name=vote_other]:checked').val();
        return true;
      } else {
        $('.warning').text('Please select an option to continue.');
        return false;
      }
    }

    if (questionAnswered === 4) {
      if ($('input[name=why_no]:checked').val()) {
        responses["why_no"] = $('input[name=why_no]:checked').val();
        responses['why_yes'] = '99';
        cycleQuestions(questionNumber, questionNumber + 2);
        questionNumber++;
        return true;
      } else {
        $('.warning').text('Please select an option to continue.');
        return false;
      }
    }

    if (questionAnswered === 5) {
      if ($('input[name=why_yes]:checked').val()) {
        responses["why_yes"] = $('input[name=why_yes]:checked').val();
        responses['why_no'] = '99';
        return true;
      } else {
        $('.warning').text('Please select an option to continue.');
        return false;
      }
    }

    if (questionAnswered === 6) {
      console.log('cList Val: ' + $('input[name=candidateList]:checked').val())
      if ($('input[name=candidateList]:checked').val()) {
        responses['prefer2'] = $('input[name=candidateList]:checked').val();
        showArray(candidates);
        return true;
      } else {
        $('.warning').text('Please select an option to continue.');
        return false;
      }
    }

    if (questionAnswered === 7) {
      if ($('input[name=enthusiasm2]:checked').val()) {
        responses['enthusiasm2'] = $('input[name=enthusiasm2]:checked').val();
        //console.log('enthusiasm: ' + responses['enthusiasm2']);
        return true;
      } else {
        $('.warning').text('Please select an option to continue.');
        return false;
      }
    }

    if (questionAnswered === 8) {
      if ($('input[name=yourself2]:checked').val()) {
        responses['yourself2'] = $('input[name=yourself2]:checked').val();
        return true;
      } else {
        $('.warning').text("Please select an option to continue.");
        return false;
      }
    }

    if (questionAnswered === 9) {
      if ($('input[name=kasich2]:checked').val()) {
        responses['kasich2'] = $('input[name=kasich2]:checked').val();
        return true;
      } else {
        $('.warning').text("Please select an option to continue.");
        return false;
      }
    }

    if (questionAnswered === 10) {
      if ($('input[name=clinton2]:checked').val()) {
        responses['clinton2'] = $('input[name=clinton2]:checked').val();
        return true;
      } else {
        $('.warning').text("Please select an option to continue.");
        return false;
      }
    }

    if (questionAnswered === 11) {
      if ($('input[name=cruz2]:checked').val()) {
        responses['cruz2'] = $('input[name=cruz2]:checked').val();
        return true;
      } else {
        $('.warning').text("Please select an option to continue.");
        return false;
      }
    }

    if (questionAnswered === 12) {
      if ($('input[name=sanders2]:checked').val()) {
        responses['sanders2'] = $('input[name=sanders2]:checked').val();
        return true;
      } else {
        $('.warning').text("Please select an option to continue.");
        return false;
      }
    }

    if (questionAnswered === 13) {
      if ($('input[name=trump2]:checked').val()) {
        responses['trump2'] = $('input[name=trump2]:checked').val();
        return true;
      } else {
        $('.warning').text("Please select an option to continue.");
        return false;
      }
    }

    if (questionAnswered === 14) {
      if ($('input[name=rubio2]:checked').val()) {
        responses['rubio2'] = $('input[name=rubio2]:checked').val();
        return true;
      } else {
        $('.warning').text("Please select an option to continue.");
        return false;
      }
    }

    if (questionAnswered === 15) {
      var noneOfTheAbove = false;
      var q1Length = 0;
      $('input[name=traits2]:checked').each(function() {
        if ($(this).val()) q1Length++;
        //console.log("selected: " + $(this).val());
        if ($(this).val() == traits.length.toString())
         {
           noneOfTheAbove = true;
         }
      });

      if (q1Length > 1 && noneOfTheAbove) {
        $('.warning').text('None of the above must be selected by itself');
        return false;
      } else if (q1Length > 0 && q1Length <= 3) {

        responses["traits2_1"] = '';
        responses["traits2_2"] = '';
        responses["traits2_3"] = '';

        var traitCounter = 1;

        $('input[name=traits2]:checked').each( function() {
          if ($(this).val()) {
            responses["traits2_" + traitCounter] = $(this).val()
            traitCounter++;
          };
        });
        console.log("answer number 1: " + responses["traits2_1"]);
        console.log("answer number 2: " + responses["traits2_2"]);
        console.log("answer number 3: " + responses["traits2_3"]);
        return true;

      } else if (q1Length < 1) {
        $('.warning').text('Please select at least one option');
        return false;
      } else {
        $('.warning').text('Please only select up to three options');
        return false;
      }
    }

    if (questionAnswered === 16) {
      if ($('input[name=issues2]:checked').val()) {
        responses["issues2"] = $('input[name=issues2]:checked').val();
        return true;
      } else {
        $('.warning').text('Please select an option to continue.');
        return false;
      }
    }

    if (questionAnswered === 17) {
      if ($('input[name=clarity2]:checked').val()) {
        responses["clarity2"] = $('input[name=clarity2]:checked').val();
        return true;
      } else {
        $('.warning').text('Please select an option to continue.');
        return false;
      }
    }

    if (questionAnswered === 18) {
      if ($('input[name=chance2]:checked').val()) {
        responses["chance2"] = $('input[name=chance2]:checked').val();
        return true;
      } else {
        $('.warning').text('Please select an option to continue.');
        return false;
      }
    }

    if (questionAnswered === 19) {
      if ($('input[name=gen_elec]:checked').val()) {
        responses["gen_elec"] = $('input[name=gen_elec]:checked').val();
        return true;
      } else {
        $('.warning').text('Please select an option to continue.');
        return false;
      }
    }

    if (questionAnswered === 20) {
      if ($('#open_ended1').val().length > 0) {
        responses["open_ended1"] = $('#open_ended1').val()
        return true;
      } else {
        $('.warning').text('Please list something to continue!');
        return false;
      }
    }

    if (questionAnswered === 21) {
      if ($('#open_ended2').val().length > 0) {
        responses["open_ended2"] = $('#open_ended2').val()
        return true;
      } else {
        $('.warning').text('Please list something to continue!');
        return false;
      }
    }


  };


  function randomize(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };


  function showList(name, array, selectType) {
    var html = '';

    for (var i = 0; i < array.length; i++) {
      html += "<input type='" + selectType + "' name='" + name +
      "' id='" + array[i].id.toString() + "-" + array[i].display +
      "' value='" + array[i].id + "'>" +
      "<label for='" + array[i].id.toString() + "-" + array[i].display + "'>" +
      array[i].display + "</label><br>";
    }

    return html;
  };

////////////////////////////////////////////////////
//hides the queston that was just answered and
//displays the next one
  function cycleQuestions(q1, q2, fadeDelay) {

    fadeDelay = 400;

    var oldQuestion = ".q" + q1;
    var newQuestion = ".q" + q2;

    //console.log('q1 out: ' + oldQuestion + " q2 in: " + newQuestion);

    $(oldQuestion).slideUp(fadeDelay);
    setTimeout(function() {
      $(newQuestion).slideDown(fadeDelay);
    }, fadeDelay + 50);

  };

  //////////////////////////////////////////////////////////////
  //submit completed user data to the database
  function submitData(dataOut) {
    $.ajax({
      type: 'post',
      url: '/',
      data: dataOut,
      success: function(response) {
        //$('.warning').text(response.success);
        $('.next').hide();
        window.location.replace('/finished');
      },
      dataType: 'json'
    });
  }

function showArray(array) {
  console.log("-----------------");
  $.each(array, function(index, value) {
    console.log('index: ' + value['id'] + ' data: ' + value['display'])
  })
}


};


startQuiz();
