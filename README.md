# Java Academy: Your ICS3U Java Review Guide
By Shiv Chhabra

A review website for the ten Java lessons in ICS3U Unit 1. It is a static site (HTML, CSS and plain
JavaScript): no build step, no libraries, no backend.

## What's in it
- **Ten lessons** (`lesson.html?id=1` to `?id=10`), in this order: Variables and Keyboard Input, Mathematical
  Operators, Errors and Coding Style, Statements and Expressions, If/Else Statements, Nested If Statements,
  While Loops, For Loops, Switch Statements, Try/Catch. Each has an introduction, the main idea, syntax,
  examples with their real output and a walkthrough, trace tables or diagrams where they help, common
  mistakes with corrected versions, a practice task with a hint and a revealable solution, and a recap
  checklist. Content beyond the core unit is labelled "Extra".
- **Mr. Lauder's class reminders** on the home page: two interactive fill-in-the-blank reminders and the
  START, STOP, KEEP GOING memory aid for for loops. They also appear on the practice page and in Lessons 3 and 8.
- **Practice page**: 44 multiple-choice questions (feedback for every option, filter by lesson, review
  missed questions, score by lesson) and 10 self-checked written questions with model answers and marking
  criteria. These are practice questions written for this site, not real test questions.

## Open the website
Either of these works:

1. **Double-click `index.html`** (or open it from your browser's File menu). Everything runs from the files.
2. **Or serve the folder locally**, which is closer to how it behaves when published:

       cd java-academy
       py -m http.server 8000          (Windows; on Mac/Linux: python3 -m http.server 8000)

   Then open http://localhost:8000 in a browser. Press Ctrl+C in the terminal to stop the server.

JavaScript must be turned on for the lesson pages and the practice questions. The home page, lesson list and
the reminder answers still work without it.

## Publish it
Upload the whole folder to any static host, for example GitHub Pages (push to a repo, then Settings > Pages),
Netlify (drag the folder onto app.netlify.com/drop) or Cloudflare Pages. `index.html` must be at the top level.

## Files
| File | Purpose |
| --- | --- |
| `index.html`, `lessons.html`, `lesson.html`, `practice.html`, `about.html` | Pages |
| `styles.css` | All styling |
| `lessons-data.js` | Text and Java code for the ten lessons |
| `lesson.js` | Builds a lesson page from `lessons-data.js` |
| `quiz-data.js`, `quiz.js` | Practice questions, feedback and scoring |
| `main.js` | Mobile menu, home page code sample, class-reminder fill-in-the-blanks |
| `highlight.js` | Java syntax colouring, line numbers, Copy button |
| `favicon.svg` | Browser tab icon |
| `tests/` | Automated checks (below) |
| `REVIEW.md` | Things to check yourself before submitting |

The lesson cards in `index.html` and `lessons.html` are plain HTML so they work without JavaScript. If you
change a lesson's title or short description in `lessons-data.js`, update the cards too. The browser test
fails if they don't match.

## Tests
Run these from the `java-academy` folder.

**1. Every Java program on the site** (needs a JDK 11+ on the PATH):

    node tests/check-examples.js

Compiles and runs every example, both versions of every common mistake, every practice-task solution and
all their test inputs, then compares the output with what the page shows. It also checks that all ten lessons
exist in order with every required part, and checks some claims made in the lesson text.

**2. The practice questions** (needs a JDK):

    node tests/check-quiz.js

Checks every question's structure (4 options, a valid answer, feedback for every wrong option), checks that
correct answers are spread evenly across A to D, and runs the code for every output, trace and error
question and every runnable model answer in Java to confirm the answer key.

**3. The website in a browser** (needs Python and Playwright):

    pip install playwright
    py -m http.server 8765              (leave running in one terminal)
    py tests/browser-test.py            (in a second terminal)

This uses the installed Microsoft Edge. To use Playwright's own Chromium instead, run
`py -m playwright install chromium` and set `JA_BROWSER=chromium`. It checks every page, link and nav item,
all ten lessons (sections, table of contents, hints, solutions, previous/next), the class reminders
(including with JavaScript turned off), every quiz feature, keyboard use, phone-width layout, opening the
files directly from disk, and that there are no console errors or missing files.
