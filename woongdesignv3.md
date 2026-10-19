# Woong Design — v3

> 다음에 같은 종류의 툴을 만들 때 쓰는 **구조와 원칙**.
> v2는 강의·슬라이드·콘텐츠용 제너럴 시스템이고, v3는 그 위에서 AX Design Studio가 실제로 고정한 제품 시스템이다.
> v2 원문은 이 문서 아래 [강의용 시스템 v2](#강의용-시스템-v2)에 정리해 두었고, 파일 [`woongdesignv2.md`](woongdesignv2.md)도 그대로 둔다.
> 구현 구조는 [`development-note.md`](development-note.md)에 있다.

제품 UI 색의 단일 원천은 `src/shared/tokens.css`다. 컴포넌트 CSS는 `var(--*)`만 쓴다. (`D-12`, `D-14`)

---

## 다음에 툴을 만들 때

새 화면을 그리기 전에 이 순서로 정한다.

1. **이 화면은 도구인가, 대화인가.** 도구·정보·데이터는 Cool. 대화·감성·강조는 Warm. 한 페이지에는 한 세트만 둔다.
2. **크롬과 작품을 나눈다.** 앱의 네비·패널·버튼은 디자인 시스템이다. 사용자가 만드는 카드 안의 그림자·그라데이션·도형은 작품이다. 작품에 허용한 표현을 크롬에 끌어오지 않는다.
3. **색 hex는 파일 하나.** 컴포넌트에 hex를 쓰지 않는다. 관찰한 외부 색은 데이터로 남긴다.
4. **진실은 Markdown, 웹은 빌드 결과만 읽는다.** 치수·바이트·해시는 사람이 적지 않고 빌드가 계산한다.
5. **사람이 빌드와 배포를 실행한다.** 브라우저에 LLM 키를 두지 않는다.
6. **공개 번들은 내부 데이터를 빼놓고 만든다.** 숨기는 것이 아니라 포함하지 않는다. 큰 원본은 로컬에 두고, 공개 사이트에는 편집용으로 줄인 사본을 넣는다.
7. **편집기는 하나, 프리셋은 설정이다.** 카드 편집 코드를 복제하지 않고, 크기·배경·리소스·내보내기만 바꾼다.

---

## v2에서 v3로 굳힌 것

| 항목 | v2 강의 시스템 | v3 이 제품 |
|---|---|---|
| 톤 | Cool / Warm, 각 가족에 세트 둘 | 도구이므로 Cool Blue만. `data-theme="cool"`. 세트 전환 UI 없음 |
| 모드 | 라이트 기준, 다크는 검증 전 | `data-mode` light / dark. 첫 방문 기본은 다크 |
| 바닥과 잉크 | Canvas `#FCFCFF`, Ink `#010102` | 그대로 `--bg` / `--fg`. 다크에서는 서로 뒤바뀜 |
| 디스플레이 서체 | Samsung Sharp Sans Light | 공개 번들에 넣지 않음. 라이선스 확인 전. 크롬은 Pretendard |
| 카드 서체 | Sharp Sans + Pretendard | 사용자가 Pretendard, Roboto, Montserrat 중 고름 |
| 본문 크기 | 강의 본문 24px | 앱 크롬 20px. 카드 글자 크기는 사용자가 조절 |
| 그림자·그라데이션 | 크롬에서 쓰지 않음 | 크롬에는 없음. 카드 작품에는 사용자가 넣을 수 있음 |
| 라운드 | tile 28px가 시그니처 | 카드 기본 radius 28px. 앱 버튼·칸은 8px |
| 네비 | 80px, 12px 대문자 메뉴 | 그대로. 워드마크는 14.4px |
| 깊이 | 색면과 0.5~1px 선 | `--line-width: 0.5px`. 그림자로 깊이를 만들지 않음 |
| 대비 | muted 60%, stroke 40% | 라이트에서 본문·UI 대비가 부족해 muted 0.82, stroke 0.72로 올림 |

Warm, Mint, Violet, 강의용 디스플레이 스케일, 슬라이드 셸은 v2에 남아 있다. 이 제품은 그 세트를 켜지 않는다.

---

## 제품 토큰

`html`은 `data-theme="cool"` `data-mode="light|dark"`다.

### Cool Blue (`data-theme="cool"`)

| 역할 | 이름 | 토큰 | Hex | 쓰는 곳 |
|---|---|---|---|---|
| Primary | Kinetic Azure | `--primary` | `#4065F8` | 선택, 포커스, 진행 |
| Soft | Polar Dew를 밝힌 값 | `--soft` | `#D8F1FF` | 부드러운 면. v2 `#A1D0F6`보다 밝다 |
| Mid | Iron Navy | `--mid` | `#16427C` | 라이트 모드 링크 |
| Deep | Phantom Night | `--deep` | `#001C33` | 도구 표면 |
| Tint | Luminous Ice를 가라앉힌 값 | `--tint` | `#E8EEF8` | 코드·빈 칸. v2 `#CAF7FF`보다 낮다 |
| Accent | Mystic Violet | `--accent` | `#9747FF` | 절제된 보조. 한 화면에서 남용하지 않음 |
| Mute | Silver Moss | `--mute` | `#A8BFC1` | 비활성 |
| Warning | — | `--warning` | `#FF105C` | 실패·임박. 시스템에서 가장 시끄러운 색 |

색 면 위의 글자는 모드를 따르지 않는다.

| 토큰 | Hex | 얹는 면 |
|---|---|---|
| `--on-primary` `--on-deep` `--on-mid` `--on-warning` | `#FCFCFF` | 진한 면 |
| `--on-soft` `--on-tint` | `#010102` | 밝은 면 |

### 바닥

| 토큰 | Light | Dark |
|---|---|---|
| `--bg` | `#FCFCFF` | `#010102` |
| `--fg` | `#010102` | `#FCFCFF` |
| `--fg-muted` | `rgba(1,1,2,0.82)` | `rgba(252,252,255,0.72)` |
| `--stroke` | `rgba(1,1,2,0.72)` | `rgba(252,252,255,0.72)` |
| `--focus-ring` | `#4065F8` | `#A1D0F6` |
| `--media-matte` | `#FFFFFF` | `#000000` |
| `--code-bg` | `--tint` | `color-mix(in srgb, var(--fg) 10%, var(--studio-ink-dark))` |

`--media-matte`와 스튜디오가 카드에 찍는 `--studio-ink-dark` `#000000`, `--studio-ink-light` `#FFFFFF`는 작품의 순백·순흑이다. v2가 크롬에서 순백·순흑을 피한 원칙은 앱 바닥(`--bg` / `--fg`)에 그대로 있다.

다크 모드에서 연사·로고 칸은 코드 블록보다 한 단계 어둡다. `color-mix(in srgb, var(--fg) 6%, var(--studio-ink-dark))`. 페이지 바닥까지 내리지는 않는다.

### 크롬 타이포

| 역할 | 서체 | 크기 | 굵기 |
|---|---|---|---|
| 앱 본문 | Pretendard Variable | 20px | 400 |
| 워드마크 | Pretendard | 14.4px | 500, 대문자, tracking 0.02em |
| 메뉴 | Pretendard | 12px | 500, 대문자, tracking 0.08em |
| 코드 | JetBrains Mono | 0.9em | — |
| 카드 글자 | Pretendard / Roboto / Montserrat | 사용자가 조절 | 300–700 |

Samsung Sharp Sans와 Inter는 v2 강의 시스템에만 있다. 이 제품 크롬은 Pretendard다.

### 크롬 모양

| 토큰 | 값 | 쓰는 곳 |
|---|---|---|
| 네비 높이 | 80px | `.top-nav`, 패딩 좌우 32px |
| 선 | 0.5px | `--line-width`, 색은 `--stroke`를 68%로 섞음 |
| 카드 radius | 28px | 스튜디오 카드 기본값. v2 tile과 같음 |
| 칸·버튼 | 8px | 리소스 썸네일 |
| 포커스 | 3px `--focus-ring`, offset 3px | `:focus-visible` |
| 입력 포커스 | primary 60% 1.5px | 입력 칸 |

터치 타깃은 44px 이상을 유지한다. 키보드 포커스 링을 빼지 않는다.

---

## 크롬과 작품

**크롬**은 Graphic Library, 상세, History, 스튜디오의 패널과 네비다. v2의 Do를 따른다. 이모지와 일러스트를 쓰지 않고, 깊이는 면 색과 선으로 만든다. Cool과 Warm을 한 화면에 섞지 않는다.

**작품**은 프리뷰 카드 안이다. 사용자가 그림자, 블렌드, 좌우가 다른 블러, 두 색 그라데이션, 도형, 선, 펜을 넣을 수 있다. 이것은 디자인 시스템 장식이 아니라 내보내기 결과물이다. 카드 기본 글자는 영문 `Hello`와 한국어 본문의 두 줄로 시작한다. v2의 영문 명사 + 한국어 문장 더블 라인과 같은 호흡이다.

로고 SVG는 파일 색이 기본이다. 다크 모드 리소스 칸에서 검정만 있는 마크는 칸 안에서만 `invert(1)`로 보이게 하고, 카드에 올라간 그림은 파일 색을 유지한다.

---

## 강의용 시스템 v2

아래는 [`woongdesignv2.md`](woongdesignv2.md)를 이 문서 안으로 옮긴 정리본이다. 강의 자료, 슬라이드, 콘텐츠 페이지용이며 특정 서비스에 묶이지 않는다.

### 인상

순백이 아닌 따뜻한 오프화이트 Canvas `#FCFCFF` 위에 Ink `#010102`를 얹는다. 디스플레이는 Samsung Sharp Sans weight 300, 한국어 본문은 Pretendard weight 400. 시각은 **활자 · 색면 · 여백** 세 가지다. 이모지, 일러스트, 그림자, 코어 화면의 그라데이션은 쓰지 않는다.

### 두 톤, 네 세트

한 페이지는 한 세트. 가족을 가로질러 섞지 않는다.

| 가족 | 맥락 | 세트 | `data-theme` |
|---|---|---|---|
| Cool | 도구 · 정보 · 데이터 | Blue, Mint | `cool` / `mint` |
| Warm | 대화 · 감성 · 강조 | Orange, Violet | `warm` / `violet` |

표면은 네 단계다. Canvas, Soft surface, Primary block, Deep surface. Canvas와 Deep의 대비가 페이지 리듬이다.

### Cool Blue `data-theme="cool"`

| 역할 | 이름 | Hex | 용도 |
|---|---|---|---|
| Primary | Kinetic Azure | `#4065F8` | 시그니처 액션, 차트, 진행 |
| Soft | Polar Dew | `#A1D0F6` | 카드, 빈 상태 |
| Mid | Iron Navy | `#16427C` | 헤더, 강조 텍스트 |
| Deep | Phantom Night | `#001C33` | 코드·결과·도구 |
| Tint | Luminous Ice | `#CAF7FF` | 형광펜, 중요 문장 |
| Accent | Mystic Violet | `#9747FF` | 인사이트 뱃지 한 곳 |
| Mute | Silver Moss | `#A8BFC1` | 비활성 |

### Cool Mint `data-theme="mint"`

| 역할 | 이름 | Hex | Blue 대응 |
|---|---|---|---|
| Primary | Kinetic Mint | `#10C19F` | Kinetic Azure |
| Soft | Polar Frost | `#A6E6D4` | Polar Dew |
| Mid | Pine Teal | `#156E5C` | Iron Navy |
| Deep | Phantom Pine | `#04221C` | Phantom Night |
| Tint | Luminous Jade | `#D4F7EC` | Luminous Ice |
| Accent | Electric Aqua | `#00E0BE` | Mystic Violet |
| Mute | Sage Moss | `#AEC4BB` | Silver Moss |

### Warm Orange `data-theme="warm"`

| 역할 | 이름 | Hex | 용도 |
|---|---|---|---|
| Primary | Terracotta Red | `#B85C4F` | 강조 CTA, 축하. 성공색도 이 톤 |
| Soft | Dusty Rose | `#C8847D` | 카드 헤드, 말풍선 |
| Tint | Soft Nude Beige | `#EEDCD6` | 따뜻한 카드 |
| Mute | Hard Nude Beige | `#A38E85` | 비활성 |
| Mid | Deep Cocoa Brown | `#754039` | 인용 |
| Accent | Auburn Flare | `#8C3124` | Primary active |
| Deep | Abyssal Red | `#771B0E` | 가장 진한 알림 |

### Warm Violet `data-theme="violet"`

| 역할 | 이름 | Hex | Orange 대응 |
|---|---|---|---|
| Primary | Orchid Magenta | `#B14D92` | Terracotta Red |
| Soft | Dusty Lilac | `#C896C0` | Dusty Rose |
| Tint | Soft Lilac Veil | `#EFDCEC` | Soft Nude Beige |
| Mute | Hazy Mauve | `#A38AA0` | Hard Nude Beige |
| Mid | Deep Plum | `#6A2A55` | Deep Cocoa Brown |
| Accent | Magenta Flare | `#9B2774` | Auburn Flare |
| Deep | Abyssal Plum | `#4C1039` | Abyssal Red |

공유 표면은 Canvas `#FCFCFF` / `#010102`, Ink는 그 반대, Muted와 Stroke는 각 잉크의 60%·40%다. v3 제품은 대비 때문에 이 알파를 올렸다. Warning `#FF105C`. Info는 Cool primary 자체다.

그라데이션은 표지·히어로·축하에만, `-45°`, 같은 가족 톤온톤이다. 세트마다 C1–C5, W1–W5, MT1–MT5, VT1–VT5. 가족 안 교차는 BM(Blue×Mint), OV(Orange×Violet). Cool×Warm 혼합은 전환 모먼트에만 쓴다.

### v2 타이포

- Display: `"Samsung Sharp Sans", "Pretendard Variable", system-ui, sans-serif`. 기본 300. 700은 페이지당 한 번.
- Body: `"Pretendard Variable", "Pretendard", system-ui, sans-serif`. 기본 400. 문단의 강조는 한 문장.
- Label: `"Inter", "Pretendard Variable", system-ui, sans-serif`. 12px.
- Mono: `"JetBrains Mono", "SF Mono", Consolas, monospace`.

영문 디스플레이는 en-h1 128 / en-h2 100 / en-h3 80 / en-h4 72 / en-h5 64, impact 200 weight 700. 한국어는 kr-h1 110부터 kr-h6 44. 본문은 subtitle 48, lead 32, body 24, body-sm 20, meta 18, caption 14, label 12. 80px 이상은 tracking -0.01em. 양수 tracking은 12px 라벨만.

Sharp Sans Light 파일은 없다. weight 300은 Pretendard로 폴백한다. 공개 재배포 전에 라이선스를 확인한다.

### v2 레이아웃과 깊이

간격 단위는 2px. xs 8, sm 10, md 14, lg 24, xl 32, 2xl 48, section 80, 슬라이드 외곽 56. 데스크톱 폭 1280px. 카드는 3 / 2 / 1열. 슬라이드 캔버스는 1920×1080, 타이틀바 80px.

깊이는 Flat, Hairline 1px, Soft surface, Deep surface. Drop shadow는 쓰지 않는다. 형광펜은 Cool `#CAF7FF`, Warm `#C8847D`를 50% 알파로 텍스트 뒤에 깐다.

라운드: xs 4, tag 5, sm 8, md 12, lg 16, frame 24, **tile 28**, pill 999, full 50%. 28px이 시그니처다.

### v2 컴포넌트

이름은 토큰만 참조한다. 변형은 `-cool` `-warm` `-deep` `-active`.

- `top-nav` 80px. `page-title-bar` 80px.
- `button-primary-*` 높이 44, radius 12, 패딩 14×24. `button-secondary`는 선만. `button-ghost`는 mid 색 글자.
- `module-card` radius 28, 패딩 32. `result-card-deep`와 `celebration-card`는 radius 24. 축하 카드에서만 200px Bold.
- 입력 높이 48, radius 12. 포커스는 primary 외곽선과 3px 글로우.
- 탭은 활성일 때 soft 면과 2px primary 인디케이터.
- 푸터는 deep. 라이트로 뒤집지 않는다.

브레이크포인트는 768, 1024, 1440. 버튼 44px, 입력 48px. 본문 24px는 모바일에서도 유지하고, 라벨 12px는 모바일에서 13px로 키운다.

### v2에서 하지 말 것

이모지·일러스트·코어 그라데이션을 쓰지 않는다. Cool과 Warm, 또는 한 가족의 두 세트를 한 페이지에 섞지 않는다. 디스플레이를 weight 500 이상으로 올리지 않는다. 그림자로 깊이를 만들지 않는다. 크롬에 순백 `#FFFFFF`와 순흑 `#000000`을 쓰지 않는다. 한 문단에 Bold를 두 번 쓰지 않는다.

알려진 빈칸: Sharp Sans Light 파일, 차트 컴포넌트, 토스트, 외부 브랜드 색, 인쇄 PDF, 긴 영문 본문, 다크 모드 채도 보정. v3는 이 중 다크 모드와 대비만 제품에서 닫았다. Sharp Sans는 아직 열어 둔다.
