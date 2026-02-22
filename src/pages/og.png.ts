import type { APIRoute } from 'astro';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

async function loadFont(): Promise<ArrayBuffer> {
  const css = await fetch(
    'https://fonts.googleapis.com/css2?family=Manrope:wght@700&display=swap',
    { headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)' } }
  ).then(r => r.text());
  const match = css.match(/src: url\((.+?)\) format\('woff2'\)/);
  if (!match?.[1]) throw new Error('Font URL not found in Google Fonts response');
  return fetch(match[1]).then(r => r.arrayBuffer());
}

export const GET: APIRoute = async () => {
  const fontData = await loadFont();

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
