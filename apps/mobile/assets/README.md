# Madni Travel App Assets

## Required Asset Files

### icon.png (1024x1024)
App icon for iOS and Android. Design:
- Emerald green (#059669) circular background
- White airplane icon centered
- Gold (#D4AF37) "MT" monogram overlay

### splash.png (1242x2436)
Splash screen for iOS and Android. Design:
- Solid emerald green (#059669) background
- White Madni Travel logo centered
- "Your Journey Begins Here" tagline in white
- Gold accent line below tagline

### adaptive-icon.png (1024x1024)
Android adaptive icon foreground. Design:
- Emerald green (#059669) circular background
- White airplane icon centered with "MT" text
- Transparent corners for adaptive masking

## Quick Generation
Use the following command to generate placeholder images, or replace with actual designed assets:

```bash
# Placeholder generation (install imagemagick first)
convert -size 1024x1024 xc:#059669 -pointsize 60 -fill white -gravity center -annotate +0+0 "MT" assets/icon.png
convert -size 1242x2436 xc:#059669 -pointsize 80 -fill white -gravity center -annotate +0+0 "Madni Travel" assets/splash.png
convert -size 1024x1024 xc:#059669 -pointsize 60 -fill white -gravity center -annotate +0+0 "MT" assets/adaptive-icon.png
```
