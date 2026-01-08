
import React, { useState, useRef } from 'react';
import Layout from './components/Layout';
import { CardTheme, CardConfig, AspectRatio, ContentMode, TextAlign, FontFamily } from './types';
import { generateIslamicImage } from './services/geminiService';
import html2canvas from 'html2canvas';

const App: React.FC = () => {
  const [config, setConfig] = useState<CardConfig>({
    text: 'ط¥ظگظ†ظژظ‘ ظ…ظژط¹ظژ ط§ظ„ظ’ط¹ظڈط³ظ’ط±ظگ ظٹظڈط³ظ’ط±ظ‹ط§',
    explanation: '',
    source: 'ط³ظˆط±ط© ط§ظ„ط´ط±ط­ - ط¢ظٹط© ظ¥',
    instagram: 'islamic.designs',
    theme: 'grad-emerald',
    fontFamily: 'font-amiri',
    fontSize: 48,
    lineHeight: 1.8,
    textAlign: 'center',
    textColor: '#ffffff',
    aspectRatio: '1:1',
    contentMode: 'quran',
    overlayOpacity: 0.4,
    borderWidth: 1,
    patternOpacity: 0.1,
    shadowStrength: 0.5,
  });

  const [loadingAI, setLoadingAI] = useState(false);
  const [aiBackground, setAiBackground] = useState<string | null>(null);
  const [showApiPanel, setShowApiPanel] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const updateConfig = (key: keyof CardConfig, value: any) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const generateJsonPayload = () => {
    return JSON.stringify({
      text: config.text,
      explanation: config.explanation,
      source: config.source,
      user: config.instagram,
      theme: config.theme,
      ratio: config.aspectRatio,
      mode: config.contentMode,
      size: config.fontSize.toString(),
      shadow: config.shadowStrength.toString(),
      pattern: config.patternOpacity.toString(),
    }, null, 2);
  };

  const handleModeChange = (mode: ContentMode) => {
    let sampleText = '';
    let sampleSource = '';
    let sampleExpl = '';
    switch (mode) {
      case 'quran':
        sampleText = 'ط¥ظگظ†ظژظ‘ ط§ظ„ظ„ظژظ‘ظ‡ظژ ظ…ظژط¹ظژ ط§ظ„طµظژظ‘ط§ط¨ظگط±ظگظٹظ†ظژ';
        sampleSource = 'ط³ظˆط±ط© ط§ظ„ط¨ظ‚ط±ط© - ط¢ظٹط© ظ،ظ¥ظ£';
        sampleExpl = 'طھط°ظƒظٹط± ط¨ط£ظ† ظ…ط¹ظٹط© ط§ظ„ظ„ظ‡ ظˆطھظˆظپظٹظ‚ظ‡ ظ…ط±طھط¨ط·ط§ظ† ط¨ط§ظ„طµط¨ط±.';
        break;
      case 'hadith':
        sampleText = 'ظ‚ظژط§ظ„ظژ ط±ظژط³ظڈظˆظ„ظڈ ط§ظ„ظ„ظژظ‘ظ‡ظگ ï·؛: "ط§ظ„ط¯ظگظ‘ظٹظ†ظڈ ط§ظ„ظ†ظژظ‘طµظگظٹط­ظژط©ظڈ"';
        sampleSource = 'طµط­ظٹط­ ظ…ط³ظ„ظ…';
        sampleExpl = 'ط§ظ„ظ†طµظٹط­ط© ظ‡ظٹ ط¬ظˆظ‡ط± ط§ظ„طھط¹ط§ظ…ظ„ ظ…ط¹ ط§ظ„ط®ط§ظ„ظ‚ ظˆط§ظ„ط®ظ„ظ‚.';
        break;
      case 'zikr':
        sampleText = 'ط£ظژط³ظ’طھظژط؛ظ’ظپظگط±ظڈ ط§ظ„ظ„ظژظ‘ظ‡ظژ ط§ظ„ظ’ط¹ظژط¸ظگظٹظ…ظژ ظˆظژط£ظژطھظڈظˆط¨ظڈ ط¥ظگظ„ظژظٹظ’ظ‡ظگ';
        sampleSource = 'ط£ط°ظƒط§ط± ط§ظ„ط§ط³طھط؛ظپط§ط±';
        sampleExpl = '';
        break;
      case 'dua':
        sampleText = 'ط±ظژط¨ظژظ‘ظ†ظژط§ ط¢طھظگظ†ظژط§ ظپظگظٹ ط§ظ„ط¯ظڈظ‘ظ†ظ’ظٹظژط§ ط­ظژط³ظژظ†ظژط©ظ‹ ظˆظژظپظگظٹ ط§ظ„ظ’ط¢ط®ظگط±ظژط©ظگ ط­ظژط³ظژظ†ظژط©ظ‹';
        sampleSource = 'ط¯ط¹ط§ط، ط¬ط§ظ…ط¹';
        sampleExpl = '';
        break;
      default:
        sampleText = 'ط§ظƒطھط¨ ظ†طµظƒ ظ‡ظ†ط§...';
        sampleExpl = '';
    }
    setConfig(prev => ({ ...prev, contentMode: mode, text: sampleText, source: sampleSource, explanation: sampleExpl }));
  };

  const handleDownload = async () => {
    if (!cardRef.current) return;
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 4,
        useCORS: true,
        backgroundColor: null,
        onclone: (clonedDoc) => {
          const el = clonedDoc.getElementById('preview-card');
          if (el) el.style.borderRadius = '0px';
        }
      });
      const link = document.createElement('a');
      link.download = `islamic-card-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
    } catch (error) {
      alert('ط­ط¯ط« ط®ط·ط£ ط£ط«ظ†ط§ط، طھط­ظ…ظٹظ„ ط§ظ„طµظˆط±ط©.');
    }
  };

  const themes: CardTheme[] = ['grad-emerald', 'grad-navy', 'grad-maroon', 'grad-gold', 'grad-onyx', 'grad-royal', 'grad-lavender', 'grad-forest', 'grad-sepia', 'grad-slate', 'grad-ruby', 'grad-ocean'];

  return (
    <Layout>
      <div className="flex flex-col xl:flex-row gap-8 items-start justify-center p-2">
        {/* Controls Section */}
        <div className="w-full xl:w-[450px] space-y-5 order-2 xl:order-1">
          <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/50">
            <h2 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-3">
              <span className="text-2xl">âڑ™ï¸ڈ</span> ظ„ظˆط­ط© ط§ظ„طھط­ظƒظ…
            </h2>

            <div className="space-y-6">
              <div className="grid grid-cols-5 gap-2">
                {(['quran', 'hadith', 'zikr', 'dua', 'other'] as ContentMode[]).map((m) => (
                  <button key={m} onClick={() => handleModeChange(m)} className={`py-3 rounded-xl border text-[10px] font-bold transition-all ${config.contentMode === m ? 'bg-amber-600 text-white border-amber-600 shadow-md' : 'bg-slate-50 text-slate-400 border-slate-100'}`}>
                    {m === 'quran' ? 'ظ‚ط±ط¢ظ†' : m === 'hadith' ? 'ط­ط¯ظٹط«' : m === 'zikr' ? 'ط°ظƒط±' : m === 'dua' ? 'ط¯ط¹ط§ط،' : 'ط¹ط§ظ…'}
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                <textarea value={config.text} onChange={(e) => updateConfig('text', e.target.value)} className="w-full bg-slate-50 border border-slate-200 p-4 text-slate-800 font-amiri text-lg h-24 focus:border-amber-500 outline-none no-round transition-all" placeholder="ظ†طµ ط§ظ„ط¨ط·ط§ظ‚ط©..." dir="rtl" />
                <textarea value={config.explanation} onChange={(e) => updateConfig('explanation', e.target.value)} className="w-full bg-slate-50 border border-slate-200 p-3 text-slate-600 text-sm h-20 focus:border-amber-500 outline-none no-round transition-all" placeholder="ط´ط±ط­ (ط§ط®طھظٹط§ط±ظٹ - ظٹط®طھظپظٹ طھظ„ظ‚ط§ط¦ظٹط§ظ‹ ط¥ط°ط§ ظƒط§ظ† ظپط§ط±ط؛ط§ظ‹)..." dir="rtl" />
                <input type="text" value={config.source} onChange={(e) => updateConfig('source', e.target.value)} className="w-full bg-slate-50 border border-slate-200 p-3 text-sm focus:border-amber-500 outline-none no-round" placeholder="ط§ظ„ظ…طµط¯ط±..." dir="rtl" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <select value={config.aspectRatio} onChange={(e)=> {updateConfig('aspectRatio', e.target.value); setAiBackground(null);}} className="bg-slate-50 border border-slate-200 p-3 text-xs font-bold outline-none no-round">
                  <option value="1:1">ظ…ط±ط¨ط¹ (1:1)</option>
                  <option value="9:16">ط³طھظˆط±ظٹ (9:16)</option>
                  <option value="16:9">ط¹ط±ط¶ظٹ (16:9)</option>
                  <option value="4:5">ط¨ظˆط±طھط±ظٹظ‡ (4:5)</option>
                </select>
                <input type="text" value={config.instagram} onChange={(e)=>updateConfig('instagram', e.target.value)} className="bg-slate-50 border border-slate-200 p-3 text-xs outline-none text-center no-round" placeholder="ط§ط³ظ… ط§ظ„ظ…ط³طھط®ط¯ظ…" />
              </div>

              <div className="grid grid-cols-6 gap-2">
                {themes.map((t) => (
                  <button key={t} onClick={() => {updateConfig('theme', t); setAiBackground(null);}} className={`h-10 w-full rounded-lg ${t} border-2 ${config.theme === t ? 'border-amber-500 scale-105 shadow-md' : 'border-transparent opacity-90'}`} />
                ))}
              </div>

              <div className="pt-4 space-y-3">
                <button onClick={handleDownload} className="w-full bg-amber-600 text-white font-black py-4 shadow-xl hover:bg-amber-700 no-round flex items-center justify-center gap-2 transition-all">
                  ًں“¥ طھط­ظ…ظٹظ„ ط§ظ„طµظˆط±ط© ط§ظ„ط­ط§ظ„ظٹط©
                </button>
                <button onClick={() => setShowApiPanel(!showApiPanel)} className="w-full bg-indigo-600 text-white font-bold py-3 no-round flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all text-sm">
                  ًں¤– ط¥ط¹ط¯ط§ط¯ط§طھ n8n (POST API)
                </button>
                
                {showApiPanel && (
                  <div className="p-5 bg-slate-900 text-slate-300 rounded-xl border border-slate-700 animate-fade-in space-y-4">
                    <div>
                      <p className="text-indigo-400 font-bold text-[10px] uppercase mb-1">1. ط§ظ„ظ€ Endpoint (ظ„ظ„ظ…ط³ط§ط± ط§ظ„ظ…ط±ظپظˆط¹):</p>
                      <code className="block bg-black/40 p-2 rounded text-[9px] text-amber-500 break-all select-all">
                        {window.location.origin}/api/generate
                      </code>
                    </div>
                    <div>
                      <p className="text-indigo-400 font-bold text-[10px] uppercase mb-1">2. ط¨ظٹط§ظ†ط§طھ ط§ظ„ظ€ Body (JSON):</p>
                      <pre className="block bg-black/40 p-2 rounded text-[9px] text-emerald-500 overflow-x-auto select-all">
                        {generateJsonPayload()}
                      </pre>
                    </div>
                    <button onClick={() => { navigator.clipboard.writeText(generateJsonPayload()); alert('طھظ… ظ†ط³ط® JSON ط§ظ„ط¨ظٹط§ظ†ط§طھ! ط§ظ„طµظ‚ظ‡ ظپظٹ ط¹ظ‚ط¯ط© HTTP Request ط¨ظ€ n8n'); }} className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg transition-colors text-[10px]">
                      ظ†ط³ط® ظƒظˆط¯ ط§ظ„ظ€ JSON
                    </button>
                    <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                      <p className="text-[9px] text-amber-500 leading-relaxed italic">
                        ًں’، ظپظٹ n8n: ط§ط³طھط®ط¯ظ… ط¹ظ‚ط¯ط© <strong>HTTP Request</strong>طŒ ظˆط§ط¬ط¹ظ„ ط§ظ„ظ€ <strong>Method: POST</strong> ظˆط§ظ„ظ€ <strong>Body: JSON</strong>.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Preview Section */}
        <div className="flex-1 order-1 xl:order-2 w-full flex flex-col items-center">
          <div className="sticky top-28 w-full flex flex-col items-center">
            <div 
              id="preview-card" ref={cardRef} dir="rtl" className={`${config.theme} relative overflow-hidden flex flex-col justify-between shadow-2xl`}
              style={{
                width: config.aspectRatio === '1:1' ? '500px' : config.aspectRatio === '16:9' ? '700px' : config.aspectRatio === '9:16' ? '360px' : '400px',
                aspectRatio: config.aspectRatio.replace(':', '/'),
                backgroundImage: aiBackground ? `url(${aiBackground})` : undefined,
                backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '0px',
              }}
            >
              <div className="absolute inset-0 bg-black/40 pointer-events-none" />
              <div className="absolute inset-0 pointer-events-none" style={{ opacity: config.patternOpacity, backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

              <div className="relative z-10 h-full w-full flex flex-col p-[10%]">
                <div className="text-center shrink-0 min-h-[40px] flex items-center justify-center">
                  {config.contentMode === 'quran' && <span className="text-2xl text-amber-500 font-amiri filter drop-shadow-md">ï·½</span>}
                  {config.contentMode === 'hadith' && <span className="text-[9px] font-bold text-amber-500 tracking-[0.4em] uppercase opacity-90">ظ‚ظژط§ظ„ ط±ظژط³ظڈظˆظ„ ط§ظ„ظ„ظژظ‘ظ‡ ï·؛</span>}
                </div>

                <div className="flex-grow flex flex-col items-center justify-center py-4">
                  <p className={`${config.fontFamily} transition-all duration-500 whitespace-pre-wrap text-center`} style={{ fontSize: `${config.fontSize}px`, color: config.textColor, lineHeight: config.lineHeight, textShadow: `0 ${10 * config.shadowStrength}px ${20 * config.shadowStrength}px rgba(0,0,0,${0.6 * config.shadowStrength})`, direction: 'rtl' }}>
                    {config.text || 'ط£ط¯ط®ظ„ ط§ظ„ظ†طµ...'}
                  </p>
                  
                  {config.explanation && config.explanation.trim() !== '' && (
                    <p className="mt-6 text-white/80 font-naskh text-center" style={{ fontSize: `${Math.max(12, config.fontSize * 0.35)}px`, lineHeight: 1.6, maxWidth: '90%', direction: 'rtl' }}>
                      {config.explanation}
                    </p>
                  )}
                </div>

                <div className="shrink-0 pt-6 flex flex-col items-center gap-4">
                  {config.source && (
                    <div className="flex justify-center w-full">
                      <div className="flex items-center justify-center px-5 py-2 bg-black/40 border border-white/10 no-round">
                        <span className="text-[11px] font-bold text-white/90 leading-tight text-center" style={{ direction: 'rtl' }}>{config.source}</span>
                      </div>
                    </div>
                  )}
                  <div className="w-full flex items-center justify-center gap-3 opacity-20">
                    <div className="h-[0.5px] flex-grow bg-white" /><span className="text-amber-500 text-[10px]">âœ¤</span><div className="h-[0.5px] flex-grow bg-white" />
                  </div>
                  <div className="flex justify-center w-full">
                    <div className="flex items-center gap-2 px-5 py-2.5 bg-black/60 border border-white/10 shadow-lg backdrop-blur-xl no-round">
                      <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                      <span className="text-[11px] font-bold text-white/90 leading-none">@{config.instagram || 'username'}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 border border-white/5 pointer-events-none no-round" style={{ borderWidth: `${config.borderWidth}px` }} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default App;
