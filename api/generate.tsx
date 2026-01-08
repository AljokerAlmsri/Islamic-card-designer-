
import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  try {
    let data: any = {};

    // ط¯ط¹ظ… ط§ط³طھظ„ط§ظ… ط§ظ„ط¨ظٹط§ظ†ط§طھ ط¹ط¨ط± POST (JSON Body) ظˆظ‡ظˆ ط§ظ„ظ…ط·ظ„ظˆط¨ ظ„ظ€ n8n
    if (req.method === 'POST') {
      try {
        data = await req.json();
      } catch (e) {
        return new Response(JSON.stringify({ error: "Invalid JSON body" }), { 
          status: 400, 
          headers: { 'Content-Type': 'application/json' } 
        });
      }
    } else {
      // ط§ط³طھظ…ط±ط§ط± ط¯ط¹ظ… GET ظ„ظ„ظ…ط¹ط§ظٹظ†ط© ط§ظ„ط³ط±ظٹط¹ط© ط¹ط¨ط± ط§ظ„ظ…طھطµظپط­
      const { searchParams } = new URL(req.url);
      data = Object.fromEntries(searchParams.entries());
    }

    // طھط¹ظٹظٹظ† ط§ظ„ظ‚ظٹظ… ط§ظ„ط§ظپطھط±ط§ط¶ظٹط© ط¥ط°ط§ ظ†ظ‚طµطھ ط£ظٹ ط¨ظٹط§ظ†ط§طھ
    const text = data.text || 'ط£ط¯ط®ظ„ ط§ظ„ظ†طµ ظ‡ظ†ط§';
    const explanation = data.explanation || '';
    const source = data.source || '';
    const user = data.user || 'username';
    const theme = data.theme || 'grad-emerald';
    const ratio = data.ratio || '1:1';
    const mode = data.mode || 'other';
    const fontSize = parseInt(data.size || '60');
    const shadow = parseFloat(data.shadow || '0.5');
    const pattern = parseFloat(data.pattern || '0.1');

    const themes: Record<string, string> = {
      'grad-emerald': 'linear-gradient(135deg, #064e3b 0%, #065f46 100%)',
      'grad-navy': 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      'grad-maroon': 'linear-gradient(135deg, #450a0a 0%, #7f1d1d 100%)',
      'grad-gold': 'linear-gradient(135deg, #78350f 0%, #92400e 100%)',
      'grad-onyx': 'linear-gradient(135deg, #09090b 0%, #18181b 100%)',
      'grad-royal': 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)',
      'grad-lavender': 'linear-gradient(135deg, #4c1d95 0%, #5b21b6 100%)',
      'grad-forest': 'linear-gradient(135deg, #052e16 0%, #064e3b 100%)',
      'grad-sepia': 'linear-gradient(135deg, #431407 0%, #78350f 100%)',
      'grad-slate': 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
      'grad-ruby': 'linear-gradient(135deg, #7f1d1d 0%, #b91c1c 100%)',
      'grad-ocean': 'linear-gradient(135deg, #0c4a6e 0%, #075985 100%)',
    };

    const background = themes[theme] || themes['grad-emerald'];

    let width = 1200;
    let height = 1200;
    if (ratio === '9:16') { width = 1080; height = 1920; }
    else if (ratio === '16:9') { width = 1920; height = 1080; }
    else if (ratio === '4:5') { width = 1080; height = 1350; }

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: background,
            padding: '100px',
            position: 'relative',
          }}
        >
          {/* ط§ظ„ط·ط¨ظ‚ط§طھ ط§ظ„ط®ظ„ظپظٹط© */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.4, backgroundColor: 'black' }} />
          <div style={{ 
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, 
            opacity: pattern, 
            backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', 
            backgroundSize: '50px 50px' 
          }} />
          
          {/*Header */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 10, width: '100%' }}>
            {mode === 'quran' && (
              <div style={{ fontSize: '70px', color: '#f59e0b', marginBottom: '20px' }}>ï·½</div>
            )}
            {mode === 'hadith' && (
               <div style={{ color: '#f59e0b', fontSize: '26px', letterSpacing: '8px', marginBottom: '20px', fontWeight: 'bold' }}>ظ‚ظژط§ظ„ ط±ظژط³ظڈظˆظ„ ط§ظ„ظ„ظژظ‘ظ‡ ï·؛</div>
            )}
            <div style={{ height: '1px', width: '250px', backgroundColor: 'rgba(255,255,255,0.15)' }} />
          </div>

          {/* Body Content */}
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            flexGrow: 1, 
            alignItems: 'center', 
            justifyContent: 'center', 
            width: '100%', 
            zIndex: 10,
          }}>
            <p style={{ 
              fontSize: `${fontSize * 1.5}px`, 
              color: 'white', 
              textAlign: 'center', 
              lineHeight: 1.6, 
              padding: '0 50px',
              textShadow: `0 ${20 * shadow}px ${40 * shadow}px rgba(0,0,0,0.7)`,
              direction: 'rtl',
              margin: 0,
            }}>
              {text}
            </p>
            {/* ط§ظ„ط´ط±ط­ ظٹط¸ظ‡ط± ظپظ‚ط· ط¥ط°ط§ ظƒط§ظ† ظ‡ظ†ط§ظƒ ظ†طµ */}
            {explanation && explanation.trim() !== '' && (
              <p style={{
                fontSize: `${fontSize * 0.6}px`,
                color: 'rgba(255,255,255,0.85)',
                textAlign: 'center',
                lineHeight: 1.5,
                marginTop: '50px',
                maxWidth: '85%',
                direction: 'rtl',
                backgroundColor: 'rgba(0,0,0,0.2)',
                padding: '20px 40px',
              }}>
                {explanation}
              </p>
            )}
          </div>

          {/* Footer */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', zIndex: 10 }}>
            {source && (
              <div style={{ 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '15px 45px', 
                border: '1px solid rgba(255,255,255,0.2)', 
                backgroundColor: 'rgba(0,0,0,0.5)', 
                color: 'white', 
                fontSize: '32px', 
                marginBottom: '60px',
                fontWeight: 'bold'
              }}>
                {source}
              </div>
            )}
            
            <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                backgroundColor: 'rgba(0,0,0,0.7)', 
                padding: '25px 80px', 
                border: '1px solid rgba(255,255,255,0.1)', 
                color: 'white', 
                fontSize: '28px', 
                fontWeight: 'bold' 
            }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="#f59e0b" style={{ marginLeft: '15px' }}>
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              @{user}
            </div>
          </div>
        </div>
      ),
      { width, height },
    );
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { 
      status: 500, 
      headers: { 'Content-Type': 'application/json' } 
    });
  }
          }
