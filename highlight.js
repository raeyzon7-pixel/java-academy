// Small Java syntax highlighter + code block builder (no libraries).
(function () {
  var KEYWORDS = ["public","private","protected","static","void","class","import","new","if","else","for","while","do","switch","case","default","break","continue","return","try","catch","finally","true","false","null","int","double","float","long","short","byte","char","boolean","final"];
  var kwSet = {};
  KEYWORDS.forEach(function (k) { kwSet[k] = true; });

  function esc(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  // Returns highlighted HTML for one line of Java.
  function highlightLine(line) {
    var re = /(\/\/.*$)|("(?:[^"\\]|\\.)*")|('(?:[^'\\]|\\.)')|(\b\d+(?:\.\d+)?[fFL]?\b)|([A-Za-z_][A-Za-z0-9_]*)/g;
    var out = "";
    var last = 0;
    var m;
    while ((m = re.exec(line)) !== null) {
      out += esc(line.slice(last, m.index));
      var t = m[0];
      if (m[1]) out += '<span class="tok-com">' + esc(t) + "</span>";
      else if (m[2] || m[3]) out += '<span class="tok-str">' + esc(t) + "</span>";
      else if (m[4]) out += '<span class="tok-num">' + esc(t) + "</span>";
      else if (kwSet[t]) out += '<span class="tok-kw">' + esc(t) + "</span>";
      else if (/^[A-Z]/.test(t)) out += '<span class="tok-type">' + esc(t) + "</span>";
      else if (line.charAt(m.index + t.length) === "(") out += '<span class="tok-fn">' + esc(t) + "</span>";
      else out += esc(t);
      last = m.index + t.length;
    }
    out += esc(line.slice(last));
    return out;
  }

  // Builds a code block element with line numbers and a copy button.
  function codeBlock(code, label) {
    var lines = code.replace(/\n$/, "").split("\n");
    var wrap = document.createElement("div");
    wrap.className = "code-block";

    var head = document.createElement("div");
    head.className = "code-head";
    var name = document.createElement("span");
    name.textContent = label || "Java";
    head.appendChild(name);

    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "copy-btn";
    btn.textContent = "Copy";
    btn.addEventListener("click", function () {
      function done(ok) {
        btn.textContent = ok ? "Copied" : "Copy failed";
        setTimeout(function () { btn.textContent = "Copy"; }, 1500);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(code).then(function () { done(true); }, function () { done(false); });
      } else {
        var ta = document.createElement("textarea");
        ta.value = code;
        document.body.appendChild(ta);
        ta.select();
        var ok = false;
        try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
        document.body.removeChild(ta);
        done(ok);
      }
    });
    head.appendChild(btn);
    wrap.appendChild(head);

    var pre = document.createElement("pre");
    var codeEl = document.createElement("code");
    codeEl.innerHTML = lines.map(function (l) {
      return '<span class="line">' + (highlightLine(l) || " ") + "</span>";
    }).join("");
    pre.appendChild(codeEl);
    wrap.appendChild(pre);
    return wrap;
  }

  // Builds an output panel. Text inside {{ }} is shown as typed input.
  function outputBlock(text, label, isError) {
    var wrap = document.createElement("div");
    wrap.className = "output" + (isError ? " error" : "");
    var head = document.createElement("div");
    head.className = "code-head";
    head.textContent = label || "Output";
    wrap.appendChild(head);
    var pre = document.createElement("pre");
    var html = esc(text).replace(/\{\{([\s\S]*?)\}\}/g, '<span class="typed">$1</span>');
    pre.innerHTML = html;
    wrap.appendChild(pre);
    return wrap;
  }

  window.JA = window.JA || {};
  window.JA.codeBlock = codeBlock;
  window.JA.outputBlock = outputBlock;
  window.JA.highlightLine = highlightLine;
})();
