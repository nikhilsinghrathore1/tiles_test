// app/page.tsx or pages/index.tsx
'use client';

import Head from 'next/head';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    // Dynamically load all your scripts if needed
    const scripts = [
      '/data/audio.js',
      '/data/battleZones.js',
      '/data/collisions.js',
      '/data/attacks.js',
      '/data/monsters.js',
      '/data/characters.js',
      '/js/utils.js',
      '/classes.js',
      '/index.js',
      '/battleScene.js',
    ];

    scripts.forEach(src => {
      const script = document.createElement('script');
      script.src = src;
      script.async = false;
      document.body.appendChild(script);
    });
  }, []);

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
          rel="stylesheet"
        />
        <style>{`
          * {
            font-family: 'Press Start 2P', cursive;
            box-sizing: border-box;
          }
          body {
            background-color: black;
            overflow: hidden;
          }
          h1 {
            margin: 0;
          }
          button {
            border: 0;
            cursor: pointer;
            font-size: 16px;
          }
          button:hover {
            background-color: #ddd;
          }
        `}</style>
      </Head>

      <div style={{ display: 'inline-block', position: 'relative' }}>
        <div
          id="overlappingDiv"
          style={{
            backgroundColor: 'black',
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            opacity: 0,
            pointerEvents: 'none',
            zIndex: 10,
          }}
        ></div>

        <canvas></canvas>

        <div
          id="characterDialogueBox"
          style={{
            backgroundColor: 'white',
            height: 140,
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            borderTop: '4px black solid',
            display: 'none',
            padding: 12,
          }}
        ></div>

        <div id="userInterface" style={{ display: 'none' }}>
          {/* Enemy Health */}
          <div
            style={{
              backgroundColor: 'white',
              width: 250,
              position: 'absolute',
              top: 50,
              left: 50,
              border: '4px black solid',
              padding: 12,
            }}
          >
            <h1 style={{ fontSize: 16 }}>Draggle</h1>
            <div style={{ position: 'relative' }}>
              <div style={{ height: 5, backgroundColor: '#ccc', marginTop: 10 }}></div>
              <div
                id="enemyHealthBar"
                style={{
                  height: 5,
                  backgroundColor: 'green',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                }}
              ></div>
            </div>
          </div>

          {/* Player Health */}
          <div
            style={{
              backgroundColor: 'white',
              width: 250,
              position: 'absolute',
              top: 330,
              right: 50,
              border: '4px black solid',
              padding: 12,
            }}
          >
            <h1 style={{ fontSize: 16 }}>Emby</h1>
            <div style={{ position: 'relative' }}>
              <div style={{ height: 5, backgroundColor: '#ccc', marginTop: 10 }}></div>
              <div
                id="playerHealthBar"
                style={{
                  height: 5,
                  backgroundColor: 'green',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                }}
              ></div>
            </div>
          </div>

          {/* Battle UI */}
          <div
            style={{
              backgroundColor: 'white',
              height: 140,
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              borderTop: '4px black solid',
              display: 'flex',
            }}
          >
            <div
              id="dialogueBox"
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                backgroundColor: 'white',
                padding: 12,
                display: 'none',
                cursor: 'pointer',
              }}
            >
              sdkfjlsdajl
            </div>
            <div
              id="attacksBox"
              style={{
                width: '66.66%',
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
              }}
            ></div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '33.33%',
                borderLeft: '4px black solid',
              }}
            >
              <h1 id="attackType" style={{ fontSize: 16 }}>
                Attack Type
              </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
