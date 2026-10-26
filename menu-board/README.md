# 엘가든 메뉴판 (menu-board)

메뉴판 원본. 슬랙봇(`slack-ai-manager`)이 `claude -p`로 이 폴더를 수정하고, 요청자가 승인하면 main에 푸시 + `menu-YYYYMMDD-HHMM` 태그를 단다.

| 파일 | 용도 | 크기 | 공개 |
|---|---|---|---|
| `tv.html` | 손님용 TV 메뉴판 (`/menu` → `/menu-board/tv.html`) | 1920x1080 | 웹 공개 |
| `print-1.html` | 지면메뉴1: 음료 + 빙수 | 1050x1485 (A4) | 비공개, PNG로만 전달 |
| `print-2.html` | 지면메뉴2: 브런치 사진 카드 | 1050x1485 (A4) | 비공개, PNG로만 전달 |
| `board.css` | 공용 폰트·색·컴포넌트 | | |
| `images/` | 메뉴 사진 | | |
| `PATTERNS.md` | 과거 메뉴판에서 쓰던 표현(핫/아이스 분리 등) | | |

빌드 때 `tv.html`, `board.css`, `fonts/`, `images/`만 `public/menu-board/`로 복사된다(`npm run copy-menu-board`). print 파일은 웹에 올라가지 않는다.

## 디자인 토큰 (Figma 「엘가든 메뉴판」 측정값)

- 폰트: 본문 Maplestory OTF Light 20px / 보조 15px(괄호 설명, 메모, 설명문) / 10px(TV 빙수 품종 괄호), 가격 Tium Bold 20px(음료·지면 빙수), 카드 가격 Maplestory 20px, 섹션 제목 Gerhaus 30px `--green`, 배지 Yanolja Yache Bold 25px.
- 색: `--ink #1e1e1e` 본문, `--green #64bb68` 섹션 제목, `--red #fa6868` BEST·TV 공지, `--ice #77bef0` only ice, `--orange #ff894f` 포장가능, `--orange-dark #cc6124` 포장가능(TV 팥·무화과 빙수), `--brown #7b542f` 소개문, `--grey #57595b` 원산지·지면 피자/파니니 설명.
- TV: 행 높이 25px, 섹션 제목 블록 32px(밑줄 포함), 음료 목록 x=287~700, 카드 4열(250px, 간격 42px) x=753부터, 왼쪽 사진열 x=14.
- 지면1: 행 높이 34.5px, 섹션 제목 블록 43px, 음료 x=25~511, 빙수 x=539~1025(가격 우측 끝 1020), 빙수 사진 327x346 3장.
- 지면2: 카드 3열(x=25/370/710), 사진 309~315x344, 행 시작 y=0/495/1010.

## 마크업 규칙

- 음료 행: `<li class="item"><span class="name">이름<small>(보조)</small><b class="best">BEST</b><b class="ice">only ice</b></span><span class="price">8.0</span></li>`
- 메모 행(옵션 설명, 中 택 1 등): `<li class="note r" style="width:…">` (r=오른쪽 정렬, c=가운데). 기존 메모의 width를 그대로 따른다.
- 섹션: `<section style="margin-top:…">` + `<h2 class="sec">` + `<ul>`. 섹션 간 간격은 `margin-top`으로 조정한다.
- 사진 카드: `<article class="card">` 안에 `takeout`(포장가능) → `img` → `row`(이름/가격) → `desc` 또는 `sub`(하위 품목) 순.
- 가격 표기: 천 원 단위 소수 한 자리(`7.5` = 7,500원).
- 다른 판에도 같은 메뉴가 있으면 **모든 판을 같이 고친다**(아래 "판별 메뉴 위치" 참고).

## 판별 메뉴 위치

- 음료(signature/coffee/non-coffee/tea/ade&smoothie): `tv.html` 음료 목록 + `print-1.html` 왼쪽.
- 빙수: `tv.html` 오른쪽 카드 1행(Bing-su) + `print-1.html` 오른쪽 목록과 사진.
- 브런치: `tv.html` 카드(머쉬룸 파니니는 Bing-su 행 4번째 칸) + `print-2.html` 카드.
- 왼쪽 음료 사진(TV): 아보카도라떼, 망고말차라떼, 대추차, 뱅쇼.
- 공지/원산지: `tv.html` 카드 2행 4번째 칸, `print-2.html` 3행 3번째 칸.

현재 판끼리 원래 다른 부분(Figma 원본 그대로 옮김. 요청이 없으면 맞추지 말 것):
아포가토 TV 7.5 / 지면 8.5, 쑥라떼는 지면에만 있음, 생망고 품종 TV "대만 애플 망고" / 지면 "페루 애플 망고", 공지 TV "1인 1메뉴"(빨강) / 지면 "1인 1음료"(검정), TV 팥 추가 2.5 문구는 TV에만 있음, 차 메뉴 순서(우엉차·허브차) 다름, 아메리카노 원두 메모는 TV에만 있음.

## 이미지 규칙

- 파일명: `<분류>-<영문메뉴슬러그>-<두자리번호>.jpg` (예: `brunch-mushroom-panini-02.jpg`). 분류: drink / bingsu / brunch / dessert.
- 교체할 때는 **기존 파일을 지우지 않고** 다음 번호로 새 파일을 만든 뒤 HTML 참조만 바꾼다. 그래야 예전 사진으로 되돌릴 수 있다.
- 받은 사진은 `sips -s format jpeg -s formatOptions 82 -Z 1000 <원본> --out images/<이름>.jpg`로 변환한다.
- `alt`에는 한글 메뉴명을 쓴다.

## 판 넘침 금지

판 크기는 고정이다(TV 1920x1080, 지면 1050x1485). 메뉴를 추가하면 아래 섹션이 밀리므로, 수정 후 반드시 렌더해서 넘침·겹침이 없는지 눈으로 확인하고 `margin-top`과 섹션 배치로 맞춘다.
