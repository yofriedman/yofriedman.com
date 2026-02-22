import type { APIRoute } from 'astro';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { readFileSync } from 'node:fs';
import path from 'node:path';

function loadFont(): ArrayBuffer {
  const fontPath = path.join(process.cwd(), 'public/fonts/Manrope-Bold.ttf');
  return readFileSync(fontPath).buffer as ArrayBuffer;
}

export const GET: APIRoute = async () => {
  const fontData = loadFont();

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#111214',
          padding: '80px',
          fontFamily: 'Manrope',
        },
        children: [
          {
            type: 'div',
            props: {
              style: { display: 'flex', flexDirection: 'column', gap: '28px' },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: '84px',
                      fontWeight: 700,
                      color: '#F4F2ED',
                      lineHeight: 1.05,
                    },
                    children: 'Josh Friedman',
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: '30px',
                      color: '#888888',
                      lineHeight: 1.5,
                      maxWidth: '700px',
                    },
                    children:
                      'Building at the intersection of marketing, AI, and systems thinking.',
                  },
                },
              ],
            },
          },
          {
            type: 'div',
            props: {
              style: { fontSize: '26px', color: '#FF6542' },
              children: 'yofriedman.com',
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [{ name: 'Manrope', data: fontData, weight: 700, style: 'normal' }],
    }
  );

  const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } });
  const png = resvg.render().asPng();

  return new Response(png, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
