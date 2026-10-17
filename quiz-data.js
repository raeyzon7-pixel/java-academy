// Practice questions written for this review site (they are not questions from the real test).
//
// Multiple choice:  answer = index (0-based) of the correct option.
//                   why[i] = feedback shown when option i is picked (null for the correct one).
//                   explain = why the correct answer is right (always shown after answering).
// Written:          format: "written". The learner writes an answer, then reveals the model answer
//                   and marking criteria. These are self-checked and not part of the score.
//
// tests/check-quiz.js runs every "verify" block in Java to confirm the answer key:
//   verify.expect        expected output (the snippet is wrapped in a main method with a Scanner called input)
//   verify.stdin         keyboard input for the snippet
//   verify.compileError  true if the snippet must fail to compile
//   verify.runtimeError  text that must appear in the crash message
window.QUIZ_QUESTIONS = [
  // ---------- Lesson 1 ----------
  { id: "1a", lesson: 1, type: "Choose the syntax",
    prompt: "Which line correctly stores a price of 4.99?",
    options: ["int price = 4.99;", "double price = \"4.99\";", "double price = 4.99;", "double price == 4.99;"], answer: 2,
    why: [
      "An <code>int</code> can't hold decimals, so this won't compile.",
      "The quotes make it a String, and you can't put a String in a double.",
      null,
      "<code>==</code> compares. To store something, use one <code>=</code>."
    ],
    explain: "4.99 has a decimal, so it's a <code>double</code>, and numbers don't go in quotes.",
    verify: { code: "double price = 4.99;\nSystem.out.println(price);", expect: "4.99" } },

  { id: "1b", lesson: 1, type: "Multiple choice",
    prompt: "Which type makes the most sense for storing whether Shiv handed in his assignment?",
    options: ["String", "int", "char", "boolean"], answer: 3,
    why: [
      "You could store \"yes\", but it's easy to misspell and you can't use it directly in an if.",
      "You could use 0 and 1, but nothing stops it from being 7. An int is for counting.",
      "<code>'Y'</code> would work, but there's a type made exactly for yes/no.",
      null
    ],
    explain: "It's either handed in or it isn't, so <code>boolean</code> (<code>true</code>/<code>false</code>) fits. You can also use it straight in an if: <code>if (handedIn)</code>." },

  { id: "1c", lesson: 1, type: "Find the error",
    prompt: "What's wrong with this line?", code: "char grade = \"A\";",
    options: ["The semicolon is missing", "A char needs single quotes: 'A'", "A char can't store letters", "grade is a reserved word in Java"], answer: 1,
    why: [
      "There's a semicolon at the end.",
      null,
      "Storing one letter is exactly what a char is for.",
      "<code>grade</code> is a normal variable name. Reserved words are things like <code>int</code> and <code>if</code>."
    ],
    explain: "Double quotes make it a String. A <code>char</code> needs single quotes: <code>'A'</code>.",
    verify: { code: "char grade = \"A\";", compileError: true } },

  { id: "1d", lesson: 1, type: "Predict the output",
    prompt: "Shiv types <code>16</code>. What prints?",
    code: "int age = input.nextInt();\nSystem.out.println(\"Next year: \" + age + 1);",
    options: ["Next year: 161", "Next year: 17", "Error: you can't add a String and an int", "Next year: 16 1"], answer: 0,
    why: [
      null,
      "You'd get that with brackets: <code>(age + 1)</code>. Without them, it joins text instead of adding.",
      "Java can join a String and an int. It just turns the number into text.",
      "Java doesn't add spaces for you."
    ],
    explain: "Java goes left to right. <code>\"Next year: \" + age</code> becomes the text <code>\"Next year: 16\"</code>, and then the 1 gets stuck on the end.",
    verify: { stdin: "16\n", expect: "Next year: 161" } },

  { id: "1w", lesson: 1, type: "Write the code", format: "written",
    prompt: "Write a program that asks for the user's first name and how many pets they have, then prints a sentence like <code>Lee has 2 pets.</code>",
    model: { cls: "Pets", code:
`import java.util.Scanner;

public class Pets {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);

        System.out.print("First name: ");
        String name = input.nextLine();

        System.out.print("Number of pets: ");
        int pets = input.nextInt();

        System.out.println(name + " has " + pets + " pets.");
    }
}`, stdin: "Lee\n2\n", output: "First name: {{Lee}}\nNumber of pets: {{2}}\nLee has 2 pets." },
    criteria: [
      "Imports Scanner and creates one Scanner.",
      "Stores the name in a <code>String</code> using <code>nextLine()</code> (or <code>next()</code>).",
      "Stores the number of pets in an <code>int</code> using <code>nextInt()</code>.",
      "The sentence has spaces in the right places."
    ] },

  // ---------- Lesson 2 ----------
  { id: "2a", lesson: 2, type: "Predict the output",
    prompt: "What does this print?", code: "System.out.println(9 / 2);",
    options: ["4.5", "5", "4.0", "4"], answer: 3,
    why: [
      "That's the math answer, but both numbers are ints, so Java does integer division.",
      "Java doesn't round. It just cuts off the .5.",
      "You'd only get the .0 if it was stored in a double.",
      null
    ],
    explain: "<code>int / int</code> gives an int. 9 / 2 is 4.5, the .5 gets cut off, and you get <code>4</code>.",
    verify: { expect: "4" } },

  { id: "2b", lesson: 2, type: "Predict the output",
    prompt: "What does this print?", code: "System.out.println(23 % 4);",
    options: ["5.75", "3", "5", "20"], answer: 1,
    why: [
      "That's 23 divided by 4. <code>%</code> gives the remainder.",
      null,
      "5 is how many 4s fit into 23. That's <code>23 / 4</code>.",
      "20 is the part that divides evenly. <code>%</code> gives what's left after that."
    ],
    explain: "Five 4s fit into 23 (that's 20), and 3 is left over.",
    verify: { expect: "3" } },

  { id: "2c", lesson: 2, type: "Predict the output",
    prompt: "What does this print?", code: "System.out.println(4 + 8 / 2 * 3);",
    options: ["16", "18", "5", "16.0"], answer: 0,
    why: [
      null,
      "That adds 4 + 8 first, but division and multiplication come before addition.",
      "That does 2 * 3 first. * and / are tied, so Java goes left to right and does 8 / 2 first.",
      "All the numbers are ints, so there's no .0."
    ],
    explain: "8 / 2 = 4, then 4 * 3 = 12, then 4 + 12 = <code>16</code>.",
    verify: { expect: "16" } },

  { id: "2d", lesson: 2, type: "Trace the code",
    prompt: "Shiv's score changes during a game. What prints?", code: "int v = 10;\nv += 5;\nv *= 2;\nv -= 4;\nSystem.out.println(v);",
    options: ["30", "21", "26", "6"], answer: 2,
    why: [
      "That's the value before the last line, <code>v -= 4</code>.",
      "That's what you get if you do the lines out of order.",
      null,
      "<code>v += 5</code> adds 5 to v. It doesn't set v to 5."
    ],
    explain: "10, then 15, then 30, then 26.",
    verify: { expect: "26" } },

  { id: "2e", lesson: 2, type: "Choose the syntax",
    prompt: "Which condition is true when the int <code>n</code> is even?",
    options: ["n / 2 == 0", "n % 2 == 1", "n * 2 == 0", "n % 2 == 0"], answer: 3,
    why: [
      "<code>n / 2</code> is half of n. That's only 0 when n is 0 or 1.",
      "That's the check for odd numbers.",
      "<code>n * 2</code> is only 0 when n is 0.",
      null
    ],
    explain: "Even numbers have no remainder when you divide by 2, so <code>n % 2</code> is 0.",
    verify: { code: "for (int n = 0; n <= 5; n++) { System.out.print((n % 2 == 0) + \" \"); }", expect: "true false true false true false" } },

  { id: "2w", lesson: 2, type: "Explain why", format: "written",
    prompt: "Shiv got 85 and 90 on two tests. This line gives <code>87.0</code> instead of <code>87.5</code>. Explain why, and fix it.",
    code: "double avg = (85 + 90) / 2;",
    model: { text: "<p>175 and 2 are both ints, so <code>175 / 2</code> is integer division and gives 87. The .5 is already gone before it gets stored, so the double just makes it 87.0.</p><p><strong>Fix:</strong> <code>double avg = (85 + 90) / 2.0;</code> gives 87.5.</p>" },
    criteria: [
      "Says both numbers are ints, so it's integer division.",
      "Says the decimal is lost <em>before</em> it gets stored in the double.",
      "Gives a fix that works, like using <code>2.0</code>."
    ],
    verify: { code: "double avg = (85 + 90) / 2;\ndouble fixed = (85 + 90) / 2.0;\nSystem.out.println(avg + \" \" + fixed);", expect: "87.0 87.5" } },

  // ---------- Lesson 3 ----------
  { id: "3a", lesson: 3, type: "Multiple choice",
    prompt: "Shiv's average program runs with no errors, but it prints 125 when his average should be 85. What kind of error is this?",
    options: ["Syntax error", "Runtime error", "Logic error", "A missing import"], answer: 2,
    why: [
      "With a syntax error, it wouldn't run at all.",
      "A runtime error would crash it. This one finished.",
      null,
      "A missing import stops it from compiling, so it wouldn't run."
    ],
    explain: "It runs fine but the answer is wrong. That's a logic error, and you only catch it by checking the output." },

  { id: "3b", lesson: 3, type: "Multiple choice",
    prompt: "A program asks for a number. The user types <code>ten</code>, and the program crashes with an <code>InputMismatchException</code>. What kind of error is it?",
    options: ["Runtime error", "Syntax error", "Logic error", "It isn't an error, just the user's mistake"], answer: 0,
    why: [
      null,
      "It compiled and started, so the syntax is fine.",
      "A logic error doesn't crash. It just gives a wrong answer.",
      "The user caused it, but the program still crashed while running. That makes it a runtime error. Lesson 10 shows how to handle it."
    ],
    explain: "It started fine and then crashed partway through, so it's a runtime error." },

  { id: "3c", lesson: 3, type: "Multiple choice",
    prompt: "Which variable name follows Java's naming rules?",
    options: ["TotalScore", "total score", "total-score", "totalScore"], answer: 3,
    why: [
      "Starting with a capital is for class names, not variables.",
      "You can't have spaces in a name.",
      "Java reads the dash as a minus sign.",
      null
    ],
    explain: "Variables use camelCase: the first word is lowercase and every word after starts with a capital." },

  { id: "3d", lesson: 3, type: "Find the error",
    prompt: "What happens when you try to run this?", code: "system.out.println(\"Hello\");",
    options: ["It prints Hello", "It won't compile. Java is case-sensitive, so it must be System with a capital S", "It compiles, then crashes with an exception", "It prints hello in lowercase"], answer: 1,
    why: [
      "<code>system</code> and <code>System</code> aren't the same to Java.",
      null,
      "Wrong names get caught before the program runs, not while it runs.",
      "The text in the quotes isn't the problem. It doesn't compile at all."
    ],
    explain: "Java can't find anything called <code>system</code>, so it's a syntax error. Use a capital S.",
    verify: { compileError: true } },

  { id: "3w", lesson: 3, type: "Find and fix", format: "written",
    prompt: "This should print the area of a 6 by 4 rectangle, but there are two errors. Say what type each one is and write the fixed program.",
    code:
`public class Area {
    public static void main(String[] args) {
        int width = 6;
        int height = 4;
        int area = width + height;
        System.out.println("Area: " + area)
    }
}`,
    model: { cls: "Area", code:
`public class Area {
    public static void main(String[] args) {
        int width = 6;
        int height = 4;
        int area = width * height;
        System.out.println("Area: " + area);
    }
}`, output: "Area: 24", text: "<p><strong>Syntax error:</strong> line 6 is missing a semicolon. <strong>Logic error:</strong> line 5 adds instead of multiplying. Once you fix the semicolon, it would run and print <code>Area: 10</code> with no error.</p>" },
    criteria: [
      "Finds the missing semicolon on line 6 and calls it a syntax error.",
      "Finds <code>+</code> instead of <code>*</code> on line 5 and calls it a logic error.",
      "The fixed program prints <code>Area: 24</code>."
    ],
    verifyBroken: { cls: "Area", compileError: true } },

  // ---------- Lesson 4 ----------
  { id: "4a", lesson: 4, type: "Multiple choice",
    prompt: "In <code>int total = price * 3;</code>, which part is an expression?",
    options: ["int total", "price * 3", "int", ";"], answer: 1,
    why: [
      "That's the part that makes the variable. It doesn't have a value by itself.",
      null,
      "<code>int</code> is a type, not a value.",
      "The semicolon just ends the statement."
    ],
    explain: "<code>price * 3</code> gives you a value. The whole line is the statement." },

  { id: "4b", lesson: 4, type: "Trace the code",
    prompt: "What prints?", code: "int a = 3;\nint b = a + 2;\na = b * 2;\nSystem.out.println(a + \" \" + b);",
    options: ["6 5", "5 10", "10 5", "10 7"], answer: 2,
    why: [
      "Line 3 uses <code>b</code> (5), not the old <code>a</code>.",
      "That's backwards. <code>a</code> prints first.",
      null,
      "Changing <code>a</code> doesn't change <code>b</code>. b is still 5."
    ],
    explain: "b = 3 + 2 = 5. Then a = 5 * 2 = 10. b doesn't change, so it prints <code>10 5</code>.",
    verify: { expect: "10 5" } },

  { id: "4c", lesson: 4, type: "Find the error",
    prompt: "Why won't this compile?", code: "int x = 5;\nx + 1;",
    options: ["x was never declared", "+ can't be used with int", "An import is missing", "x + 1 is an expression on its own, and its value isn't stored or used"], answer: 3,
    why: [
      "x is declared on the first line.",
      "<code>+</code> works fine with ints.",
      "Nothing here needs an import.",
      null
    ],
    explain: "Java says <code>not a statement</code>. <code>x + 1</code> gives 6, but nothing happens with it. Write <code>x = x + 1;</code> instead.",
    verify: { compileError: true } },

  { id: "4d", lesson: 4, type: "Multiple choice",
    prompt: "Which one is a statement that <strong>controls</strong> what code runs?",
    options: ["if (x > 5) { System.out.println(\"big\"); }", "x > 5", "x * 2", "\"x is \" + x"], answer: 0,
    why: [
      null,
      "<code>x &gt; 5</code> is just an expression that's true or false. It gets used <em>inside</em> an if.",
      "That's an expression that gives a number.",
      "That's an expression that gives text."
    ],
    explain: "An <code>if</code> is a control statement. It uses <code>x &gt; 5</code> to decide whether the code in the braces runs." },

  { id: "4w", lesson: 4, type: "Explain", format: "written",
    prompt: "Say <code>score</code> is 7 before each of these lines. For each one, say whether it's an expression or a statement. If it's an expression, give its value. If it's a statement, say what it does.<br>(a) <code>score * 2</code> &nbsp; (b) <code>score = score + 1;</code> &nbsp; (c) <code>score &gt;= 10</code> &nbsp; (d) <code>System.out.println(score);</code>",
    model: { text: "<ul><li>(a) Expression, value <code>14</code>.</li><li>(b) Statement. It stores 8 in <code>score</code>.</li><li>(c) Expression, value <code>false</code>.</li><li>(d) Statement. It prints <code>7</code>.</li></ul>" },
    criteria: ["(a) and (c) are expressions worth 14 and false.", "(b) and (d) are statements: (b) stores 8, (d) prints 7."],
    verify: { code: "int score = 7;\nSystem.out.println(score * 2);\nSystem.out.println(score >= 10);\nscore = score + 1;\nSystem.out.println(score);", expect: "14\nfalse\n8" } },

  // ---------- Lesson 5 ----------
  { id: "5a", lesson: 5, type: "Predict the output",
    prompt: "What prints?", code: "int x = 7;\nif (x > 10) {\n    System.out.println(\"A\");\n} else if (x > 5) {\n    System.out.println(\"B\");\n} else {\n    System.out.println(\"C\");\n}",
    options: ["A", "B", "C", "A and B"], answer: 1,
    why: [
      "7 &gt; 10 is false, so A gets skipped.",
      null,
      "The <code>else</code> only runs if nothing above it was true, but 7 &gt; 5 is true.",
      "Only one branch runs, and A's condition is false anyway."
    ],
    explain: "7 &gt; 10 is false, but 7 &gt; 5 is true, so B prints and the rest gets skipped.",
    verify: { expect: "B" } },

  { id: "5b", lesson: 5, type: "Find the error",
    prompt: "What's wrong with this condition?", code: "if (x = 5) {\n    System.out.println(\"five\");\n}",
    options: ["x must be declared as a double", "A semicolon is missing after the condition", "It uses = (store) instead of == (compare)", "An if can't check int values"], answer: 2,
    why: [
      "Ints work fine in conditions. The problem is the operator.",
      "There shouldn't be a semicolon after <code>if (...)</code>. That would cause a different bug.",
      null,
      "Checking ints is one of the most common things an if does."
    ],
    explain: "<code>x = 5</code> stores 5. An if needs true or false, so you need <code>x == 5</code>.",
    verify: { code: "int x = 5;\nif (x = 5) {\n    System.out.println(\"five\");\n}", compileError: true } },

  { id: "5c", lesson: 5, type: "Choose the syntax",
    prompt: "The pass mark is 50. Which condition checks if Shiv's <code>mark</code> is <strong>at least</strong> 50?",
    options: ["mark > 50", "mark => 50", "mark = 50", "mark >= 50"], answer: 3,
    why: [
      "Close, but then a mark of exactly 50 wouldn't pass.",
      "The symbols are backwards. Java writes it <code>&gt;=</code>.",
      "<code>=</code> stores a value. It doesn't compare.",
      null
    ],
    explain: "<code>&gt;=</code> means greater than or equal to, so 50 counts. The <code>&gt;</code> goes first."
  },

  { id: "5d", lesson: 5, type: "Predict the output",
    prompt: "What prints? (Watch the cut-off.)", code: "int age = 65;\nif (age > 65) {\n    System.out.println(\"Senior\");\n} else if (age >= 18) {\n    System.out.println(\"Adult\");\n} else {\n    System.out.println(\"Child\");\n}",
    options: ["Senior", "Adult", "Child", "Senior and Adult"], answer: 1,
    why: [
      "<code>65 &gt; 65</code> is false. To include 65 you'd need <code>&gt;=</code>.",
      null,
      "65 &gt;= 18 is true, so it never gets to the else.",
      "Only one branch runs, and Senior's condition is false."
    ],
    explain: "65 isn't greater than 65, so the first condition is false. 65 &gt;= 18 is true, so it prints <code>Adult</code>.",
    verify: { expect: "Adult" } },

  { id: "5e", lesson: 5, type: "Predict the output",
    prompt: "This is supposed to print Honours for 80 and up. What does it actually print?", code: "int mark = 90;\nif (mark >= 50) {\n    System.out.println(\"Pass\");\n} else if (mark >= 80) {\n    System.out.println(\"Honours\");\n} else {\n    System.out.println(\"Fail\");\n}",
    options: ["Pass", "Honours", "Honours, then Pass", "Fail"], answer: 0,
    why: [
      null,
      "That's what it <em>should</em> print, but Java never gets to the Honours check.",
      "Only one branch runs.",
      "90 &gt;= 50 is true, so it never gets to the else."
    ],
    explain: "90 &gt;= 50 is true, so Pass prints and the rest is skipped. The highest cut-off should go first.",
    verify: { expect: "Pass" } },

  { id: "5w", lesson: 5, type: "Write the code", format: "written",
    prompt: "Write an if/else chain that reads a speed (an int) and prints <code>Too slow</code> under 40, <code>OK</code> from 40 to 100, and <code>Speeding</code> over 100. Which four speeds would you test?",
    model: { cls: "Speed", code:
`import java.util.Scanner;

public class Speed {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        System.out.print("Speed: ");
        int speed = input.nextInt();

        if (speed < 40) {
            System.out.println("Too slow");
        } else if (speed <= 100) {
            System.out.println("OK");
        } else {
            System.out.println("Speeding");
        }
    }
}`, stdin: "100\n", output: "Speed: {{100}}\nOK", text: "<p>Test <strong>39</strong> (Too slow), <strong>40</strong> (OK), <strong>100</strong> (OK) and <strong>101</strong> (Speeding).</p>",
      cases: [{ in: "39", out: "Too slow" }, { in: "40", out: "OK" }, { in: "100", out: "OK" }, { in: "101", out: "Speeding" }] },
    criteria: [
      "Uses one if / else if / else chain.",
      "40 and 100 both print <code>OK</code>.",
      "Tests both sides of each cut-off: 39, 40, 100 and 101."
    ] },

  // ---------- Lesson 6 ----------
  { id: "6a", lesson: 6, type: "Trace the code",
    prompt: "What prints?", code: "int age = 15;\nboolean hasTicket = false;\n\nif (age >= 13) {\n    if (hasTicket) {\n        System.out.println(\"Welcome in!\");\n    } else {\n        System.out.println(\"You need a ticket.\");\n    }\n} else {\n    System.out.println(\"Sorry, you are too young.\");\n}",
    options: ["Welcome in!", "Sorry, you are too young.", "You need a ticket.", "Nothing is printed"], answer: 2,
    why: [
      "That would need <code>hasTicket</code> to be true.",
      "That's the outer else. It only runs if age &gt;= 13 is false, but 15 &gt;= 13 is true.",
      null,
      "The inner if has an else, so one of its messages always prints."
    ],
    explain: "15 &gt;= 13 is true, so Java goes inside. <code>hasTicket</code> is false, so the inner else runs.",
    verify: { expect: "You need a ticket." } },

  { id: "6b", lesson: 6, type: "Trace the code",
    prompt: "Shiv finished a level with 40 points and a bonus. What prints?", code: "int score = 40;\nboolean bonus = true;\n\nif (score >= 50) {\n    if (bonus) {\n        System.out.println(\"Gold\");\n    } else {\n        System.out.println(\"Silver\");\n    }\n} else {\n    if (bonus) {\n        System.out.println(\"Bronze\");\n    } else {\n        System.out.println(\"Try again\");\n    }\n}",
    options: ["Gold", "Silver", "Try again", "Bronze"], answer: 3,
    why: [
      "Gold needs score &gt;= 50 first, but 40 &gt;= 50 is false.",
      "Silver is inside the score &gt;= 50 part too, which gets skipped.",
      "That needs <code>bonus</code> to be false.",
      null
    ],
    explain: "40 &gt;= 50 is false, so Java goes to the outer else. <code>bonus</code> is true, so it prints <code>Bronze</code>.",
    verify: { expect: "Bronze" } },

  { id: "6c", lesson: 6, type: "Multiple choice",
    prompt: "If there are no braces, which <code>if</code> does an <code>else</code> go with?",
    options: ["The first if in the code", "Whichever if it is lined up with", "The closest if above it that doesn't already have an else", "It's always a compile error"], answer: 2,
    why: [
      "Java doesn't go back to the first one. It uses the closest one.",
      "Java ignores indenting completely.",
      null,
      "It compiles fine. That's what makes it easy to miss."
    ],
    explain: "It goes with the closest if that doesn't have an else yet, no matter how it's indented. That's why you should always use braces." },

  { id: "6d", lesson: 6, type: "Multiple choice",
    prompt: "In the Lesson 6 entry check, when does Java check <code>hasTicket</code>?",
    code: "if (age >= 13) {\n    if (hasTicket) { ... } else { ... }\n} else { ... }",
    options: ["Only when age >= 13 is true", "Always, before the age is checked", "Only when age >= 13 is false", "At the same time as the age"], answer: 0,
    why: [
      null,
      "The outer condition always gets checked first.",
      "If age &gt;= 13 is false, Java goes to the outer else, which doesn't check the ticket.",
      "Java checks one condition at a time, outer one first."
    ],
    explain: "The ticket check is inside the age check, so Java only gets there when <code>age &gt;= 13</code> is true." },

  { id: "6w", lesson: 6, type: "Write the code", format: "written",
    prompt: "Library rules: if you're a member with overdue books (more than 0), print <code>Return your books first</code>. If you're a member with no overdue books, print <code>You can borrow</code>. If you're not a member, print <code>Sign up for a card</code>. Use a nested if, and read <code>isMember</code> (boolean) and <code>overdue</code> (int) from the keyboard.",
    model: { cls: "Library", code:
`import java.util.Scanner;

public class Library {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        System.out.print("Member? (true/false): ");
        boolean isMember = input.nextBoolean();
        System.out.print("Overdue books: ");
        int overdue = input.nextInt();

        if (isMember) {
            if (overdue > 0) {
                System.out.println("Return your books first");
            } else {
                System.out.println("You can borrow");
            }
        } else {
            System.out.println("Sign up for a card");
        }
    }
}`, stdin: "true\n2\n", output: "Member? (true/false): {{true}}\nOverdue books: {{2}}\nReturn your books first",
      cases: [{ in: "true\n2", out: "Return your books first" }, { in: "true\n0", out: "You can borrow" }, { in: "false\n0", out: "Sign up for a card" }] },
    criteria: [
      "The outer if checks membership, and the overdue check is inside it.",
      "Every if and else has braces, and the inner if is indented.",
      "It gives the right message for true &amp; 2, true &amp; 0, and false."
    ] },

  // ---------- Lesson 7 ----------
  { id: "7a", lesson: 7, type: "Trace the code",
    prompt: "What prints?", code: "int n = 1;\nwhile (n < 20) {\n    n *= 2;\n}\nSystem.out.println(n);",
    options: ["32", "16", "64", "20"], answer: 0,
    why: [
      null,
      "When n is 16, <code>16 &lt; 20</code> is still true, so it doubles one more time.",
      "Once n is 32, <code>32 &lt; 20</code> is false, so it stops.",
      "n only goes 1, 2, 4, 8 and so on, so it can never be 20."
    ],
    explain: "n goes 1, 2, 4, 8, 16. 16 &lt; 20 is still true, so it becomes 32. Then 32 &lt; 20 is false.",
    verify: { expect: "32" } },

  { id: "7b", lesson: 7, type: "Find the error",
    prompt: "What's wrong with this loop?", code: "int i = 0;\nwhile (i < 5) {\n    System.out.println(i);\n}",
    options: ["It should be a for loop", "i never changes, so i < 5 is always true and it never ends", "The condition should be i > 5", "println can't go inside a loop"], answer: 1,
    why: [
      "A for loop would work, but the actual problem would still be there.",
      null,
      "Then it wouldn't run at all, since 0 &gt; 5 is false.",
      "You can put anything inside a loop."
    ],
    explain: "<code>i</code> is always 0, so the loop runs forever. Add <code>i++;</code> inside it." },

  { id: "7c", lesson: 7, type: "Trace the code",
    prompt: "How many times does <code>Hi</code> print?", code: "int k = 10;\nwhile (k < 5) {\n    System.out.println(\"Hi\");\n    k++;\n}\nSystem.out.println(\"Done\");",
    options: ["5", "10", "It never stops", "0"], answer: 3,
    why: [
      "Check the condition with k = 10 first.",
      "10 is the starting value, not how many times it runs.",
      "The loop never even starts, so it can't loop forever.",
      null
    ],
    explain: "The condition is checked first. 10 &lt; 5 is false right away, so the loop never runs and only <code>Done</code> prints.",
    verify: { expect: "Done" } },

  { id: "7d", lesson: 7, type: "Trace the code",
    prompt: "Shiv scores 2 points per basket. What prints? (A trace table helps.)", code: "int total = 0;\nint n = 1;\nwhile (n <= 4) {\n    total += n * 2;\n    n++;\n}\nSystem.out.println(total);",
    options: ["10", "20", "30", "8"], answer: 1,
    why: [
      "10 is 1 + 2 + 3 + 4. It adds <code>n * 2</code> each time, not just n.",
      null,
      "That would include n = 5, but <code>5 &lt;= 4</code> is false, so that never happens.",
      "That's only the last amount added. total keeps the earlier ones too."
    ],
    explain: "It adds 2, then 4, 6 and 8, so 2 + 4 + 6 + 8 = <code>20</code>.",
    verify: { expect: "20" } },

  { id: "7w", lesson: 7, type: "Trace table", format: "written",
    prompt: "Make a trace table for this loop. Show <code>x</code> each time the condition is checked, whether it's true, and what prints. Then write the full output.",
    code: "int x = 20;\nwhile (x > 5) {\n    x = x - 6;\n    System.out.println(x);\n}",
    model: { text: "<div class=\"table-scroll\"><table class=\"data\"><thead><tr><th>x at the check</th><th>x &gt; 5 ?</th><th>Prints</th></tr></thead><tbody><tr><td>20</td><td>true</td><td>14</td></tr><tr><td>14</td><td>true</td><td>8</td></tr><tr><td>8</td><td>true</td><td>2</td></tr><tr><td>2</td><td>false</td><td>(loop ends)</td></tr></tbody></table></div><p>Output: 14, 8, 2 on separate lines. 2 still prints even though it's not greater than 5, because the check happens before the subtraction, not after.</p>" },
    criteria: ["Rows for x = 20, 14, 8, then 2 (false).", "Output is 14, 8, 2.", "Explains why 2 still prints."],
    verify: { code: "int x = 20;\nwhile (x > 5) {\n    x = x - 6;\n    System.out.println(x);\n}", expect: "14\n8\n2" } },

  // ---------- Lesson 8 ----------
  { id: "8a", lesson: 8, type: "START, STOP, KEEP GOING",
    prompt: "In <code>for (int i = 0; i &lt; 5; i++)</code>, which part is the <strong>STOP</strong>?",
    options: ["int i = 0", "i++", "i < 5", "System.out.println(i)"], answer: 2,
    why: [
      "That's START. It runs once at the beginning.",
      "That's KEEP GOING.",
      null,
      "That would be in the loop body, not the header."
    ],
    explain: "STOP is the condition, <code>i &lt; 5</code>. The loop continues while it's true and stops when it becomes false." },

  { id: "8b", lesson: 8, type: "Trace the code",
    prompt: "How many times does <code>Hi</code> print?", code: "for (int i = 0; i < 5; i++) {\n    System.out.println(\"Hi\");\n}",
    options: ["4", "6", "0", "5"], answer: 3,
    why: [
      "Don't forget to count 0: 0, 1, 2, 3, 4.",
      "For that, the body would need to run with i = 5, but <code>5 &lt; 5</code> is false.",
      "<code>0 &lt; 5</code> is true, so it runs at least once.",
      null
    ],
    explain: "i is 0, 1, 2, 3, 4. That's 5 times.",
    verify: { expect: "Hi\nHi\nHi\nHi\nHi" } },

  { id: "8c", lesson: 8, type: "Predict the output",
    prompt: "What prints?", code: "for (int i = 2; i <= 10; i += 4) {\n    System.out.print(i + \" \");\n}",
    options: ["2 4 6 8 10", "2 6 10", "2 6 10 14", "4 8"], answer: 1,
    why: [
      "That would be <code>i += 2</code>. This one adds 4.",
      null,
      "14 fails STOP, since <code>14 &lt;= 10</code> is false.",
      "START is 2, so it prints 2 first."
    ],
    explain: "It starts at 2 and adds 4 each time: 2, 6, 10. The next one would be 14, which fails STOP.",
    verify: { expect: "2 6 10" } },

  { id: "8d", lesson: 8, type: "Choose the syntax",
    prompt: "Which for loop counts from 1 to 10?",
    options: ["for (int i = 1; i <= 10; i++)", "for (int i = 1, i <= 10, i++)", "for (i = 1 to 10)", "for (int i = 1; i <= 10; i++);"], answer: 0,
    why: [
      null,
      "The parts are separated by semicolons, not commas.",
      "Some other languages do it like this, but not Java.",
      "That semicolon at the end makes the loop body empty."
    ],
    explain: "START <code>int i = 1</code>, STOP <code>i &lt;= 10</code>, KEEP GOING <code>i++</code>, with semicolons in between and no semicolon at the end." },

  { id: "8e", lesson: 8, type: "START, STOP, KEEP GOING",
    prompt: "When does KEEP GOING (<code>i++</code>) run?",
    options: ["Once, before the loop starts", "Before the body, on every iteration", "After the body, before STOP is checked again", "Only when STOP is false"], answer: 2,
    why: [
      "That's START.",
      "If it ran first, the loop would print 1 first instead of 0.",
      null,
      "Once STOP is false, the loop is done."
    ],
    explain: "The order is START, STOP, body, KEEP GOING, then STOP again, and so on." },

  { id: "8f", lesson: 8, type: "Trace the code",
    prompt: "How many lines does this print?", code: "for (int i = 0; i <= 5; i++) {\n    System.out.println(i);\n}",
    options: ["6", "5", "4", "It never stops"], answer: 0,
    why: [
      null,
      "That would be <code>i &lt; 5</code>. With <code>&lt;=</code>, 5 counts too.",
      "Count every number from 0 to 5.",
      "i++ gets it to 6, and <code>6 &lt;= 5</code> is false, so it stops."
    ],
    explain: "i is 0, 1, 2, 3, 4, 5. That's six lines.",
    verify: { expect: "0\n1\n2\n3\n4\n5" } },

  { id: "8w", lesson: 8, type: "Write the code", format: "written",
    prompt: "Write a for loop that prints the multiples of 3 from 3 to 30 on one line, with spaces in between. Write your START, STOP and KEEP GOING first.",
    model: { cls: "Threes", code:
`public class Threes {
    public static void main(String[] args) {
        // START: int i = 3   STOP: i <= 30   KEEP GOING: i += 3
        for (int i = 3; i <= 30; i += 3) {
            System.out.print(i + " ");
        }
        System.out.println();
    }
}`, output: "3 6 9 12 15 18 21 24 27 30 ", text: "<p>This also works: START <code>int i = 1</code>, STOP <code>i &lt;= 10</code>, KEEP GOING <code>i++</code>, then print <code>i * 3</code>.</p>" },
    criteria: [
      "START, STOP and KEEP GOING are written down and match the code.",
      "It prints 3 to 30 with nothing missing or extra.",
      "It uses <code>print</code>, not <code>println</code>, so it's all on one line."
    ] },

  // ---------- Lesson 9 ----------
  { id: "9a", lesson: 9, type: "Predict the output",
    prompt: "What prints?", code: "int day = 3;\nswitch (day) {\n    case 1:\n        System.out.println(\"Monday\");\n    case 2:\n        System.out.println(\"Tuesday\");\n    case 3:\n        System.out.println(\"Wednesday\");\n    default:\n        System.out.println(\"Another day\");\n}",
    options: ["Wednesday", "Another day", "Wednesday, then Another day", "Nothing"], answer: 2,
    why: [
      "That would need a <code>break</code> after Wednesday.",
      "Java goes to case 3 first, so Wednesday prints before that.",
      null,
      "day is 3 and there's a case 3, so something has to print."
    ],
    explain: "Java jumps to case 3 and prints Wednesday. There's no break, so it falls through and prints Another day too.",
    verify: { expect: "Wednesday\nAnother day" } },

  { id: "9b", lesson: 9, type: "Multiple choice",
    prompt: "Which type can NOT be used in a switch?",
    options: ["int", "char", "String", "double"], answer: 3,
    why: [
      "int is the most common one, like menu choices and day numbers.",
      "char works, like <code>case 'A':</code>.",
      "String works. The game menu example in Lesson 9 uses one.",
      null
    ],
    explain: "A switch works with <code>int</code>, <code>char</code> and <code>String</code>, but not <code>double</code>.",
    verify: { code: "double d = 1.0;\nswitch (d) { case 1.0: break; }", compileError: true } },

  { id: "9c", lesson: 9, type: "Predict the output",
    prompt: "What prints?", code: "int choice = 5;\nswitch (choice) {\n    case 1:\n        System.out.println(\"Small\");\n        break;\n    case 2:\n        System.out.println(\"Medium\");\n        break;\n    case 3:\n        System.out.println(\"Large\");\n        break;\n    default:\n        System.out.println(\"Invalid\");\n}",
    options: ["Nothing is printed", "Invalid", "Large", "An error, because 5 isn't a case"], answer: 1,
    why: [
      "Nothing would print if there was no default, but there is one.",
      null,
      "A switch only matches exact values. It doesn't pick the closest one.",
      "It's fine if nothing matches. That's what default is for."
    ],
    explain: "5 doesn't match 1, 2 or 3, so <code>default</code> runs.",
    verify: { expect: "Invalid" } },

  { id: "9d", lesson: 9, type: "Multiple choice",
    prompt: "Which of these is a better fit for a switch than an if/else chain?",
    options: ["Printing a day name for day numbers 1 to 7", "Checking whether a mark is 80 or higher", "Checking whether a temperature is between 0 and 15", "Checking whether a price is more than $20"], answer: 0,
    why: [
      null,
      "\"80 or higher\" is a range. A switch can only match exact values.",
      "That's a range too, so you'd need an if.",
      "\"More than\" is a comparison, so that's an if."
    ],
    explain: "Day numbers are seven exact values, so a switch works well. Ranges need an if." },

  { id: "9w", lesson: 9, type: "Write the code", format: "written",
    prompt: "Rewrite this if/else chain as a switch that does the same thing.",
    code: "if (size == 1) {\n    System.out.println(\"Small\");\n} else if (size == 2) {\n    System.out.println(\"Medium\");\n} else if (size == 3) {\n    System.out.println(\"Large\");\n} else {\n    System.out.println(\"Unknown size\");\n}",
    model: { code:
`switch (size) {
    case 1:
        System.out.println("Small");
        break;
    case 2:
        System.out.println("Medium");
        break;
    case 3:
        System.out.println("Large");
        break;
    default:
        System.out.println("Unknown size");
}` },
    criteria: [
      "Uses <code>switch (size)</code> with a case for 1, 2 and 3.",
      "Every case ends with <code>break;</code>.",
      "<code>default</code> handles everything else, like the last else."
    ],
    verifyCases: { template: "int size = %IN%;\n%CODE%", cases: [["1", "Small"], ["2", "Medium"], ["3", "Large"], ["7", "Unknown size"]] } },

  // ---------- Lesson 10 ----------
  { id: "10a", lesson: 10, type: "Trace the code",
    prompt: "What prints?", code: "try {\n    int x = 5 / 0;\n    System.out.println(\"A\");\n} catch (ArithmeticException e) {\n    System.out.println(\"B\");\n}\nSystem.out.println(\"C\");",
    options: ["A, then C", "B only", "A, then B, then C", "B, then C"], answer: 3,
    why: [
      "\"A\" comes after the line that throws, so it gets skipped.",
      "Once the exception is caught, the code after the try/catch still runs.",
      "After <code>5 / 0</code> throws, the rest of the try is skipped, so A never prints.",
      null
    ],
    explain: "<code>5 / 0</code> throws, so A is skipped. The catch prints B, then the program keeps going and prints C.",
    verify: { expect: "B\nC" } },

  { id: "10b", lesson: 10, type: "Multiple choice",
    prompt: "Which problem can try/catch handle?",
    options: ["A missing semicolon", "A wrong answer caused by a wrong formula", "A runtime exception such as dividing an int by zero", "A misspelled keyword"], answer: 2,
    why: [
      "That's a syntax error. The program never compiles, so the try/catch never runs.",
      "That's a logic error. There's no exception to catch.",
      null,
      "That's a syntax error too."
    ],
    explain: "try/catch handles exceptions that happen while the program runs. It can't do anything about syntax or logic errors." },

  { id: "10c", lesson: 10, type: "Predict the output",
    prompt: "The user types <code>abc</code>. What happens?", code: "try {\n    int n = input.nextInt();\n    System.out.println(\"You entered \" + n);\n} catch (ArithmeticException e) {\n    System.out.println(\"Not a number.\");\n}\nSystem.out.println(\"Program finished\");",
    options: ["It prints \"Not a number.\" then \"Program finished\"", "It crashes with an InputMismatchException, because the catch doesn't match", "It prints only \"Program finished\"", "It doesn't compile"], answer: 1,
    why: [
      "That would happen if it caught <code>InputMismatchException</code>, but it catches a different one.",
      null,
      "It crashes, so \"Program finished\" never prints.",
      "Catching the wrong exception still compiles. It just doesn't help."
    ],
    explain: "Typing letters causes an <code>InputMismatchException</code>, but the catch only handles <code>ArithmeticException</code>. They don't match, so it crashes.",
    verify: { stdin: "abc\n", runtimeError: "java.util.InputMismatchException" } },

  { id: "10d", lesson: 10, type: "Explain why",
    prompt: "The user types <code>abc</code>, and this prints <code>Not a number.</code> then <code>You entered 0</code>. Why 0?", code: "int n = 0;\ntry {\n    n = input.nextInt();\n} catch (InputMismatchException e) {\n    System.out.println(\"Not a number.\");\n}\nSystem.out.println(\"You entered \" + n);",
    options: ["n was set to 0 before the try, and the exception skipped n = input.nextInt(), so n kept its 0", "Scanner turns any text into 0", "The catch block sets n to 0", "abc counts as 0 in Java"], answer: 0,
    why: [
      null,
      "Scanner doesn't turn text into 0. It throws an exception.",
      "The catch block only prints a message. It never changes n.",
      "Java doesn't treat letters as numbers. That's why the exception happens."
    ],
    explain: "The exception happens during <code>input.nextInt()</code>, so n never gets a new value and stays 0.",
    verify: { stdin: "abc\n", expect: "Not a number.\nYou entered 0" } },

  { id: "10w", lesson: 10, type: "Explain", format: "written",
    prompt: "Someone says: \"I put my whole program in a try/catch, so now it can't have any errors.\" Give two reasons why that's wrong.",
    model: { text: "<p>Any two of these:</p><ul><li><strong>Syntax errors</strong> stop the program from compiling, so the try/catch never runs.</li><li><strong>Logic errors</strong> don't cause an exception. You just get the wrong answer.</li><li>A catch only works for the <strong>type</strong> of exception it names. <code>catch (ArithmeticException e)</code> won't stop an <code>InputMismatchException</code>.</li><li>Catching the exception doesn't <strong>fix</strong> anything. If the user typed letters, you still don't have a number.</li></ul>" },
    criteria: ["Gives two different reasons that are correct.", "Uses the right words: syntax error, logic error, exception type."] }
];
