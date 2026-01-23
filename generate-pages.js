// Node.js script to generate all activity detail pages
const fs = require('fs');
const path = require('path');

// Read the JSON data file from parent directory
const jsonPath = path.join(__dirname, '..', 'data', 'directory.json');
const activities = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

// Read template
const templatePath = path.join(__dirname, 'activity-detail-template.html');
const template = fs.readFileSync(templatePath, 'utf8');

// Create category directories and generate pages
activities.forEach(activity => {
    const categoryDir = path.join(__dirname, activity.category);
    
    // Create category directory if it doesn't exist
    if (!fs.existsSync(categoryDir)) {
        fs.mkdirSync(categoryDir, { recursive: true });
    }
    
    // Generate the HTML file for this activity
    const htmlPath = path.join(categoryDir, `${activity.id}.html`);
    
    // The template uses JavaScript to render, so we just copy it
    // The JavaScript will handle rendering based on the filename
    fs.writeFileSync(htmlPath, template);
    
    console.log(`Generated: ${activity.category}/${activity.id}.html`);
});

console.log(`\nGenerated ${activities.length} activity detail pages!`);
