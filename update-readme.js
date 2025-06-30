const fs = require('fs');
const https = require('https');
const path = require('path');

// Function to convert image to base64
function imageToBase64(imagePath) {
  try {
    const imageBuffer = fs.readFileSync(imagePath);
    const base64String = imageBuffer.toString('base64');
    return `data:image/jpeg;base64,${base64String}`;
  } catch (error) {
    console.error('Error converting image to base64:', error.message);
    return null;
  }
}

// Function to download image from URL
function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filename);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve(filename);
      });
    }).on('error', (err) => {
      fs.unlink(filename, () => { }); // Delete the file on error
      reject(err);
    });
  });
}

// Function to get current movie frame from a counter file
async function getCurrentMovieFrame() {
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

  // Download the current frame image
  const imageUrl = `https://res.cloudinary.com/dhfdso9tc/image/upload/v1541253320/Godfather/Godfather_${frameNumber}.jpg`;
  const localImagePath = `current-frame.jpg`;
  let base64Image = null;

  try {
    await downloadImage(imageUrl, localImagePath);
    console.log(`Downloaded frame ${frameNumber} to ${localImagePath}`);

    // Convert to base64 for embedding in SVG
    base64Image = imageToBase64(localImagePath);
    if (base64Image) {
      console.log(`Converted frame ${frameNumber} to base64`);
    }
  } catch (error) {
    console.error(`Failed to download frame ${frameNumber}:`, error.message);
  }

  // Save next frame number for next run
  fs.writeFileSync(counterFile, (frameNumber + 1).toString(), 'utf8');

  return {
    frameNumber,
    totalFrames,
    imageUrl,
    localImagePath,
    base64Image
  };
}

// Function to generate simple SVG with movie frame
function generateMovieFrame(movieFrame) {
  // Calculate expected finish date (9773 days from start)
  const startDate = new Date('2024-06-25');
  const finishDate = new Date(startDate);
  finishDate.setDate(finishDate.getDate() + 9773);

  // Calculate remaining time (24 frames per day instead of 24 fps)
  const currentDate = new Date();
  const remainingFrames = movieFrame.totalFrames - movieFrame.frameNumber;
  const remainingDays = Math.ceil(remainingFrames / 24); // 24 frames per day
  const expectedFinishDate = new Date(currentDate);
  expectedFinishDate.setDate(expectedFinishDate.getDate() + remainingDays);

  const svgTemplate = `
<svg viewBox="0 0 800 460" width="800" height="460" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <!-- Movie frame background -->
  <image xlink:href="${movieFrame.base64Image || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQ2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0iI2ZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkZyYW1lIE5vdCBBdmFpbGFibGU8L3RleHQ+PC9zdmc+'}" x="0" y="0" width="800" height="460" preserveAspectRatio="xMidYMid slice"/>
  
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
  
  <!-- Author: ErkanTan - https://github.com/rkntan -->
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
async function main() {
  const movieFrame = await getCurrentMovieFrame();
  const svgContent = generateMovieFrame(movieFrame);

  // Save the SVG file
  const svgFilename = 'card.svg';
  saveSVGToFile(svgContent, svgFilename);

  // Log movie progress info
  console.log(`Current frame: ${movieFrame.frameNumber}/${movieFrame.totalFrames} (${Math.round((movieFrame.frameNumber / movieFrame.totalFrames) * 100)}%)`);
  console.log(`Frame URL: ${movieFrame.imageUrl}`);
  console.log(`Local image: ${movieFrame.localImagePath}`);
}

// Run the main function
main().catch(console.error);
