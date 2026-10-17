// Lesson content for Java Academy.
// tests/check-examples.js compiles and runs every example, mistake and practice-task solution
// in this file and compares the result with what the page shows. Fields it uses:
//   cls, code, output/result, input, cases, runs, kind ("compile-error" | "runtime-error" | "infinite"),
//   mustContain (lines that must appear in an error message).
// Text inside {{ }} in an output is what the user types. It is shown in green on the page.
window.LESSONS = [
  {
    id: 1,
    title: "Variables and Keyboard Input",
    short: "Store values in variables, pick the right type, and read what the user types with Scanner.",
    intro: "Variables are how a program remembers stuff, like your name, your age, or your average. This lesson covers making variables, picking the right type, and using <code>Scanner</code> to read what the user types.",
    conceptHeading: "Variables",
    concept: [
      "A variable stores a value. For example, <code>int age = 16;</code> creates a variable called <code>age</code> and gives it the value 16.",
      "You can change the value later (<code>age = 17;</code>), but not the type. Once it's an <code>int</code>, it stays an <code>int</code>.",
      "The type decides what kind of value you can store. These are the five you'll use the most:"
    ],
    tables: [
      {
        head: ["Type", "Stores", "Example", "Watch out"],
        rows: [
          ["<code>int</code>", "Whole numbers", "<code>int age = 16;</code>", "No decimals"],
          ["<code>double</code>", "Decimals", "<code>double average = 87.5;</code>", "<code>double d = 5;</code> prints <code>5.0</code>"],
          ["<code>boolean</code>", "<code>true</code> or <code>false</code>", "<code>boolean passed = true;</code>", "No quotes"],
          ["<code>char</code>", "One character", "<code>char grade = 'A';</code>", "Single quotes"],
          ["<code>String</code>", "Text", "<code>String name = \"Shiv\";</code>", "Double quotes, capital S"]
        ]
      }
    ],
    visual:
      '<p class="diagram-title">Think of each variable as a labelled box</p>' +
      '<div class="boxes">' +
        '<div class="vbox"><span class="vbox-type">String</span><span class="vbox-val">"Shiv"</span><span class="vbox-name">name</span></div>' +
        '<div class="vbox"><span class="vbox-type">int</span><span class="vbox-val">16</span><span class="vbox-name">age</span></div>' +
        '<div class="vbox"><span class="vbox-type">double</span><span class="vbox-val">87.5</span><span class="vbox-name">average</span></div>' +
        '<div class="vbox"><span class="vbox-type">char</span><span class="vbox-val">\'B\'</span><span class="vbox-name">homeroom</span></div>' +
        '<div class="vbox"><span class="vbox-type">boolean</span><span class="vbox-val">true</span><span class="vbox-name">onHonourRoll</span></div>' +
      '</div>' +
      '<p class="diagram-caption">The type on top is what can go in the box. The name on the bottom is what you call it in your code.</p>',
    sections: [
      {
        heading: "Picking a type",
        html: "<p>If you're not sure which type to use:</p>" +
          "<ul class=\"decision\">" +
          "<li>Yes or no? <code>boolean</code></li>" +
          "<li>Words? <code>String</code></li>" +
          "<li>One letter? <code>char</code></li>" +
          "<li>Could it have a decimal, like a mark or a price? <code>double</code></li>" +
          "<li>Counting whole things, like points or lives? <code>int</code></li>" +
          "</ul>"
      }
    ],
    syntax:
`type name = value;                        // make a variable
name = newValue;                          // change it later (no type this time)

import java.util.Scanner;                 // very top of the file
Scanner input = new Scanner(System.in);   // once, inside main

int whole = input.nextInt();              // reads a whole number
double decimal = input.nextDouble();      // reads a decimal number
String line = input.nextLine();           // reads everything up to Enter
String word = input.next();               // reads one word`,
    rules: [
      "Only write the type the first time you make the variable.",
      "Make one Scanner and use it for all your input.",
      "Match the method to the type: <code>nextInt()</code> for <code>int</code>, <code>nextDouble()</code> for <code>double</code>, <code>nextLine()</code> for <code>String</code>.",
      "Use <code>print</code> instead of <code>println</code> for questions, so the user types on the same line."
    ],
    examples: [
      {
        title: "All five types",
        cls: "StudentCard",
        code:
`public class StudentCard {
    public static void main(String[] args) {
        String name = "Shiv";
        int age = 16;
        double average = 87.5;
        char homeroom = 'B';
        boolean onHonourRoll = true;

        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
        System.out.println("Average: " + average);
        System.out.println("Homeroom: " + homeroom);
        System.out.println("Honour roll: " + onHonourRoll);

        average = 89;
        System.out.println("New average: " + average);
    }
}`,
        output: "Name: Shiv\nAge: 16\nAverage: 87.5\nHomeroom: B\nHonour roll: true\nNew average: 89.0",
        how: [
          "<code>+</code> joins the text and the value, so line 9 prints <code>Name: Shiv</code>.",
          "<code>average</code> is a <code>double</code>, so changing it to 89 prints <code>89.0</code>. You don't write the type again when you change a value."
        ]
      },
      {
        title: "Reading input with Scanner",
        cls: "Greeting",
        code:
`import java.util.Scanner;

public class Greeting {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);

        System.out.print("Enter your name: ");
        String name = input.nextLine();

        System.out.print("Enter your age: ");
        int age = input.nextInt();

        System.out.println("Hello, " + name + "! Next year you will be " + (age + 1) + ".");
    }
}`,
        input: "Shiv\n16\n",
        output: "Enter your name: {{Shiv}}\nEnter your age: {{16}}\nHello, Shiv! Next year you will be 17.",
        note: "Green text is what the user typed.",
        how: [
          "Import Scanner at the top, then create it with <code>Scanner input = new Scanner(System.in);</code>. <code>System.in</code> lets it read what the user types.",
          "<code>nextLine()</code> reads the name and <code>nextInt()</code> reads the age.",
          "The brackets around <code>age + 1</code> matter. Without them, Java prints <code>161</code> instead of 17. Lesson 2 explains why."
        ]
      }
    ],
    mistakes: [
      {
        intro: "Putting a decimal in an <code>int</code>.",
        bad: {
          cls: "Mistake",
          code:
`public class Mistake {
    public static void main(String[] args) {
        int mark = 87.5;
        System.out.println(mark);
    }
}`,
          result: "error: incompatible types: possible lossy conversion from double to int",
          resultLabel: "Compiler message"
        },
        good: {
          cls: "Fixed",
          code:
`public class Fixed {
    public static void main(String[] args) {
        double mark = 87.5;
        System.out.println(mark);
    }
}`,
          result: "87.5"
        },
        why: "<code>int</code> can't store decimals, so use <code>double</code> for a mark like 87.5."
      },
      {
        intro: "Writing the type again when you just want to change the value.",
        bad: {
          cls: "Redeclare",
          code:
`public class Redeclare {
    public static void main(String[] args) {
        int points = 5;
        int points = 10;
        System.out.println(points);
    }
}`,
          result: "error: variable points is already defined in method main(String[])",
          resultLabel: "Compiler message"
        },
        good: {
          cls: "Reassign",
          code:
`public class Reassign {
    public static void main(String[] args) {
        int points = 5;
        points = 10;
        System.out.println(points);
    }
}`,
          result: "10"
        },
        why: "<code>int points</code> makes a new variable, and you can't have two with the same name. To change it, just write <code>points = 10;</code>"
      }
    ],
    extra: [
      {
        title: "The other primitive types",
        html: "<p>Java has eight built-in (<strong>primitive</strong>) types. Besides <code>int</code>, <code>double</code>, <code>boolean</code> and <code>char</code>, there's <code>byte</code>, <code>short</code>, <code>long</code> and <code>float</code>. They're just smaller or bigger versions of <code>int</code> and <code>double</code>, and you don't need them for this unit.</p><p><code>String</code> isn't one of the eight. It's a class, which is why it starts with a capital S.</p>"
      },
      {
        title: "The nextInt() then nextLine() problem",
        html: "<p>If you use <code>nextInt()</code> and then <code>nextLine()</code>, the <code>nextLine()</code> usually comes back empty. That's because <code>nextInt()</code> leaves the Enter key behind. The easy way around it is to read your text first, like the Greeting example does.</p>"
      }
    ],
    tryIt: [
      "Change <code>average = 89;</code> to <code>average = 89.75;</code>. What prints now?",
      "Take the brackets off <code>age + 1</code> in <code>Greeting</code> and run it.",
      "Type <code>sixteen</code> for your age. It crashes. Lesson 10 shows how to deal with that."
    ],
    challenge: {
      task: "Ask for the user's name, their favourite whole number, and their height in metres. Store each one in a variable of the right type, then print one sentence that uses all three.",
      expected: "If the user enters <code>Shiv</code>, <code>7</code> and <code>1.75</code>, the last line is <code>Shiv's favourite number is 7 and their height is 1.75 m.</code>",
      hint: "You need a <code>String</code>, an <code>int</code> and a <code>double</code>. Ask for the name first.",
      solution: {
        cls: "AboutMe",
        code:
`import java.util.Scanner;

public class AboutMe {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);

        System.out.print("Name: ");
        String name = input.nextLine();

        System.out.print("Favourite whole number: ");
        int favourite = input.nextInt();

        System.out.print("Height in metres: ");
        double height = input.nextDouble();

        System.out.println(name + "'s favourite number is " + favourite
                + " and their height is " + height + " m.");
    }
}`,
        input: "Shiv\n7\n1.75\n",
        output: "Name: {{Shiv}}\nFavourite whole number: {{7}}\nHeight in metres: {{1.75}}\nShiv's favourite number is 7 and their height is 1.75 m.",
        explain: "The name gets read first so the nextInt/nextLine problem doesn't happen. Your wording can be different, as long as you use the right three types."
      }
    },
    recap: [
      "I can make a variable and change its value.",
      "I can pick between <code>int</code>, <code>double</code>, <code>boolean</code>, <code>char</code> and <code>String</code>.",
      "I know <code>char</code> uses single quotes and <code>String</code> uses double quotes.",
      "I can set up a Scanner and read an <code>int</code>, a <code>double</code> and a line of text."
    ]
  },

  {
    id: 2,
    title: "Mathematical Operators",
    short: "Use + - * / %, follow BEDMAS the Java way, use shortcuts like +=, and find out why 7 / 2 is 3.",
    intro: "Most maths in Java works the way you'd expect. Division is the exception, and it's where most mistakes happen. This lesson covers the operators, the order Java does them in, shortcuts like <code>+=</code>, and why <code>7 / 2</code> gives you <code>3</code>.",
    conceptHeading: "The operators",
    concept: [
      "Four of these work like a calculator. The new one is <code>%</code> (modulus). It gives you the <strong>remainder</strong> after dividing, not a percent."
    ],
    tables: [
      {
        head: ["Operator", "Meaning", "Example", "Result"],
        rows: [
          ["<code>+</code>", "Add", "<code>17 + 5</code>", "<code>22</code>"],
          ["<code>-</code>", "Subtract", "<code>17 - 5</code>", "<code>12</code>"],
          ["<code>*</code>", "Multiply", "<code>17 * 5</code>", "<code>85</code>"],
          ["<code>/</code>", "Divide", "<code>17 / 5</code><br><code>17.0 / 5</code>", "<code>3</code><br><code>3.4</code>"],
          ["<code>%</code>", "Remainder", "<code>17 % 5</code>", "<code>2</code>"]
        ]
      }
    ],
    visual:
      '<p class="diagram-title">Integer division vs decimal division</p>' +
      '<div class="compare">' +
        '<div class="compare-side"><code class="big">7 / 2</code><span class="arrow-down" aria-hidden="true">&darr;</span><code class="big result-bad">3</code><p>Both numbers are <code>int</code>, so the answer is an <code>int</code>. The .5 just gets cut off. It doesn\'t round.</p></div>' +
        '<div class="compare-side"><code class="big">7 / 2.0</code><span class="arrow-down" aria-hidden="true">&darr;</span><code class="big result-good">3.5</code><p>One of them is a <code>double</code>, so you get the decimal.</p></div>' +
      '</div>',
    sections: [
      {
        heading: "What % is for",
        html: "<p><code>17 % 5</code> means: fit as many 5s into 17 as you can, and what's left over? Three 5s is 15, so the answer is <strong>2</strong>. It's more useful than it looks:</p>" +
          "<ul>" +
          "<li><strong>Even or odd:</strong> <code>n % 2</code> is 0 for even numbers and 1 for odd ones.</li>" +
          "<li><strong>Leftovers:</strong> 135 minutes of gaming is <code>135 / 60</code> = 2 hours and <code>135 % 60</code> = 15 minutes.</li>" +
          "<li><strong>Last digit:</strong> <code>4827 % 10</code> is <code>7</code>.</li>" +
          "</ul>"
      },
      {
        heading: "Order of operations (BEDMAS)",
        html: "<p>It's BEDMAS like in math, except Java doesn't have an exponent operator, and <code>%</code> goes with <code>*</code> and <code>/</code>:</p>" +
          "<ol class=\"levels\">" +
          "<li>Brackets</li>" +
          "<li><code>*</code> <code>/</code> <code>%</code>, left to right</li>" +
          "<li><code>+</code> <code>-</code>, left to right</li>" +
          "</ol>" +
          "<p>So <code>10 + 6 / 2 * 3 - 1</code> goes like this:</p>" +
          "<div class=\"eval-steps\">" +
          "<div><code>10 + <mark>6 / 2</mark> * 3 - 1</code><span>/ and * are tied, so left to right</span></div>" +
          "<div><code>10 + <mark>3 * 3</mark> - 1</code><span></span></div>" +
          "<div><code><mark>10 + 9</mark> - 1</code><span>then + and -</span></div>" +
          "<div><code><mark>19 - 1</mark></code><span></span></div>" +
          "<div><code>18</code><span>answer</span></div>" +
          "</div>"
      },
      {
        heading: "Shortcuts for changing a variable",
        html: "<p>In Java, <code>=</code> means <strong>store</strong>, not \"equals\". Java works out the right side and puts it in the variable on the left. So <code>points = points + 2;</code> adds 2 to points. Since you do this all the time, there are shortcuts:</p>"
      }
    ],
    syntax:
`points = points + 2;   // the long way
points += 2;           // same thing
points -= 3;           // points = points - 3
points *= 2;           // points = points * 2
points /= 4;           // points = points / 4
points %= 3;           // points = points % 3
count++;               // count = count + 1  (you'll use this a lot in loops)
count--;               // count = count - 1`,
    rules: [
      "<code>int / int</code> always gives an <code>int</code>. If you want the decimal, make one of them a <code>double</code>, like <code>2.0</code>.",
      "Integer division cuts the decimal off. It never rounds, so <code>19 / 10</code> is <code>1</code>.",
      "Dividing an <code>int</code> by zero crashes the program (Lessons 3 and 10)."
    ],
    examples: [
      {
        title: "Every operator, then the shortcuts",
        cls: "Operators",
        code:
`public class Operators {
    public static void main(String[] args) {
        int a = 17;
        int b = 5;

        System.out.println(a + b);
        System.out.println(a - b);
        System.out.println(a * b);
        System.out.println(a / b);
        System.out.println(a % b);
        System.out.println(17.0 / 5);

        int score = 10;
        score += 5;
        score -= 3;
        score *= 2;
        score /= 4;
        System.out.println(score);
    }
}`,
        output: "22\n12\n85\n3\n2\n3.4\n6",
        how: [
          "<code>17 / 5</code> is 3, not 3.4, because both are ints. <code>17.0 / 5</code> has a double, so it gives 3.4.",
          "The table shows <code>score</code> after each shortcut."
        ],
        trace: {
          caption: "score after each line",
          head: ["Line", "Code", "score is now"],
          rows: [
            ["13", "<code>int score = 10;</code>", "10"],
            ["14", "<code>score += 5;</code>", "15"],
            ["15", "<code>score -= 3;</code>", "12"],
            ["16", "<code>score *= 2;</code>", "24"],
            ["17", "<code>score /= 4;</code>", "6"]
          ]
        }
      },
      {
        title: "Order of operations",
        cls: "OrderOfOperations",
        code:
`public class OrderOfOperations {
    public static void main(String[] args) {
        System.out.println(10 + 6 / 2 * 3 - 1);
        System.out.println((10 + 6) / (2 * 4));
        System.out.println(20 - 8 % 3);
        System.out.println(7 / 2 * 2);
        System.out.println(7 / 2.0 * 2);
    }
}`,
        output: "18\n2\n18\n6\n7.0",
        how: [
          "Line 5: <code>%</code> happens before <code>-</code>. <code>8 % 3</code> is 2, so it's <code>20 - 2</code>.",
          "Line 6 is the one people get wrong. <code>7 / 2</code> is 3 (integer division), then <code>3 * 2</code> is <code>6</code>, not 7. The .5 was already gone.",
          "Line 7 uses <code>2.0</code>, so it's 3.5 * 2 = <code>7.0</code>."
        ]
      }
    ],
    mistakes: [
      {
        intro: "Thinking a <code>double</code> variable will fix integer division. Shiv scored 7 points in 2 games and wants his average.",
        bad: {
          cls: "PointsAverage",
          code:
`public class PointsAverage {
    public static void main(String[] args) {
        int points = 7;
        int games = 2;
        double average = points / games;
        System.out.println("Average: " + average);
    }
}`,
          result: "Average: 3.0",
          resultLabel: "Output (should be 3.5)"
        },
        good: {
          cls: "PointsAverageFixed",
          code:
`public class PointsAverageFixed {
    public static void main(String[] args) {
        double points = 7;
        int games = 2;
        double average = points / games;
        System.out.println("Average: " + average);
    }
}`,
          result: "Average: 3.5"
        },
        why: "Java does <code>points / games</code> first. Both are ints, so it's already 3 before it gets stored, and the <code>double</code> just turns it into 3.0. Making <code>points</code> a double makes it a decimal division."
      },
      {
        intro: "Adding inside a print that starts with text.",
        bad: {
          cls: "Total",
          code:
`public class Total {
    public static void main(String[] args) {
        int firstHalf = 12;
        int secondHalf = 9;
        System.out.println("Total points: " + firstHalf + secondHalf);
    }
}`,
          result: "Total points: 129",
          resultLabel: "Output (should be 21)"
        },
        good: {
          cls: "TotalFixed",
          code:
`public class TotalFixed {
    public static void main(String[] args) {
        int firstHalf = 12;
        int secondHalf = 9;
        System.out.println("Total points: " + (firstHalf + secondHalf));
    }
}`,
          result: "Total points: 21"
        },
        why: "<code>+</code> goes left to right, and once there's text on the left it joins things instead of adding. So you get 12 and then 9 stuck on the end. Brackets make it add first."
      }
    ],
    tryIt: [
      "Cover the output of <code>OrderOfOperations</code> and work out each line yourself first.",
      "Change line 6 to <code>2 * 7 / 2</code>. Does the answer change? Why?",
      "Print <code>n % 2</code> for a few numbers and check that the even ones give 0."
    ],
    challenge: {
      task: "Ask how many minutes someone spent gaming (a whole number) and print how many full hours and leftover minutes that is.",
      expected: "If the user enters <code>135</code>, it prints <code>2 hours and 15 minutes</code>.",
      hint: "<code>/</code> gives you the hours. Which operator gives you what's left over?",
      solution: {
        cls: "Minutes",
        code:
`import java.util.Scanner;

public class Minutes {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        System.out.print("Enter minutes: ");
        int totalMinutes = input.nextInt();

        int hours = totalMinutes / 60;
        int minutes = totalMinutes % 60;

        System.out.println(hours + " hours and " + minutes + " minutes");
    }
}`,
        input: "135\n",
        output: "Enter minutes: {{135}}\n2 hours and 15 minutes",
        cases: [
          { in: "59", out: "0 hours and 59 minutes" },
          { in: "60", out: "1 hours and 0 minutes" },
          { in: "200", out: "3 hours and 20 minutes" }
        ],
        explain: "<code>/</code> gives the full hours and <code>%</code> gives what's left. This is a case where integer division cutting off the decimal is actually what you want. (Saying \"1 hour\" instead of \"1 hours\" would need an if statement from Lesson 5.)"
      }
    },
    recap: [
      "I can work out something like <code>23 % 4</code>.",
      "I can explain why <code>7 / 2</code> is 3 but <code>7 / 2.0</code> is 3.5.",
      "I can work out an expression in BEDMAS order.",
      "I know <code>x += 5</code> means <code>x = x + 5</code>."
    ]
  },

  {
    id: 3,
    title: "Errors and Coding Style",
    short: "Tell syntax, runtime and logic errors apart, read error messages, and write code that's easy to read.",
    intro: "Everybody's code has errors in it. What helps is knowing which <em>kind</em> of error you're dealing with, because each one shows up at a different time. The second half of this lesson is about style, which makes errors easier to find.",
    conceptHeading: "Three kinds of errors",
    concept: [
      "<strong>Syntax error:</strong> you broke one of Java's rules, like forgetting a semicolon. The program won't run at all.",
      "<strong>Runtime error:</strong> the program starts, then crashes partway through with an error message called an <strong>exception</strong>. Dividing by zero does this.",
      "<strong>Logic error:</strong> the program runs fine but gives the wrong answer. Java doesn't warn you, so you have to notice it yourself by checking the output."
    ],
    tables: [
      {
        head: ["Error", "When it shows up", "What you see", "Example"],
        rows: [
          ["Syntax", "Before it runs", "Red underline in IntelliJ", "Missing <code>;</code>"],
          ["Runtime", "While it runs", "A crash with an exception", "Dividing by 0"],
          ["Logic", "Never reported", "Wrong output", "<code>+</code> instead of <code>*</code>"]
        ]
      }
    ],
    visual:
      '<p class="diagram-title">Which kind of error is it?</p>' +
      '<div class="flow">' +
        '<div class="flow-q">Does the program compile and start?</div>' +
        '<div class="flow-branch"><span class="flow-no">No</span><div class="flow-end bad">Syntax error</div></div>' +
        '<div class="flow-arrow" aria-hidden="true">Yes &darr;</div>' +
        '<div class="flow-q">Does it crash partway through?</div>' +
        '<div class="flow-branch"><span class="flow-no">Yes</span><div class="flow-end bad">Runtime error</div></div>' +
        '<div class="flow-arrow" aria-hidden="true">No &darr;</div>' +
        '<div class="flow-q">Is the output right?</div>' +
        '<div class="flow-branch"><span class="flow-no">No</span><div class="flow-end bad">Logic error</div></div>' +
        '<div class="flow-arrow" aria-hidden="true">Yes &darr;</div>' +
        '<div class="flow-end good">No error found (for that input)</div>' +
      '</div>',
    sections: [
      {
        heading: "Reading error messages",
        html: "<p>Start with the first line of the message. It tells you the <strong>line number</strong> and what Java expected. Check that line, and if it looks fine, check the line above it.</p>" +
          "<p>Fix the <strong>first</strong> error first. One mistake can cause a bunch of other errors that go away once it's fixed.</p>"
      }
    ],
    examples: [
      {
        title: "Syntax error: missing semicolon",
        cls: "SyntaxDemo",
        code:
`public class SyntaxDemo {
    public static void main(String[] args) {
        int x = 5
        System.out.println(x);
    }
}`,
        kind: "compile-error",
        output: "SyntaxDemo.java:3: error: ';' expected\n        int x = 5\n                 ^",
        outputLabel: "Compiler message (IntelliJ might word it a bit differently)",
        isError: true,
        how: [
          "<code>SyntaxDemo.java:3</code> means line 3, and the <code>^</code> shows where the semicolon is missing. Nothing runs, not even line 4."
        ]
      },
      {
        title: "Runtime error: dividing by zero",
        cls: "RuntimeDemo",
        code:
`public class RuntimeDemo {
    public static void main(String[] args) {
        int points = 24;
        int games = 0;
        System.out.println("Start");
        System.out.println(points / games);
        System.out.println("End");
    }
}`,
        kind: "runtime-error",
        output: "Start\nException in thread \"main\" java.lang.ArithmeticException: / by zero\n\tat RuntimeDemo.main(RuntimeDemo.java:6)",
        outputLabel: "Output",
        isError: true,
        how: [
          "The code is fine, so it starts and prints <code>Start</code>.",
          "Line 6 divides by 0, so it crashes there and <code>End</code> never prints. The last line of the error tells you it was line 6."
        ]
      },
      {
        title: "Logic error: the wrong formula",
        cls: "AverageBug",
        code:
`public class AverageBug {
    public static void main(String[] args) {
        int mark1 = 80;
        int mark2 = 90;
        double average = mark1 + mark2 / 2;
        System.out.println("Average: " + average);
    }
}`,
        output: "Average: 125.0",
        outputLabel: "Output (should be 85.0)",
        isError: true,
        how: [
          "No error message, just a wrong answer. Division happens before addition, so it's <code>80 + 45</code>.",
          "The fix is <code>(mark1 + mark2) / 2.0</code>. An average of 125 out of 100 should be a red flag, which is why you should always check if your output makes sense."
        ]
      }
    ],
    mistakes: [
      {
        intro: "Forgetting Java is case-sensitive.",
        bad: {
          cls: "CaseTypo",
          code:
`public class CaseTypo {
    public static void main(String[] args) {
        system.out.println("Hello");
    }
}`,
          result: "error: package system does not exist",
          resultLabel: "Compiler message"
        },
        good: {
          cls: "CaseFixed",
          code:
`public class CaseFixed {
    public static void main(String[] args) {
        System.out.println("Hello");
    }
}`,
          result: "Hello"
        },
        why: "<code>system</code> and <code>System</code> are completely different to Java, and the error message doesn't really tell you that. If something you're sure is spelled right gives an error, check the capitals."
      }
    ],
    styleHeading: "Coding style",
    style: {
      intro: "Style doesn't change what your program does. It just makes it way easier to read, for you and for whoever is helping you fix it. Both of these print <code>15</code>:",
      bad: {
        cls: "demo",
        code:
`public class demo{
public static void main(String[] args){
int X=5;int Y=10;
System.out.println(X+Y);}}`,
        result: "15"
      },
      good: {
        cls: "Demo",
        code:
`public class Demo {
    public static void main(String[] args) {
        int first = 5;
        int second = 10;
        System.out.println(first + second);
    }
}`,
        result: "15"
      },
      rules: [
        "<strong>Class names</strong> start with a capital: <code>ScoreCalculator</code>.",
        "<strong>Variable names</strong> use camelCase: <code>totalScore</code>.",
        "<strong>Use names that mean something.</strong> <code>totalScore</code> tells you what it is. <code>x</code> doesn't.",
        "<strong>Indent</strong> everything inside braces by 4 spaces.",
        "<strong>One statement per line</strong>, with spaces around things like <code>=</code> and <code>+</code>.",
        "<strong>Comments</strong> (<code>// like this</code>) are for explaining things that aren't obvious, not every line."
      ]
    },
    reminder: "silence",
    tryIt: [
      "Type <code>SyntaxDemo</code> into IntelliJ. The red underline shows up before you even run it.",
      "Change <code>games</code> to <code>4</code> in <code>RuntimeDemo</code>. Which lines print now?",
      "Paste the messy <code>demo</code> into IntelliJ and press Ctrl+Alt+L. It fixes the spacing, but not the names."
    ],
    challenge: {
      task: "This should print the average of 10 and 20, but it has one syntax error and one logic error. Find both, say which is which, and fix them.",
      code:
`public class Fix {
    public static void main(String[] args) {
        int a = 10;
        int b = 20
        double avg = a + b / 2;
        System.out.println("Average: " + avg);
    }
}`,
      codeCls: "Fix",
      expected: "When it's fixed, it prints <code>Average: 15.0</code>",
      hint: "Fix the syntax error first, since nothing runs until it's gone. Then see if the output is what you'd expect.",
      solution: {
        cls: "Fix",
        code:
`public class Fix {
    public static void main(String[] args) {
        int a = 10;
        int b = 20;
        double avg = (a + b) / 2.0;
        System.out.println("Average: " + avg);
    }
}`,
        output: "Average: 15.0",
        explain: "<strong>Syntax error:</strong> line 4 is missing a semicolon. <strong>Logic error:</strong> line 5 divides before adding, so it gives 20.0. The brackets fix the order, and <code>2.0</code> keeps the decimal for numbers like 10 and 21."
      }
    },
    recap: [
      "I know when each error shows up: before it runs, while it runs, or never.",
      "I can give an example of each kind of error.",
      "I check the line number in an error message, and I fix the first error first.",
      "I name classes like <code>MyClass</code> and variables like <code>myVariable</code>, and I indent inside braces."
    ]
  },

  {
    id: 4,
    title: "Statements and Expressions",
    short: "Expressions give you a value. Statements do something or decide what runs.",
    intro: "This lesson is mostly vocabulary. You've been writing statements and expressions since Lesson 1. This just gives them names, which also helps when you get an error like <code>not a statement</code>.",
    conceptHeading: "The difference",
    concept: [
      "An <strong>expression</strong> is anything that gives you a value: <code>5</code>, <code>mark1 + mark2</code>, <code>age &gt;= 16</code>, <code>\"Hi \" + name</code>.",
      "A <strong>statement</strong> is a full instruction that does something, like making a variable, printing, or deciding what runs. Simple statements end with a semicolon.",
      "An easy way to tell: if it could go on the right side of <code>=</code> or inside <code>println( )</code>, it's an expression."
    ],
    visualFirst: true,
    visual:
      '<p class="diagram-title">One statement with an expression inside</p>' +
      '<div class="anatomy">' +
        '<div class="anatomy-code"><code><span class="a-stmt">int area = <span class="a-expr">width * height</span>;</span></code></div>' +
        '<ul class="anatomy-key">' +
          '<li><span class="swatch stmt"></span>The whole line is a <strong>statement</strong>. It makes <code>area</code> and stores something in it.</li>' +
          '<li><span class="swatch expr"></span><code>width * height</code> is an <strong>expression</strong>. If width is 4 and height is 3, its value is 12.</li>' +
        '</ul>' +
      '</div>',
    tables: [
      {
        caption: "Some code sorted out (width = 4, height = 3)",
        head: ["Code", "Expression or statement?", "Why"],
        rows: [
          ["<code>width * height</code>", "Expression", "Its value is <code>12</code>"],
          ["<code>width &gt; height</code>", "Expression", "Its value is <code>true</code>"],
          ["<code>\"Area: \" + 12</code>", "Expression", "Its value is <code>\"Area: 12\"</code>"],
          ["<code>int area = width * height;</code>", "Statement (declaration)", "Makes <code>area</code> and stores 12"],
          ["<code>area = area + 2;</code>", "Statement (assignment)", "Changes <code>area</code>"],
          ["<code>System.out.println(area);</code>", "Statement (method call)", "Prints <code>area</code>"],
          ["<code>if (area &gt; 10) { ... }</code>", "Statement (control)", "Decides if the code in the braces runs"]
        ]
      }
    ],
    sections: [
      {
        heading: "Statements that control what runs",
        html: "<p>Usually statements run once each, top to bottom. <strong>Control statements</strong> change that. <code>if</code> and <code>switch</code> decide <em>whether</em> code runs, and <code>while</code> and <code>for</code> decide <em>how many times</em>. Each one has an expression inside (the condition) that ends up true or false.</p>"
      },
      {
        heading: "How Java runs an assignment",
        html: "<p>Java works out the right side first, then stores the answer in the variable on the left. That's why <code>area = area + 2;</code> works. It takes the old value of <code>area</code>, adds 2, and stores that.</p>"
      }
    ],
    syntax:
`int total = price * 3;         // declaration, contains the expression price * 3
total = total + 1;             // assignment, contains the expression total + 1
System.out.println(total);     // method call, contains the expression total
if (total > 10) { ... }        // control, contains the expression total > 10`,
    rules: [
      "Simple statements end in <code>;</code>. Control statements like <code>if</code> end with <code>}</code>.",
      "The left side of <code>=</code> has to be a variable.",
      "An expression on its own, like <code>width * height;</code>, isn't a statement and won't compile."
    ],
    examples: [
      {
        title: "Expressions inside statements",
        cls: "ExpressionDemo",
        code:
`public class ExpressionDemo {
    public static void main(String[] args) {
        int width = 4;
        int height = 3;
        int area = width * height;
        area = area + 2;
        System.out.println(area);
        System.out.println(width * height + 1);
        System.out.println(width > height);
    }
}`,
        output: "14\n13\ntrue",
        how: [
          "Line 6 uses the old <code>area</code> (12), adds 2, and stores 14.",
          "Line 8 prints <code>width * height + 1</code> but doesn't store it anywhere.",
          "Line 9 prints the value of <code>4 &gt; 3</code>, which is <code>true</code>."
        ]
      }
    ],
    mistakes: [
      {
        intro: "Writing an expression on its own line.",
        bad: {
          cls: "NotAStatement",
          code:
`public class NotAStatement {
    public static void main(String[] args) {
        int width = 4;
        int height = 3;
        width * height;
    }
}`,
          result: "error: not a statement",
          resultLabel: "Compiler message"
        },
        good: {
          cls: "StatementFixed",
          code:
`public class StatementFixed {
    public static void main(String[] args) {
        int width = 4;
        int height = 3;
        int area = width * height;
        System.out.println(area);
    }
}`,
          result: "12"
        },
        why: "<code>width * height</code> works out to 12, but then nothing happens with it. Store it in a variable or print it."
      },
      {
        intro: "Writing an assignment backwards.",
        bad: {
          cls: "Backwards",
          code:
`public class Backwards {
    public static void main(String[] args) {
        int x;
        10 = x;
    }
}`,
          result: "error: unexpected type",
          resultLabel: "Compiler message"
        },
        good: {
          cls: "Forwards",
          code:
`public class Forwards {
    public static void main(String[] args) {
        int x;
        x = 10;
        System.out.println(x);
    }
}`,
          result: "10"
        },
        why: "The value goes into whatever's on the left, so the left has to be a variable. You can't store something inside the number 10."
      }
    ],
    tryIt: [
      "Change line 6 to <code>area = area * 2;</code>. Guess the first output before you run it.",
      "Add <code>System.out.println(width + height > 6);</code>. Is it true or false? (<code>+</code> happens before <code>&gt;</code>.)",
      "Put <code>width * height;</code> on its own line and see what IntelliJ says."
    ],
    challenge: {
      task: "Set <code>width</code> to 5 and <code>height</code> to 3. Work out the area and the perimeter, store each in a variable, and print them. Add a comment above each line saying what kind of statement it is and what the expression is.",
      expected: "It prints <code>Area: 15</code> and then <code>Perimeter: 16</code>.",
      hint: "The perimeter is 2 times (width + height). You'll need brackets.",
      solution: {
        cls: "Rectangle",
        code:
`public class Rectangle {
    public static void main(String[] args) {
        // declaration statements; the expressions are 5 and 3
        int width = 5;
        int height = 3;

        // declaration statement; expression: width * height
        int area = width * height;

        // declaration statement; expression: 2 * (width + height)
        int perimeter = 2 * (width + height);

        // method call statements; expressions: "Area: " + area and "Perimeter: " + perimeter
        System.out.println("Area: " + area);
        System.out.println("Perimeter: " + perimeter);
    }
}`,
        output: "Area: 15\nPerimeter: 16",
        explain: "Without the brackets, <code>2 * width + height</code> gives 13, which is a logic error. Notice that every line is a statement with at least one expression in it."
      }
    },
    recap: [
      "I can explain the difference between an expression and a statement.",
      "I can point out the expression in <code>int area = width * height;</code>.",
      "I can name declaration, assignment, method call and control statements.",
      "I know why <code>x + 1;</code> on its own gives <code>not a statement</code>."
    ]
  },

  {
    id: 5,
    title: "If/Else Statements",
    short: "Make a program decide what to do with conditions, comparison operators, and if, else if and else.",
    intro: "So far every program has run every line. An <code>if</code> statement lets the program make a decision, like whether Shiv passed a test, so some code only runs when a condition is true.",
    conceptHeading: "Conditions",
    concept: [
      "A condition is something Java checks to see if it's true or false. You can make one by comparing two values:"
    ],
    tables: [
      {
        head: ["Operator", "Means", "Example", "If mark is 75"],
        rows: [
          ["<code>==</code>", "equal to", "<code>mark == 75</code>", "<code>true</code>"],
          ["<code>!=</code>", "not equal to", "<code>mark != 75</code>", "<code>false</code>"],
          ["<code>&gt;</code>", "greater than", "<code>mark &gt; 80</code>", "<code>false</code>"],
          ["<code>&lt;</code>", "less than", "<code>mark &lt; 80</code>", "<code>true</code>"],
          ["<code>&gt;=</code>", "greater than or equal to", "<code>mark &gt;= 50</code>", "<code>true</code>"],
          ["<code>&lt;=</code>", "less than or equal to", "<code>mark &lt;= 50</code>", "<code>false</code>"]
        ]
      }
    ],
    sections: [
      {
        heading: "Which branch runs?",
        html: "<p>Java checks the conditions from the top down and runs the <strong>first</strong> one that's true. After that it skips the rest of the chain. If none of them are true, the <code>else</code> runs.</p>" +
          "<p>So only one branch ever runs, even if more than one condition would have been true.</p>" +
          '<div class="flow">' +
            '<div class="flow-q">Is the first condition true?</div>' +
            '<div class="flow-branch"><span class="flow-yes">Yes</span><div class="flow-end">Run the <code>if</code> part and skip the rest</div></div>' +
            '<div class="flow-arrow" aria-hidden="true">No &darr;</div>' +
            '<div class="flow-q">Is the next condition true?</div>' +
            '<div class="flow-branch"><span class="flow-yes">Yes</span><div class="flow-end">Run the <code>else if</code> part and skip the rest</div></div>' +
            '<div class="flow-arrow" aria-hidden="true">No &darr;</div>' +
            '<div class="flow-end">Run the <code>else</code> part</div>' +
          '</div>'
      },
      {
        heading: "Test the cut-off",
        html: "<p>A lot of if-statement bugs happen right at the cut-off. If the pass mark is 50, does exactly 50 pass? That's the difference between <code>&gt;</code> and <code>&gt;=</code>. Always test the exact cut-off and the numbers right next to it, like 49, 50 and 51.</p>"
      }
    ],
    syntax:
`if (condition) {
    // runs if condition is true
} else if (otherCondition) {
    // runs if condition is false and otherCondition is true
} else {
    // runs if nothing above was true
}`,
    rules: [
      "The condition goes in brackets and has to be true or false.",
      "Watch out: <code>=</code> assigns a value, while <code>==</code> compares two values.",
      "You can have as many <code>else if</code>s as you want, but only one <code>else</code>, and it goes at the end.",
      "Use braces even if there's only one line inside. Lesson 6 shows what happens if you don't."
    ],
    examples: [
      {
        title: "Did Shiv pass?",
        cls: "PassCheck",
        code:
`import java.util.Scanner;

public class PassCheck {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        System.out.print("Enter your mark: ");
        int mark = input.nextInt();

        if (mark >= 50) {
            System.out.println("You passed!");
        } else {
            System.out.println("You didn't pass this time.");
        }
    }
}`,
        input: "72\n",
        output: "Enter your mark: {{72}}\nYou passed!",
        cases: [
          { in: "72", out: "You passed!" },
          { in: "50", out: "You passed!" },
          { in: "49", out: "You didn't pass this time." }
        ],
        how: [
          "If <code>mark &gt;= 50</code> is true, the first message prints. If it's false, the <code>else</code> runs instead.",
          "Exactly 50 passes because of the <code>&gt;=</code>. With <code>&gt;</code>, a 50 would fail."
        ]
      },
      {
        title: "Ticket prices with else if",
        cls: "TicketPrice",
        code:
`import java.util.Scanner;

public class TicketPrice {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        System.out.print("Enter your age: ");
        int age = input.nextInt();

        if (age < 12) {
            System.out.println("Child ticket: $8");
        } else if (age >= 65) {
            System.out.println("Senior ticket: $9");
        } else {
            System.out.println("Regular ticket: $13");
        }
    }
}`,
        input: "16\n",
        output: "Enter your age: {{16}}\nRegular ticket: $13",
        cases: [
          { in: "11", out: "Child ticket: $8" },
          { in: "12", out: "Regular ticket: $13" },
          { in: "16", out: "Regular ticket: $13" },
          { in: "64", out: "Regular ticket: $13" },
          { in: "65", out: "Senior ticket: $9" }
        ],
        how: [
          "At 16, Shiv isn't under 12 or 65 and up, so the <code>else</code> runs and he pays the regular price.",
          "The table tests both cut-offs. A 12-year-old pays regular because 12 isn't less than 12, and 65 counts as a senior because of the <code>&gt;=</code>."
        ]
      }
    ],
    mistakes: [
      {
        intro: "Using <code>=</code> instead of <code>==</code>.",
        bad: {
          cls: "AssignInIf",
          code:
`public class AssignInIf {
    public static void main(String[] args) {
        int n = 5;
        if (n = 5) {
            System.out.println("five");
        }
    }
}`,
          result: "error: incompatible types: int cannot be converted to boolean",
          resultLabel: "Compiler message"
        },
        good: {
          cls: "CompareInIf",
          code:
`public class CompareInIf {
    public static void main(String[] args) {
        int n = 5;
        if (n == 5) {
            System.out.println("five");
        }
    }
}`,
          result: "five"
        },
        why: "<code>n = 5</code> stores 5 in n, but an <code>if</code> needs something that's true or false. <code>n == 5</code> actually compares them."
      },
      {
        intro: "Putting the conditions in the wrong order. The idea: 80 and up is Honours, 50 and up is Pass, anything lower is Fail.",
        bad: {
          cls: "WrongOrder",
          code:
`public class WrongOrder {
    public static void main(String[] args) {
        int mark = 90;
        if (mark >= 50) {
            System.out.println("Pass");
        } else if (mark >= 80) {
            System.out.println("Honours");
        } else {
            System.out.println("Fail");
        }
    }
}`,
          result: "Pass",
          resultLabel: "Output (90 should be Honours)"
        },
        good: {
          cls: "RightOrder",
          code:
`public class RightOrder {
    public static void main(String[] args) {
        int mark = 90;
        if (mark >= 80) {
            System.out.println("Honours");
        } else if (mark >= 50) {
            System.out.println("Pass");
        } else {
            System.out.println("Fail");
        }
    }
}`,
          result: "Honours"
        },
        why: "90 is also &gt;= 50, so Java takes the Pass branch and never even checks for Honours. In the bad version, nobody could ever get Honours. Put the highest cut-off first."
      }
    ],
    extra: [
      {
        title: "Combining conditions with && and ||",
        html: "<p><code>&amp;&amp;</code> means <strong>and</strong> (both have to be true). <code>||</code> means <strong>or</strong> (at least one has to be true).</p><p><code>if (age &gt;= 13 &amp;&amp; age &lt;= 19)</code> checks for a teenager. <code>if (day == 6 || day == 7)</code> checks for the weekend.</p>"
      },
      {
        title: "Comparing Strings",
        html: "<p>To check if two Strings have the same text, use <code>.equals</code>, like <code>if (answer.equals(\"yes\"))</code>. Don't use <code>==</code> for Strings. It doesn't always work.</p>"
      }
    ],
    tryIt: [
      "Change <code>mark &gt;= 50</code> to <code>mark &gt; 50</code> in <code>PassCheck</code> and run it with 50.",
      "Run <code>TicketPrice</code> with your own age, then try 64 and 65.",
      "Add an <code>else if</code> to <code>PassCheck</code> that prints <code>Honours!</code> for 80 and up. Which order do the conditions need to go in?"
    ],
    challenge: {
      task: "Ask for the temperature in &deg;C (a whole number). Print <code>Freezing</code> if it's below 0, <code>Cold</code> from 0 to 15, <code>Warm</code> from 16 to 25, and <code>Hot</code> above 25.",
      expected: "-3 &rarr; Freezing, 0 &rarr; Cold, 15 &rarr; Cold, 16 &rarr; Warm, 25 &rarr; Warm, 26 &rarr; Hot. Try all of these.",
      hint: "Go from coldest to hottest. Once you know it isn't below 0, the next condition only has to check the top of the Cold range.",
      solution: {
        cls: "Weather",
        code:
`import java.util.Scanner;

public class Weather {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        System.out.print("Temperature: ");
        int temp = input.nextInt();

        if (temp < 0) {
            System.out.println("Freezing");
        } else if (temp <= 15) {
            System.out.println("Cold");
        } else if (temp <= 25) {
            System.out.println("Warm");
        } else {
            System.out.println("Hot");
        }
    }
}`,
        input: "16\n",
        output: "Temperature: {{16}}\nWarm",
        cases: [
          { in: "-3", out: "Freezing" },
          { in: "0", out: "Cold" },
          { in: "15", out: "Cold" },
          { in: "16", out: "Warm" },
          { in: "25", out: "Warm" },
          { in: "26", out: "Hot" }
        ],
        explain: "You don't need to check both ends of each range. Java only gets to <code>temp &lt;= 15</code> if <code>temp &lt; 0</code> was already false, so it knows temp is at least 0."
      }
    },
    recap: [
      "I can use all six comparison operators, and I know the difference between <code>&gt;</code> and <code>&gt;=</code>.",
      "I know only the first true branch runs.",
      "I test the exact cut-off and the numbers next to it.",
      "I use <code>==</code> to compare and <code>=</code> to assign."
    ]
  },

  {
    id: 6,
    title: "Nested If Statements",
    short: "Put an if statement inside another if, for decisions that depend on an earlier one.",
    intro: "Sometimes one question only matters after another one is answered. There's no point checking if someone has a ticket if they're too young to get in anyway. A <strong>nested if</strong> is just an if inside another if (or else).",
    conceptHeading: "An if inside an if",
    concept: [
      "Java checks the <strong>outer</strong> condition first. It only checks the <strong>inner</strong> one if it actually goes into that block. Otherwise the inner if gets skipped completely.",
      "It's easier to see as a tree:"
    ],
    visual:
      '<p class="diagram-title">The entry check as a tree</p>' +
      '<div class="tree">' +
        '<div class="tree-q">age &gt;= 13 ?</div>' +
        '<div class="tree-kids">' +
          '<div class="tree-branch"><span class="tree-label yes">true</span>' +
            '<div class="tree-q">hasTicket ?</div>' +
            '<div class="tree-kids">' +
              '<div class="tree-branch"><span class="tree-label yes">true</span><div class="tree-leaf">Welcome in!</div></div>' +
              '<div class="tree-branch"><span class="tree-label no">false</span><div class="tree-leaf">You need a ticket.</div></div>' +
            '</div>' +
          '</div>' +
          '<div class="tree-branch"><span class="tree-label no">false</span><div class="tree-leaf">Sorry, you are too young.</div><p class="tree-note">The ticket never gets checked on this side.</p></div>' +
        '</div>' +
      '</div>',
    syntax:
`if (outerCondition) {
    if (innerCondition) {
        // outer true AND inner true
    } else {
        // outer true, inner false
    }
} else {
    // outer false (innerCondition never gets checked)
}`,
    rules: [
      "Give every <code>if</code> and <code>else</code> its own braces.",
      "Indent each level by 4 more spaces so you can see what's inside what.",
      "Without braces, an <code>else</code> goes with the <strong>closest</strong> <code>if</code> above it, no matter how you indent it.",
      "Try not to nest more than two levels. It gets confusing fast."
    ],
    examples: [
      {
        title: "Entry check",
        cls: "EntryCheck",
        code:
`import java.util.Scanner;

public class EntryCheck {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        System.out.print("Enter your age: ");
        int age = input.nextInt();
        System.out.print("Do you have a ticket? (true/false): ");
        boolean hasTicket = input.nextBoolean();

        if (age >= 13) {
            if (hasTicket) {
                System.out.println("Welcome in!");
            } else {
                System.out.println("You need a ticket.");
            }
        } else {
            System.out.println("Sorry, you are too young.");
        }
    }
}`,
        input: "16\ntrue\n",
        output: "Enter your age: {{16}}\nDo you have a ticket? (true/false): {{true}}\nWelcome in!",
        cases: [
          { in: "16\ntrue", out: "Welcome in!" },
          { in: "16\nfalse", out: "You need a ticket." },
          { in: "10\ntrue", out: "Sorry, you are too young." }
        ],
        note: "<code>nextBoolean()</code> reads the word <code>true</code> or <code>false</code>.",
        how: [
          "If the person is 13 or older, Java goes inside and checks <code>hasTicket</code>.",
          "If they're under 13, Java goes straight to the outer <code>else</code>. The ticket doesn't matter.",
          "<code>if (hasTicket)</code> works on its own because <code>hasTicket</code> is already true or false."
        ],
        trace: {
          caption: "Each input, step by step",
          head: ["Input", "age >= 13 ?", "hasTicket ?", "Prints"],
          rows: [
            ["16, true", "true", "true", "Welcome in!"],
            ["16, false", "true", "false", "You need a ticket."],
            ["10, true", "false", "(never checked)", "Sorry, you are too young."]
          ]
        }
      }
    ],
    sections: [
      {
        heading: "Keeping it readable",
        html: "<ul>" +
          "<li><strong>Name booleans like questions:</strong> <code>hasTicket</code>, <code>isRaining</code>. Then <code>if (hasTicket)</code> reads like a sentence.</li>" +
          "<li><strong>Put the deciding question outside.</strong> Check whatever makes the other question pointless first, like age before ticket.</li>" +
          "<li><strong>Try reading it out loud.</strong> If you can't explain what it does, it's probably too complicated.</li>" +
          "<li><strong>You don't always need to nest.</strong> If both things just have to be true and there's only one \"no\" message, <code>&amp;&amp;</code> is simpler (see the Extra in Lesson 5). Nesting makes more sense when each \"no\" gets its own message.</li>" +
          "</ul>"
      }
    ],
    mistakes: [
      {
        intro: "Leaving out the braces. The indenting looks right, but Java doesn't care about indenting.",
        bad: {
          cls: "DanglingElse",
          code:
`public class DanglingElse {
    public static void main(String[] args) {
        int age = 16;
        boolean hasTicket = false;

        if (age >= 13)
            if (hasTicket)
                System.out.println("Welcome in!");
        else
            System.out.println("Sorry, you are too young.");
    }
}`,
          result: "Sorry, you are too young.",
          resultLabel: "Output (wrong: 16 isn't too young)"
        },
        good: {
          cls: "DanglingFixed",
          code:
`public class DanglingFixed {
    public static void main(String[] args) {
        int age = 16;
        boolean hasTicket = false;

        if (age >= 13) {
            if (hasTicket) {
                System.out.println("Welcome in!");
            }
        } else {
            System.out.println("Sorry, you are too young.");
        }
    }
}`,
          result: "(no output)",
          resultLabel: "Output"
        },
        why: "Without braces, the <code>else</code> goes with the closest if, which is <code>if (hasTicket)</code>. So the \"too young\" message really runs when there's no ticket. With braces, the <code>else</code> goes with the age check. Shiv is 16, so he passes it, and since there's no inner else, nothing prints. That's correct, just not very useful."
      }
    ],
    tryIt: [
      "Run <code>EntryCheck</code> with the three inputs from the table.",
      "Inside the \"Welcome in!\" part, add another if that checks for a VIP pass.",
      "Take all the braces out of <code>EntryCheck</code> and press Ctrl+Alt+L. See where IntelliJ moves the <code>else</code> lines."
    ],
    challenge: {
      task: "Ask for the temperature (a whole number) and whether it's raining (true or false). If it's raining and below 5, print <code>Wear a winter coat and bring an umbrella</code>. If it's raining and 5 or higher, print <code>Bring an umbrella</code>. If it's not raining, print <code>No umbrella needed</code>.",
      expected: "2, true &rarr; Wear a winter coat and bring an umbrella. 12, true &rarr; Bring an umbrella. 12, false &rarr; No umbrella needed.",
      hint: "Check for rain in the outer if. The temperature only matters if it's raining.",
      solution: {
        cls: "Umbrella",
        code:
`import java.util.Scanner;

public class Umbrella {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        System.out.print("Temperature: ");
        int temp = input.nextInt();
        System.out.print("Raining? (true/false): ");
        boolean isRaining = input.nextBoolean();

        if (isRaining) {
            if (temp < 5) {
                System.out.println("Wear a winter coat and bring an umbrella");
            } else {
                System.out.println("Bring an umbrella");
            }
        } else {
            System.out.println("No umbrella needed");
        }
    }
}`,
        input: "2\ntrue\n",
        output: "Temperature: {{2}}\nRaining? (true/false): {{true}}\nWear a winter coat and bring an umbrella",
        cases: [
          { in: "2\ntrue", out: "Wear a winter coat and bring an umbrella" },
          { in: "5\ntrue", out: "Bring an umbrella" },
          { in: "12\ntrue", out: "Bring an umbrella" },
          { in: "12\nfalse", out: "No umbrella needed" },
          { in: "2\nfalse", out: "No umbrella needed" }
        ],
        explain: "Rain goes on the outside because the temperature only matters if it's raining. Exactly 5 counts as \"5 or higher\", so it prints <code>Bring an umbrella</code>."
      }
    },
    recap: [
      "I can trace a nested if: outer condition first, then the inner one only if Java gets there.",
      "I can draw a nested if as a tree.",
      "I always use braces, and I know an unbraced <code>else</code> goes with the closest <code>if</code>.",
      "I can tell when <code>&amp;&amp;</code> would be simpler than nesting."
    ]
  },

  {
    id: 7,
    title: "While Loops",
    short: "Repeat code while a condition is true, trace loops with a table, and avoid infinite loops.",
    intro: "A <code>while</code> loop keeps repeating code as long as its condition is true. It's useful when you don't know how many times something will repeat, like \"keep asking until they guess right\".",
    conceptHeading: "How it works",
    concept: [
      "Before each repeat (called an <strong>iteration</strong>), Java checks the condition. If it's true, the code inside runs and then Java checks again. If it's false, the loop stops.",
      "Since the check happens <strong>before</strong> each iteration, the code inside might not run at all if the condition is false from the start.",
      "A while loop needs three things: a variable set up before the loop, a condition that uses it, and something inside the loop that changes it. If nothing changes it, the loop never ends."
    ],
    visual:
      '<p class="diagram-title">The loop cycle</p>' +
      '<div class="cycle">' +
        '<div class="cycle-step">Set up the variable <span>(before the loop)</span></div>' +
        '<div class="cycle-arrow" aria-hidden="true">&darr;</div>' +
        '<div class="cycle-step check">Check the condition</div>' +
        '<div class="cycle-split">' +
          '<div><span class="flow-yes">true</span><div class="cycle-step">Run the code inside (which changes the variable)</div><div class="cycle-back">&uarr; then check again</div></div>' +
          '<div><span class="flow-no">false</span><div class="cycle-step">Stop and move on</div></div>' +
        '</div>' +
      '</div>',
    syntax:
`int count = 1;              // 1. set up BEFORE the loop
while (count <= 5) {        // 2. condition, checked before every iteration
    // the code that repeats
    count++;                // 3. change the variable INSIDE the loop
}
// the program keeps going here once the condition is false`,
    rules: [
      "No semicolon after <code>while (condition)</code>.",
      "<code>count++</code> is the same as <code>count = count + 1</code>.",
      "Watch the boundary: <code>count &lt;= 5</code> goes up to 5, but <code>count &lt; 5</code> stops at 4."
    ],
    examples: [
      {
        title: "Count from 1 to 5",
        cls: "CountDemo",
        code:
`public class CountDemo {
    public static void main(String[] args) {
        int count = 1;
        while (count <= 5) {
            System.out.println("Count is " + count);
            count++;
        }
        System.out.println("Done");
    }
}`,
        output: "Count is 1\nCount is 2\nCount is 3\nCount is 4\nCount is 5\nDone",
        how: [
          "After printing 5, <code>count</code> becomes 6. <code>6 &lt;= 5</code> is false, so the loop stops.",
          "<code>Done</code> is outside the loop, so it only prints once."
        ],
        trace: {
          caption: "Trace table: one row for each time the condition gets checked",
          head: ["count at the check", "count <= 5 ?", "Prints", "count after count++"],
          rows: [
            ["1", "true", "Count is 1", "2"],
            ["2", "true", "Count is 2", "3"],
            ["3", "true", "Count is 3", "4"],
            ["4", "true", "Count is 4", "5"],
            ["5", "true", "Count is 5", "6"],
            ["6", "<strong>false</strong>", "(loop ends)", "&ndash;"]
          ]
        }
      },
      {
        title: "A guessing game",
        cls: "GuessNumber",
        code:
`import java.util.Scanner;

public class GuessNumber {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        int secret = 7;

        System.out.print("Guess the number: ");
        int guess = input.nextInt();

        while (guess != secret) {
            System.out.print("Wrong. Try again: ");
            guess = input.nextInt();
        }
        System.out.println("You got it!");
    }
}`,
        input: "3\n9\n7\n",
        output: "Guess the number: {{3}}\nWrong. Try again: {{9}}\nWrong. Try again: {{7}}\nYou got it!",
        cases: [
          { in: "7", out: "Guess the number: You got it!" },
          { in: "3\n9\n7", out: "You got it!" }
        ],
        how: [
          "There's no way to know how many guesses it'll take, so a while loop makes sense here.",
          "The first guess is read before the loop. Reading a new guess inside the loop is what lets it end.",
          "If you guess 7 right away, the condition is false from the start and the loop never runs."
        ]
      }
    ],
    mistakes: [
      {
        intro: "Forgetting to change the loop variable.",
        bad: {
          cls: "Forever",
          code:
`public class Forever {
    public static void main(String[] args) {
        int count = 1;
        while (count <= 5) {
            System.out.println("Count is " + count);
        }
    }
}`,
          kind: "infinite",
          startsWith: "Count is 1\nCount is 1\nCount is 1",
          result: "Count is 1\nCount is 1\nCount is 1\n... (never stops)",
          resultLabel: "Output"
        },
        good: {
          cls: "ForeverFixed",
          code:
`public class ForeverFixed {
    public static void main(String[] args) {
        int count = 1;
        while (count <= 5) {
            System.out.println("Count is " + count);
            count++;
        }
    }
}`,
          result: "Count is 1\nCount is 2\nCount is 3\nCount is 4\nCount is 5"
        },
        why: "<code>count</code> stays at 1 forever, so the condition is always true. Adding <code>count++</code> fixes it. If this happens in IntelliJ, press the red Stop button."
      },
      {
        intro: "Being off by one. This is supposed to print 1 to 5.",
        bad: {
          cls: "OffByOne",
          code:
`public class OffByOne {
    public static void main(String[] args) {
        int count = 1;
        while (count < 5) {
            System.out.println(count);
            count++;
        }
    }
}`,
          result: "1\n2\n3\n4",
          resultLabel: "Output (5 is missing)"
        },
        good: {
          cls: "OffByOneFixed",
          code:
`public class OffByOneFixed {
    public static void main(String[] args) {
        int count = 1;
        while (count <= 5) {
            System.out.println(count);
            count++;
        }
    }
}`,
          result: "1\n2\n3\n4\n5"
        },
        why: "When <code>count</code> gets to 5, <code>5 &lt; 5</code> is false, so 5 never prints. Use <code>&lt;=</code>. Tracing the last iteration is the easiest way to catch this."
      }
    ],
    tryIt: [
      "Change line 3 of <code>CountDemo</code> to <code>count = 10</code>. How many lines print?",
      "Make <code>CountDemo</code> count by 2s with <code>count += 2</code>. Do the trace table first.",
      "Run <code>Forever</code> on purpose and stop it with the red square."
    ],
    challenge: {
      task: "Shiv is adding up his basketball points. Keep asking for the points from each game until the user enters 0, then print the total.",
      expected: "If the user enters 4, 6, 2 and then 0, it prints <code>Total: 12</code>. If the first number is 0, it prints <code>Total: 0</code>.",
      hint: "It's set up like the guessing game: read the first number before the loop. Inside the loop, add it to the total, then read the next one.",
      solution: {
        cls: "RunningTotal",
        code:
`import java.util.Scanner;

public class RunningTotal {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        int total = 0;

        System.out.print("Enter a number (0 to stop): ");
        int number = input.nextInt();

        while (number != 0) {
            total += number;
            System.out.print("Enter a number (0 to stop): ");
            number = input.nextInt();
        }
        System.out.println("Total: " + total);
    }
}`,
        input: "4\n6\n2\n0\n",
        output: "Enter a number (0 to stop): {{4}}\nEnter a number (0 to stop): {{6}}\nEnter a number (0 to stop): {{2}}\nEnter a number (0 to stop): {{0}}\nTotal: 12",
        cases: [
          { in: "0", out: "Total: 0" },
          { in: "4\n6\n2\n0", out: "Total: 12" },
          { in: "10\n-3\n0", out: "Total: 7" }
        ],
        explain: "The 0 never gets added, because once it's typed the condition is false and the loop ends before it can be added."
      }
    },
    recap: [
      "I know the condition is checked before each iteration, so the loop might not run at all.",
      "I know a while loop needs a setup, a condition, and a change inside the loop.",
      "I can fill in a trace table for a while loop.",
      "I can find and fix an infinite loop or an off-by-one mistake."
    ]
  },

  {
    id: 8,
    title: "For Loops",
    short: "Counting loops with START, STOP, KEEP GOING, and why i < 5 runs five times.",
    intro: "A <code>for</code> loop is a counting loop. If you know how many times something should repeat, you can put everything that controls the loop on one line. In Mr. Lauder's class we remember the three parts as <strong>START, STOP, KEEP GOING</strong>.",
    conceptHeading: "START, STOP, KEEP GOING",
    concept: [
      "A for loop has three parts in the brackets, separated by <strong>semicolons</strong>. Here's the one from class:"
    ],
    visual:
      '<div class="ssk">' +
        '<p class="ssk-from">From class</p>' +
        '<div class="ssk-code"><code>for (<span class="ssk-start">int i = 0</span>; <span class="ssk-stop">i &lt; 5</span>; <span class="ssk-keep">i++</span>)</code></div>' +
        '<div class="ssk-parts">' +
          '<div class="ssk-part start"><h4>START</h4><code>int i = 0</code><p>Runs <strong>once</strong>, at the start. It makes <code>i</code> and sets it to 0. This is called the <em>initialization</em>.</p></div>' +
          '<div class="ssk-part stop"><h4>STOP</h4><code>i &lt; 5</code><p>Checked <strong>before every iteration</strong>. The loop continues while this is true and stops when it becomes false. This is the <em>condition</em>.</p></div>' +
          '<div class="ssk-part keep"><h4>KEEP GOING</h4><code>i++</code><p>Runs <strong>after each iteration</strong> and increases <code>i</code> by 1. This is the <em>update</em>.</p></div>' +
        '</div>' +
        '<p class="ssk-body">The code inside the braces <code>{ }</code> is the <strong>loop body</strong>. That&rsquo;s the part that repeats.</p>' +
      '</div>',
    sections: [
      {
        heading: "The order things happen",
        html: "<p>It's written START; STOP; KEEP GOING, but KEEP GOING actually happens <em>after</em> the body:</p>" +
          "<ol class=\"order\">" +
          "<li><strong>START</strong>: <code>int i = 0</code> (just once)</li>" +
          "<li><strong>STOP?</strong> Check <code>i &lt; 5</code>. If it's false, the loop is over.</li>" +
          "<li><strong>Body</strong>: run the code inside the braces.</li>" +
          "<li><strong>KEEP GOING</strong>: <code>i++</code></li>" +
          "<li>Go back to step 2.</li>" +
          "</ol>"
      }
    ],
    syntax:
`for (START; STOP; KEEP GOING) {
    // loop body
}

for (int i = 0; i < 5; i++) {      // i = 0, 1, 2, 3, 4
for (int i = 1; i <= 10; i++) {    // i = 1 to 10
for (int i = 10; i >= 1; i--) {    // counts down from 10 to 1
for (int i = 0; i <= 20; i += 5) { // i = 0, 5, 10, 15, 20`,
    rules: [
      "Semicolons between the parts, not commas.",
      "No semicolon after the <code>)</code>. See the first mistake below.",
      "A variable made in START, like <code>int i</code>, only exists inside the loop.",
      "KEEP GOING has to move <code>i</code> toward STOP. Counting down needs <code>i--</code>."
    ],
    examples: [
      {
        title: "The class example: for (int i = 0; i < 5; i++)",
        cls: "ForDemo",
        code:
`public class ForDemo {
    public static void main(String[] args) {
        for (int i = 0; i < 5; i++) {
            System.out.println("i is " + i);
        }
        System.out.println("Loop finished");
    }
}`,
        output: "i is 0\ni is 1\ni is 2\ni is 3\ni is 4\nLoop finished",
        how: [
          "START makes <code>i</code> 0. STOP checks <code>0 &lt; 5</code>, which is true, so it prints <code>i is 0</code>. KEEP GOING makes <code>i</code> 1, and it repeats.",
          "After it prints <code>i is 4</code>, <code>i</code> becomes 5. Now <code>5 &lt; 5</code> is false, so the loop stops without printing 5."
        ],
        trace: {
          caption: "Trace table for for (int i = 0; i < 5; i++)",
          head: ["Iteration", "i at the STOP check", "i < 5 ?", "Body prints", "KEEP GOING makes i"],
          rows: [
            ["1", "0", "true", "i is 0", "1"],
            ["2", "1", "true", "i is 1", "2"],
            ["3", "2", "true", "i is 2", "3"],
            ["4", "3", "true", "i is 3", "4"],
            ["5", "4", "true", "i is 4", "5"],
            ["&ndash;", "5", "<strong>false</strong>", "(loop stops)", "&ndash;"]
          ]
        }
      },
      {
        title: "Adding up 1 to 5",
        cls: "SumDemo",
        code:
`public class SumDemo {
    public static void main(String[] args) {
        int sum = 0;
        for (int i = 1; i <= 5; i++) {
            sum += i;
            System.out.println("i = " + i + ", sum = " + sum);
        }
        System.out.println("Total: " + sum);
    }
}`,
        output: "i = 1, sum = 1\ni = 2, sum = 3\ni = 3, sum = 6\ni = 4, sum = 10\ni = 5, sum = 15\nTotal: 15",
        how: [
          "Here START is 1 and STOP is <code>i &lt;= 5</code>, so it's still five times, just from 1 to 5.",
          "<code>sum</code> is made <strong>before</strong> the loop. If you made it inside, it would reset to 0 every time, and you couldn't use it after the loop."
        ]
      }
    ],
    sections2: [
      {
        heading: "Why five times, not six?",
        html: "<p><code>i</code> is <strong>0, 1, 2, 3, 4</strong>. That's five numbers. When <code>i</code> gets to 5, STOP is false, so the body never runs with 5.</p>" +
          "<p>An easy rule: <strong>start at 0 with <code>i &lt; n</code>, and it runs n times.</strong> If you change it to <code>i &lt;= 5</code>, it runs six times (0 to 5).</p>"
      },
      {
        heading: "for loop or while loop?",
        html: "<p>You can write any for loop as a while loop. The three parts just move to different lines:</p>" +
          "<div class=\"side-by-side\">" +
          "<div><p class=\"sbs-label\">for</p><pre class=\"mini\"><code>for (int i = 0; i &lt; 5; i++) {\n    System.out.println(i);\n}</code></pre></div>" +
          "<div><p class=\"sbs-label\">while</p><pre class=\"mini\"><code>int i = 0;           // START\nwhile (i &lt; 5) {      // STOP\n    System.out.println(i);\n    i++;             // KEEP GOING\n}</code></pre></div>" +
          "</div>" +
          "<p>Use <strong>for</strong> when you know how many times (count to 10, go through 5 marks). Use <strong>while</strong> when you're waiting for something to happen (until the user types 0).</p>"
      }
    ],
    mistakes: [
      {
        intro: "A semicolon right after the header.",
        bad: {
          cls: "SemicolonLoop",
          code:
`public class SemicolonLoop {
    public static void main(String[] args) {
        for (int i = 0; i < 3; i++);
        {
            System.out.println("Hi");
        }
    }
}`,
          result: "Hi",
          resultLabel: "Output (should print Hi three times)"
        },
        good: {
          cls: "SemicolonFixed",
          code:
`public class SemicolonFixed {
    public static void main(String[] args) {
        for (int i = 0; i < 3; i++) {
            System.out.println("Hi");
        }
    }
}`,
          result: "Hi\nHi\nHi"
        },
        why: "The semicolon counts as an empty loop body, so the loop repeats nothing three times. Then the block underneath runs once by itself. Delete the semicolon."
      },
      {
        intro: "Using <code>&lt;=</code> when you mean <code>&lt;</code>. This is supposed to print five lines.",
        bad: {
          cls: "SixTimes",
          code:
`public class SixTimes {
    public static void main(String[] args) {
        for (int i = 0; i <= 5; i++) {
            System.out.println("Hi " + i);
        }
    }
}`,
          result: "Hi 0\nHi 1\nHi 2\nHi 3\nHi 4\nHi 5",
          resultLabel: "Output (six lines, not five)"
        },
        good: {
          cls: "FiveTimes",
          code:
`public class FiveTimes {
    public static void main(String[] args) {
        for (int i = 0; i < 5; i++) {
            System.out.println("Hi " + i);
        }
    }
}`,
          result: "Hi 0\nHi 1\nHi 2\nHi 3\nHi 4"
        },
        why: "<code>i &lt;= 5</code> lets <code>i</code> be 0 to 5, which is six numbers. If you start at 0, use <code>&lt;</code>."
      }
    ],
    reminder: "loop",
    tryIt: [
      "Change <code>ForDemo</code> to <code>i &lt;= 5</code>. Guess how many lines print first.",
      "Change KEEP GOING to <code>i += 2</code>. Do the trace table before you run it.",
      "Rewrite <code>SumDemo</code> as a while loop, with comments showing START, STOP and KEEP GOING."
    ],
    challenge: {
      task: "<strong>Part A:</strong> Use a for loop to count down from 10 to 1, one number per line, then print <code>Liftoff!</code>. Write down your START, STOP and KEEP GOING before you code it.<br><br><strong>Part B (no code):</strong> For <code>for (int i = 2; i &lt; 10; i += 2)</code>, name the START, STOP and KEEP GOING, list the values of <code>i</code> the body runs with, and say how many times it runs.",
      expected: "Part A prints 10 down to 1 on separate lines, then <code>Liftoff!</code>",
      hint: "Part A: START at 10, keep going while <code>i</code> is at least 1, and make <code>i</code> smaller each time. Part B: write out each value of <code>i</code> and check STOP each time.",
      solution: {
        cls: "Countdown",
        code:
`public class Countdown {
    public static void main(String[] args) {
        // START: int i = 10   STOP: i >= 1   KEEP GOING: i--
        for (int i = 10; i >= 1; i--) {
            System.out.println(i);
        }
        System.out.println("Liftoff!");
    }
}`,
        output: "10\n9\n8\n7\n6\n5\n4\n3\n2\n1\nLiftoff!",
        explain: "<strong>Part A:</strong> START <code>int i = 10</code>, STOP <code>i &gt;= 1</code>, KEEP GOING <code>i--</code>. (<code>i &gt; 0</code> works too.) Be careful not to write <code>i &lt;= 1</code>. That's false right away, so only Liftoff! prints.<br><strong>Part B:</strong> START <code>int i = 2</code>, STOP <code>i &lt; 10</code>, KEEP GOING <code>i += 2</code>. It runs with 2, 4, 6 and 8, so <strong>4 times</strong>. At 10, <code>10 &lt; 10</code> is false."
      },
      extraCheck: { cls: "PartB", code: "public class PartB { public static void main(String[] a) { int n = 0; for (int i = 2; i < 10; i += 2) { System.out.print(i + \" \"); n++; } System.out.println(n); } }", output: "2 4 6 8 4" }
    },
    recap: [
      "I can point out START, STOP and KEEP GOING in <code>for (int i = 0; i &lt; 5; i++)</code>.",
      "I know START runs once, STOP is checked before every iteration, and KEEP GOING runs after each one.",
      "I can explain why <code>i &lt; 5</code> runs five times and <code>i &lt;= 5</code> runs six.",
      "I can trace a for loop, and I know when to use a for loop instead of a while loop."
    ]
  },

  {
    id: 9,
    title: "Switch Statements",
    short: "Run one block of code based on an exact value, using case, break and default.",
    intro: "A <code>switch</code> runs a different block of code depending on the <strong>exact value</strong> of a variable. It's a cleaner way to write a long else-if chain that keeps checking the same variable, like a menu choice in a game.",
    conceptHeading: "How a switch works",
    concept: [
      "Java looks at the value in the brackets and <strong>jumps</strong> to the <code>case</code> that matches it. It runs from there until it hits a <code>break</code>.",
      "If nothing matches, it goes to <code>default</code>, which is like the <code>else</code> at the end of an if chain.",
      "Watch out: <code>break</code> is the only thing that stops it. If you leave it out, Java keeps going into the next case. That's called <strong>fall-through</strong>."
    ],
    visual:
      '<p class="diagram-title">day is 3: jump to the match, run until break</p>' +
      '<div class="switch-vis">' +
        '<div class="sv-row skip"><code>case 1:</code><span>skipped</span></div>' +
        '<div class="sv-row skip"><code>case 2:</code><span>skipped</span></div>' +
        '<div class="sv-row hit"><code>case 3:</code><span>match, so jump here</span></div>' +
        '<div class="sv-row run"><code>&nbsp;&nbsp;System.out.println("Wednesday");</code><span>runs</span></div>' +
        '<div class="sv-row run"><code>&nbsp;&nbsp;break;</code><span>leaves the switch</span></div>' +
        '<div class="sv-row skip"><code>default:</code><span>never reached</span></div>' +
      '</div>',
    sections: [
      {
        heading: "switch or if?",
        html: "<p>A switch can only check for an <strong>exact match</strong>. It can't check a range.</p>" +
          "<ul>" +
          "<li><strong>Switch works for:</strong> a menu choice (1, 2 or 3), a day number (1 to 7), a letter grade like <code>'A'</code>.</li>" +
          "<li><strong>You need an if for:</strong> a mark of 80 or more, a temperature between 0 and 15, or anything with <code>&lt;</code> or <code>&gt;</code>.</li>" +
          "</ul>"
      }
    ],
    syntax:
`switch (variable) {
    case value1:
        // runs if variable == value1
        break;
    case value2:
        // runs if variable == value2
        break;
    default:
        // runs if nothing matched
}`,
    rules: [
      "Case labels end with a colon <code>:</code>, not a semicolon.",
      "Each case has to be a fixed value like <code>1</code>, <code>'A'</code> or <code>\"red\"</code>, not a variable or a condition.",
      "You can switch on an <code>int</code>, <code>char</code> or <code>String</code>, but not a <code>double</code> or <code>boolean</code>.",
      "<code>default</code> is optional, but it's a good idea to include it. It goes last and doesn't need a break."
    ],
    examples: [
      {
        title: "Day of the week",
        cls: "DayName",
        code:
`public class DayName {
    public static void main(String[] args) {
        int day = 3;
        switch (day) {
            case 1:
                System.out.println("Monday");
                break;
            case 2:
                System.out.println("Tuesday");
                break;
            case 3:
                System.out.println("Wednesday");
                break;
            default:
                System.out.println("Another day");
        }
    }
}`,
        output: "Wednesday",
        how: [
          "<code>day</code> is 3, so Java jumps straight to <code>case 3:</code>, prints <code>Wednesday</code>, and the <code>break</code> ends the switch.",
          "If <code>day</code> was 7, nothing would match, so <code>default</code> would run."
        ]
      },
      {
        title: "A game menu",
        cls: "MenuChoice",
        code:
`import java.util.Scanner;

public class MenuChoice {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        System.out.println("S) Start game");
        System.out.println("H) Help");
        System.out.println("Q) Quit");
        System.out.print("Choose: ");
        String choice = input.next();

        switch (choice) {
            case "S":
                System.out.println("Starting the game...");
                break;
            case "H":
                System.out.println("Use the arrow keys to move.");
                break;
            case "Q":
                System.out.println("Goodbye!");
                break;
            default:
                System.out.println("That isn't a menu option.");
        }
    }
}`,
        input: "Q\n",
        output: "S) Start game\nH) Help\nQ) Quit\nChoose: {{Q}}\nGoodbye!",
        cases: [
          { in: "S", out: "Starting the game..." },
          { in: "H", out: "Use the arrow keys to move." },
          { in: "Q", out: "Goodbye!" },
          { in: "q", out: "That isn't a menu option." }
        ],
        how: [
          "This one switches on a <code>String</code>. Typing <code>Q</code> matches <code>case \"Q\":</code>.",
          "Lowercase <code>q</code> doesn't match, because Strings are case-sensitive, so it goes to <code>default</code>. You could add <code>case \"q\":</code> right above <code>case \"Q\":</code> to fix that (see the Extra below)."
        ]
      }
    ],
    mistakes: [
      {
        intro: "Forgetting <code>break</code>. Here, <code>day</code> is 2.",
        bad: {
          cls: "FallThrough",
          code:
`public class FallThrough {
    public static void main(String[] args) {
        int day = 2;
        switch (day) {
            case 1:
                System.out.println("Monday");
            case 2:
                System.out.println("Tuesday");
            case 3:
                System.out.println("Wednesday");
            default:
                System.out.println("Another day");
        }
    }
}`,
          result: "Tuesday\nWednesday\nAnother day",
          resultLabel: "Output (should only be Tuesday)"
        },
        good: {
          cls: "FallThroughFixed",
          code:
`public class FallThroughFixed {
    public static void main(String[] args) {
        int day = 2;
        switch (day) {
            case 1:
                System.out.println("Monday");
                break;
            case 2:
                System.out.println("Tuesday");
                break;
            case 3:
                System.out.println("Wednesday");
                break;
            default:
                System.out.println("Another day");
        }
    }
}`,
          result: "Tuesday"
        },
        why: "Java jumps to case 2 like it should, but with no break it just keeps running everything below it. The next case label doesn't stop it. Only <code>break</code> does."
      },
      {
        intro: "Trying to use a switch for a range.",
        bad: {
          cls: "RangeSwitch",
          code:
`public class RangeSwitch {
    public static void main(String[] args) {
        int mark = 85;
        switch (mark) {
            case mark >= 80:
                System.out.println("Honours");
                break;
            default:
                System.out.println("Keep going");
        }
    }
}`,
          result: "error: incompatible types: boolean cannot be converted to int",
          resultLabel: "Compiler message"
        },
        good: {
          cls: "RangeIf",
          code:
`public class RangeIf {
    public static void main(String[] args) {
        int mark = 85;
        if (mark >= 80) {
            System.out.println("Honours");
        } else {
            System.out.println("Keep going");
        }
    }
}`,
          result: "Honours"
        },
        why: "Each case has to be one value that <code>mark</code> could equal, like <code>85</code>. <code>mark &gt;= 80</code> is true or false, which isn't a number. For ranges, use an if."
      }
    ],
    extra: [
      {
        title: "Grouping cases on purpose",
        html: "<p>Sometimes fall-through is actually useful. If you stack case labels with nothing in between, they share the same code:</p><pre class=\"mini\"><code>switch (day) {\n    case 6:\n    case 7:\n        System.out.println(\"Weekend\");\n        break;\n    default:\n        System.out.println(\"Weekday\");\n}</code></pre><p>Both 6 and 7 print <code>Weekend</code>.</p>"
      },
      {
        title: "Optional: the newer arrow syntax (Java 14 and later)",
        html: "<p>Newer versions of Java let you write <code>case 1 -&gt;</code> instead of <code>case 1:</code>. Arrow cases don't fall through, so you don't need <code>break</code>. You might see it online, but for this unit, use the colon-and-break version.</p><pre class=\"mini\"><code>switch (day) {\n    case 1 -&gt; System.out.println(\"Monday\");\n    case 2 -&gt; System.out.println(\"Tuesday\");\n    default -&gt; System.out.println(\"Another day\");\n}</code></pre>"
      }
    ],
    tryIt: [
      "Change <code>day</code> in <code>DayName</code> to 1, then 7. Guess the output first.",
      "Run <code>FallThrough</code> with <code>day = 1</code>. How many lines print?",
      "Add <code>case \"q\":</code> above <code>case \"Q\":</code> in <code>MenuChoice</code> so both letters work."
    ],
    challenge: {
      task: "Ask the user to pick a menu item from 1 to 3. Print <code>Pizza</code> for 1, <code>Pasta</code> for 2, <code>Salad</code> for 3, and <code>Invalid choice</code> for anything else.",
      expected: "2 &rarr; Pasta. 3 &rarr; Salad. 9 &rarr; Invalid choice. 0 &rarr; Invalid choice.",
      hint: "Read the choice with <code>nextInt()</code>. Give each item its own case with a <code>break</code>, and add a <code>default</code>.",
      solution: {
        cls: "FoodMenu",
        code:
`import java.util.Scanner;

public class FoodMenu {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        System.out.print("Choose 1, 2 or 3: ");
        int choice = input.nextInt();

        switch (choice) {
            case 1:
                System.out.println("Pizza");
                break;
            case 2:
                System.out.println("Pasta");
                break;
            case 3:
                System.out.println("Salad");
                break;
            default:
                System.out.println("Invalid choice");
        }
    }
}`,
        input: "2\n",
        output: "Choose 1, 2 or 3: {{2}}\nPasta",
        cases: [
          { in: "1", out: "Pizza" },
          { in: "2", out: "Pasta" },
          { in: "3", out: "Salad" },
          { in: "9", out: "Invalid choice" },
          { in: "0", out: "Invalid choice" }
        ],
        explain: "The breaks make sure only one thing prints. Without the break after Pasta, picking 2 would print Pasta and Salad. <code>default</code> handles every other number."
      }
    },
    recap: [
      "I know a switch jumps to the case that exactly matches.",
      "I know leaving out <code>break</code> causes fall-through.",
      "I know <code>default</code> runs when nothing matches.",
      "I know a switch works with <code>int</code>, <code>char</code> and <code>String</code>, but can't check ranges."
    ]
  },

  {
    id: 10,
    title: "Try/Catch",
    short: "Catch exceptions like bad input or dividing by zero so the program doesn't crash.",
    intro: "Some problems only happen while the program is running, like someone typing <code>abc</code> when you asked for their age. Usually that crashes the program. With <code>try</code>/<code>catch</code>, you can tell Java what to do instead.",
    conceptHeading: "Exceptions",
    concept: [
      "An <strong>exception</strong> is a runtime error, like the ones in Lesson 3. The two you'll see in this unit are <code>ArithmeticException</code> (dividing an <code>int</code> by zero) and <code>InputMismatchException</code> (Scanner wanted a number but got something else).",
      "If nothing catches the exception, the program stops at that line and prints an error. Nothing after it runs."
    ],
    examples: [
      {
        title: "First, what happens without try/catch",
        cls: "NoCatch",
        code:
`import java.util.Scanner;

public class NoCatch {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        System.out.print("Enter a whole number: ");
        int n = input.nextInt();
        System.out.println("You entered " + n);
        System.out.println("Program finished");
    }
}`,
        input: "abc\n",
        kind: "runtime-error",
        mustContain: ["Exception in thread \"main\" java.util.InputMismatchException", "at NoCatch.main(NoCatch.java:7)"],
        output: "Enter a whole number: {{abc}}\nException in thread \"main\" java.util.InputMismatchException\n\tat java.base/java.util.Scanner.throwFor(...)\n\t... (more \"at\" lines)\n\tat NoCatch.main(NoCatch.java:7)",
        outputLabel: "Output (the user typed abc)",
        isError: true,
        how: [
          "<code>nextInt()</code> can't turn <code>abc</code> into a number, so line 7 throws an exception and the program crashes. Lines 8 and 9 never run."
        ]
      }
    ],
    sections: [
      {
        heading: "What try/catch does",
        html: "<p>Put the code that might crash inside <code>try { }</code>, then add a <code>catch</code> for the exception you think could happen.</p>" +
          "<ul>" +
          "<li><strong>If nothing goes wrong,</strong> the whole try block runs and the catch is skipped.</li>" +
          "<li><strong>If there's an exception,</strong> Java stops the try block <strong>at that line</strong>, skips the rest of it, and runs the catch instead.</li>" +
          "</ul>" +
          "<p>Either way, the program keeps going after the try/catch.</p>" +
          '<div class="paths">' +
            '<div class="path ok"><p class="path-title">No exception</p><ol><li>try: line 1 runs</li><li>try: line 2 runs</li><li><s>catch</s> skipped</li><li>code after try/catch runs</li></ol></div>' +
            '<div class="path err"><p class="path-title">Exception on line 1 of the try</p><ol><li>try: line 1 <strong>throws</strong></li><li><s>try: line 2</s> skipped</li><li>catch runs</li><li>code after try/catch runs</li></ol></div>' +
          '</div>'
      }
    ],
    syntax:
`try {
    // code that might throw an exception
} catch (ExceptionType e) {
    // what to do if it does
}
// this runs either way (as long as the exception was caught)`,
    rules: [
      "The catch brackets say which exception to catch, like <code>ArithmeticException e</code>. The <code>e</code> is just a name.",
      "<code>InputMismatchException</code> needs <code>import java.util.InputMismatchException;</code> at the top. <code>ArithmeticException</code> doesn't need an import.",
      "Only put the risky line (and anything that depends on it) in the try.",
      "A variable made inside <code>try { }</code> only exists inside it. See the first mistake."
    ],
    examples2: [
      {
        title: "The same program, with try/catch",
        cls: "SafeInput",
        code:
`import java.util.InputMismatchException;
import java.util.Scanner;

public class SafeInput {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        System.out.print("Enter a whole number: ");
        try {
            int n = input.nextInt();
            System.out.println("You entered " + n);
        } catch (InputMismatchException e) {
            System.out.println("That was not a whole number.");
        }
        System.out.println("Program finished");
    }
}`,
        input: "abc\n",
        output: "Enter a whole number: {{abc}}\nThat was not a whole number.\nProgram finished",
        cases: [
          { in: "16", out: "You entered 16\nProgram finished" },
          { in: "abc", out: "That was not a whole number.\nProgram finished" }
        ],
        how: [
          "With <code>abc</code>, line 9 throws, so line 10 gets skipped and the catch runs instead.",
          "With <code>16</code>, the try runs normally and the catch gets skipped.",
          "Either way, <code>Program finished</code> prints, because it's after the try/catch."
        ]
      },
      {
        title: "Catching a divide by zero",
        cls: "SafeDivide",
        code:
`public class SafeDivide {
    public static void main(String[] args) {
        int pizzas = 10;
        int people = 0;
        try {
            int each = pizzas / people;
            System.out.println("Each person gets " + each);
        } catch (ArithmeticException e) {
            System.out.println("Cannot divide by zero.");
        }
        System.out.println("Program finished");
    }
}`,
        output: "Cannot divide by zero.\nProgram finished",
        how: [
          "<code>10 / 0</code> throws an <code>ArithmeticException</code>, so line 7 is skipped and the catch runs. Without the try/catch, it would crash like the Lesson 3 example."
        ]
      }
    ],
    sections2: [
      {
        heading: "What try/catch can't fix",
        html: "<p>It only helps with <strong>runtime exceptions</strong>, and only the types you actually catch.</p>" +
          '<div class="table-scroll"><table class="data"><thead><tr><th>Problem</th><th>Does try/catch help?</th><th>Why</th></tr></thead><tbody>' +
          "<tr><td>Syntax error (missing <code>;</code>)</td><td>No</td><td>The program never compiles, so the try/catch never runs.</td></tr>" +
          "<tr><td>Logic error (wrong formula)</td><td>No</td><td>There's no exception. You just get the wrong answer.</td></tr>" +
          "<tr><td>A <em>different</em> exception than the one you catch</td><td>No</td><td><code>catch (ArithmeticException e)</code> won't catch an <code>InputMismatchException</code>, so it still crashes. See the second mistake.</td></tr>" +
          "<tr><td>The exception you catch</td><td>Yes</td><td>The catch block runs instead of the program crashing.</td></tr>" +
          "</tbody></table></div>" +
          "<p>Also, catching an exception doesn't fix the bad value. If the user typed <code>abc</code>, you still don't have a number. Your catch block has to decide what happens next.</p>"
      }
    ],
    mistakes: [
      {
        intro: "Making a variable inside <code>try</code> and using it after.",
        bad: {
          cls: "ScopeMistake",
          code:
`import java.util.InputMismatchException;
import java.util.Scanner;

public class ScopeMistake {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        try {
            int n = input.nextInt();
        } catch (InputMismatchException e) {
            System.out.println("Not a number.");
        }
        System.out.println("You entered " + n);
    }
}`,
          result: "error: cannot find symbol\n  symbol:   variable n",
          resultLabel: "Compiler message"
        },
        good: {
          cls: "ScopeFixed",
          code:
`import java.util.InputMismatchException;
import java.util.Scanner;

public class ScopeFixed {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        int n = 0;
        try {
            n = input.nextInt();
        } catch (InputMismatchException e) {
            System.out.println("Not a number.");
        }
        System.out.println("You entered " + n);
    }
}`,
          result: "When the user types 5:\nYou entered 5\n\nWhen the user types abc:\nNot a number.\nYou entered 0",
          resultLabel: "Output for two different runs",
          runs: [
            { in: "5", out: "You entered 5" },
            { in: "abc", out: "Not a number.\nYou entered 0" }
          ]
        },
        why: "<code>n</code> only exists inside the braces it was made in, so the last line can't see it. Make it before the try instead. Setting it to 0 means it still has a value if the exception happens."
      },
      {
        intro: "Catching the wrong kind of exception.",
        bad: {
          cls: "WrongCatch",
          code:
`import java.util.Scanner;

public class WrongCatch {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        System.out.print("Enter a whole number: ");
        try {
            int n = input.nextInt();
            System.out.println("You entered " + n);
        } catch (ArithmeticException e) {
            System.out.println("That was not a whole number.");
        }
        System.out.println("Program finished");
    }
}`,
          input: "abc\n",
          kind: "runtime-error",
          mustContain: ["Exception in thread \"main\" java.util.InputMismatchException", "at WrongCatch.main(WrongCatch.java:8)"],
          result: "Enter a whole number: {{abc}}\nException in thread \"main\" java.util.InputMismatchException\n\t... (\"at\" lines)\n\tat WrongCatch.main(WrongCatch.java:8)",
          resultLabel: "Output (the user typed abc): it still crashes"
        },
        good: {
          cls: "RightCatch",
          code:
`import java.util.InputMismatchException;
import java.util.Scanner;

public class RightCatch {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        System.out.print("Enter a whole number: ");
        try {
            int n = input.nextInt();
            System.out.println("You entered " + n);
        } catch (InputMismatchException e) {
            System.out.println("That was not a whole number.");
        }
        System.out.println("Program finished");
    }
}`,
          input: "abc\n",
          result: "Enter a whole number: {{abc}}\nThat was not a whole number.\nProgram finished",
          resultLabel: "Output (the user typed abc)"
        },
        why: "Typing <code>abc</code> causes an <code>InputMismatchException</code>, but this catch only handles <code>ArithmeticException</code>. Since they don't match, it crashes like there's no try/catch at all."
      }
    ],
    tryIt: [
      "Run <code>SafeInput</code> with <code>16</code>, then with <code>abc</code>. Which lines ran each time?",
      "Change <code>people</code> to 4 in <code>SafeDivide</code>. Does each person get 2 or 2.5? (Think back to Lesson 2.)",
      "Type 3.5 into <code>SafeInput</code>. Which part runs?"
    ],
    challenge: {
      task: "Ask for two whole numbers and divide the first by the second. Use try/catch so that dividing by 0 prints <code>Cannot divide by zero.</code> instead of crashing. Print <code>Program finished</code> at the end either way.",
      expected: "10 and 2 &rarr; <code>Answer: 5</code> then <code>Program finished</code>. 10 and 0 &rarr; <code>Cannot divide by zero.</code> then <code>Program finished</code>.",
      hint: "Read both numbers first. Only the division and the line that prints the answer need to be in the try. Which exception happens when you divide by zero?",
      solution: {
        cls: "Divide",
        code:
`import java.util.Scanner;

public class Divide {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        System.out.print("First number: ");
        int first = input.nextInt();
        System.out.print("Second number: ");
        int second = input.nextInt();

        try {
            int answer = first / second;
            System.out.println("Answer: " + answer);
        } catch (ArithmeticException e) {
            System.out.println("Cannot divide by zero.");
        }
        System.out.println("Program finished");
    }
}`,
        input: "10\n0\n",
        output: "First number: {{10}}\nSecond number: {{0}}\nCannot divide by zero.\nProgram finished",
        cases: [
          { in: "10\n2", out: "Answer: 5\nProgram finished" },
          { in: "10\n0", out: "Cannot divide by zero.\nProgram finished" },
          { in: "7\n2", out: "Answer: 3\nProgram finished" }
        ],
        explain: "Only the division can throw an <code>ArithmeticException</code>, so it goes in the try along with the print that uses the answer. This doesn't handle someone typing letters, since that would happen outside the try. Handling that too is a good extra challenge."
      }
    },
    recap: [
      "I can explain what an exception is.",
      "I can write a try/catch with the right exception type.",
      "I know that when a line in the try throws, the rest of the try is skipped and the catch runs.",
      "I know try/catch can't fix syntax errors, logic errors, or exceptions I didn't catch."
    ]
  }
];
