#!/usr/bin/env python3
"""Generate the Austin Locksmith Pros OpenGraph image (1200x630 PNG).

Pure-Python generator (no third-party deps) so the repo has a branded
social-share image without reusing any photography from the gate project.
Run from the site root:  python3 scripts/generate-og-image.py
"""

import os
import struct
import zlib

W, H = 1200, 630

# Brand palette (mirrors css/style.css custom properties)
BG_TOP = (12, 18, 25)      # --dark-base #0c1219
BG_BOTTOM = (28, 39, 51)   # --dark-surface-2 #1c2733
STEEL_BLUE = (2, 132, 199)  # --steel-blue #0284c7
ORANGE = (16, 185, 129)     # --burnt-orange #10b981
GOLD = (212, 160, 23)      # brighter --accent-gold for dark bg
WHITE = (242, 245, 248)    # --dark-text
SILVER = (167, 179, 192)   # --dark-text-secondary
DIM = (120, 133, 148)

FONT = {
    'A': (0x0E, 0x11, 0x11, 0x1F, 0x11, 0x11, 0x11),
    'B': (0x1E, 0x11, 0x11, 0x1E, 0x11, 0x11, 0x1E),
    'C': (0x0E, 0x11, 0x10, 0x10, 0x10, 0x11, 0x0E),
    'D': (0x1E, 0x11, 0x11, 0x11, 0x11, 0x11, 0x1E),
    'E': (0x1F, 0x10, 0x10, 0x1E, 0x10, 0x10, 0x1F),
    'F': (0x1F, 0x10, 0x10, 0x1E, 0x10, 0x10, 0x10),
    'G': (0x0E, 0x11, 0x10, 0x17, 0x11, 0x11, 0x0F),
    'H': (0x11, 0x11, 0x11, 0x1F, 0x11, 0x11, 0x11),
    'I': (0x0E, 0x04, 0x04, 0x04, 0x04, 0x04, 0x0E),
    'J': (0x07, 0x02, 0x02, 0x02, 0x02, 0x12, 0x0C),
    'K': (0x11, 0x12, 0x14, 0x18, 0x14, 0x12, 0x11),
    'L': (0x10, 0x10, 0x10, 0x10, 0x10, 0x10, 0x1F),
    'M': (0x11, 0x1B, 0x15, 0x15, 0x11, 0x11, 0x11),
    'N': (0x11, 0x19, 0x15, 0x13, 0x11, 0x11, 0x11),
    'O': (0x0E, 0x11, 0x11, 0x11, 0x11, 0x11, 0x0E),
    'P': (0x1E, 0x11, 0x11, 0x1E, 0x10, 0x10, 0x10),
    'Q': (0x0E, 0x11, 0x11, 0x11, 0x15, 0x12, 0x0D),
    'R': (0x1E, 0x11, 0x11, 0x1E, 0x14, 0x12, 0x11),
    'S': (0x0F, 0x10, 0x10, 0x0E, 0x01, 0x01, 0x1E),
    'T': (0x1F, 0x04, 0x04, 0x04, 0x04, 0x04, 0x04),
    'U': (0x11, 0x11, 0x11, 0x11, 0x11, 0x11, 0x0E),
    'V': (0x11, 0x11, 0x11, 0x11, 0x11, 0x0A, 0x04),
    'W': (0x11, 0x11, 0x11, 0x15, 0x15, 0x1B, 0x11),
    'X': (0x11, 0x11, 0x0A, 0x04, 0x0A, 0x11, 0x11),
    'Y': (0x11, 0x11, 0x0A, 0x04, 0x04, 0x04, 0x04),
    'Z': (0x1F, 0x01, 0x02, 0x04, 0x08, 0x10, 0x1F),
    '0': (0x0E, 0x11, 0x13, 0x15, 0x19, 0x11, 0x0E),
    '1': (0x04, 0x0C, 0x04, 0x04, 0x04, 0x04, 0x0E),
    '2': (0x0E, 0x11, 0x01, 0x02, 0x04, 0x08, 0x1F),
    '3': (0x1F, 0x02, 0x04, 0x02, 0x01, 0x11, 0x0E),
    '4': (0x02, 0x06, 0x0A, 0x12, 0x1F, 0x02, 0x02),
    '5': (0x1F, 0x10, 0x1E, 0x01, 0x01, 0x11, 0x0E),
    '6': (0x06, 0x08, 0x10, 0x1E, 0x11, 0x11, 0x0E),
    '7': (0x1F, 0x01, 0x02, 0x04, 0x08, 0x08, 0x08),
    '8': (0x0E, 0x11, 0x11, 0x0E, 0x11, 0x11, 0x0E),
    '9': (0x0E, 0x11, 0x11, 0x0F, 0x01, 0x02, 0x0C),
    ' ': (0, 0, 0, 0, 0, 0, 0),
    '-': (0x00, 0x00, 0x00, 0x0E, 0x00, 0x00, 0x00),
    '/': (0x01, 0x01, 0x02, 0x04, 0x08, 0x10, 0x10),
    '(': (0x02, 0x04, 0x08, 0x08, 0x08, 0x04, 0x02),
    ')': (0x08, 0x04, 0x02, 0x02, 0x02, 0x04, 0x08),
    '.': (0x00, 0x00, 0x00, 0x00, 0x00, 0x0C, 0x0C),
    ',': (0x00, 0x00, 0x00, 0x00, 0x00, 0x0C, 0x04),
    ':': (0x00, 0x0C, 0x0C, 0x00, 0x0C, 0x0C, 0x00),
    '+': (0x00, 0x04, 0x04, 0x1F, 0x04, 0x04, 0x00),
    '&': (0x0C, 0x12, 0x10, 0x0C, 0x16, 0x12, 0x0D),
    '!': (0x04, 0x04, 0x04, 0x04, 0x04, 0x00, 0x04),
    "'": (0x04, 0x04, 0x08, 0x00, 0x00, 0x00, 0x00),
}


