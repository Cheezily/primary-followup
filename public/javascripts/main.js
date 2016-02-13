function startQuiz() {

  var userID;

  var candidates = [{id: 1, display: 'Hillary Clinton'},
    {id: 2, display: 'Bernie Sanders'}, {id: 3, display: 'Jeb Bush'},
    {id: 4, display: 'Ted Cruz'}, {id: 5, display: 'Donald Trump'},
    {id: 6, display: 'John Kasich'}, {id: 7, display: 'Ben Carson'},
    {id: 8, display: 'Marco Rubio'}];

  var traits = [{id: 1, display: 'Honest'}, {id: 2, display: 'Trustworthy'},
    {id: 3, display: 'Experienced'}, {id: 4, display: 'Intellegent'},
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

  var responses = {};
  var questionNumber = 0; //used as a step counter for the whole script
  var fadeDelay = 300; //time in ms for questions to transition

  $('.next').click(function() {

    //console.log(questionNumber);

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

    if (questionAsked === 0) {

    }

    if (questionAsked === 1) {
      var traitList = randomize(traits.slice(0, traits.length - 1));
      traitList[traitList.length] = traits[traits.length - 1];
      $('.q1List').append(showList("traitList", traitList, "checkbox"));
    }

    if (questionAsked === 2) {
      var issueList = issues.slice(0);
      $('.q2List').append(showList("issueList", randomize(issueList), "radio"));
    }

    if (questionAsked === 3) {
      var candidateList = candidates.slice(0);
      $('.q3List').append(showList("candidateList", randomize(candidateList),
       "radio"));
    }

    if (questionAsked === 4) {
      var faveIssue = '';
      var faveCandidate = '';

      //console.log("candidate: " + responses['prefer']);
      //console.log('issue: ' + responses["issues"]);

      var issueID = Number(responses["issues"] - 1);
      faveIssue = issues[issueID].display;

      var candidateID = Number(responses["prefer"] - 1);
      faveCand = candidates[candidateID].display;

      //console.log(faveIssue);
      //console.log(faveCand);

      $('.faveCandidate').prepend(faveCand);
      $('.faveIssue').text(faveIssue.toLowerCase());
      setSlider('claritySlider');
    }

    if (questionAsked === 5) {
      setSlider('enthusiasmSlider');
    }

    if (questionAsked === 6) {
      //This is a simple question. No options required.
    }

    if (questionAsked === 7) {
      setSlider('peerEnthusiasmSlider');
    }

    if (questionAsked === 8) {

      //display one label for all sliders
      var sliderWidth = 520;
      var max = 10;
      var min = 1;
      var step = 1;
      var labelWidth = sliderWidth / ((max - min) * step);
      var ideologyDisplayed = false;

      for (var i = min; i <= max; i += step) {
        $('#ideologyLabels').append('<div style="width: ' +
        ((labelWidth * .92)) + 'px; height: 30px; float: left;' +
        ' text-align: center;">' + i.toString() + "</div>");
      }

      //display a list of the candidates and a slider for each
      ideologyHtml = '';
      for (var i = 0; i < candidates.length; i++) {
        var candDisplay = candidates[i].display;
        //mimic the format of the variable name that will be
        //collected with candName
        var candName = candDisplay.toLowerCase().replace(/\s/g,'_') + "_ideology";

        ideologyHtml += '<div style="height: 30px; width: 140px; float: left;' +
        'margin: 4px 0;">' + candDisplay +
        '</div><input type="range" min="1" max="10" class="ideologyInput" ' +
        'name="' + candName + '" style="width: 500px; padding-top: 8px;">' +
        '<div class="clearFloat"></div>'
      }

      $('.q8List').append(ideologyHtml);
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
      setSlider('yourIdeologySlider');
    }

    if (questionAsked === 13) {
      //This is a simple question. No options required.
    }

    if (questionAsked === 14) {
      //This is a simple question. No options required.
    }

    if (questionAsked === 15) {

    }

  };


  function questionTest(questionAnswered) {

    if (questionAnswered === 0) return true;

    if (questionAnswered === 1) {
      var noneOfTheAbove = false;
      var q1Length = 0;
      $('input[name=traitList]:checked').each(function() {
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

        responses["trait1"] = '';
        responses["trait2"] = '';
        responses["trait3"] = '';

        var traitCounter = 1;

        $('input[name=traitList]:checked').each( function() {
          if ($(this).val()) {
            responses["trait" + traitCounter] = $(this).val()
            traitCounter++;
          };
        });
        console.log("answer number 1: " + responses["trait1"]);
        console.log("answer number 2: " + responses["trait2"]);
        console.log("answer number 3: " + responses["trait3"]);
        return true;

      } else if (q1Length < 1) {
        $('.warning').text('Please select at least one option');
        return false;
      } else {
        $('.warning').text('Please only select up to three options');
        return false;
      }
    }

    if (questionAnswered === 2) {
      if ($('input[name=issueList]:checked').val()) {
        responses["issues"] = $('input[name=issueList]:checked').val();
        return true;
      } else {
        $('.warning').text('Please select an option to continue.');
        return false;
      }
    }

    if (questionAnswered === 3) {
      if ($('input[name=candidateList]:checked').val()) {
        responses["prefer"] = $('input[name=candidateList]:checked').val();
        return true;
      } else {
        $('.warning').text('Please select an option to continue.');
        return false;
      }
    }

    if (questionAnswered === 4) {
      if ($('input[name=claritySlider]').val()) {
        responses['clarity'] = $('input[name=claritySlider]').val();
        console.log('clarity: ' + responses['clarity']);
        return true;
      } else {
        $('.warning').text('Please enter a value.');
        return false;
      }
    }

    if (questionAnswered === 5) {
      if ($('input[name=enthusiasmSlider]').val()) {
        responses['enthusiasm'] = $('input[name=enthusiasmSlider]').val();
        console.log('enthusiasm: ' + responses['enthusiasm']);
        return true;
      } else {
        $('.warning').text('Please enter a value.');
        return false;
      }
    }

    if (questionAnswered === 6) {
      if ($('input[name=peers]:checked').val()) {
        responses['peers'] = $('input[name=peers]:checked').val();
        if (responses['peers'] === "2") {
          //whether question 7 is displayed is based on the
          //response to question 6. '99' means no response given.
          responses['peer_enthusiasm'] = '99';
          cycleQuestions(questionNumber, questionNumber + 2);
          questionNumber++;
          //showQuestionOptions(questionNumber);
        }
        return true;
      } else {
        $('.warning').text("Please select an option to continue.");
        return false;
      }
    }

    if (questionAnswered === 7) {
      if ($('input[name=peerEnthusiasmSlider]').val()) {
        responses['peer_enthusiasm'] =
          $('input[name=peerEnthusiasmSlider]').val();
        return true;
      } else {
        $('.warning').text("Please select an option to continue.");
        return false;
      }
    }

    if (questionAnswered === 8) {
      //store the response for each candidate in its own variable
      //with a name that matches the field in the database once submitted
      $('.ideologyInput').each(function() {
        var name = $(this).attr("name");
        responses[name] = $(this).val();
      });
      return true;
    }

    if (questionAnswered === 9) {
      if ($('input[name=gender]:checked').val()) {
        responses["gender"] = $('input[name=gender]:checked').val();
        return true;
      } else {
        $('.warning').text("Please select an option to continue.");
        return false;
      }
    }

    if (questionAnswered === 10) {
      if ($('input[name=pid]:checked').val()) {
        responses["pid"] = $('input[name=pid]:checked').val();
        return true;
      } else {
        $('.warning').text("Please select an option to continue.");
        return false;
      }
    }

    if (questionAnswered === 11) {
      if ($('input[name=primary]:checked').val()) {
        responses["primary"] = $('input[name=primary]:checked').val();
        return true;
      } else {
        $('.warning').text("Please select an option to continue.");
        return false;
      }
    }

    if (questionAnswered === 12) {
      if ($('input[name=yourIdeologySlider]').val()) {
        responses['ideology'] =
          $('input[name=yourIdeologySlider]').val();
        return true;
      } else {
        $('.warning').text("Please select an option to continue.");
        return false;
      }
    }

    if (questionAnswered === 13) {
      if ($('input[name=race]:checked').val()) {
        responses["race"] = $('input[name=race]:checked').val();
        return true;
      } else {
        $('.warning').text("Please select an option to continue.");
        return false;
      }
    }

    if (questionAnswered === 14) {
      if ($('input[name=income]:checked').val()) {
        responses["income"] = $('input[name=income]:checked').val();

        //create an initial userID to try
        userID = makeNewId();
        console.log("trying userID: " + userID);

        //calls the function to check if the generated userID is a duplicate
        checkID(userID);

        return true;
      } else {
        $('.warning').text("Please select an option to continue.");
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

///////////////////////////////////////////////////////
//need to make sure that the userID isn't already taken
  function checkID(id) {

    $.ajax({
      type: 'post',
      url: '/idCheck',
      data: {userID: id},
      success: function(result) {
        if (result.status === "clear") {
          console.log("ID GOOD TO GO");
          setID(id);
        } else {
          console.log("DUPLICATE ID");
          tryNewID();
        }
      },
      dataType: 'json'
    });
  }


  function setID(id) {
    responses['userID'] = id;
    console.log('your id is: ' + responses['userID']);
    submitData(responses);
  }


  function tryNewID() {
    checkID(makeNewId());
  }


  function makeNewId() {

    /* I don't think 5 digits will be needed.
    //4 should work just fine
    var id = (Math.random() * 100000).toFixed(0);

    if (id < 10000 && id > 999) {return "0" + id;}
    else if (id < 999) {return "00" + id;}
    else if (id < 100) {return "000" + id;}
    else if (id < 10) {return "0000" + id;}
    else {return id.toString();}
    */

    var id = (Math.random() * 10000).toFixed(0);

    if (id < 999) {return "0" + id;}
    else if (id < 100) {return "00" + id;}
    else if (id < 10) {return "000" + id;}
    else {return id.toString();}

  }


  //////////////////////////////////////////////////////////////
  //submit completed user data to the database
  function submitData(dataOut) {
    $.ajax({
      type: 'post',
      url: '/',
      data: dataOut,
      success: function(response) {
        $('.warning').text(response.success);
        $('#idOutput').text(responses['userID']);
      },
      dataType: 'json'
    });
  }

  ////////////////////////////////////////////////////////////////
  //sets up the labels on the slider whose class name is passed in
  function setSlider(name) {

   var slider;
   var labelDiv = '.' + name;
   var displayed = false;

   // Select all range inputs, watch for change
   $("input[name='" + name + "']").change(function() {

     // Cache this for efficiency
     slider = $(this);

     // Measure attributes of the slider
     sliderWidth = slider.width();
     max = Number(slider.attr('max'));
     min = Number(slider.attr('min'));
     step = Number(slider.attr('step'));
     labelWidth = sliderWidth / ((max - min) * step);

  /*
     console.log('sliderWidth: ' + sliderWidth);
     console.log('max: ' + max);
     console.log('min: ' + min);
     console.log('step: ' + step);
     console.log('labelWidth: ' + labelWidth);
     console.log('labelDiv: ' + labelDiv);
  */

    if (!displayed) {

      $(labelDiv).css({left: "-=" + parseInt((labelWidth / 2)) + "px",
        width: "+=" + (labelWidth - 16) + "px"});

      for (var i = min; i <= max; i += step) {

        $(labelDiv).append('<div class="sliderLabel" style="width: ' +
        ((labelWidth * .97)) + 'px;" id="' + name + i + '">' + i.toString() + "<br>|</div>");
      }
      displayed = true;

    }

     //highlights the label that the slider is on
     for (var i = min; i <= max; i += step) {

       var labelID = '#' + name + i;

       if (Number($("input[name='" + name + "']").val()) === i) {
         $(labelID).addClass('sliderLabelOn');
       } else {
         $(labelID).removeClass('sliderLabelOn');
       }
     }

   })
   // fake change at page load
   .trigger('change');
  };

};


startQuiz();
