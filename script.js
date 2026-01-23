// Filter state management
let filters = {
  winterMode: false,
  sundayOnly: false
};

// Initialize filters from localStorage
function loadFilters() {
  const saved = localStorage.getItem('filters');
  if (saved) {
    filters = JSON.parse(saved);
  }
  updateFilterUI();
}

// Save filters to localStorage
function saveFilters() {
  localStorage.setItem('filters', JSON.stringify(filters));
  updateFilterUI();
}

// Update filter checkboxes
function updateFilterUI() {
  const winterCheckbox = document.getElementById('winter-mode');
  const sundayCheckbox = document.getElementById('sunday-only');
  
  if (winterCheckbox) {
    winterCheckbox.checked = filters.winterMode;
  }
  if (sundayCheckbox) {
    sundayCheckbox.checked = filters.sundayOnly;
  }
}

// Toggle winter mode
function toggleWinterMode() {
  filters.winterMode = !filters.winterMode;
  saveFilters();
  if (typeof renderActivities === 'function') {
    renderActivities();
  }
}

// Toggle Sunday filter
function toggleSundayOnly() {
  filters.sundayOnly = !filters.sundayOnly;
  saveFilters();
  if (typeof renderActivities === 'function') {
    renderActivities();
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  loadFilters();
  
  // Attach event listeners
  const winterCheckbox = document.getElementById('winter-mode');
  const sundayCheckbox = document.getElementById('sunday-only');
  
  if (winterCheckbox) {
    winterCheckbox.addEventListener('change', toggleWinterMode);
  }
  if (sundayCheckbox) {
    sundayCheckbox.addEventListener('change', toggleSundayOnly);
  }
});
