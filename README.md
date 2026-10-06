# AX Design Studio

Pages: [https://woongs2021.github.io/AX-DESIGN-TOOL/](https://woongs2021.github.io/AX-DESIGN-TOOL/) — GitHub에서 바로 열어볼 수 있는 정적 사이트

아카이브된 디자인 작업물을 기반으로 **온라인 마케팅 브랜드 에셋**(인스타그램, 페이스북, 유튜브 커버, 쇼츠 등)을 만드는 정적 웹 툴이다. 디자인 이미지는 Obsidian Markdown vault에 아카이빙하고, 웹은 빌드된 JSON과 자산만 읽는다.

현재 상태: **Phase 1 Online Marketing Studio 구현**. 네비는 **Graphic Library / Online Marketing Studio / History**. `#/intake`, `#/design-system`, `#/stats`는 `#/studio`로 이동한다.

## Phase 요약

| Phase | 목표 | 상태 | 문서 |
|---|---|---|---|
| 0 Archive Foundation | vault 스키마, 결정적 빌드, internal/public 이중 번들, Archive·상세 UI, 접근성 감사, 로컬 ingest·design-system CLI. 예전 Phase 0~8을 하나로 통합했다. | 완료 | [docs/phase-0-foundation.md](docs/phase-0-foundation.md) |
| 1 Online Marketing Studio | 30개 아카이브 작업물을 테마로 SNS 규격 마케팅 카드를 만들고 PNG로 다운로드하는 툴 | 구현됨 | [docs/phase-1-online-marketing-studio.md](docs/phase-1-online-marketing-studio.md) |

## Phase 1 — Online Marketing Studio 계획 요약

**목표**: 지금 아카이브된 이미지를 기반으로 온라인 마케팅 브랜드 에셋을 제작하는 툴을 만든다. 산출물은 인스타그램, 페이스북, 유튜브 커버, 쇼츠 등 여러 규격으로 만들 수 있다.

**IA 변경**
- Intake, Design System, Stats 탭을 없애고 **Online Marketing Studio** 한 탭(`#/studio`)으로 정리한다. 네비는 Graphic Library / Online Marketing Studio / History가 된다.
- 예전 `#/intake`, `#/design-system`, `#/stats` 주소는 `#/studio`로 리다이렉트한다.
- `npm run ingest`, `npm run design-system` CLI는 탭과 별개로 유지한다.
- 상세 뷰에 `이 테마로 만들기` 링크를 두어 해당 작업물을 테마로 선택한 채 스튜디오로 들어간다.

**화면 구성**
- 좌측은 **컨트롤 패널**, 우측은 **프리뷰**. 768px 이상(태블릿·데스크톱)에서는 가운데 바를 드래그해 두 영역의 너비를 조절한다. 767px 이하 모바일은 프리뷰 위, 컨트롤 아래로 쌓고, 헤더는 로고·모드 버튼 한 줄과 메뉴 한 줄로 줄인다. 헤더 아래에는 모바일·타블렛·데스크탑 뷰 아이콘이 있다. 화면 폭에 따라 하나, 둘, 셋이 보이고, 누르면 컨트롤 패널과 프리뷰가 그 화면으로 함께 바뀐다. 아이콘에는 원형 테두리가 없고, 모바일·타블렛 프레임 좌우에도 선이 없다. 프레임 스크롤바는 스크롤할 때만 콘텐츠 위에 겹친다. 프리뷰 폭이 좁으면 하단 바가 크기 정보, 편집·줌 버튼, 다운로드 버튼 순으로 줄바꿈된다. 프리뷰는 `−` / `+`로 확대·축소하고, `Fit`을 누르면 사방 10px 여백을 두고 100%로 맞춘다. 현재 카드의 실제 픽셀 크기 PNG로 다운로드한다. 첫 방문의 화면 모드는 다크다.
- 컨트롤 패널은 **디자인 영역**과 **코드 영역** 두 탭으로 나눈다.
- **Graphic Library**(예전 Archive)는 스튜디오에 쓸 그래픽을 모아 둔 화면이다. 제목 아래 설명 문장과 `Target … · N · N pinned` 줄을 두고, 검색창·필터 없이 All/Pin 탭으로만 나눈다.
- 프리뷰에는 이전 동작·원래대로 버튼이 있고, 드래그하는 동안만 잡은 요소에 테두리가 보인다. 단축키는 이전 동작 Cmd/Ctrl+Z, 원래대로 Cmd+Shift+Z · Ctrl+Y다(글자 입력칸 안에서는 브라우저 기본 동작).
- 프리뷰에서 타이틀·본문·이미지를 클릭하면 선택되고, Shift+클릭으로 여러 개를 선택하거나 하나만 뺀다. 선택된 객체를 끌면 함께 움직인다. 방향키는 0.5px, Shift+방향키는 10px씩 옮긴다. 프리뷰 확대·축소는 Cmd/Ctrl와 +/− 또는 Cmd(맥)·Ctrl(윈도우)+휠이다. 카드 요소는 레이어로 쌓이며(기본: 이미지 맨 아래, 그 위 본문·타이틀), 오른쪽 클릭 또는 롱프레스 메뉴로 복사·붙여넣기·맨 위로/맨 밑으로 보내기·크롭하기(이미지)·삭제를 한다. Cmd/Ctrl+C·V로도 복사·붙여넣기한다. 분할 바는 옅은 색이고, 조절바의 빈 트랙은 라이트·다크 모드 모두에서 보이게 칠한다.

**디자인 영역 컨트롤**

| 컨트롤 | 형태 |
|---|---|
| 카드 크기 | SNS 기본 규격 프리셋. 진입 시 Instagram Feed 1080 × 1080 자동 선택. 너비·높이는 바 + 수치로 100~4000px 직접 조절. 둘을 한 번에 조절하는 바는 비율을 유지한 채 프레임과 이미지를 함께 키우거나 줄이고, 폰트는 그대로 둔다 |
| 카드 타이틀 / 본문 | 텍스트 input / textarea. 시작값은 `Hello`와 헤르메스 본문 초안. 타이틀은 Montserrat 100px, 본문은 Pretendard 32px. 입력 즉시 프리뷰 반영. 프리뷰에서 드래그해 위치 이동하고, 더블 클릭하면 그 자리에서 수정. 글자색은 각각 원형 컬러 피커(모드에 맞는 30% 테두리) |
| 폰트 크기 | 타이틀·본문 각각 range 바 + 수치. 최소 5px, 최대는 카드 너비 − 20px |
| 폰트 | 타이틀·본문 각각 선택. Roboto, Pretendard, Montserrat. `fonts/`에 폰트 파일을 넣고 다시 빌드하면 목록에 추가 |
| 초기화 | 카드 설정을 처음 값으로 되돌린다. 타이틀·본문 초안도 복원. 선택한 테마와 패널 너비는 유지 |
| 아카이브 테마 | 30개 아카이브 작업물 썸네일 중 하나 선택 |
| 카드 이미지 | 너비 바 + 수치(100~4000px, 높이는 원본 비율). 프리뷰에서 드래그해 위치 이동. 핀치하거나 클릭 후 상하좌우 핸들로 크기 조절 |
| 카드 컬러 | 원형 컬러 피커 + hex 입력. 타이틀·본문 시작색은 대비에 맞춘 흑 또는 백 |
| 카드 radius | range 바 + 수치 입력 동기화(0~120px, 기본 28px), CSS 변수로 적용 |

**카드 크기 프리셋**: Instagram Feed 1080×1080(기본), Instagram Portrait 1080×1350, Instagram Story/Reels 1080×1920, Facebook Feed 1200×630, Facebook Cover 1640×624, YouTube Thumbnail 1280×720, YouTube Channel Cover 2560×1440, YouTube Shorts 1080×1920.

**코드 영역**: HTML + CSS 조각을 붙여 넣으면 sandbox iframe 안에서 프리뷰로 렌더한다. 스크립트는 실행하지 않는다. 디자인 영역 값은 CSS 변수와 `{{title}}`·`{{body}}`·`{{themeImage}}` 치환자로 이어지고, `현재 디자인을 코드로 복사`로 디자인 상태를 코드로 내보낸다.

**경계**: 서버·LLM 호출 없이 브라우저 안에서만 합성한다. 생성물은 vault와 배포 번들에 저장하지 않는다.

**확인 필요**: 코드 영역에 붙여 넣을 코드 형식(HTML+CSS로 가정), Samsung Sharp Sans 추가 가능 여부, 테마를 이미지로만 쓸지 컬러 기본값까지 가져올지, 텍스트 정렬 컨트롤, 작업 저장 방식, 아카이브 이미지의 마케팅 사용 권리. 상세는 Phase 1 문서의 `확인 필요` 표를 따른다.

## 업데이트 기록

| 날짜 | 변경 |
|---|---|
| 2026-10-05 | Graphic Library와 스튜디오 테마 이미지를 4096 정사각 PNG로 교체하고, 새 그래픽 10점을 더해 30개가 되었다. 스튜디오에 초기화로 세팅·설정 메뉴의 리셋·그래픽 라이브러리 저장(Saved 탭)을 넣었다. |

| 2026-09-28 | 프리뷰에서 이미지 핀치·크기 핸들과 텍스트 바로 수정. 모바일·타블렛·데스크탑 뷰 전환, 스크롤할 때만 보이는 프레임 스크롤바. 디바이더와 디바이스 바를 같은 색으로 맞추고 아이콘 테두리·프레임 좌우 선을 없앴다. History 본문 글자 크기를 날짜와 같게 14px로 맞췄다. 그래픽 4점을 추가해 테마 20개. Shift 다중 선택·함께 드래그, 이전 동작·원래대로 키보드 단축키. |
| 2026-09-27 | Online Marketing Studio 공개. 레이아웃·폰트·이미지 수동 조절, 타이틀·본문 폰트 분리, 초기화. Archive를 Graphic Library로 바꾸고 검색·필터 제거. 다크 모드 기본값, 기본 문구 `시즌`, 글자색 피커 테두리. 프리뷰 줌·Fit·이전 동작/원래대로·드래그 영역 표시. 너비·높이 함께 조절은 프레임과 이미지를 같이 바꾸고 폰트는 유지. 스크롤바·분할 바·조절바 시인성 정돈. 상세는 [Phase 1 문서의 업데이트 기록](docs/phase-1-online-marketing-studio.md#업데이트-기록). |

History 탭은 같은 내용을 `obsidian/wiki/log.md`의 `update` 항목으로 보여 준다. public 번들(GitHub Pages)에는 `update` 항목만 들어가고, 캡처 이름이 나올 수 있는 `ingest`·`query`·`lint` 항목은 internal에만 둔다. 같은 날 태블릿·모바일 레이아웃도 정리했다.

## 핵심 원칙

- Obsidian vault의 Markdown이 단일 진실 원천이다. 웹은 빌드된 JSON과 정적 자산만 읽는다.
- 파일에서 계산 가능한 값은 Markdown에 쓰지 않고 빌드에서 파생한다.
- ingest, 빌드, 배포는 사람이 명령으로 실행한다. 브라우저는 LLM API 키를 갖지 않는다.
- public 번들은 internal 데이터를 가리는 것이 아니라 포함하지 않는다.
- UI 색상 hex는 `src/shared/tokens.css` 한 곳에만 둔다.

## 문서

| 문서 | 역할 |
|---|---|
| [docs/decisions.md](docs/decisions.md) | 결정표 `D-01`~`D-17`의 단일 원천. |
| [docs/phase-0-foundation.md](docs/phase-0-foundation.md) | 예전 Phase 0~8을 통합한 아카이브 기반 요약. |
| [docs/phase-1-online-marketing-studio.md](docs/phase-1-online-marketing-studio.md) | Online Marketing Studio 계획서. |
| [docs/llm-wiki-model.md](docs/llm-wiki-model.md) | LLM Wiki 계층과 operation 규칙. |
| [docs/authoring-guide.md](docs/authoring-guide.md) | 캡처 1건 작성 기준. |
| [docs/deploy.md](docs/deploy.md) | 수동 배포 절차. |

## 현재 아카이브

`image-pick-hermes` 그래픽 에셋 스터디 30건이다. 에셋은 4096 정사각 PNG다. 모두 `visibility: public`이며 Phase 1 스튜디오의 테마 후보가 된다. `npm run seed:dummy`는 이 아카이브를 더미 데이터로 덮어쓰므로 실행하지 않는다.

| 타깃 | captures | asset bytes | Pages remaining / 1GB |
|---|---|---|---|
| internal | 16/16 | 3069668 | 1070672156 / 1073741824 |
| public | 16/16 | 3069668 | 1070672156 / 1073741824 |

## 주요 명령

```bash
npm run dev
npm run validate
npm run build -- --target=internal|public
npm run build:site -- --target=internal|public
npm run audit
```

로컬 CLI(LLM 키는 셸 환경변수 또는 `.gitignore` 대상 `.env`의 `OPENAI_API_KEY`):

```bash
# 이미지를 vault에 저장하고 LLM 분석 초안 생성 (--dry-run으로 미리보기)
npm run ingest -- ./shot.png --service "서비스명"

# 캡처 집합으로 design-system.md / tokens.json 초안 생성 (--no-llm, --dry-run 지원)
npm run design-system -- --name hermes-discs --slugs capsule-pattern coral-blue-luminous-ring
```

## 사용자 확인 필요

- Samsung Sharp Sans 재배포 가능 여부(public 번들, Phase 1 다운로드 이미지)
- `ffmpeg`/`ffprobe` 의존 방식
- 파생 산출물(`dist/`) 커밋 정책
- 새 저장소의 GitHub Pages 배포 위치
