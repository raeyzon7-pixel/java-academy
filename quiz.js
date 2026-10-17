// Renders the practice questions, gives feedback, and keeps score.
(function () {
  if (typeof document === "undefined") return;
  var root = document.getElementById("quiz-root");
  var questions = window.QUIZ_QUESTIONS;
  if (!root || !questions) return;

  var LETTERS = ["A", "B", "C", "D", "E"];
  var titles = {};
  (window.LESSONS || []).forEach(function (l) { titles[l.id] = l.title; });

  var mcq = questions.filter(function (q) { return q.format !== "written"; });
  var state;

  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html !== undefined) e.innerHTML = html;
    return e;
  }

  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

  function start() {
    state = { result: {} }; // question id -> true (right) / false (wrong)
    root.innerHTML = "";

    // Toolbar: filter + score
    var bar = el("div", "scorebar");
    var filters = el("div", "filters");
    var lab = el("label", "", "Show");
    lab.htmlFor = "lesson-filter";
    var sel = el("select");
    sel.id = "lesson-filter";
    sel.appendChild(new Option("All lessons", "all"));
    for (var i = 1; i <= 10; i++) sel.appendChild(new Option("Lesson " + i + (titles[i] ? ": " + titles[i] : ""), String(i)));
    sel.addEventListener("change", applyFilter);
    var missedWrap = el("label", "missed-toggle");
    var missed = el("input");
    missed.type = "checkbox";
    missed.id = "missed-only";
    missed.addEventListener("change", applyFilter);
    missedWrap.appendChild(missed);
    missedWrap.appendChild(document.createTextNode(" Only questions I got wrong"));
    filters.appendChild(lab);
    filters.appendChild(sel);
    filters.appendChild(missedWrap);
    bar.appendChild(filters);

    var right = el("div", "score-side");
    var score = el("div", "score-text");
    score.id = "score-text";
    score.setAttribute("aria-live", "polite");
    right.appendChild(score);
    var reset = el("button", "btn secondary small", "Start over");
    reset.type = "button";
    reset.addEventListener("click", function () { start(); window.scrollTo(0, root.offsetTop - 80); });
    right.appendChild(reset);
    bar.appendChild(right);
    root.appendChild(bar);

    var empty = el("p", "empty-msg hidden", "Nothing to show here. If you ticked \"Only questions I got wrong\", you haven't missed any yet.");
    empty.id = "empty-msg";
    root.appendChild(empty);

    // Questions grouped by lesson
    var number = 0;
    for (var L = 1; L <= 10; L++) {
      var group = questions.filter(function (q) { return q.lesson === L; });
      if (!group.length) continue;
      var sec = el("section", "q-group");
      sec.id = "lesson-" + L;
      sec.setAttribute("data-lesson", String(L));
      var gh = el("div", "q-group-head");
      gh.appendChild(el("h2", "", "Lesson " + L + (titles[L] ? ": " + titles[L] : "")));
      var rv = el("a", "", "Review lesson " + L);
      rv.href = "lesson.html?id=" + L;
      gh.appendChild(rv);
      sec.appendChild(gh);
      group.forEach(function (q) {
        number++;
        sec.appendChild(q.format === "written" ? renderWritten(q, number) : renderMcq(q, number));
      });
      root.appendChild(sec);
    }

    var result = el("div", "result hidden");
    result.id = "final-result";
    result.setAttribute("tabindex", "-1");
    root.appendChild(result);

    update();
  }

  function head(q, number) {
    var h = el("div", "q-meta");
    h.innerHTML = "<span>Question " + number + "</span><span class=\"q-type\">" + esc(q.type) + "</span>" +
      (q.format === "written" ? "<span class=\"q-self\">Check it yourself</span>" : "");
    return h;
  }

  function renderMcq(q, number) {
    var box = el("article", "q");
    box.id = "q-" + q.id;
    box.setAttribute("data-qid", q.id);
    box.appendChild(head(q, number));
    var promptId = "qp-" + q.id;
    var p = el("div", "q-prompt", q.prompt);
    p.id = promptId;
    box.appendChild(p);
    if (q.code) box.appendChild(window.JA.codeBlock(q.code, "Java"));

    var opts = el("div", "options");
    opts.setAttribute("role", "group");
    opts.setAttribute("aria-labelledby", promptId);
    var feedback = el("div", "feedback");
    feedback.setAttribute("aria-live", "polite");
    var buttons = [];

    q.options.forEach(function (text, oi) {
      var b = el("button", "opt");
      b.type = "button";
      b.innerHTML = "<span class=\"opt-letter\">" + LETTERS[oi] + "</span><span class=\"opt-text\">" + esc(text) + "</span>";
      b.addEventListener("click", function () {
        if (state.result[q.id] !== undefined) return;
        var isRight = oi === q.answer;
        state.result[q.id] = isRight;
        buttons.forEach(function (btn, bi) {
          btn.disabled = true;
          if (bi === q.answer) btn.classList.add("correct");
          else if (bi === oi) btn.classList.add("wrong");
        });
        box.classList.add(isRight ? "is-right" : "is-wrong");
        var html;
        if (isRight) {
          html = "<p><span class=\"verdict ok\">Correct.</span> " + q.explain + "</p>";
        } else {
          html = "<p><span class=\"verdict no\">Not quite.</span> You chose " + LETTERS[oi] + ". " + (q.why && q.why[oi] ? q.why[oi] : "") + "</p>" +
            "<p><strong>The answer is " + LETTERS[q.answer] + ".</strong> " + q.explain + "</p>" +
            "<p><a href=\"lesson.html?id=" + q.lesson + "\">Review Lesson " + q.lesson + (titles[q.lesson] ? ": " + titles[q.lesson] : "") + "</a></p>";
        }
        feedback.innerHTML = html;
        update();
      });
      buttons.push(b);
      opts.appendChild(b);
    });

    box.appendChild(opts);
    box.appendChild(feedback);
    return box;
  }

  function renderWritten(q, number) {
    var box = el("article", "q written");
    box.id = "q-" + q.id;
    box.setAttribute("data-qid", q.id);
    box.appendChild(head(q, number));
    box.appendChild(el("div", "q-prompt", q.prompt));
    if (q.code) box.appendChild(window.JA.codeBlock(q.code, "Java"));

    var taId = "ta-" + q.id;
    var lab = el("label", "ta-label", "Your answer (this isn't saved or marked)");
    lab.htmlFor = taId;
    var ta = el("textarea");
    ta.id = taId;
    ta.rows = 6;
    ta.spellcheck = false;
    box.appendChild(lab);
    box.appendChild(ta);

    var d = el("details", "reveal model");
    d.appendChild(el("summary", "", "Show the model answer and marking criteria"));
    var inner = el("div", "reveal-body");
    var m = q.model || {};
    if (m.code) inner.appendChild(window.JA.codeBlock(m.code, m.cls ? m.cls + ".java" : "Model answer"));
    if (m.output) inner.appendChild(window.JA.outputBlock(m.output, "Output", false));
    if (m.cases) {
      var t = el("div", "table-scroll");
      t.innerHTML = "<table class=\"data\"><caption>Test inputs</caption><thead><tr><th>User types</th><th>Program ends with</th></tr></thead><tbody>" +
        m.cases.map(function (c) { return "<tr><td><code>" + esc(c.in).replace(/\n/g, "</code>, then <code>") + "</code></td><td>" + esc(c.out) + "</td></tr>"; }).join("") +
        "</tbody></table>";
      inner.appendChild(t);
    }
    if (m.text) inner.appendChild(el("div", "prose", m.text));
    if (q.criteria) {
      inner.appendChild(el("p", "criteria-title", "<strong>Check your answer.</strong> Tick off what you got:"));
      var ul = el("ul", "checklist");
      q.criteria.forEach(function (c, ci) {
        var li = el("li");
        var cb = el("input");
        cb.type = "checkbox";
        cb.id = "crit-" + q.id + "-" + ci;
        var l = el("label", "", c);
        l.htmlFor = cb.id;
        li.appendChild(cb);
        li.appendChild(l);
        ul.appendChild(li);
      });
      inner.appendChild(ul);
    }
    d.appendChild(inner);
    box.appendChild(d);
    return box;
  }

  function applyFilter() {
    var lesson = document.getElementById("lesson-filter").value;
    var missedOnly = document.getElementById("missed-only").checked;
    var anyShown = false;
    Array.prototype.forEach.call(root.querySelectorAll(".q-group"), function (sec) {
      var lessonOk = lesson === "all" || sec.getAttribute("data-lesson") === lesson;
      var shownInGroup = 0;
      Array.prototype.forEach.call(sec.querySelectorAll(".q"), function (box) {
        var qid = box.getAttribute("data-qid");
        var show = lessonOk && (!missedOnly || state.result[qid] === false);
        box.classList.toggle("hidden", !show);
        if (show) shownInGroup++;
      });
      sec.classList.toggle("hidden", shownInGroup === 0);
      if (shownInGroup) anyShown = true;
    });
    document.getElementById("empty-msg").classList.toggle("hidden", anyShown);
  }

  function update() {
    var answered = 0, correct = 0;
    mcq.forEach(function (q) {
      if (state.result[q.id] !== undefined) { answered++; if (state.result[q.id]) correct++; }
    });
    var total = mcq.length;
    document.getElementById("score-text").innerHTML =
      "<strong>Score: " + correct + " / " + answered + "</strong> answered &middot; " + (total - answered) + " left";

    var result = document.getElementById("final-result");
    if (answered === total) {
      var pct = Math.round((correct / total) * 100);
      var rows = "";
      for (var L = 1; L <= 10; L++) {
        var g = mcq.filter(function (q) { return q.lesson === L; });
        if (!g.length) continue;
        var c = g.filter(function (q) { return state.result[q.id]; }).length;
        rows += "<tr" + (c < g.length ? " class=\"needs-work\"" : "") + "><td><a href=\"lesson.html?id=" + L + "\">Lesson " + L + (titles[L] ? ": " + titles[L] : "") +
          "</a></td><td>" + c + " / " + g.length + "</td></tr>";
      }
      var missedCount = total - correct;
      result.innerHTML = "<h2>Final score: " + correct + " / " + total + " (" + pct + "%)</h2>" +
        "<p>" + (missedCount === 0
          ? "You got every multiple-choice question right. Try the written ones too if you haven't yet."
          : "You missed " + missedCount + ". Go back over those, then reread the lessons highlighted in the table.") + "</p>" +
        "<div class=\"table-scroll\"><table class=\"data\"><caption>Score by lesson</caption><thead><tr><th>Lesson</th><th>Correct</th></tr></thead><tbody>" + rows + "</tbody></table></div>" +
        (missedCount ? "<p><button type=\"button\" class=\"btn\" id=\"review-missed\">Review the questions I missed</button></p>" : "");
      result.classList.remove("hidden");
      var rb = document.getElementById("review-missed");
      if (rb) rb.addEventListener("click", function () {
        document.getElementById("lesson-filter").value = "all";
        document.getElementById("missed-only").checked = true;
        applyFilter();
        window.scrollTo(0, root.offsetTop - 80);
      });
    } else {
      result.classList.add("hidden");
    }
    applyFilter();
  }

  start();

  if (window.location.hash) {
    var target = document.getElementById(window.location.hash.slice(1));
    if (target) target.scrollIntoView({ behavior: "instant" });
  }
})();