def px(buf, x, y, color):
    if 0 <= x < W and 0 <= y < H:
        buf[y * W + x] = color


def blend(base, over, alpha):
    return tuple(int(round(b + (o - b) * alpha)) for b, o in zip(base, over))


def draw_text(buf, text, x, y, scale, color):
    cursor = x
    for ch in text.upper():
        glyph = FONT.get(ch, FONT[' '])
        for row in range(7):
            bits = glyph[row]
            for col in range(5):
                if bits & (1 << (4 - col)):
                    for sy in range(scale):
                        for sx in range(scale):
                            px(buf, cursor + col * scale + sx, y + row * scale + sy, color)
        cursor += (5 + 1) * scale
    return cursor


def text_width(text, scale):
    return max(0, len(text) * (5 + 1) * scale - scale)


def draw_star(buf, cx, cy, outer_r, color):
    import math
    points = []
    for i in range(10):
        r = outer_r if i % 2 == 0 else outer_r * 0.42
        angle = -math.pi / 2 + i * math.pi / 5
        points.append((cx + r * math.cos(angle), cy + r * math.sin(angle)))

    min_x = int(max(0, cx - outer_r - 2))
    max_x = int(min(W - 1, cx + outer_r + 2))
    min_y = int(max(0, cy - outer_r - 2))
    max_y = int(min(H - 1, cy + outer_r + 2))

    for y in range(min_y, max_y + 1):
        for x in range(min_x, max_x + 1):
            inside = False
            j = len(points) - 1
            for i in range(len(points)):
                xi, yi = points[i]
                xj, yj = points[j]
                if (yi > y) != (yj > y) and x < (xj - xi) * (y - yi) / (yj - yi) + xi:
                    inside = not inside
                j = i
            if inside:
                px(buf, x, y, color)


def draw_hbar(buf, x0, x1, y, thickness, color):
    for yy in range(y, y + thickness):
        for xx in range(x0, x1):
            px(buf, xx, yy, color)


def build():
    buf = [None] * (W * H)

    # Vertical brand gradient
    for y in range(H):
        t = y / (H - 1)
        row_color = blend(BG_TOP, BG_BOTTOM, t)
        start = y * W
        for i in range(W):
            buf[start + i] = row_color

    # Steel-blue radial glow behind the star
    import math
    cx, cy = 150, 315
    max_d = 340.0
    for y in range(max(0, cy - 340), min(H, cy + 340)):
        for x in range(max(0, cx - 340), min(W, cx + 340)):
            d = math.hypot(x - cx, y - cy)
            if d < max_d:
                alpha = 0.28 * (1 - d / max_d) ** 2
                buf[y * W + x] = blend(buf[y * W + x], STEEL_BLUE, alpha)

    # Austin Locksmith Pros star with warm halo (outline first, then the gold fill on top)
    draw_star(buf, cx, cy, 120, blend(BG_BOTTOM, ORANGE, 0.18))
    draw_star(buf, cx, cy, 104, blend(BG_BOTTOM, ORANGE, 0.36))
    draw_star(buf, cx, cy, 100, ORANGE)
    draw_star(buf, cx, cy, 93, GOLD)

    text_x = 290

    draw_text(buf, 'AUSTIN', text_x, 108, 9, WHITE)
    draw_text(buf, 'LOCKSMITH PROS', text_x, 196, 6, WHITE)

    # Burnt-orange rule under the wordmark
    draw_hbar(buf, text_x, text_x + text_width('LOCKSMITH PROS', 6), 252, 4, ORANGE)

    draw_text(buf, '24/7 EMERGENCY LOCKSMITH SERVICE', text_x, 292, 4, SILVER)
    draw_text(buf, 'WE COME TO YOU - 10-45 MIN RESPONSE', text_x, 330, 3, DIM)

    draw_text(buf, '(737) 265-4627', text_x, 396, 6, GOLD)
    draw_text(buf, 'AUSTINLOCKSMITHPROS@GMAIL.COM', text_x, 470, 2, DIM)

    draw_text(buf, 'AUSTIN - ROUND ROCK - CEDAR PARK - GEORGETOWN - 22 AREAS', text_x, 560, 2, blend(DIM, BG_BOTTOM, 0.25))

    # Left edge accent stripe
    draw_hbar(buf, 0, 10, 0, H, ORANGE)

    return buf


def write_png(path, buf):
    raw = bytearray()
    for y in range(H):
        raw.append(0)  # filter: none
        row = buf[y * W:(y + 1) * W]
        for color in row:
            raw.extend(color)

    def chunk(tag, data):
        body = tag + data
        return struct.pack('>I', len(data)) + body + struct.pack('>I', zlib.crc32(body) & 0xFFFFFFFF)

    ihdr = struct.pack('>IIBBBBB', W, H, 8, 2, 0, 0, 0)
    png = b'\x89PNG\r\n\x1a\n'
    png += chunk(b'IHDR', ihdr)
    png += chunk(b'IDAT', zlib.compress(bytes(raw), 9))
    png += chunk(b'IEND', b'')

    with open(path, 'wb') as f:
        f.write(png)
    return os.path.getsize(path)


if __name__ == '__main__':
    out = os.path.join(os.path.dirname(__file__), '..', 'images', 'og-image.png')
    size = write_png(out, build())
    print(f'Wrote {out} ({size / 1024:.1f} KB, {W}x{H})')
