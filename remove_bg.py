from PIL import Image
import os

# Create output directory
os.makedirs('assets/images', exist_ok=True)

# Open the image and convert to RGBA
img = Image.open('IMG-20260708-WA0082.jpg').convert('RGBA')
pixels = img.load()
width, height = img.size

# Threshold for white/near-white detection
threshold = 215

# Iterate through all pixels
for y in range(height):
    for x in range(width):
        r, g, b, a = pixels[x, y]
        # If pixel is white or near-white, make it transparent
        if r > threshold and g > threshold and b > threshold:
            pixels[x, y] = (r, g, b, 0)

# Save as PNG with transparency
img.save('assets/images/logo.png', 'PNG')
print(f'Logo saved with transparent background!')
print(f'Size: {img.size}')
print(f'Saved to: assets/images/logo.png')
