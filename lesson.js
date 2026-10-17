// Renders one lesson from LESSONS, chosen by ?id= in the URL.
(function () {
  var root = document.getElementById("lesson-root");
  if (!root || !window.LESSONS) return;

  var params = new URLSearchParams(window.location.search);
  var id = parseInt(params.get("id"), 10);
  var lesson = window.LESSONS.filter(function (l) { return l.id === id; })[0];

  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html !== undefined) e.innerHTML = html;
    return e;
  }

  function table(t) {
    var scroll = el("div", "table-scroll");
    var tbl = el("table", "data");
    var cap = t.caption ? "<caption>" + t.caption + "</caption>" : "";
    var thead = "<tr>" + t.head.map(function (h) { return "<th scope=\"col\">" + h.replace(/</g, "&lt;") + "</th>"; }).join("") + "</tr>";
    var rows = t.rows.map(function (r) {
      return "<tr>" + r.map(function (c) { return "<td>" + c + "</td>"; }).join("") + "</tr>";
    }).join("");
    tbl.innerHTML = cap + "<thead>" + thead + "</thead><tbody>" + rows + "</tbody>";
    scroll.appendChild(tbl);
    return scroll;
  }

  function list(tag, items, cls) {
    var l = el(tag, cls);
    items.forEach(function (s) { l.appendChild(el("li", "", s)); });
    return l;
  }

  if (!lesson) {
    document.title = "Lesson not found | Java Academy";
    root.appendChild(el("div", "wrap narrow lesson-missing",
      "<h1>Lesson not found</h1><p>There is no lesson with that number. Lessons are numbered 1 to " +
      window.LESSONS.length + ".</p><p><a class=\"btn\" href=\"lessons.html\">See all lessons</a></p>"));
    return;
  }

  document.title = "Lesson " + lesson.id + ": " + lesson.title + " | Java Academy";

  var toc = []; // [id, label]
  function section(parent, idName, heading) {
    var s = el("section", "lesson-section");
    s.id = idName;
    s.appendChild(el("h2", "", heading));
    toc.push([idName, heading]);
    parent.appendChild(s);
    return s;
  }

  // ---------- Head ----------
  var head = el("div", "lesson-head");
  var hw = el("div", "wrap lesson-wrap");
  hw.appendChild(el("nav", "crumbs", '<a href="lessons.html">All lessons</a> <span aria-hidden="true">/</span> Lesson ' + lesson.id + " of " + window.LESSONS.length));
  hw.lastChild.setAttribute("aria-label", "Breadcrumb");
  hw.appendChild(el("h1", "", '<span class="lesson-num">Lesson ' + lesson.id + "</span>" + lesson.title));
  hw.appendChild(el("p", "lesson-intro", lesson.intro));
  head.appendChild(hw);
  root.appendChild(head);

  // ---------- Body ----------
  var layout = el("div", "wrap lesson-wrap lesson-layout");
  var tocBox = el("nav", "toc");
  tocBox.setAttribute("aria-label", "On this page");
  var body = el("div", "lesson-body");
  layout.appendChild(tocBox);
  layout.appendChild(body);

  // Concept
  var c = section(body, "concept", lesson.conceptHeading || "The main idea");
  lesson.concept.forEach(function (p) { c.appendChild(el("p", "", p)); });
  function addVisual() { if (lesson.visual) c.appendChild(el("div", "diagram", lesson.visual)); }
  if (lesson.visualFirst) addVisual();
  (lesson.tables || []).forEach(function (t) { c.appendChild(table(t)); });
  if (!lesson.visualFirst) addVisual();

  function addSections(arr, prefix) {
    (arr || []).forEach(function (s, i) {
      var sec = section(body, prefix + (i + 1), s.heading);
      sec.appendChild(el("div", "prose", s.html));
    });
  }
  addSections(lesson.sections, "more-");

  // Syntax
  if (lesson.syntax || lesson.rules) {
    var syn = section(body, "syntax", "Syntax");
    if (lesson.syntax) syn.appendChild(window.JA.codeBlock(lesson.syntax, "Pattern (not a complete program)"));
    if (lesson.rules) syn.appendChild(list("ul", lesson.rules, "rules"));
  }

  // Examples
  var examples = lesson.examples.concat(lesson.examples2 || []);
  var exSec = section(body, "examples", examples.length > 1 ? "Examples" : "Example");
  examples.forEach(function (ex, i) {
    var card = el("article", "example");
    card.appendChild(el("h3", "", (examples.length > 1 ? "Example " + (i + 1) + ": " : "") + ex.title));
    card.appendChild(window.JA.codeBlock(ex.code, ex.cls + ".java"));
    if (ex.output !== undefined) {
      card.appendChild(window.JA.outputBlock(ex.output, ex.outputLabel || "Output", ex.isError));
    }
    if (ex.note) card.appendChild(el("p", "note", ex.note));
    if (ex.cases) {
      card.appendChild(table({
        caption: "Other inputs to try",
        head: ["User types", "Program ends with"],
        rows: ex.cases.map(function (cs) {
          return ["<code>" + cs.in.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\n/g, "</code>, then <code>") + "</code>",
            cs.out.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\n/g, "<br>")];
        })
      }));
    }
    if (ex.how) {
      card.appendChild(el("h4", "how-title", "How it runs"));
      card.appendChild(list("ol", ex.how, "how"));
    }
    if (ex.trace) card.appendChild(table(ex.trace));
    exSec.appendChild(card);
  });

  addSections(lesson.sections2, "deeper-");

  // Common mistakes
  var ms = section(body, "mistakes", lesson.mistakes.length > 1 ? "Common mistakes" : "Common mistake");
  lesson.mistakes.forEach(function (m, i) {
    var card = el("article", "mistake");
    card.appendChild(el("h3", "", (lesson.mistakes.length > 1 ? "Mistake " + (i + 1) + ": " : "") + m.intro));
    var pair = el("div", "pair");
    var left = el("div", "pair-side");
    left.appendChild(el("span", "bad-label", "Incorrect"));
    left.appendChild(window.JA.codeBlock(m.bad.code, m.bad.cls + ".java"));
    left.appendChild(window.JA.outputBlock(m.bad.result, m.bad.resultLabel || "Result", true));
    var right = el("div", "pair-side");
    right.appendChild(el("span", "good-label", "Corrected"));
    right.appendChild(window.JA.codeBlock(m.good.code, m.good.cls + ".java"));
    right.appendChild(window.JA.outputBlock(m.good.result, m.good.resultLabel || "Output", false));
    pair.appendChild(left);
    pair.appendChild(right);
    card.appendChild(pair);
    card.appendChild(el("p", "why", m.why));
    ms.appendChild(card);
  });

  // Coding style (Lesson 3)
  if (lesson.style) {
    var st = section(body, "style", lesson.styleHeading || "Style");
    st.appendChild(el("p", "", lesson.style.intro));
    var sp = el("div", "pair");
    [["bad", "Hard to read", "bad-label"], ["good", "Readable", "good-label"]].forEach(function (k) {
      var side = el("div", "pair-side");
      side.appendChild(el("span", k[2], k[1]));
      side.appendChild(window.JA.codeBlock(lesson.style[k[0]].code, lesson.style[k[0]].cls + ".java"));
      side.appendChild(window.JA.outputBlock(lesson.style[k[0]].result, "Output", false));
      sp.appendChild(side);
    });
    st.appendChild(sp);
    st.appendChild(el("h3", "", "Style habits to follow"));
    st.appendChild(list("ul", lesson.style.rules, "rules"));
  }

  // Extra (beyond the core lesson)
  if (lesson.extra && lesson.extra.length) {
    var xs = section(body, "extra", "Extra (not required for this unit)");
    xs.appendChild(el("p", "muted", "You don't need these for the unit, but they're good to know."));
    lesson.extra.forEach(function (x) {
      var d = el("details", "extra");
      d.appendChild(el("summary", "", x.title));
      d.appendChild(el("div", "prose", x.html));
      xs.appendChild(d);
    });
  }

  // Class reminder
  if (lesson.reminder && window.JA.reminderCallout) {
    body.appendChild(window.JA.reminderCallout(lesson.reminder));
  }

  // Try it yourself
  if (lesson.tryIt) {
    var ti = section(body, "try", "Try it yourself");
    ti.appendChild(el("p", "", "Type the examples into IntelliJ (<a href=\"lessons.html#run-in-intellij\">here's how</a>) and try these. Guess what'll happen before you run each one."));
    ti.appendChild(list("ol", lesson.tryIt));
  }

  // Practice task
  var ch = section(body, "practice-task", "Practice task");
  ch.classList.add("challenge");
  ch.appendChild(el("div", "prose", "<p>" + lesson.challenge.task + "</p>"));
  if (lesson.challenge.code) ch.appendChild(window.JA.codeBlock(lesson.challenge.code, (lesson.challenge.codeCls || "Task") + ".java"));
  ch.appendChild(el("p", "", "<strong>Expected result:</strong> " + lesson.challenge.expected));
  var hint = el("details", "reveal hint");
  hint.appendChild(el("summary", "", "Show a hint"));
  hint.appendChild(el("p", "", lesson.challenge.hint));
  ch.appendChild(hint);
  var sol = lesson.challenge.solution;
  if (sol) {
    var sd = el("details", "reveal solution");
    sd.appendChild(el("summary", "", "Show a solution (try it yourself first)"));
    var inner = el("div", "solution-body");
    inner.appendChild(window.JA.codeBlock(sol.code, sol.cls + ".java"));
    inner.appendChild(window.JA.outputBlock(sol.output, "Output", false));
    if (sol.cases) {
      inner.appendChild(table({
        caption: "Test it with these inputs too",
        head: ["User types", "Program ends with"],
        rows: sol.cases.map(function (cs) {
          return ["<code>" + cs.in.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\n/g, "</code>, then <code>") + "</code>",
            cs.out.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\n/g, "<br>")];
        })
      }));
    }
    inner.appendChild(el("p", "", sol.explain));
    sd.appendChild(inner);
    ch.appendChild(sd);
  }

  // Recap
  var rc = section(body, "recap", "Recap");
  rc.appendChild(el("p", "", "Tick these off once you can do them without looking back. Your ticks get saved in this browser."));
  var ul = el("ul", "checklist");
  lesson.recap.forEach(function (text, i) {
    var li = el("li");
    var cb = el("input");
    cb.type = "checkbox";
    cb.id = "chk-" + i;
    var key = "ja-recap-" + lesson.id + "-" + i;
    try { cb.checked = window.localStorage.getItem(key) === "1"; } catch (e) { /* storage unavailable */ }
    cb.addEventListener("change", function () {
      try { window.localStorage.setItem(key, cb.checked ? "1" : "0"); } catch (e) { /* ignore */ }
    });
    var lab = el("label", "", text);
    lab.htmlFor = cb.id;
    li.appendChild(cb);
    li.appendChild(lab);
    ul.appendChild(li);
  });
  rc.appendChild(ul);
  rc.appendChild(el("p", "", "Then try the <a href=\"practice.html#lesson-" + lesson.id + "\">Lesson " + lesson.id + " practice questions</a>."));

  // Pager
  var pager = el("nav", "pager");
  pager.setAttribute("aria-label", "Lesson navigation");
  var prev = window.LESSONS.filter(function (l) { return l.id === lesson.id - 1; })[0];
  var next = window.LESSONS.filter(function (l) { return l.id === lesson.id + 1; })[0];
  function pagerLink(cls, small, big, href) {
    var a = el("a", "pager-link " + cls, "<small>" + small + "</small>" + big);
    a.href = href;
    return a;
  }
  pager.appendChild(prev ? pagerLink("prev", "Previous", "Lesson " + prev.id + ": " + prev.title, "lesson.html?id=" + prev.id) : el("span"));
  pager.appendChild(next ? pagerLink("next", "Next", "Lesson " + next.id + ": " + next.title, "lesson.html?id=" + next.id)
                         : pagerLink("next", "Finished all ten?", "Go to practice", "practice.html"));
  body.appendChild(pager);

  // Table of contents
  tocBox.appendChild(el("p", "toc-title", "On this page"));
  var tl = el("ol");
  toc.forEach(function (t) {
    var li = el("li");
    var a = el("a", "", t[1]);
    a.href = "#" + t[0];
    li.appendChild(a);
    tl.appendChild(li);
  });
  tocBox.appendChild(tl);

  root.appendChild(layout);

  // Jump to a section if the URL has a hash (the page is built after load).
  if (window.location.hash) {
    var target = document.getElementById(window.location.hash.slice(1));
    if (target) target.scrollIntoView({ behavior: "instant" });
  }
})();
