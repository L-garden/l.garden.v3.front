// 시즌 장식: 반투명한 작은 조각들이 판 전체를 살랑살랑 떠다닌다(메뉴 위로도 지나감, 클릭 등은 막지 않음).
// ── 설정: 슬랙봇은 이 줄만 고친다 ──
//   'auto' = 날짜에 맞춰 자동 / 'off' = 끔 / 테마 이름 = 그 테마로 고정
const SEASON = { tv: 'auto', print: 'off' };

// ── 조각 모양 (24x24 SVG) ──
const svg = body => `<svg viewBox="0 0 24 24" width="100%" height="100%">${body}</svg>`;
const S = {
  flake: c => svg(`<g stroke="${c}" stroke-width="1.6" stroke-linecap="round"><path d="M12 2v20M3.3 7l17.4 10M3.3 17l17.4-10"/><path d="M9.5 4l2.5 2 2.5-2M9.5 20l2.5-2 2.5 2"/></g>`),
  dot: c => svg(`<circle cx="12" cy="12" r="5" fill="${c}"/>`),
  petal: c => svg(`<path d="M12 3c5 0 7 6 0 18C5 9 7 3 12 3z" fill="${c}"/>`),
  maple: c => svg(`<path d="M12 2l2 5 4-2-1 5 5 1-4 3 2 4-5-1-1 5-2-5-2 5-1-5-5 1 2-4-4-3 5-1-1-5 4 2z" fill="${c}"/>`),
  ginkgo: c => svg(`<path d="M12 21v-7M12 14C4 12 3 6 4 4c3 3 5 1 8 3 3-2 5 0 8-3 1 2 0 8-8 10z" fill="${c}" stroke="${c}"/>`),
  heart: c => svg(`<path d="M12 21C3 15 2 9 6 6.5c2.5-1.5 5 0 6 2 1-2 3.5-3.5 6-2 4 2.5 3 8.5-6 14.5z" fill="${c}"/>`),
  star: c => svg(`<path d="M12 1l2.6 8.4L23 12l-8.4 2.6L12 23l-2.6-8.4L1 12l8.4-2.6z" fill="${c}"/>`),
  lantern: c => svg(`<path d="M12 1v3" stroke="#57595b"/><path d="M5 9q7-7 14 0v7q-7 6-14 0z" fill="${c}"/><path d="M5 12.5h14M12 5v15" stroke="#fff" opacity=".5"/><path d="M10 20l-1 3M14 20l1 3" stroke="#e8a900"/>`),
  pouch: c => svg(`<path d="M8 5q4 2 8 0l3 6q3 10-7 11C2 21 5 11 8 5z" fill="${c}"/><path d="M7 6.5h10" stroke="#ffcf4a" stroke-width="2" stroke-linecap="round"/>`),
  coin: () => svg(`<circle cx="12" cy="12" r="9" fill="#ffcf4a" stroke="#d9a400" stroke-width="1.5"/><rect x="9.5" y="9.5" width="5" height="5" fill="#fff"/>`),
  ornament: c => svg(`<rect x="10" y="2" width="4" height="3" fill="#c9a227"/><circle cx="12" cy="14" r="8" fill="${c}"/><path d="M6 12q6 3 12 0" stroke="#fff" opacity=".6" fill="none"/>`),
  pumpkin: () => svg(`<path d="M12 6q0-3 3-4" stroke="#4f9d58" stroke-width="2" fill="none"/><ellipse cx="8" cy="14" rx="6" ry="7" fill="#e8742f"/><ellipse cx="16" cy="14" rx="6" ry="7" fill="#e8742f"/><ellipse cx="12" cy="14" rx="5" ry="7.5" fill="#ff894f"/>`),
  bat: c => svg(`<path d="M12 9c-1.5 0-2.5 1.5-3 2.5C7 9.5 4 9.5 1 11c2 .5 3 2.5 3 4.5 2-1.5 4-1.5 5.5 0 .5-1 1.5-1.5 2.5-1.5s2 .5 2.5 1.5c1.5-1.5 3.5-1.5 5.5 0 0-2 1-4 3-4.5-3-1.5-6-1.5-8 .5-.5-1-1.5-2.5-3-2.5z" fill="${c}"/>`),
  mugunghwa: () => svg(`<g fill="#f3a6bd">${[0, 72, 144, 216, 288].map(r => `<ellipse cx="12" cy="6" rx="4" ry="6" transform="rotate(${r} 12 12)"/>`).join('')}</g><circle cx="12" cy="12" r="3" fill="#c2185b"/>`),
  carnation: c => svg(`<path d="M12 22v-9" stroke="#4f9d58" stroke-width="1.5"/><path d="M4 9q1-5 4-4 1-4 4-1 3-3 4 1 3-1 4 4-2 5-8 5T4 9z" fill="${c}"/>`),
  pepero: c => svg(`<rect x="10.5" y="1" width="3" height="22" rx="1.5" fill="#e8d5b0"/><rect x="10" y="1" width="4" height="14" rx="2" fill="${c}"/>`),
  bubble: c => svg(`<circle cx="12" cy="12" r="8" fill="none" stroke="${c}" stroke-width="1.6"/><path d="M8 9q1-2 3-2" stroke="${c}" stroke-width="1.4" fill="none"/>`),
  jamo: (c, ch) => svg(`<text x="12" y="19" text-anchor="middle" font-size="20" font-family="Maplestory, sans-serif" fill="${c}">${ch}</text>`),
};

