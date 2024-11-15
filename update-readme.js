const fs = require('fs');

// Profile data
const profileData = {
  name: "Erkan Tan",
  occupation: "Embedded Systems Engineer",
  github: "https://github.com/erkan",
  tagline: "Innovating Embedded Systems for the Future",
  birthDate: "1994-05-20", // Use the format YYYY-MM-DD
};

// Function to calculate year progress
function calculateYearProgress() {
  const currentDate = new Date();
  const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
  const endOfYear = new Date(currentDate.getFullYear(), 11, 31);
  const progress = (currentDate - startOfYear) / (endOfYear - startOfYear) * 100;
  return Math.round(progress); // Return an integer value (percentage)
}

// Function to calculate precise age (in years and days)
function calculateAgeWithDays(birthDate) {
  const birth = new Date(birthDate);
  const today = new Date();

  // Calculate years
  let years = today.getFullYear() - birth.getFullYear();
  const isBeforeBirthday =
    today.getMonth() < birth.getMonth() ||
    (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate());

  if (isBeforeBirthday) years -= 1;

  // Calculate days
  const lastBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
  const daysSinceLastBirthday = Math.floor((today - lastBirthday) / (1000 * 60 * 60 * 24));
  const daysInYear = (isBeforeBirthday ? 365 : 366) + (isLeapYear(today.getFullYear()) ? 1 : 0);
  const days = daysSinceLastBirthday >= 0 ? daysSinceLastBirthday : daysInYear + daysSinceLastBirthday;

  return { years, days };
}

// Helper function to check for leap year
function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

