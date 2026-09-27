# AX Design Studio

Pages: [https://woongs2021.github.io/AX-DESIGN-TOOL/](https://woongs2021.github.io/AX-DESIGN-TOOL/) — GitHub에서 바로 열어볼 수 있는 정적 사이트

아카이브된 디자인 작업물을 기반으로 **온라인 마케팅 브랜드 에셋**(인스타그램, 페이스북, 유튜브 커버, 쇼츠 등)을 만드는 정적 웹 툴이다. 디자인 이미지는 Obsidian Markdown vault에 아카이빙하고, 웹은 빌드된 JSON과 자산만 읽는다.

현재 상태: **Phase 1 Online Marketing Studio 구현**. 네비는 **Graphic Library / Online Marketing Studio / History**. `#/intake`, `#/design-system`, `#/stats`는 `#/studio`로 이동한다.

## Phase 요약

| Phase | 목표 | 상태 | 문서 |
|---|---|---|---|
| 0 Archive Foundation | vault 스키마, 결정적 빌드, internal/public 이중 번들, Archive·상세 UI, 접근성 감사, 로컬 ingest·design-system CLI. 예전 Phase 0~8을 하나로 통합했다. | 완료 | [docs/phase-0-foundation.md](docs/phase-0-foundation.md) |
| 1 Online Marketing Studio | 16개 아카이브 작업물을 테마로 SNS 규격 마케팅 카드를 만들고 PNG로 다운로드하는 툴 | 구현됨 | [docs/phase-1-online-marketing-studio.md](docs/phase-1-online-marketing-studio.md) |

## Phase 1 — Online Marketing Studio 계획 요약

**목표**: 지금 아카이브된 이미지를 기반으로 온라인 마케팅 브랜드 에셋을 제작하는 툴을 만든다. 산출물은 인스타그램, 페이스북, 유튜브 커버, 쇼츠 등 여러 규격으로 만들 수 있다.

**IA 변경**
- Intake, Design System, Stats 탭을 없애고 **Online Marketing Studio** 한 탭(`#/studio`)으로 정리한다. 네비는 Graphic Library / Online Marketing Studio / History가 된다.
- 예전 `#/intake`, `#/design-system`, `#/stats` 주소는 `#/studio`로 리다이렉트한다.
- `npm run ingest`, `npm run design-system` CLI는 탭과 별개로 유지한다.
- 상세 뷰에 `이 테마로 만들기` 링크를 두어 해당 작업물을 테마로 선택한 채 스튜디오로 들어간다.

**화면 구성**
- 좌측은 **컨트롤 패널**, 우측은 **프리뷰**. 1024px 이상에서는 가운데 바를 드래그해 두 영역의 너비를 조절한다. 프리뷰는 `−` / `+`로 확대·축소하고, 현재 카드의 실제 픽셀 크기 PNG로 다운로드한다. 첫 방문의 화면 모드는 다크다.
- 컨트롤 패널은 **디자인 영역**과 **코드 영역** 두 탭으로 나눈다.

**디자인 영역 컨트롤**

| 컨트롤 | 형태 |
|---|---|
| 카드 크기 | SNS 기본 규격 프리셋. 진입 시 Instagram Feed 1080 × 1080 자동 선택. 너비·높이는 바 + 수치로 100~4000px 직접 조절. 둘을 한 번에 조절하는 바는 비율을 유지한 채 프레임만 바꾸고, 폰트와 이미지는 그대로 둔다 |
| 카드 타이틀 / 본문 | 텍스트 input / textarea. 시작값은 `시즌`과 짧은 본문 초안. 입력 즉시 프리뷰 반영. 프리뷰에서 드래그해 위치 이동. 글자색은 각각 원형 컬러 피커(모드에 맞는 30% 테두리) |
| 폰트 크기 | 타이틀·본문 각각 range 바 + 수치. 최소 5px, 최대는 카드 너비 − 20px |
| 폰트 | 타이틀·본문 각각 선택. Roboto, Pretendard, Montserrat. `fonts/`에 폰트 파일을 넣고 다시 빌드하면 목록에 추가 |
| 초기화 | 카드 설정을 처음 값으로 되돌린다. 타이틀·본문 초안도 복원. 선택한 테마와 패널 너비는 유지 |
| 아카이브 테마 | 16개 아카이브 작업물 썸네일 중 하나 선택 |
| 카드 이미지 | 너비 바 + 수치(100~4000px, 높이는 원본 비율). 프리뷰에서 드래그해 위치 이동 |
| 카드 컬러 | 원형 컬러 피커 + hex 입력. 타이틀·본문 시작색은 대비에 맞춘 흑 또는 백 |
| 카드 radius | range 바 + 수치 입력 동기화(0~120px, 기본 28px), CSS 변수로 적용 |

**카드 크기 프리셋**: Instagram Feed 1080×1080(기본), Instagram Portrait 1080×1350, Instagram Story/Reels 1080×1920, Facebook Feed 1200×630, Facebook Cover 1640×624, YouTube Thumbnail 1280×720, YouTube Channel Cover 2560×1440, YouTube Shorts 1080×1920.

**코드 영역**: HTML + CSS 조각을 붙여 넣으면 sandbox iframe 안에서 프리뷰로 렌더한다. 스크립트는 실행하지 않는다. 디자인 영역 값은 CSS 변수와 `{{title}}`·`{{body}}`·`{{themeImage}}` 치환자로 이어지고, `현재 디자인을 코드로 복사`로 디자인 상태를 코드로 내보낸다.

**경계**: 서버·LLM 호출 없이 브라우저 안에서만 합성한다. 생성물은 vault와 배포 번들에 저장하지 않는다.

**확인 필요**: 코드 영역에 붙여 넣을 코드 형식(HTML+CSS로 가정), Samsung Sharp Sans 추가 가능 여부, 테마를 이미지로만 쓸지 컬러 기본값까지 가져올지, 텍스트 정렬 컨트롤, 작업 저장 방식, 아카이브 이미지의 마케팅 사용 권리. 상세는 Phase 1 문서의 `확인 필요` 표를 따른다.

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

`image-pick-hermes` 그래픽 에셋 스터디 16건이다. 모두 `visibility: public`이며 Phase 1 스튜디오의 테마 후보가 된다. `npm run seed:dummy`는 이 아카이브를 더미 데이터로 덮어쓰므로 실행하지 않는다.

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
