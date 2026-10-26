// 시즌 장식(움직이는 테두리·일러스트). 메뉴 내용과 겹치지 않는 빈 칸(.season .slot)에만 그려진다.
// ── 설정: 슬랙봇은 이 줄만 고친다 ──
//   'auto' = 날짜에 맞춰 자동 / 'off' = 끔 / 테마 이름 = 그 테마로 고정
const SEASON = { tv: 'auto', print: 'off' };

const THEMES = {
  spring: '봄이 왔어요', summer: '시원한 여름 되세요', snow: '따뜻한 겨울 보내세요',
  seollal: '새해 복 많이 받으세요', chuseok: '풍성한 한가위 보내세요', buddha: '부처님 오신 날을 축하합니다',
  valentine: '달콤한 하루 보내세요', taegeuk: '그날을 기억합니다', family: '사랑하고 감사합니다',
  hangul: '한글날을 기념합니다', halloween: 'Happy Halloween', pepero: 'Happy Pepero Day', christmas: 'Merry Christmas',
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

function applySeason() {
  const board = document.querySelector('.board');
  // 미리보기용: ?season=christmas 또는 #season=christmas
  const forced = new URLSearchParams(location.search).get('season') || location.hash.match(/season=(\w+)/)?.[1];
  const mode = forced || SEASON[board.dataset.kind] || 'off';
  const theme = mode === 'auto' ? seasonFor(new Date()) : mode in THEMES ? mode : '';
  board.dataset.season = theme;
  for (const el of board.querySelectorAll('.season-msg')) el.textContent = THEMES[theme] || '';
}
applySeason();
setInterval(applySeason, 3600e3); // TV는 켜 둔 채로 날짜가 바뀌므로 매시간 다시 고른다
