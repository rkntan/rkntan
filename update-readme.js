const fs = require('fs');

// Function to get current movie frame from a counter file
function getCurrentMovieFrame() {
  const counterFile = 'frame-counter.txt';
  let frameNumber = 1;

  // Read current frame number from file, or start at 1
  if (fs.existsSync(counterFile)) {
    try {
      frameNumber = parseInt(fs.readFileSync(counterFile, 'utf8').trim()) || 1;
    } catch (error) {
      frameNumber = 1;
    }
  }

  // The Godfather has frames from 1 to 9773
  const totalFrames = 9773;

  // Wrap around if we exceed total frames
  if (frameNumber > totalFrames) {
    frameNumber = 1;
  }

  // Save next frame number for next run
  fs.writeFileSync(counterFile, (frameNumber + 1).toString(), 'utf8');

  return {
    frameNumber,
    totalFrames,
    imageUrl: `https://res.cloudinary.com/dhfdso9tc/image/upload/v1541253320/Godfather/Godfather_${frameNumber}.jpg`
  };
}

// Function to generate simple SVG with movie frame
function generateMovieFrame(movieFrame) {
  // Calculate expected finish date (9773 days from start)
  const startDate = new Date('2024-01-01'); // Assuming we started Jan 1, 2024
  const finishDate = new Date(startDate);
  finishDate.setDate(finishDate.getDate() + 9773);

  // Calculate remaining time (24 frames per day instead of 24 fps)
  const currentDate = new Date();
  const remainingFrames = movieFrame.totalFrames - movieFrame.frameNumber;
  const remainingDays = Math.ceil(remainingFrames / 24); // 24 frames per day
  const expectedFinishDate = new Date(currentDate);
  expectedFinishDate.setDate(expectedFinishDate.getDate() + remainingDays);

  const svgTemplate = `
<svg viewBox="0 0 800 460" width="800" height="460" xmlns="http://www.w3.org/2000/svg">
  <!-- Movie frame background -->
  <image href="${movieFrame.imageUrl}" x="0" y="0" width="800" height="460" preserveAspectRatio="xMidYMid slice"/>
  
  <!-- Main overlay for movie info -->
  <rect x="0" y="360" width="800" height="100" fill="#000" opacity="0.85"/>
  
  <!-- Movie title -->
  <text x="20" y="385" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#fff">
    THE GODFATHER
  </text>
  
  <!-- Frame info -->
  <text x="20" y="405" font-family="Arial, sans-serif" font-size="14" fill="#ccc">
    Frame ${movieFrame.frameNumber} of ${movieFrame.totalFrames} (${Math.round((movieFrame.frameNumber / movieFrame.totalFrames) * 100)}%)
  </text>
  
  <!-- Progress bar -->
  <rect x="20" y="415" width="760" height="6" fill="#333" rx="3"/>
  <rect x="20" y="415" width="${(movieFrame.frameNumber / movieFrame.totalFrames) * 760}" height="6" fill="#fff" rx="3"/>
  
  <!-- Cool explanation text -->
  <text x="20" y="435" font-family="Arial, sans-serif" font-size="11" fill="#aaa">
    🎬 Slow Movie Player: 24 frames per day instead of 24 fps - one frame every hour via GitHub Actions
  </text>
  
  <text x="20" y="450" font-family="Arial, sans-serif" font-size="11" fill="#aaa">
    📅 Expected completion: ${expectedFinishDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} | ${remainingFrames} frames remaining | ~${remainingDays} days left
  </text>
  
  <text x="600" y="435" font-family="Arial, sans-serif" font-size="10" fill="#888">
    Frames from everysingleframe.com
  </text>
  
</svg>
`;

  return svgTemplate;
}

// Function to save SVG content to a file
function saveSVGToFile(svgContent, filename) {
  fs.writeFileSync(filename, svgContent, 'utf8');
  console.log(`Movie frame SVG saved as ${filename}`);
}

// Get current movie frame and generate SVG
const movieFrame = getCurrentMovieFrame();
const svgContent = generateMovieFrame(movieFrame);

// Save the SVG file
const svgFilename = 'card.svg';
saveSVGToFile(svgContent, svgFilename);

// Log movie progress info
console.log(`Current frame: ${movieFrame.frameNumber}/${movieFrame.totalFrames} (${Math.round((movieFrame.frameNumber / movieFrame.totalFrames) * 100)}%)`);
console.log(`Frame URL: ${movieFrame.imageUrl}`);