// Function to generate the SVG
function generateBusinessCard(profile, yearProgress, age) {
  const svgTemplate = `
<svg fill="none" viewBox="0 0 800 460" width="800" height="460" xmlns="http://www.w3.org/2000/svg">
  <foreignObject width="100%" height="100%">
    <div xmlns="http://www.w3.org/1999/xhtml">
      <style>
        * {
          margin: 0;
          padding: 0;
          color: inherit;
          text-decoration: none;
          list-style: none;
          outline: none;
          box-sizing: border-box;
          font-family: "Courier New", monospace;
        }

        .body {
          --color-main: #00ff99; /* Neon green */
          --color-primary: #9900cc; /* Purple */
          --color-secondary: #00ccff; /* Neon blue */
          --color-background: #001a1a; /* Dark background */
          --color-link: #00ff99; /* Neon green */
          --color-link-active: #cc00ff; /* Neon purple */
          --color-accent: #ff00cc; /* Accent neon pink */

          height: 460px;
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          background-color: var(--color-background);
          border: 5px solid var(--color-primary);
        }

        /* Left Column: Menu */
        .menu {
          width: 100px;
          background-color: var(--color-secondary);
          padding: 5px;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          box-shadow: 0 0 15px var(--color-primary);
        }

        .menu h1 {
          font-size: 1.5rem;
          color: var(--color-main);
          text-shadow: 0 0 15px var(--color-primary);
          margin-bottom: 10px;
          text-align: center;

        }

        .menu ul {
          padding-left: 10px;
        }

        .menu ul li {
          font-size: 1rem;
          font-weight: 600;
          color: var(--color-link);
          margin: 10px 0;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .menu ul li:hover {
          color: var(--color-link-active);
          text-shadow: 0 0 15px var(--color-link-active), 0 0 30px var(--color-link-active);
          transform: scale(1.05);
        }

        .menu ul li:active {
          color: var(--color-accent);
          text-shadow: 0 0 15px var(--color-accent);
        }

        /* Main Content Area */
        .content {
          flex-grow: 1;
          background-color: var(--color-background);
          padding: 20px;
          color: var(--color-link);
          text-align: center;
        }

        .content h2 {
          font-size: 1.7rem;
          color: var(--color-primary);
          text-shadow: 0 0 15px var(--color-primary);
        }

        .content p {
          font-size: 1rem;
          margin-top: 10px;
        }

        .content a {
          color: var(--color-link);
          text-decoration: underline;
          font-weight: bold;
        }

        .content a:hover {
          color: var(--color-link-active);
          text-shadow: 0 0 15px var(--color-link-active), 0 0 30px var(--color-link-active);
          transform: scale(1.1);
        }

        /* Rainbow Animation */
        .rainbow-container {
          margin-top: 100px;
          
        }

        .container {
          font-family: system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          background-color: #001a1a;
          color: rgba(255,255,255,.75);
          text-align: center;
          font-size: 24px;
        }

        .c-rainbow {
          counter-reset: rainbow;
          display: block;
          list-style: none;
          padding: 0;
          margin: 0;
          line-height: 2px;
        }

        .c-rainbow__layer {
          --text-color: #ffffff;
          counter-increment: rainbow;
          font-size: 3rem;
          font-weight: 600;
          color: var(--text-color);
          text-shadow: -1px -1px 0 rgba(0, 0, 0, 0.2), 1px -1px 0 rgba(0, 0, 0, 0.2), -1px 1px 0 rgba(0, 0, 0, 0.2), 1px 1px 0 rgba(0, 0, 0, 0.2);
          animation: rainbow 1.5s ease-in-out infinite;
        }

        .c-rainbow__layer:nth-child(1) {
          animation-delay: calc(1 / 10 * 1s);
          margin-left: 36px;
        }
        .c-rainbow__layer:nth-child(2) {
          animation-delay: calc(2 / 10 * 1s);
          margin-left: 30px;
        }
        .c-rainbow__layer:nth-child(3) {
          animation-delay: calc(3 / 10 * 1s);
          margin-left: 24px;
        }
        .c-rainbow__layer:nth-child(4) {
          animation-delay: calc(4 / 10 * 1s);
          margin-left: 18px;
        }
        .c-rainbow__layer:nth-child(5) {
          animation-delay: calc(5 / 10 * 1s);
          margin-left: 12px;
        }
        .c-rainbow__layer:nth-child(6) {
          animation-delay: calc(6 / 10 * 1s);
          margin-left: 6px;
        }
        .c-rainbow__layer:nth-child(7) {
          animation-delay: calc(7 / 10 * 1s);
        }

        @keyframes rainbow {
          0%, 100% {
            transform: translatey(0);
          }
          50% {
            transform: translatey(-10px);
          }
        }

        .c-rainbow__layer--yellow {
          --text-color: #DEBF40;
        }
        .c-rainbow__layer--green {
          --text-color: #5ACB3C;
        }
        .c-rainbow__layer--blue {
          --text-color: #44A3F7;
        }
        .c-rainbow__layer--violet {
          --text-color: #CF52EB;
        }
        .c-rainbow__layer--red {
          --text-color: #D14B3D;
        }
        .c-rainbow__layer--orange {
          --text-color: #D49C3D;
        }
        .c-rainbow__layer--white {
          --text-color: #ffffff;
        }

      </style>

      <div class="body">
        <!-- Left Column: Menu -->
        <div class="menu">
          <h1> menu</h1>
          <ul>
            <li>home</li>
            <li>about</li>
            <li>projects</li>
            <li>contact</li>
            <li><a href="mailto:rkntanp@gmail.com">Email</a></li>
          </ul>
        </div>

        <!-- Main Content Area -->
        <div class="content">
        <div class="container">
          <ul class="c-rainbow">
            <li class="c-rainbow__layer c-rainbow__layer--yellow">welcome</li>
            <li class="c-rainbow__layer c-rainbow__layer--green">welcome</li>
            <li class="c-rainbow__layer c-rainbow__layer--blue">welcome</li>
            <li class="c-rainbow__layer c-rainbow__layer--violet">welcome</li>
            <li class="c-rainbow__layer c-rainbow__layer--red">welcome</li>
            <li class="c-rainbow__layer c-rainbow__layer--orange">welcome</li>
            <li class="c-rainbow__layer c-rainbow__layer--white">welcome</li>
          </ul>
        </div>
            <h2>Welcome to the my Web!</h2>
            <p>embedded engineer | 🎂 Age: ${age.years} years and ${age.days} days.</p>
            <p>Year Progress: ${yearProgress}%</p>
<p style="text-align: left;font-size:55%;">
  <pre>
void focus() {
    printf("Focus Areas:\\n");
    printf(" - Arch Linux: Stripping down to the essentials");
    printf(" - Memory management: Precision, nothing leaks\\n");
    printf(" - Polish: Words are data, decode them\\n\\n");
}

// Hobbies, still calculated
void hobbies() {
    printf("Hobbies:\\n");
    printf(" - [REDACTED]: You are not authorized to know\\n");
    printf(" - Key: 0x%X-%s-%s-%s-%s\\n", 0xDEADBEEF, "****", "****", "****", "****");
}
  </pre>
</p>

            <p><a href="https://github.com/rkntan" target="_blank">visit my GitHub</a></p>
            <p><pre> 
 ____ ____ ____ ____ ____     ____ ____ ____
||e |||r |||k |||a |||n ||   ||T |||a |||n ||
||__|||__|||__|||__|||__||   ||__|||__|||__||
|/__\|/__\|/__\|/__\|/__\|   |/__\|/__\|/__\|
            </pre></p>
            <p style="font-size:50%;"> 2024 | Last updated: November 2024 | All rights reserved.</p>
        </div>
      </div>
    </div>
  </foreignObject>
</svg>
`;

  return svgTemplate;
}

// Function to save SVG content to a file
function saveSVGToFile(svgContent, filename) {
  fs.writeFileSync(filename, svgContent, 'utf8');
  console.log(`SVG saved as ${filename}`);
}

// Calculate year progress and precise age
const yearProgress = calculateYearProgress();
const age = calculateAgeWithDays(profileData.birthDate);

// Generate the SVG
const svgContent = generateBusinessCard(profileData, yearProgress, age);

// Save the SVG file
const svgFilename = 'card.svg';
saveSVGToFile(svgContent, svgFilename);
