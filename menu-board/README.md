# 엘가든 메뉴판 (menu-board)

카페 엘가든의 메뉴판 원본이다. 원래 Figma에서 이미지로 뽑아 쓰던 것을 HTML로 옮겼다.

| 메뉴판 | 파일 | 쓰는 곳 |
|---|---|---|
| 손님용 TV 메뉴판 | `tv.html` | 매장 TV. `/menu` 주소로 웹에 공개 |
| 지면메뉴1 (음료·빙수) | `print-1.html` | A4로 인쇄. 웹에는 올리지 않음 |
| 지면메뉴2 (브런치) | `print-2.html` | A4로 인쇄. 웹에는 올리지 않음 |

## 고치는 법

평소에는 슬랙 `#메뉴수정` 채널에서 `@엘가든AI매니저`에게 말로 요청한다. 봇이 고친 미리보기를 보여 주고, 요청한 사람이 **배포 승인**을 누르면 main에 올라가 Vercel로 배포된다. 지면메뉴가 바뀌면 인쇄용 A4 PNG(300dpi)를 스레드로 받는다. 사용법은 [slack-ai-manager README](https://github.com/L-garden/slack-ai-manager)를 본다.

직접 고칠 때는 [CLAUDE.md](CLAUDE.md)의 규칙(디자인 토큰, 마크업, 사진 이름, 판 넘침 금지)을 따른다.

## 버전과 되돌리기

배포할 때마다 `menu-YYYYMMDD-HHMM` git 태그가 붙는다. 슬랙에서 `@엘가든AI매니저 버전`을 보내면 최근 배포 목록과 버전별 **[이 버전으로 롤백]** 버튼이 나온다. 사진은 바꿔도 예전 파일을 지우지 않으므로 되돌리면 예전 사진도 그대로 돌아온다.

## 시즌 장식

TV 메뉴판에만 반투명한 장식 조각(눈송이, 꽃잎, 연등 등)이 떠다니게 할 수 있다. 테마 13종이 있고 기본은 모두 꺼져 있다. 슬랙에서 `@엘가든AI매니저 장식`을 보내면 테마별 상태와 기간을 보여 주고, **[🎛 장식 설정 열기]**로 체크박스를 골라 켜고 끈다.

## 로컬에서 보기

```sh
npm run dev            # http://localhost:3000/menu  (TV 메뉴판)
open menu-board/print-1.html menu-board/print-2.html   # 지면메뉴는 파일로 연다
```

TV 메뉴판에서 시즌 장식 미리보기: `http://localhost:3000/menu-board/tv.html#season=christmas`

## 배포 구조

`npm run build`(와 `npm run dev`) 전에 `tv.html`, `board.css`, `season.js`, `fonts/`, `images/`만 `public/menu-board/`로 복사되고, `/menu`는 `/menu-board/tv.html`로 연결된다(`next.config.ts`). 지면메뉴 파일은 복사하지 않아서 웹에서 열리지 않는다.