// ── 테마: motion = fall(내려옴) | rise(떠오름) | float(가로로 떠다님), twinkle = 반짝임 ──
const THEMES = {
  spring: { motion: 'fall', sprites: [S.petal('#f3a6bd'), S.petal('#f7c6d4'), S.petal('#fbe0e8')] },
  summer: { motion: 'rise', sprites: [S.bubble('#77bef0'), S.bubble('#9fd0f2'), S.star('#ffcf4a')], twinkle: true },
  snow: { motion: 'fall', sprites: [S.flake('#8cc4ec'), S.flake('#b5daf5'), S.dot('#c8e4f7')] },
  seollal: { motion: 'fall', sprites: [S.pouch('#fa6868'), S.pouch('#77bef0'), S.coin(), S.star('#ffcf4a')], twinkle: true },
  chuseok: { motion: 'fall', sprites: [S.maple('#ff894f'), S.maple('#fa6868'), S.ginkgo('#ffcf4a')] },
  buddha: { motion: 'rise', sprites: [S.lantern('#fa6868'), S.lantern('#64bb68'), S.lantern('#ffcf4a'), S.lantern('#f3a6bd')] },
  valentine: { motion: 'rise', sprites: [S.heart('#fa6868'), S.heart('#f3a6bd'), S.heart('#e04f5f')] },
  taegeuk: { motion: 'fall', sprites: [S.mugunghwa(), S.petal('#f3a6bd'), S.dot('#0047a0'), S.dot('#cd2e3a')] },
  family: { motion: 'fall', sprites: [S.carnation('#fa6868'), S.carnation('#f3a6bd'), S.heart('#f3a6bd')] },
  hangul: { motion: 'float', sprites: ['ㄱ', 'ㄴ', 'ㄷ', 'ㅎ', 'ㅏ', 'ㅑ', 'ㅗ'].map((ch, i) => S.jamo(['#64bb68', '#77bef0', '#ff894f', '#fa6868'][i % 4], ch)) },
  halloween: { motion: 'float', sprites: [S.bat('#3b2e4a'), S.bat('#57595b'), S.pumpkin(), S.star('#ff894f')], twinkle: true },
  pepero: { motion: 'fall', sprites: [S.pepero('#7b542f'), S.pepero('#f3a6bd'), S.pepero('#57595b')] },
  christmas: { motion: 'fall', sprites: [S.flake('#8cc4ec'), S.ornament('#fa6868'), S.ornament('#64bb68'), S.star('#ffcf4a')], twinkle: true },
};

