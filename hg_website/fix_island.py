import re
import sys

with open('c:\\Users\\dhrav\\Downloads\\saveweb2zip-com-www-sarvam-ai (1)\\sarvam-ai-website\\index.html', 'r', encoding='utf-8') as f:
    html = f.read()

island_regex = re.compile(r'<astro-island uid="1XSk2Y".*?</astro-island>', re.DOTALL)
match = island_regex.search(html)

if match:
    island = match.group(0)
    print('Found island of length', len(island))
    
    # We extract the content inside the astro-island tag
    content_regex = re.compile(r'<astro-island uid="1XSk2Y"[^>]*>(.*?)<!--astro:end--></astro-island>', re.DOTALL)
    content_match = content_regex.search(island)
    
    if content_match:
        inner = content_match.group(1)
        # Remove the opacity:0 style on the logo so it shows
        inner = inner.replace('style="opacity:0;filter:blur(5px) brightness(2);transform:scale(0.5) rotate(90deg)"', 'style="opacity:0.9;transform:scale(1) rotate(0)"')
        
        # update the images to local paths if needed, but let us just use absolute for assets
        # wait, the problem could be the URL starts with https://assets.sarvam.ai/tr:f-auto/
        inner = inner.replace('https://assets.sarvam.ai/tr:f-auto/assets/companyLogos/home-section-2.webp', 'assets/home-section-2.webp')
        inner = inner.replace('https://assets.sarvam.ai/assets/svgs/sarvam-logo-white.svg', 'assets/sarvam-logo-white.svg')
        
        # Write back to html
        new_html = html[:match.start()] + inner + html[match.end():]
        with open('c:\\Users\\dhrav\\Downloads\\saveweb2zip-com-www-sarvam-ai (1)\\sarvam-ai-website\\index.html', 'w', encoding='utf-8') as f:
            f.write(new_html)
        print('Successfully updated index.html')
    else:
        print('Inner content not found inside island.')
else:
    print('Astro island not found.')
