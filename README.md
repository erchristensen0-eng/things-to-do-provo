# Things To Do in Provo, Utah - HTML Version

This is a pure HTML/JavaScript version of the Provo directory website that can be opened directly in your browser without any build process or server.

## How to Use

1. **Open in Browser**: Simply double-click `index.html` in Finder, or right-click and select "Open With" → your web browser (Safari, Chrome, Firefox, etc.)

2. **Navigate**: 
   - Click on category links (Nature, Culture, Entertainment, Culinary)
   - Click on any activity card to view details
   - Use the Winter Mode and Sunday Filter toggles in the header

## File Structure

```
html/
├── index.html                    # Home page
├── nature.html                   # Nature category page
├── culture.html                  # Culture category page
├── entertainment.html            # Entertainment category page
├── culinary.html                 # Culinary category page
├── data.js                       # Activities data
├── script.js                     # Filter functionality
├── nature/                       # Nature activity detail pages
│   ├── y-mountain-trail.html
│   ├── bridal-veil-falls.html
│   └── ...
├── culture/                      # Culture activity detail pages
├── entertainment/                 # Entertainment activity detail pages
└── culinary/                     # Culinary activity detail pages
```

## Features

- ✅ **No Server Required**: Open HTML files directly in your browser
- ✅ **Winter Mode Filter**: Toggle to show only winter-accessible activities
- ✅ **Sunday Filter**: Toggle to show only activities open on Sundays
- ✅ **Dry Venue Badge**: Special indicator for alcohol-free venues
- ✅ **Responsive Design**: Works on desktop, tablet, and mobile
- ✅ **SEO Optimized**: Includes JSON-LD schema markup
- ✅ **Filter Persistence**: Filter preferences saved in browser localStorage

## Adding New Activities

1. Edit `data.js` and add a new activity object to the `activities` array
2. Run `node generate-pages.js` to create the detail page (or manually copy `activity-detail-template.html` to the appropriate category folder)
3. Refresh your browser

## Notes

- Uses Tailwind CSS via CDN (requires internet connection for styling)
- Filter state is saved in browser localStorage
- All pages are static HTML files - no build process needed!

## Browser Compatibility

Works in all modern browsers:
- Chrome/Edge (recommended)
- Safari
- Firefox
- Opera
