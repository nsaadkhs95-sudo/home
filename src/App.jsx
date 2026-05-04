import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Moon, Sun, LayoutDashboard, ShoppingCart, Users, UserCog, Menu, X, Check, MessageCircle, Download, Rocket, Lock, Globe, Monitor, Apple, AppWindow } from 'lucide-react';

const CONFIG = {
  brandName: 'Flyxxxxx',

  assets: {
    logo:            '/images/logo.png',
    ai:              '/images/ai.webp',
    earth:           '/images/earth.webp',
    appsWall:        '/images/apps-wall.webp',
    platformMac:     '/images/1.png',
    platformIOS:     '/images/2.png',
    platformAndroid: '/images/3.png',
    platformWindows: '/images/4.png',
    orbitIcon1:      '/images/5.png',
    orbitIcon2:      '/images/6.png',
    orbitIcon3:      '/images/7.png',
    orbitIcon4:      '/images/8.png',
    orbitIcon5:      '/images/9.png',
  },

  features: {
    showPlansSection: false,
  },

  animation: {
    earthRotate: 90,
    appsScroll: 60,
  },

  links: {
    home:            'https://xxxxx.com/',
    shop:            'https://u.xxxxx.com/#/shop',
    invite:          'https://u.xxxxx.com/',
    account:         'https://u.xxxxx.com/',
    login:           'https://u.xxxxx.com/#/login',
    downloadMac:     'https://u.xxxxx.com/#/login',
    downloadIOS:     'https://u.xxxxx.com/#/login',
    downloadAndroid: 'https://u.xxxxx.com/#/login',
    downloadWindows: 'https://u.xxxxx.com/#/login',
    support:         'https://u.xxxxx.com/#/login',
    telegram:        'https://t.me/+vQ4FA5KcF2g3ZDYx',
    backup:          'https://u.xxxxx.com/#/login',
  },

  hero: {
    title:       'Flyxxxxx',
    subtitle:    '无限制畅享全球网络加速',
    description: '全球互联的网络加速服务',
    cta:         '立即体验',
  },
};

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < breakpoint;
  });

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const handler = (e) => setIsMobile(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [breakpoint]);

  return isMobile;
}

const platforms = [
  { id: 'mac', tag: 'MacOS',   desc: 'MacOS 客户端',   subtitle: 'Intel / Apple Silicon 全系列', bg: 'linear-gradient(135deg,#d4d8dd 0%,#9da3ab 100%)', link: 'downloadMac',     image: 'platformMac' },
  { id: 'ios', tag: 'IOS',     desc: 'iOS 客户端',     subtitle: 'iPhone / iPad 全系列',         bg: 'linear-gradient(135deg,#c7b8ff 0%,#8b7dd8 100%)', link: 'downloadIOS',     image: 'platformIOS' },
  { id: 'and', tag: 'Android', desc: 'Android 客户端', subtitle: '华为 / 小米 / OPPO 等安卓全系列',bg: 'linear-gradient(135deg,#a8e6b8 0%,#5dc47a 100%)', link: 'downloadAndroid', image: 'platformAndroid' },
  { id: 'win', tag: 'Windows', desc: 'Windows 客户端', subtitle: '32 / 64 位全系列',              bg: 'linear-gradient(135deg,#b4d9f7 0%,#6ba8e0 100%)', link: 'downloadWindows', image: 'platformWindows' },
];

// 国旗列表 - 迪拜用阿联酋国旗(ae), 墨西哥用 mx
const countries = [
  { code: 'hk', name: '中国香港' }, { code: 'ca', name: '加拿大' }, { code: 'de', name: '德国' },
  { code: 'in', name: '印度' },     { code: 'gb-eng', name: '英格兰' }, { code: 'us', name: '美国' },
  { code: 'kr', name: '韩国' },     { code: 'ae', name: '迪拜' },     { code: 'jp', name: '日本' },
  { code: 'mx', name: '墨西哥' },   { code: 'sg', name: '新加坡' },   { code: 'tw', name: '中国台湾' },
  { code: 'th', name: '泰国' },     { code: 'vn', name: '越南' },     { code: 'my', name: '马来西亚' },
  { code: 'ph', name: '菲律宾' },   { code: 'id', name: '印度尼西亚' },{ code: 'tr', name: '土耳其' },
];

const plans = [
  { name: 'Basis 高速套餐',   price: '9.99',  save: '年付立省 45.68 元',
    features: ['流量: 每月 100G 流量，每月重置','设备: 3 台设备同时在线','带宽: 限速 100Mbps','线路: 高速节点','节点: 32 个国家/地区节点'] },
  { name: 'Standard 专业套餐', price: '19.99', save: '年付立省 57.68 元',
    features: ['流量: 每月 300G 流量，每月重置','设备: 6 台设备同时在线','带宽: 限速 300Mbps','线路: IEPL 专线节点 + 中继隧道','节点: 65 个国家/地区节点'] },
  { name: 'Premium 旗舰套餐',  price: '29.99', save: '年付立省 177.68 元',
    features: ['流量: 每月 1000GB 流量，每月重置','设备: 不限制设备数量','带宽: 限速 1000Mbps','线路: IEPL 专线节点 + 中继隧道 + 企业专线','节点: 108 个国家/地区节点','流媒体解锁'] },
];

const go = (key) => {
  const url = CONFIG.links[key];
  if (url) window.open(url, '_blank');
};