// 음력 명절의 양력 날짜 — 해마다 이어서 적을 것. [이름, 날짜들, 며칠 전부터, 며칠 후까지]
const LUNAR = [
  ['seollal', ['2027-02-07', '2028-01-26', '2029-02-13', '2030-02-03'], 7, 2],
  ['chuseok', ['2026-09-25', '2027-09-15', '2028-10-03', '2029-09-22', '2030-09-12'], 7, 2],
  ['buddha', ['2026-05-24', '2027-05-13', '2028-05-02', '2029-05-20', '2030-05-09'], 7, 0],
];
// 양력 기념일·계절. 위에 있을수록 우선. [이름, 시작 MM-DD, 끝 MM-DD]  (현충일 6/6은 일부러 장식 없음)
const FIXED = [
  ['taegeuk', '02-27', '03-01'], ['taegeuk', '08-12', '08-15'],
  ['valentine', '02-07', '02-14'], ['valentine', '03-07', '03-14'],
  ['family', '05-01', '05-08'], ['hangul', '10-06', '10-09'], ['halloween', '10-17', '10-31'],
  ['pepero', '11-07', '11-11'], ['christmas', '12-01', '12-25'],
  ['spring', '03-20', '04-20'], ['summer', '07-01', '08-31'], ['snow', '12-26', '12-31'], ['snow', '01-01', '02-28'],
];

function seasonFor(date) {
  const day = d => Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 864e5);
  const today = day(date);
  for (const [name, dates, before, after] of LUNAR)
    for (const s of dates) { const t = day(new Date(s + 'T00:00')); if (today >= t - before && today <= t + after) return name; }
  const md = `${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  return FIXED.find(([, from, to]) => md >= from && md <= to)?.[0] || '';
}

const rnd = (a, b) => a + Math.random() * (b - a);

function scatter(board, theme) {
  board.querySelector('.season')?.remove();
  const t = THEMES[theme];
  if (!t) return;
  const layer = Object.assign(document.createElement('div'), { className: 'season' });
  layer.setAttribute('aria-hidden', 'true');
  const W = board.offsetWidth, H = board.offsetHeight;
  layer.style.setProperty('--h', H + 'px');
  // ponytail: 조각 수는 판 넓이에 비례(약 7만 px²당 1개). 너무 많거나 적으면 이 숫자만 조정.
  const count = Math.round((W * H) / 70000);
  for (let i = 0; i < count; i++) {
    const p = document.createElement('i');
    p.className = `p ${t.motion}${t.twinkle && i % 3 === 0 ? ' tw' : ''}`;
    const dur = t.motion === 'float' ? rnd(18, 30) : rnd(14, 26);
    p.style.cssText = [
      `--x:${rnd(0, W)}px`, `--y:${rnd(0, H)}px`, `--sz:${rnd(14, 30)}px`, `--o:${rnd(0.3, 0.55).toFixed(2)}`,
      `--dur:${dur}s`, `--delay:${-rnd(0, dur)}s`, `--dx:${rnd(-120, 120)}px`, `--rot:${rnd(-360, 360)}deg`,
      `--sw:${rnd(10, 30)}px`, `--swdur:${rnd(2.5, 5)}s`,
    ].join(';');
    p.innerHTML = `<span>${t.sprites[i % t.sprites.length]}</span>`;
    layer.append(p);
  }
  board.append(layer);
}

function applySeason() {
  const board = document.querySelector('.board');
  // 미리보기용: ?season=christmas 또는 #season=christmas
  const forced = new URLSearchParams(location.search).get('season') || location.hash.match(/season=(\w+)/)?.[1];
  const mode = forced || SEASON[board.dataset.kind] || 'off';
  const theme = mode === 'auto' ? seasonFor(new Date()) : mode in THEMES ? mode : '';
  if (board.dataset.season === theme) return;
  board.dataset.season = theme;
  scatter(board, theme);
}
applySeason();
setInterval(applySeason, 3600e3); // TV는 켜 둔 채로 날짜가 바뀌므로 매시간 다시 고른다
