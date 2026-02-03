# Vista - Modern Travel Website

A stunning, responsive travel website with advanced animations and modern effects. Built with HTML, CSS, and JavaScript.

![Vista Travel Website](https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&h=600&fit=crop)

## Features

- 🎨 **Modern Design** - Beautiful gradient effects and glassmorphism
- ✨ **Advanced Animations** - Scroll-triggered animations, hover effects, micro-interactions
- 📱 **Fully Responsive** - Works perfectly on all devices
- 🗺️ **Parallax Effects** - Multi-layer mountain parallax background
- 🌟 **Interactive Elements** - Card hover effects, button animations, smooth transitions
- 🚀 **GitHub Pages Ready** - Easy deployment to GitHub Pages

## Quick Start

### Local Development

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/vista.git
cd vista

# Install dependencies (optional, for local server)
npm install

# Start local server
npm start
```

### Deploy to GitHub Pages

#### Method 1: Automatic Deployment (Recommended)

1. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/vista.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Navigate to **Settings** → **Pages**
   - Under **Source**, select **main** branch
   - Click **Save**
   - Your site will be live at `https://YOUR_USERNAME.github.io/vista/`

#### Method 2: Using gh-pages CLI

```bash
# Install gh-pages globally
npm install -g gh-pages

# Deploy
npm run deploy
```

#### Method 3: Using GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./
```

## Project Structure

```
vista/
├── index.html      # Main HTML file
├── style.css       # All styles (consolidated from 2 files)
├── script.js       # JavaScript functionality
├── .nojekyll       # GitHub Pages configuration
├── package.json    # NPM configuration
└── README.md       # This file
```

## Customization

### Colors

Edit CSS variables in `style.css`:

```css
:root {
    --color-primary: #e94560;
    --color-secondary: #f39422;
    --color-accent: #533483;
    --color-dark: #1a1a2e;
    --color-darker: #0f0f1a;
    --color-light: #ffffff;
}
```

### Animations

All animations are defined in the **Advanced Animations** section of `style.css`. Customize timing, delays, and effects as needed.

### Sections

- Hero Section - Parallax mountain background with animations
- Features - Grid of feature cards with hover effects
- Destinations - Filterable destination cards
- Adventures - Showcase of adventure types
- Gallery - Masonry gallery with hover effects
- Contact - Contact form with validation

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## Technologies Used

- HTML5
- CSS3 (Custom Properties, Flexbox, Grid, Animations)
- JavaScript (Vanilla)
- Font Awesome (Icons)
- Google Fonts (Poppins)

## License

MIT License - feel free to use for personal or commercial projects.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Support

If you found this project helpful, please give it a ⭐ star!

---

Built with ❤️ by Vista Team