// ==========================================================
// 导航栏
// ==========================================================
function Navbar({ dark, onToggle, isMobile }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const items = [
    { key: 'home',    label: '首页',     icon: LayoutDashboard },
    { key: 'shop',    label: '购买套餐', icon: ShoppingCart },
    { key: 'invite',  label: '我的订阅', icon: Users },
    { key: 'account', label: '账号设置', icon: UserCog },
  ];

  if (isMobile) {
    return (
      <>
        <nav style={{
          position: 'fixed', top: 12, left: 12, right: 12, height: 56,
          background: dark ? 'rgba(20,22,26,0.85)' : 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
          borderRadius: 14,
          border: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`,
          display: 'flex', alignItems: 'center', padding: '0 16px', zIndex: 100,
          color: dark ? '#fff' : '#1a1a1a',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1 }}>
            <img src={CONFIG.assets.logo} alt={CONFIG.brandName}
              style={{ width: 28, height: 28, objectFit: 'contain' }}
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <span style={{ fontSize: 17, fontWeight: 700 }}>{CONFIG.brandName}</span>
          </div>
          <button onClick={onToggle} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'inherit', padding: 8 }}>
            {dark ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <button onClick={() => setDrawerOpen(true)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'inherit', padding: 8 }}>
            <Menu size={22} />
          </button>
        </nav>

        {drawerOpen && (
          <div onClick={() => setDrawerOpen(false)} style={{
            position: 'fixed', inset: 0, zIndex: 200,
            background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)',
            animation: 'fadeIn 0.2s ease',
          }}>
            <div onClick={(e) => e.stopPropagation()} style={{
              position: 'absolute', top: 0, right: 0, bottom: 0,
              width: 'min(80vw, 320px)',
              background: dark ? '#12151d' : '#fff',
              padding: '20px 16px',
              display: 'flex', flexDirection: 'column', gap: 4,
              animation: 'slideInRight 0.25s ease',
              boxShadow: '-8px 0 30px rgba(0,0,0,0.4)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
                <button onClick={() => setDrawerOpen(false)} style={{
                  background: 'transparent', border: 'none', cursor: 'pointer',
                  color: dark ? '#fff' : '#1a1a1a', padding: 8,
                }}>
                  <X size={22} />
                </button>
              </div>
              {items.map((it) => {
                const Icon = it.icon;
                return (
                  <button key={it.key} onClick={() => { go(it.key); setDrawerOpen(false); }} style={{
                    display: 'flex', alignItems: 'center', gap: 14,
                    background: 'transparent', border: 'none', cursor: 'pointer',
                    color: dark ? '#fff' : '#1a1a1a', fontSize: 15, padding: '14px 12px',
                    textAlign: 'left', width: '100%', borderRadius: 8,
                  }}>
                    <Icon size={20} /><span>{it.label}</span>
                  </button>
                );
              })}
            </div>
            <style>{`
              @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
              @keyframes slideInRight { from { transform: translateX(100%); } to { transform: translateX(0); } }
            `}</style>
          </div>
        )}
      </>
    );
  }

  return (
    <nav style={{
      position: 'fixed', top: 16, left: '50%', transform: 'translateX(-50%)',
      width: 'calc(100% - 180px)', maxWidth: 1440, height: 64,
      background: dark ? 'rgba(20,22,26,0.7)' : 'rgba(255,255,255,0.75)',
      backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
      borderRadius: 18,
      border: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`,
      display: 'flex', alignItems: 'center', padding: '0 24px', zIndex: 100,
      color: dark ? '#fff' : '#1a1a1a',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
        <img src={CONFIG.assets.logo} alt={CONFIG.brandName}
          style={{ width: 32, height: 32, objectFit: 'contain' }}
          onError={(e) => { e.target.style.display = 'none'; }}
        />
        <span style={{ fontSize: 18, fontWeight: 700 }}>{CONFIG.brandName}</span>
      </div>

      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', gap: 36 }}>
        {items.map((it) => {
          const Icon = it.icon;
          return (
            <button key={it.key} onClick={() => go(it.key)} style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: 'transparent', border: 'none', cursor: 'pointer',
              color: 'inherit', fontSize: 14, padding: '8px 4px',
            }}>
              <Icon size={18} />
              <span>{it.label}</span>
            </button>
          );
        })}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
        <button onClick={onToggle} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'inherit', padding: 4 }}>
          {dark ? <Moon size={20} /> : <Sun size={20} />}
        </button>
      </div>
    </nav>
  );
}

