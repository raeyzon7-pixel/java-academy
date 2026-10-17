// Shared behaviour: mobile menu, home page code sample, and Mr. Lauder's class reminders.
(function () {
  document.documentElement.classList.add("js");

  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // Home page hero code sample
  var heroCode = document.getElementById("hero-code");
  if (heroCode && window.JA) {
    heroCode.innerHTML = "";
    heroCode.appendChild(window.JA.codeBlock(
      'for (int i = 0; i < 5; i++) {\n    System.out.println("i is " + i);\n}',
      "From Lesson 8"));
    heroCode.appendChild(window.JA.outputBlock("i is 0\ni is 1\ni is 2\ni is 3\ni is 4", "Output"));
  }

  // ---------- Class reminders ----------
  // The two fill-in-the-blank reminders from Mr. Lauder's class. Used on the home page,
  // the practice page (static HTML in those pages) and inside lessons (built here).
  var REMINDERS = {
    silence: {
      before: "Do not suffer in",
      answer: "Silence",
      accept: "silence",
      meaning: "If you've been stuck on the same error for a while, ask someone. A friend or the teacher can usually spot a missing semicolon or a <code>=</code> that should be <code>==</code> way faster than you can by staring at it."
    },
    consistency: {
      before: "The key to success is",
      answer: "Consistency",
      accept: "consistency|consistent|beingconsistent",
      meaning: "Doing a bit of Java most days works better than cramming the night before. Each lesson builds on the last one, so it's a lot easier to keep up than to catch up."
    }
  };

  function normalize(s) { return String(s).toLowerCase().replace(/[^a-z]/g, ""); }

  // Adds Check / Reveal behaviour to a .blank element (the HTML works without this, using <details>).
  function wireBlank(box) {
    if (box.getAttribute("data-wired")) return;
    box.setAttribute("data-wired", "1");
    var form = box.querySelector("form");
    var inputEl = box.querySelector("input");
    var feedback = box.querySelector(".blank-feedback");
    var details = box.querySelector("details");
    var gap = box.querySelector(".gap");
    var answer = box.getAttribute("data-answer");
    var accept = (box.getAttribute("data-accept") || "").split("|");

    function fill() {
      if (gap) { gap.textContent = answer.toLowerCase(); gap.classList.add("filled"); }
    }
    if (details) details.addEventListener("toggle", function () { if (details.open) fill(); });
    if (form) form.addEventListener("submit", function (e) {
      e.preventDefault();
      var guess = normalize(inputEl.value);
      if (!guess) {
        feedback.className = "blank-feedback";
        feedback.textContent = "Type your answer first, then press Check.";
        return;
      }
      if (accept.indexOf(guess) !== -1) {
        feedback.className = "blank-feedback ok";
        feedback.textContent = "Correct! The answer is “" + answer + ".”";
        fill();
        if (details) details.open = true;
      } else {
        feedback.className = "blank-feedback no";
        feedback.textContent = "Not quite. Have another go, or reveal the answer below.";
      }
    });
  }

  var blankCount = 0;
  function buildBlank(key) {
    var r = REMINDERS[key];
    var n = "blank-" + key + "-" + (++blankCount);
    var box = document.createElement("div");
    box.className = "blank";
    box.setAttribute("data-answer", r.answer);
    box.setAttribute("data-accept", r.accept);
    box.innerHTML =
      '<p class="blank-q">“' + r.before + ' <span class="gap">______</span>.”</p>' +
      '<form class="blank-form"><label for="' + n + '">Your answer</label>' +
      '<input id="' + n + '" type="text" autocomplete="off" spellcheck="false">' +
      '<button type="submit" class="btn secondary">Check</button></form>' +
      '<p class="blank-feedback" role="status"></p>' +
      '<details class="reveal"><summary>Reveal the answer</summary><div class="reveal-body">' +
      '<p class="blank-answer">' + r.answer + '.</p><p>' + r.meaning + '</p></div></details>';
    wireBlank(box);
    return box;
  }

  // A small reminder box placed inside a lesson. kind is "silence", "consistency" or "loop".
  function reminderCallout(kind) {
    var aside = document.createElement("aside");
    aside.className = "class-reminder callout";
    aside.setAttribute("aria-label", "Class reminder");
    var title = '<p class="reminder-kicker">Remember this from class</p>';
    if (kind === "loop") {
      aside.innerHTML = title +
        '<p class="reminder-big">START, STOP, KEEP GOING</p>' +
        '<p>Before you trace a for loop, find the three parts. In <code>for (int i = 0; i &lt; 5; i++)</code>: ' +
        '<strong>START</strong> is <code>int i = 0</code>, <strong>STOP</strong> is <code>i &lt; 5</code>, and ' +
        '<strong>KEEP GOING</strong> is <code>i++</code>.</p>' +
        '<p><a href="index.html#reminders">See all of Mr. Lauder\'s class reminders</a></p>';
    } else {
      aside.innerHTML = title + '<p>Try filling in the blank first.</p>';
      aside.appendChild(buildBlank(kind));
      var more = document.createElement("p");
      more.innerHTML = '<a href="index.html#reminders">See all of Mr. Lauder\'s class reminders</a>';
      aside.appendChild(more);
    }
    return aside;
  }

  Array.prototype.forEach.call(document.querySelectorAll(".blank"), wireBlank);

  window.JA = window.JA || {};
  window.JA.reminderCallout = reminderCallout;
  window.JA.normalizeAnswer = normalize;
})();
