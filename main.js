var questions = [
    {
      q: "Who is the father of Computer",
      a: "Mark",
      b: "Charles Babbage",
      c: "James",
      d: "Shaun",
      ans: "b",
      opt1: "a",
      opt2: "c",
    },
    {
      q: "Who is the father of Nation",
      a: "Gandhi Ji",
      b: "Raju Ji",
      c: "Ravi Ji",
      d: "Ajay Ji",
      ans: "a",
      opt1: "b",
      opt2: "d",
    },
    {
      q: "Full form of ATM",
      a: "Any Time Money",
      b: "all time Masti",
      c: "All the Monkeys",
      d: "Automated Teller Machine",
      ans: "d",
      opt1: "a",
      opt2: "b",
    },
    {
      q: "The year in which India gained it's independance?",
      a: "1934",
      b: "1945",
      c: "1946",
      d: "1947",
      ans: "d",
      opt1: "a",
      opt2: "c",
    },
  ];

  // ================================Defaults========================
  $("#quizBox").hide();
  $("#restartQuiz").hide();
  $("#nextQuestion").hide();

  // ================================Variables========================
  var pname = "";
  // count will increment for each question.
  var count = 0;
  // following cid variable will store the id of the .opt that we will click.
  var cid = "";
  // following variable is to store points
  var points = 0;
  var len = questions.length;

  // ===========Timer Variables=======
  var totalmins = 0; // mins given by quiz master
  var convertedtosecs = 0; //mins converted to secs
  var remainingmins = 0;
  var remainingsecs = 0;
  var quiztime = "";


  // ================================Strart Quiz Button========================
  $("#startQuizBtn").click(function () {
    // storing the player name in a variable.
    pname = $("#playerName").val();

    // hides the initial screen.
    // show the actual quizBox.
    $("#startQuiz").hide();
    $("#quizBox").show();

    // give the player name in quizBox.
    if (pname != "") {
      $("#changePlayerName").text(pname);
    }
    // calling the following two functions.
    loadQuestion();
    startTime();
  });

  // ================================loadQuestion Function========================
  function loadQuestion() {
    // loading questions and all of the possible answers.
    // count is used as index (which is a global variable to store count numbers)
    $("#q").text(questions[count].q);
    $("#a").val(questions[count].a);
    $("#b").val(questions[count].b);
    $("#c").val(questions[count].c);
    $("#d").val(questions[count].d);
    // Dynamically changing the content of #questionNo element
    $("#questionNo").text(`Question No. ${count + 1}/${len}`);
  }

  // ================================validation===============
  $(".opt").click(function () {
    // storing the id value of the opt that was clicked upon.
    cid = $(this).attr("id");
    // if the id of the opt button is same as
    // the ans key's value of the object that is in the count index of the questions array.
    // We've stored answer in questions[count].ans
    // Therefore we will check those two
    if (cid == questions[count].ans) {
      // we immediately change the background color of the right answer.
      $(this).css("background", "green");
      // we're increasing the points.
      points++;
      // we're displaying the updated value in DOM.
      $("#points").text(`Points: ${points}`);
    } else {
      // We're changing the background of wrong answer's in red.
      $(this).css("background", "red");
      // // we immediately change the background color of the right answer.
      // We fade out and fade in just to highlight the correct answer.
      $("#" + questions[count].ans)
        .css("background", "green")
        .fadeOut()
        .fadeIn();
    }
    // Disabling all of the options.
    // We're adding disabled prop here.
    $(".opt").prop("disabled", "true");
    // Then we're showing the next question.
    $("#nextQuestion").show();
  });

  // ================================Next Button===============
  $("#nextQuestion").click(function () {
    // we're increasing the count's value.
    count++;
    // resetting the background for all .opt.
    $(".opt").css("background", "");
    $(".opt").prop("disabled", "");
    // When we've reached the last question
    if (count >= len) {
      // We will hide the quiz box.
      $("#quizBox").hide();
      // We will show the retart quiz wizard.
      $("#restartQuiz").show();
      // show the final points in finalPoints element.
      $("#finalPoints").text(`Final Points: ${points}`);
    } else {
      // when there are qustions.
      // we will call loadQuestion function.
      loadQuestion();
    }

    $("#nextQuestion").hide();
  });

  // ================================Restart quiz Button===============
  $("#restartQuizBtn").click(function () {
    $("#quizBox").show();
    $("#restartQuiz").hide();
    $("#lifeLine").prop("disabled", "");
    resetQuiz();
    loadQuestion();
    startTime();
  });

  // ===========================Reset Quiz ==============
  function resetQuiz() {
    count = 0;
    points = 0;
    clearInterval(quiztime);
    $("#time").text("00:00");
    $("#points").text(`Points: 0`);
    $("#questionNo").text(`Question No. ${count + 1}/${len}`);
  }

  // =========================Timer=========================

  // ============= start time function===============
  function startTime() {
    // total allocated time for the quiz is 2mins.
    totalmins = 5;
    // we've simply converted 2 mins into seconds.
    convertedtosecs = 60 * totalmins;

    // this following function will be called in every 1 second's interval.
    function timer() {
        // we're decrementing convertedtosecs variable's value.
      convertedtosecs--;
        // then, we're calculating the remaining minutes.
      remainingmins = Math.floor(convertedtosecs / 60);
      // Similarly, we're calculating the remaining seconds.
      remainingsecs = convertedtosecs % 60;
        // if the remaining minutes are in the range of 9 to 0
      if (remainingmins <= 9 && remainingmins >= 0) {
        remainingmins = "0" + remainingmins;
      }
      // if the remaining seconds are in the range of 9 to 0
      if (remainingsecs <= 9 && remainingsecs >= 0) {
        remainingsecs = "0" + remainingsecs;
      }

      $("#time").text(`${remainingmins}:${remainingsecs}`);
      // when we've reached to 0 seconds,
      if (convertedtosecs == 0) {
        // we stop the interval using clearInterval function.
        clearInterval(quiztime);
        // we also hide the quizBox.
        $("#quizBox").hide();
        // We show the restartQuiz box.
        $("#restartQuiz").show();
      }
    }
    // we're calling time function in every 1 second
    // and assigning the interval id to quiztime
    quiztime = setInterval(timer, 1000);
  }

  // ==============LifeLine=========
  // when someone clicks on the lifeline button,
  $("#lifeLine").click(function () {
    // we're simply removing value from opt1 and opt2 key's values in the object
    // at count index of questions array.
    $("#" + questions[count].opt1).val("");
    $("#" + questions[count].opt2).val("");
    // then we're simply disabling those two,
    // by adding disabled=true
    $("#" + questions[count].opt1).prop("disabled", "true");
    $("#" + questions[count].opt2).prop("disabled", "true");
    // we're also disbaling #lifeLine button.
    $(this).prop("disabled", "true");
  });