// ==========================================================
// Hero
// ==========================================================
function Hero({ isMobile }) {
  const EARTH_DIAMETER = isMobile ? 'min(130vh, 200vw)' : 'min(150vh, 75vw)';
  const EARTH_CENTER_FROM_TOP = isMobile ? 'calc(100vh + 22vh)' : 'calc(100vh + 16vh)';

  return (
    <section style={{
      position: 'relative',
      minHeight: '100vh',
      minHeight: '100dvh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'radial-gradient(ellipse at 50% 100%, #0a1f4a 0%, #050c1f 45%, #000 85%)',
      overflow: 'hidden',
    }}>
      <Stars isMobile={isMobile} />

      <div style={{
        position: 'absolute',
        left: '50%',
        top: EARTH_CENTER_FROM_TOP,
        transform: 'translate3d(-50%, -50%, 0)',
        width: EARTH_DIAMETER,
        height: EARTH_DIAMETER,
        borderRadius: '50%',
        overflow: 'hidden',
        boxShadow: '0 0 140px rgba(74, 144, 226, 0.45), inset -60px -60px 140px rgba(0,0,0,0.82), inset 0 0 100px rgba(74, 144, 226, 0.3)',
        background: '#061538',
        willChange: 'transform',
      }}>
        <div style={{
          position: 'absolute',
          top: 0, left: 0,
          width: '100%', height: '100%',
          overflow: 'hidden',
          maskImage: 'radial-gradient(circle at 38% 32%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.98) 55%, rgba(0,0,0,0.82) 82%, rgba(0,0,0,0.4) 100%)',
          WebkitMaskImage: 'radial-gradient(circle at 38% 32%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.98) 55%, rgba(0,0,0,0.82) 82%, rgba(0,0,0,0.4) 100%)',
        }}>
          <div style={{
            position: 'absolute',
            top: 0, left: 0,
            width: '200%', height: '100%',
            backgroundImage: `url(${CONFIG.assets.earth})`,
            backgroundSize: '50% 100%',
            backgroundRepeat: 'repeat-x',
            animation: `earthRotate ${CONFIG.animation.earthRotate}s linear infinite`,
            willChange: 'transform',
            transform: 'translate3d(0, 0, 0)',
            backfaceVisibility: 'hidden',
          }}/>
        </div>
        <div style={{
          position: 'absolute', inset: 0, borderRadius: '50%',
          boxShadow: 'inset 0 0 70px rgba(74, 144, 226, 0.55)',
          pointerEvents: 'none',
        }}/>
      </div>

      <Orbit earthDiameter={EARTH_DIAMETER} centerFromTop={EARTH_CENTER_FROM_TOP} isMobile={isMobile} />

      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', color: '#fff', padding: '0 20px', marginTop: isMobile ? '-10vh' : '-6vh' }}>
        <h1 style={{ fontSize: 'clamp(32px, 8vw, 56px)', fontWeight: 700, margin: 0, lineHeight: 1.2, letterSpacing: '0.02em' }}>
          {CONFIG.hero.title}
        </h1>
        <h2 style={{ fontSize: 'clamp(20px, 5.2vw, 36px)', fontWeight: 600, margin: '8px 0 20px', lineHeight: 1.3 }}>
          {CONFIG.hero.subtitle}
        </h2>
        <p style={{
          fontSize: 'clamp(12px, 3.2vw, 14px)',
          color: 'rgba(255,255,255,0.65)',
          margin: '0 auto 28px',
          maxWidth: 600,
          lineHeight: 1.6,
          padding: '0 8px',
        }}>
          {CONFIG.hero.description}
        </p>
        <button onClick={() => go('login')} className="blue-cta" style={{
          background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
          color: '#fff', border: 'none', borderRadius: 28,
          padding: isMobile ? '14px 44px' : '12px 36px',
          fontSize: isMobile ? 16 : 15, fontWeight: 500,
          cursor: 'pointer', boxShadow: '0 8px 24px rgba(59, 130, 246, 0.5)',
        }}>
          {CONFIG.hero.cta}
        </button>
      </div>

      <style>{`
        @keyframes earthRotate {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(-50%, 0, 0); }
        }
      `}</style>
    </section>
  );
}

function Orbit({ earthDiameter, centerFromTop, isMobile }) {
  const orbitSize = `calc(${earthDiameter} + ${isMobile ? 80 : 120}px)`;
  const innerOrbitSize = `calc(${earthDiameter} + ${isMobile ? 40 : 60}px)`;

  return (
    <>
      <svg style={{
        position: 'absolute',
        top: centerFromTop, left: '50%',
        transform: 'translate3d(-50%, -50%, 0)',
        width: orbitSize, height: orbitSize,
        pointerEvents: 'none', zIndex: 5,
      }} viewBox="0 0 100 100" preserveAspectRatio="none">
        <circle cx="50" cy="50" r="49.5" fill="none" stroke="rgba(255,255,255,0.22)" strokeDasharray="0.6 0.9" vectorEffect="non-scaling-stroke" strokeWidth="0.1" />
      </svg>
      <svg style={{
        position: 'absolute',
        top: centerFromTop, left: '50%',
        transform: 'translate3d(-50%, -50%, 0)',
        width: innerOrbitSize, height: innerOrbitSize,
        pointerEvents: 'none', zIndex: 5,
      }} viewBox="0 0 100 100" preserveAspectRatio="none">
        <circle cx="50" cy="50" r="49.5" fill="none" stroke="rgba(255,255,255,0.1)" strokeDasharray="0.6 0.9" vectorEffect="non-scaling-stroke" strokeWidth="0.1" />
      </svg>
    </>
  );
}

function Stars({ isMobile }) {
  const canvasRef = useRef(null);
  const count = isMobile ? 50 : 120;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = 0, height = 0;
    const resize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const stars = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: (Math.random() * 2 + 0.4) / 2,
      base: Math.random() * 0.8 + 0.2,
      phase: Math.random() * Math.PI * 2,
    }));

    let raf = 0;
    let running = true;
    const draw = (t) => {
      if (!running) return;
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        const twinkle = 0.2 + 0.8 * (0.5 + 0.5 * Math.sin(t * 0.002 + s.phase));
        ctx.globalAlpha = s.base * twinkle;
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    const onVis = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        raf = requestAnimationFrame(draw);
      }
    };
    document.addEventListener('visibilitychange', onVis);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [count]);

  return (
    <canvas ref={canvasRef} style={{
      position: 'absolute', inset: 0,
      width: '100%', height: '100%',
      pointerEvents: 'none',
    }}/>
  );
}

// ==========================================================
// 平台卡片
// ==========================================================
function PlatformSection({ dark, isMobile }) {
  return (
    <section style={{ padding: isMobile ? '60px 16px' : '100px 24px', background: dark ? '#0a0d14' : '#f5f7fa' }}>
      <div style={{ textAlign: 'center', marginBottom: isMobile ? 32 : 48 }}>
        <h2 style={{ fontSize: 'clamp(22px, 5vw, 28px)', fontWeight: 700, margin: 0, color: dark ? '#fff' : '#1a1a1a' }}>全终端支持</h2>
        <h3 style={{ fontSize: 'clamp(18px, 4.5vw, 24px)', fontWeight: 700, margin: '4px 0 12px', color: dark ? '#fff' : '#1a1a1a' }}>点击下方图标下载</h3>
        <p style={{ fontSize: 'clamp(12px, 3.2vw, 14px)', color: dark ? 'rgba(255,255,255,0.5)' : '#666', margin: 0, lineHeight: 1.6 }}>
          自研客户端，支持 Windows、MacOS、iOS、Android 等全终端设备，全面覆盖
        </p>
      </div>
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
        gap: isMobile ? 14 : 20,
      }}>
        {platforms.map((p) => <PlatformCard key={p.id} p={p} isMobile={isMobile} />)}
      </div>
    </section>
  );
}

