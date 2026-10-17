# Review checklist for Shiv (read before submitting)

## 1. Things only you can do
- [ ] **About page, "How this site was made".** This now has a first-person statement: an AI assistant
  (Claude) wrote a lot of the code and drafted the lesson text, and you picked the topics, supplied the class
  reminders, and reviewed and asked for changes. Make sure it's accurate. If you changed or wrote anything
  yourself, add that. Don't describe the site as entirely your own unaided work.
- [ ] **Your teacher's rules on AI.** Check what's allowed and whether AI-drafted text needs to be
  disclosed or rewritten in your own words.
- [ ] **Class reminders.** Check the wording of the two fill-in-the-blank reminders ("Do not suffer in
  ______." / Silence, "The key to success is ______." / Consistency) and START, STOP, KEEP GOING. The
  short "what it means" explanations under each one were written for this site. They aren't quotes from
  Mr. Lauder, so change them if they don't match how he explained it.
- [ ] **Solve every practice task yourself** in IntelliJ before opening the solution, and try a few of the
  practice questions without looking. Rewrite anything you couldn't explain out loud.

## 2. Check against what your class actually covered
The core of every lesson follows the topic list you gave. These parts go a little further. They're labelled
**Extra** on the site, or are small details. Keep, cut or relabel them depending on what was taught:
- Lesson 1: the other primitive types (byte, short, long, float) and the nextInt()/nextLine() trap (both Extra); `next()`
- Lesson 2: `%=`, `++` and `--` in the shortcuts list
- Lesson 5: `&&`, `||` and `.equals()` for Strings (Extra)
- Lesson 6: `nextBoolean()` for reading true/false
- Lesson 9: Strings in a switch (MenuChoice example), grouped cases and the arrow syntax (Extra, labelled optional)
- Lesson 10: `InputMismatchException` and its import; variable scope in a try block

## 3. What was tested (last run 2026-10-17, Windows 11, JDK 25, Node 24, Microsoft Edge)
- `node tests/check-examples.js`: every example, mistake, style example and solution compiled and run;
  outputs match the page; lesson structure complete. 246 checks, all passed.
- `node tests/check-quiz.js`: question structure, answer balance (11/11/11/11), and every output/trace/error
  answer and runnable model answer confirmed in Java. 467 checks, all passed.
- `tests/browser-test.py`: pages, links, lessons, reminders, quiz, keyboard, phone width (390 px), no-JS,
  file:// opening, no console errors. All passed (see the final report for the latest run).

## 4. Not tested
- Only Microsoft Edge (Chromium) was used. Firefox, Safari and real phones were not tried.
- IntelliJ's compiler messages can be worded slightly differently from the `java` command-line messages shown.
- Screen readers were not tested, although the pages use labels, headings and keyboard-usable controls.
- Nothing has been published to a host.