function PlatformCard({ p, isMobile }) {
  const textColor = '#1a1a1a';
  const subColor = 'rgba(0,0,0,0.6)';
  const TagIcon = () => {
    if (p.id === 'mac') return <Monitor size={22} color={textColor}/>;
    if (p.id === 'ios') return <Apple size={22} color={textColor}/>;
    if (p.id === 'and') return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={textColor}>
        <path d="M17.523 15.34c-.55 0-.99-.45-.99-1s.44-1 .99-1c.55 0 .99.45.99 1s-.44 1-.99 1m-11.04 0c-.55 0-.99-.45-.99-1s.44-1 .99-1c.55 0 .99.45.99 1s-.44 1-.99 1m11.4-6.02l2-3.46a.42.42 0 00-.72-.42l-2.02 3.5a12.6 12.6 0 00-5.15-1.1 12.6 12.6 0 00-5.14 1.1L4.84 5.45a.42.42 0 00-.72.42l2 3.46C2.69 11.19.34 14.66 0 18.76h24c-.34-4.1-2.69-7.57-6.12-9.44"/>
      </svg>
    );
    if (p.id === 'win') return <AppWindow size={22} color={textColor}/>;
  };
  return (
    <div onClick={() => go(p.link)} style={{
      position: 'relative', aspectRatio: isMobile ? '2 / 1' : '2.2 / 1',
      borderRadius: isMobile ? 16 : 20, background: p.bg,
      padding: isMobile ? 20 : 24, overflow: 'hidden', cursor: 'pointer',
      transition: 'transform 0.3s',
    }}
    onMouseEnter={(e) => !isMobile && (e.currentTarget.style.transform = 'translateY(-4px)')}
    onMouseLeave={(e) => !isMobile && (e.currentTarget.style.transform = 'translateY(0)')}>
      <div style={{
        position: 'absolute', top: isMobile ? 16 : 20, left: isMobile ? 16 : 20,
        width: 40, height: 32, borderRadius: 8,
        background: 'rgba(0,0,0,0.08)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <TagIcon />
      </div>
      <div style={{ position: 'absolute', top: isMobile ? 22 : 28, right: isMobile ? 16 : 24, fontSize: isMobile ? 22 : 28, fontWeight: 700, color: textColor }}>
        {p.tag}
      </div>
      <div style={{
        position: 'absolute', right: '-5%', bottom: '-15%',
        width: '55%', height: '130%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <img src={CONFIG.assets[p.image]} alt={p.tag}
          decoding="async" loading="lazy"
          style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
          onError={(e) => { e.target.style.visibility = 'hidden'; }}
        />
      </div>
      <div style={{ position: 'absolute', bottom: isMobile ? 18 : 22, left: isMobile ? 18 : 24, right: 70, color: textColor }}>
        <div style={{ fontSize: isMobile ? 14 : 16, fontWeight: 600 }}>{p.desc}</div>
        <div style={{ fontSize: isMobile ? 11 : 12, color: subColor, marginTop: 4 }}>{p.subtitle}</div>
      </div>
      <div style={{
        position: 'absolute', bottom: isMobile ? 16 : 20, right: isMobile ? 16 : 24,
        width: 40, height: 32, borderRadius: 8,
        background: 'rgba(0,0,0,0.1)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Download size={16} color={textColor}/>
      </div>
    </div>
  );
}

// ==========================================================
// 流媒体墙
// ==========================================================
function StreamingSection({ dark, isMobile }) {
  return (
    <section style={{
      position: 'relative',
      padding: isMobile ? '80px 16px' : '100px 24px',
      overflow: 'hidden',
      background: dark ? '#0a0d14' : '#f5f7fa',
      height: isMobile ? 340 : 420,
    }}>
      {/* PC端限制宽度 + 圆角裁剪；手机端保持全宽 */}
      <div style={{
        position: 'absolute',
        top: 0, bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: isMobile ? '100%' : 'min(1200px, calc(100% - 80px))',
        overflow: 'hidden',
        borderRadius: isMobile ? 0 : 20,
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          overflow: 'hidden',
          perspective: isMobile ? '800px' : '1000px',
          perspectiveOrigin: '50% 50%',
        }}>
          <div style={{
            position: 'absolute',
            top: '-15%', left: '-5%',
            width: '110%', height: '130%',
            transform: isMobile ? 'rotateX(16deg) rotateZ(-4deg)' : 'rotateX(20deg) rotateZ(-6deg)',
            transformStyle: 'preserve-3d',
            willChange: 'transform',
            backfaceVisibility: 'hidden',
          }}>
            <div style={{
              width: '200%', height: '100%',
              display: 'flex',
              animation: `appsScroll ${CONFIG.animation.appsScroll}s linear infinite`,
              willChange: 'transform',
            }}>
              <img src={CONFIG.assets.appsWall} alt="" loading="lazy" decoding="async"
                style={{ width: '50%', height: '100%', objectFit: 'cover', flexShrink: 0, display: 'block', transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
              />
              <img src={CONFIG.assets.appsWall} alt="" loading="lazy" decoding="async"
                style={{ width: '50%', height: '100%', objectFit: 'cover', flexShrink: 0, display: 'block', transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
              />
            </div>
          </div>
          <div style={{
            position: 'absolute', inset: 0,
            background: dark
              ? 'radial-gradient(ellipse at center, rgba(10,13,20,0.35) 0%, rgba(10,13,20,0.75) 70%, rgba(10,13,20,0.95) 100%)'
              : 'radial-gradient(ellipse at center, rgba(245,247,250,0.35) 0%, rgba(245,247,250,0.75) 70%, rgba(245,247,250,0.95) 100%)',
          }}/>
        </div>
      </div>

      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: isMobile ? '45px 16px' : '65px 20px' }}>
        <h2 style={{ fontSize: 'clamp(22px, 5vw, 28px)', fontWeight: 700, margin: 0, color: dark ? '#fff' : '#1a1a1a' }}>流媒体全解锁</h2>
        <h3 style={{ fontSize: 'clamp(18px, 4.5vw, 24px)', fontWeight: 700, margin: '4px 0 16px', color: dark ? '#fff' : '#1a1a1a' }}>全球APP无限制自由访问</h3>
        <p style={{ fontSize: 'clamp(12px, 3.2vw, 14px)', color: dark ? 'rgba(255,255,255,0.65)' : '#666', margin: 0, lineHeight: 1.6 }}>
          覆盖全球视频网站，全部解锁，ChatGPT、Telegram、Youtube 等全球 App自由访问
        </p>
      </div>

      <style>{`
        @keyframes appsScroll {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(-50%, 0, 0); }
        }
      `}</style>
    </section>
  );
}

// ==========================================================
// 全球节点
// ==========================================================
function NodesSection({ dark, isMobile }) {
  return (
    <section style={{ padding: isMobile ? '60px 16px' : '80px 24px', background: dark ? '#0a0d14' : '#f5f7fa' }}>
      <div style={{ textAlign: 'center', marginBottom: isMobile ? 28 : 40 }}>
        <h2 style={{ fontSize: 'clamp(20px, 4.8vw, 26px)', fontWeight: 700, margin: 0, color: dark ? '#fff' : '#1a1a1a' }}>全球节点，高速稳定连接</h2>
        <p style={{ fontSize: 'clamp(12px, 3.2vw, 13px)', color: dark ? 'rgba(255,255,255,0.5)' : '#666', margin: '12px 0 0', lineHeight: 1.6 }}>
          全球高速服务器，随时随地享受快速稳定
        </p>
      </div>
      <div style={{
        maxWidth: 900, margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
        gap: isMobile ? 8 : 12,
      }}>
        {countries.map((c, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: isMobile ? '9px 12px' : '10px 14px',
            background: dark ? 'rgba(255,255,255,0.04)' : '#fff',
            border: `1px solid ${dark ? 'rgba(255,255,255,0.1)' : '#e5e7eb'}`,
            borderRadius: 10,
            color: dark ? '#fff' : '#333', fontSize: isMobile ? 12 : 13,
            boxShadow: dark ? '0 2px 8px rgba(0,0,0,0.3)' : 'none',
          }}>
            <span className={`fi fi-${c.code}`} style={{
              width: 24, height: 24, borderRadius: '50%',
              flexShrink: 0,
              border: `1px solid ${dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
            }}/>
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

// ==========================================================
// 中心 AI 球体（圆形裁剪，多层光晕，自旋效果）
// ==========================================================
function FluidSphere({ size = 48 }) {
  const id = useMemo(() => 'fs' + Math.random().toString(36).slice(2, 9), []);
  const isMobile = useIsMobile(768);

  return (
    <div style={{
      width: size, height: size, position: 'relative',
      animation: `${id}breathe 4s ease-in-out infinite`,
    }}>
      {/* 最外层超大光晕 */}
      <div style={{
        position: 'absolute', inset: -18,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(168,85,247,0.25) 0%, rgba(59,130,246,0.15) 40%, transparent 70%)',
        animation: `${id}pulse 3s ease-in-out infinite`,
        pointerEvents: 'none',
        filter: isMobile ? 'none' : 'blur(4px)',
      }}/>

      {/* 中层彩色光晕 */}
      <div style={{
        position: 'absolute', inset: -10,
        borderRadius: '50%',
        background: 'conic-gradient(from 0deg, #3b82f6, #a855f7, #ec4899, #3b82f6)',
        opacity: isMobile ? 0.25 : 0.4,
        animation: `${id}rotate 6s linear infinite`,
        pointerEvents: 'none',
        filter: isMobile ? 'none' : 'blur(6px)',
        willChange: 'transform',
      }}/>

      {/* 球形图片容器（圆形裁剪） */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(59,130,246,0.5), 0 0 0 1px rgba(255,255,255,0.15), inset 0 0 20px rgba(255,255,255,0.1)',
      }}>
        <img
          src={CONFIG.assets.ai}
          alt="AI"
          decoding="async" loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            animation: `${id}rotate 20s linear infinite`,
          }}
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.parentElement.style.background = 'radial-gradient(circle at 35% 35%, #c084fc 0%, #3b82f6 40%, #ec4899 80%)';
          }}
        />

        {/* 顶部高光 */}
        <div style={{
          position: 'absolute',
          top: '8%', left: '20%',
          width: '35%', height: '25%',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(255,255,255,0.6) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}/>
      </div>

      <style>{`
        @keyframes ${id}breathe {
          0%, 100% { transform: scale(1); }
          50%      { transform: scale(1.08); }
        }
        @keyframes ${id}pulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50%      { opacity: 1;   transform: scale(1.15); }
        }
        @keyframes ${id}rotate {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

// ==========================================================
// 隐私保护
// ==========================================================
function PrivacySection({ dark, isMobile }) {
  return (
    <section style={{ padding: isMobile ? '60px 16px' : '100px 24px', background: dark ? '#0a0d14' : '#f5f7fa' }}>
      <div style={{ textAlign: 'center', marginBottom: isMobile ? 40 : 60 }}>
        <h2 style={{ fontSize: 'clamp(20px, 4.8vw, 26px)', fontWeight: 700, margin: 0, color: dark ? '#fff' : '#1a1a1a' }}>隐私保护，安全加密</h2>
        <p style={{ fontSize: 'clamp(12px, 3.2vw, 13px)', color: dark ? 'rgba(255,255,255,0.5)' : '#666', margin: '12px 0 0', lineHeight: 1.6 }}>
          中转节点，隧道加密，保护隐私，安全加密，永不泄露
        </p>
      </div>
      <div style={{
        maxWidth: 1100, margin: '0 auto',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: 'center', justifyContent: 'space-between',
        gap: isMobile ? 16 : 12,
        position: 'relative',
      }}>
        <div style={{
          width: 140, height: 140,
          position: 'relative', flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: `1px dashed ${dark ? 'rgba(255,255,255,0.28)' : 'rgba(0,0,0,0.2)'}`,
          borderRadius: '50%',
          boxShadow: dark ? '0 0 24px rgba(59,130,246,0.08) inset' : 'none',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={dark ? '#fff' : '#333'} strokeWidth="2">
              <rect x="7" y="2" width="10" height="20" rx="2"/>
              <line x1="11" y1="18" x2="13" y2="18"/>
            </svg>
            <span style={{ marginTop: 10, fontSize: 12, color: dark ? 'rgba(255,255,255,0.8)' : '#333', whiteSpace: 'nowrap' }}>
              您的设备
            </span>
          </div>
        </div>

        <Connector dark={dark} vertical={isMobile} />

        <div style={{
          display: 'flex', alignItems: 'stretch',
          padding: isMobile ? '20px 20px' : '24px 28px',
          gap: isMobile ? 22 : 36,
          background: dark
            ? 'linear-gradient(135deg, rgba(34, 211, 150, 0.1), rgba(34, 211, 150, 0.04))'
            : 'rgba(34, 211, 150, 0.06)',
          border: `1px solid ${dark ? 'rgba(34, 211, 150, 0.35)' : 'rgba(34, 211, 150, 0.25)'}`,
          borderRadius: 14,
          position: 'relative', zIndex: 2,
          flexWrap: isMobile ? 'wrap' : 'nowrap',
          justifyContent: 'center',
          boxShadow: dark ? '0 0 30px rgba(34, 211, 150, 0.08)' : 'none',
        }}>
          {[
            { Icon: Rocket, label: '高速中转' },
            { Icon: Lock,   label: '隧道加密' },
            { Icon: Globe,  label: '高防节点' },
          ].map((item, i) => {
            const { Icon, label } = item;
            return (
              <div key={i} style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                minWidth: 70,
              }}>
                <Icon size={isMobile ? 24 : 28} color={dark ? '#fff' : '#333'}/>
                <span style={{ marginTop: 10, fontSize: isMobile ? 11 : 12, color: dark ? 'rgba(255,255,255,0.8)' : '#333', whiteSpace: 'nowrap' }}>{label}</span>
              </div>
            );
          })}
        </div>

        <Connector dark={dark} vertical={isMobile} />

        <OrbitingIcons
          dark={dark}
          centerLabel="海外AI全解锁"
          centerIcon={<FluidSphere size={48} />}
          orbitIcons={[
            CONFIG.assets.orbitIcon1,
            CONFIG.assets.orbitIcon2,
            CONFIG.assets.orbitIcon3,
            CONFIG.assets.orbitIcon4,
            CONFIG.assets.orbitIcon5,
          ].map((src, i) => (
            <img key={i} src={src} alt="" decoding="async" loading="lazy"
              style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
              onError={(e) => {
                e.target.style.background = 'rgba(255,255,255,0.1)';
                e.target.style.border = '1px dashed rgba(255,255,255,0.3)';
              }}
            />
          ))}
          iconSize={30}
          orbitRadius={60}
          duration={16}
          reverse={true}
        />
      </div>
    </section>
  );
}

// ==========================================================
// 环绕图标容器（requestAnimationFrame 驱动）
// ==========================================================
function OrbitingIcons({ dark, centerLabel, centerIcon, orbitIcons, iconSize, orbitRadius, duration, reverse }) {
  const containerSize = orbitRadius * 2 + iconSize + 40;
  const iconRefs = useRef([]);
  const rafRef = useRef(0);
  const startTimeRef = useRef(0);
  const n = orbitIcons.length;

  const getInitialPos = (i) => {
    const center = containerSize / 2;
    const angleDeg = (360 / n) * i - 90;
    const rad = angleDeg * Math.PI / 180;
    const x = center + orbitRadius * Math.cos(rad) - iconSize / 2;
    const y = center + orbitRadius * Math.sin(rad) - iconSize / 2;
    return { x, y };
  };

  useEffect(() => {
    const durationMs = duration * 1000;
    const dir = reverse ? -1 : 1;
    const center = containerSize / 2;
    let pausedElapsed = 0;
    let running = true;

    const tick = (now) => {
      if (!running) return;
      if (!startTimeRef.current) startTimeRef.current = now - pausedElapsed;
      const elapsed = (now - startTimeRef.current) % durationMs;
      const baseAngle = (elapsed / durationMs) * 360 * dir;

      for (let i = 0; i < n; i++) {
        const el = iconRefs.current[i];
        if (!el) continue;
        const angleDeg = baseAngle + (360 / n) * i - 90;
        const rad = angleDeg * Math.PI / 180;
        const x = center + orbitRadius * Math.cos(rad) - iconSize / 2;
        const y = center + orbitRadius * Math.sin(rad) - iconSize / 2;
        el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    const onVis = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(rafRef.current);
        if (startTimeRef.current) {
          pausedElapsed = (performance.now() - startTimeRef.current) % durationMs;
        }
      } else if (!running) {
        running = true;
        startTimeRef.current = 0;
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    document.addEventListener('visibilitychange', onVis);

    return () => {
      running = false;
      cancelAnimationFrame(rafRef.current);
      document.removeEventListener('visibilitychange', onVis);
      startTimeRef.current = 0;
    };
  }, [n, orbitRadius, iconSize, duration, reverse, containerSize]);

  return (
    <div style={{
      width: containerSize, height: containerSize,
      position: 'relative', flexShrink: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{
        position: 'absolute',
        width: orbitRadius * 2, height: orbitRadius * 2,
        borderRadius: '50%',
        border: `1px dashed ${dark ? 'rgba(255,255,255,0.28)' : 'rgba(0,0,0,0.2)'}`,
        boxShadow: dark ? '0 0 24px rgba(59,130,246,0.08) inset' : 'none',
      }}/>

      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2,
      }}>
        {centerIcon}
        <span style={{ marginTop: 10, fontSize: 12, color: dark ? 'rgba(255,255,255,0.85)' : '#333', whiteSpace: 'nowrap' }}>
          {centerLabel}
        </span>
      </div>

      {orbitIcons.map((icon, i) => {
        const { x, y } = getInitialPos(i);
        return (
          <div
            key={i}
            ref={(el) => (iconRefs.current[i] = el)}
            style={{
              position: 'absolute',
              top: 0, left: 0,
              width: iconSize, height: iconSize,
              transform: `translate3d(${x}px, ${y}px, 0)`,
              background: '#fff',
              borderRadius: 8,
              padding: 3,
              boxShadow: dark
                ? '0 4px 12px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1)'
                : '0 3px 10px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.04)',
              pointerEvents: 'none',
              willChange: 'transform',
            }}
          >
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icon}</div>
          </div>
        );
      })}
    </div>
  );
}

// 连接线
function Connector({ dark, vertical }) {
  if (vertical) {
    return (
      <div style={{
        width: 2, height: 50,
        position: 'relative',
        background: `linear-gradient(180deg, transparent, ${dark ? 'rgba(34, 211, 150, 0.65)' : 'rgba(34, 211, 150, 0.7)'}, transparent)`,
      }}>
        <div style={{
          position: 'absolute',
          left: '50%', top: 0,
          transform: 'translateX(-50%)',
          fontSize: 14, color: '#22d396',
          animation: 'boltFlowV 2.5s linear infinite',
          filter: dark
            ? 'drop-shadow(0 0 8px #22d396) drop-shadow(0 0 3px #22d396)'
            : 'drop-shadow(0 0 4px #22d396)',
        }}>⚡</div>
        <style>{`
          @keyframes boltFlowV {
            0%   { top: 0;    opacity: 0; }
            15%  { opacity: 1; }
            85%  { opacity: 1; }
            100% { top: 100%; opacity: 0; }
          }
        `}</style>
      </div>
    );
  }
  return (
    <div style={{
      flex: 1, height: 2, position: 'relative',
      background: `linear-gradient(90deg, transparent, ${dark ? 'rgba(34, 211, 150, 0.65)' : 'rgba(34, 211, 150, 0.7)'}, transparent)`,
    }}>
      <div style={{
        position: 'absolute',
        top: '50%', left: 0,
        transform: 'translateY(-50%)',
        fontSize: 16, color: '#22d396',
        animation: 'boltFlow 2.5s linear infinite',
        filter: dark
          ? 'drop-shadow(0 0 8px #22d396) drop-shadow(0 0 3px #22d396)'
          : 'drop-shadow(0 0 4px #22d396)',
      }}>⚡</div>
      <style>{`
        @keyframes boltFlow {
          0%   { left: 0;    opacity: 0; }
          15%  { opacity: 1; }
          85%  { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
}

// ==========================================================
// 套餐
// ==========================================================
function PlansSection({ dark, isMobile }) {
  const [tab, setTab] = useState('subscribe');
  return (
    <section style={{ padding: isMobile ? '60px 16px' : '100px 24px', background: dark ? '#0a0d14' : '#f5f7fa' }}>
      <div style={{ textAlign: 'center', marginBottom: 12 }}>
        <h2 style={{ fontSize: 'clamp(22px, 5vw, 28px)', fontWeight: 700, margin: 0, color: dark ? '#fff' : '#1a1a1a' }}>灵活套餐，按需订阅</h2>
        <p style={{ fontSize: 'clamp(12px, 3.2vw, 13px)', color: dark ? 'rgba(255,255,255,0.5)' : '#666', margin: '12px 0 24px', lineHeight: 1.6 }}>
          全球 IEPL 专线节点，按月/季度/年度订阅套餐，享受更多优惠
        </p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: isMobile ? 28 : 40 }}>
        <div style={{
          display: 'flex', padding: 4,
          background: dark ? 'rgba(255,255,255,0.05)' : '#fff',
          border: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : '#e5e7eb'}`,
          borderRadius: 10,
        }}>
          {[{ k: 'subscribe', l: '周期订阅' }, { k: 'usage', l: '按量付费' }].map((t) => (
            <button key={t.k} onClick={() => setTab(t.k)} style={{
              padding: isMobile ? '8px 18px' : '8px 20px', fontSize: 13,
              background: tab === t.k ? 'rgba(34, 211, 150, 0.15)' : 'transparent',
              color: tab === t.k ? '#22d396' : (dark ? 'rgba(255,255,255,0.6)' : '#666'),
              border: tab === t.k ? '1px solid #22d396' : '1px solid transparent',
              borderRadius: 6, cursor: 'pointer', fontWeight: 500,
            }}>{t.l}</button>
          ))}
        </div>
      </div>
      <div style={{
        maxWidth: 1100, margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
        gap: isMobile ? 14 : 20,
      }}>
        {plans.map((p, i) => <PlanCard key={i} p={p} dark={dark} isMobile={isMobile}/>)}
      </div>
    </section>
  );
}

function PlanCard({ p, dark, isMobile }) {
  return (
    <div style={{
      padding: isMobile ? 22 : 28,
      background: dark
        ? 'linear-gradient(180deg, rgba(40,50,45,0.5) 0%, rgba(20,25,30,0.4) 100%)'
        : 'linear-gradient(180deg, #fff 0%, #f0f5f3 100%)',
      border: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : '#e5e7eb'}`,
      borderRadius: 14, color: dark ? '#fff' : '#1a1a1a',
    }}>
      <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>{p.name}</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 4 }}>
        <span style={{ fontSize: 13 }}>¥</span>
        <span style={{ fontSize: 30, fontWeight: 700 }}>{p.price}</span>
        <span style={{ fontSize: 12, color: dark ? 'rgba(255,255,255,0.5)' : '#666' }}>元 / 月</span>
      </div>
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        padding: '14px 0', fontSize: 12,
        borderBottom: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : '#e5e7eb'}`,
        marginBottom: 16,
      }}>
        <span style={{ color: dark ? 'rgba(255,255,255,0.6)' : '#666' }}>套餐特点:</span>
        <span style={{ color: '#22d396' }}>{p.save}</span>
      </div>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, marginBottom: 24 }}>
        {p.features.map((f, i) => (
          <li key={i} style={{
            display: 'flex', alignItems: 'center', gap: 8,
            fontSize: 12, padding: '6px 0',
            color: dark ? 'rgba(255,255,255,0.75)' : '#333',
          }}>
            <Check size={14} color="#22d396" style={{ flexShrink: 0 }}/>
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <button onClick={() => go('login')} style={{
        width: '100%', padding: isMobile ? '12px' : '10px',
        background: 'transparent',
        color: dark ? '#fff' : '#1a1a1a',
        border: `1px solid ${dark ? 'rgba(255,255,255,0.2)' : '#d1d5db'}`,
        borderRadius: 6, fontSize: isMobile ? 14 : 13, cursor: 'pointer', fontWeight: 500,
      }}>立即购买</button>
    </div>
  );
}

// ==========================================================
// 客服 + 页脚
// ==========================================================
function SupportSection({ dark, isMobile }) {
  return (
    <section style={{ padding: isMobile ? '60px 16px' : '80px 24px', background: dark ? '#0a0d14' : '#f5f7fa', textAlign: 'center' }}>
      <h2 style={{ fontSize: 'clamp(20px, 4.6vw, 24px)', fontWeight: 700, margin: 0, color: dark ? '#fff' : '#1a1a1a' }}>7x24 小时极速响应客服</h2>
      <p style={{ fontSize: 'clamp(12px, 3.2vw, 13px)', color: dark ? 'rgba(255,255,255,0.5)' : '#666', margin: '12px 0 28px', lineHeight: 1.6 }}>
        有任何问题，多种联系方式联系，网络工程师随时待命，随传随到，永不失联的 VIP 服务
      </p>
      <button onClick={() => go('support')} className="blue-cta" style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        padding: isMobile ? '12px 28px' : '10px 24px',
        background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
        color: '#fff', border: 'none', borderRadius: 24,
        fontSize: isMobile ? 15 : 14, fontWeight: 500, cursor: 'pointer',
        boxShadow: '0 6px 20px rgba(59, 130, 246, 0.5)',
      }}>
        <MessageCircle size={16}/>联系客服
      </button>
    </section>
  );
}

function Footer({ dark, isMobile }) {
  return (
    <footer style={{
      padding: isMobile ? '24px 16px' : '28px 24px',
      background: dark ? '#05070c' : '#eef0f3',
      borderTop: `1px solid ${dark ? 'rgba(255,255,255,0.05)' : '#e5e7eb'}`,
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      justifyContent: 'space-between', alignItems: 'center',
      flexWrap: 'wrap', gap: 12,
      color: dark ? 'rgba(255,255,255,0.4)' : '#666', fontSize: 12,
      textAlign: 'center',
    }}>
      <div>© 2025 {CONFIG.brandName} All Rights Reserved</div>
      <div style={{ display: 'flex', gap: isMobile ? 16 : 24, flexWrap: 'wrap', justifyContent: 'center' }}>
        <button onClick={() => go('backup')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', fontSize: 12 }}>备用站点</button>
        <button onClick={() => go('telegram')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', fontSize: 12 }}>加入 Telegram 频道</button>
        <button onClick={() => go('support')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', fontSize: 12 }}>联系 Telegram 客服</button>
      </div>
    </footer>
  );
}

// ==========================================================
// 主组件
// ==========================================================
export default function App() {
  const [dark, setDark] = useState(true);
  const isMobile = useIsMobile(768);

  return (
    <div style={{
      minHeight: '100vh',
      minHeight: '100dvh',
      background: dark
        ? 'linear-gradient(180deg, #0a0d14 0%, #0d1220 50%, #0a0d14 100%)'
        : '#f5f7fa',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif',
    }}>
      <Navbar dark={dark} onToggle={() => setDark(!dark)} isMobile={isMobile} />
      <Hero isMobile={isMobile} />
      <PlatformSection dark={dark} isMobile={isMobile} />
      <StreamingSection dark={dark} isMobile={isMobile} />
      <NodesSection dark={dark} isMobile={isMobile} />
      <PrivacySection dark={dark} isMobile={isMobile} />
      {CONFIG.features.showPlansSection && (
        <PlansSection dark={dark} isMobile={isMobile} />
      )}
      <SupportSection dark={dark} isMobile={isMobile} />
      <Footer dark={dark} isMobile={isMobile} />

      <button onClick={() => go('support')} className="blue-cta blue-cta-round" style={{
        position: 'fixed',
        right: isMobile ? 16 : 24,
        bottom: isMobile ? 16 : 24,
        zIndex: 200,
        width: 48, height: 48, borderRadius: '50%',
        background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
        border: 'none', color: '#fff', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 8px 24px rgba(59, 130, 246, 0.5)',
      }}>
        <MessageCircle size={22}/>
      </button>
    </div>
  );
}
