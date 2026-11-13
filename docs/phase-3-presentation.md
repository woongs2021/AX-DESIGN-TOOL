# Phase 3 — Presentation

목표: Conference Slide(3840 × 2160)를 페이지 단위로 묶어 **Presentation** 탭에서 편집하고, PDF·PowerPoint·Keynote·HTML로 한 번에 내보내는 프레젠테이션 도구를 만든다. 편집기는 Online Studio·Conference와 같은 스튜디오를 쓰고, 왼쪽 레일에 페이지 목록을 둔다.

참조: [Phase 1 Online Studio](phase-1-online-marketing-studio.md), [Phase 2 Conference](phase-2-conference-studio.md)

> 상태: **구현**. 2026-11-14에 3-1부터 3-12를 로컬 호스트에 넣었다. 네비에 Presentation(`#/presentation`)을 추가하고, 유형 1·2·3 페이지, 덱 편집, 디자인 시스템 색 스와치, 앱 기본값 세팅, 전체 내보내기(PDF·PPTX·Keynote·HTML)를 구현했다. 기본 덱은 Slide Front 표지와 연사 4장, 기존 예시 페이지를 포함한 14장이다. 정한 사항은 맨 아래 [결정 기록](#결정-기록)에 있다.

## 범위

- 입력: Conference 인덱스(연사·로고·배경)와 스튜디오와 같은 레이어 모델. 브라우저는 Markdown을 읽지 않는다.
- 출력: 덱 전체 PNG는 페이지마다, 전체 다운로드는 PDF·편집 가능한 PPTX(Keynote 포함)·배경 영상 재생 HTML.
- 서버·LLM 호출 없음. 합성과 내보내기는 브라우저 안에서 일어난다. 앱 기본값 파일 쓰기는 로컬 개발 서버(`vite`)에서만 된다.
- Online Studio·Conference 기능(도형·선·펜·정렬·잠금·그룹)은 Presentation 페이지에도 같다.

## 다른 탭과 다른 점

| 항목 | Conference | Presentation |
|---|---|---|
| 주소 | `#/conference` | `#/presentation` |
| 크기 | Instagram·Poster·Slide·Slide Front·배너 | Slide 3840 × 2160만 |
| 구조 | 프리셋 하나 | 왼쪽 페이지 레일 + 오른쪽 편집 |
| 초기화 | 프리셋·연사 카드별 기준 | 단일·전체 페이지를 `presentation-defaults.json`에 세팅 |
| 내보내기 | PNG·PDF·인쇄·MP4·GIF(한 카드) | PNG(한 페이지) + 전체 PDF·PPTX·Keynote·HTML |

## 화면 레이아웃

```text
┌──────────────────────────── AX DESIGN STUDIO ─────────────────────────────┐
│ Graphic Library · Online Studio · Conference · Presentation · History      │
├──────────┬───────────────────┬────────────────────────────────────────────┤
│ 유형 1·2·3│ Design / Code     │  3840 × 2160 Slide 프리뷰                   │
│ 페이지 레일│ 배경·크기·연사·로고│  도형·정렬·전체 다운로드                     │
│ 썸네일·이름│ 색 스와치·기본값   │  PNG / PDF(한 장)                          │
└──────────┴───────────────────┴────────────────────────────────────────────┘
```

## 개발 순서

| 단계 | 내용 | 상태 |
|---|---|---|
| 3-1 | 네비에 Presentation을 추가하고 `#/presentation`으로 들어온다 | 구현 |
| 3-2 | 왼쪽 페이지 레일과 오른쪽 스튜디오를 한 화면에 묶는다 | 구현 |
| 3-3 | 유형 1·2·3 예시 페이지와 톤(라이트·다크) | 구현 |
| 3-4 | 페이지 추가·복제·삭제·이름·순서 변경 | 구현 |
| 3-5 | Shift 범위 선택, 블록 드래그, 잘라내기·복사·붙여넣기 | 구현 |
| 3-6 | 단일·전체 페이지 현상태를 앱 기본값으로 세팅 | 구현 |
| 3-7 | 디자인 시스템 색 스와치와 카드 컬러 피커 테두리 | 구현 |
| 3-8 | 장면 모델과 편집 가능한 PPTX·Keynote 내보내기 | 구현 |
| 3-9 | 벡터 PDF(서브셋 폰트·선택 가능한 글자) | 구현 |
| 3-10 | 배경 영상까지 재생되는 단일 HTML 프레젠테이션 | 구현 |
| 3-11 | Conference 콘텐츠로 표지·연사 페이지를 채운 기본 덱 | 구현 |
| 3-12 | 테스트와 문서 | 구현 |

### 3-1 정보 구조

계획: 네비를 Graphic Library / Online Studio / Conference / Presentation / History로 바꾼다. `#/presentation`이 진입점이다. Conference 인덱스가 없으면 빈 덱 대신 Conference가 준비된 빌드에서만 연다.

검증: 로컬 호스트에서 Presentation 탭이 보이고, 열면 3840 × 2160 슬라이드와 페이지 레일이 나온다.

### 3-2 레일 + 스튜디오

계획: `renderPresentation` / `bindPresentation`이 덱과 Conference 인덱스를 받아 레일과 `bindStudio`를 연결한다. 페이지를 바꾸면 해당 `StudioState`만 편집한다. 레일 스크롤 위치는 다시 그려도 유지하고, 클릭만으로는 `scrollIntoView`하지 않는다. 위·아래 화살표로 넘길 때만 안 보이는 페이지로 맞춘다.

검증: 레일을 스크롤한 뒤 보이는 페이지를 눌러도 스크롤이 그대로다. 화살표로 화면 밖 페이지로 가면 그 페이지가 보인다.

### 3-3 유형 1·2·3

계획: 유형 1은 사진·디바이더, 유형 2는 다크 타이틀·단어, 유형 3은 라이트 아젠다·모자이크다. 앱 라이트·다크 모드에 맞춰 유형 2·3 톤을 맞춘다. 유형 1은 그림을 유지한다.

검증: 유형 버튼을 누르면 샘플이 바뀌고, 모드를 바꾸면 유형 2·3 글자·바탕색이 따라간다.

### 3-4 페이지 편집

계획: 샘플을 붙여 넣거나 복제해 페이지를 늘린다. 이름을 더블클릭해 바꾸고, 끌어 순서를 바꾼다. Delete로 지운다. 덱 단위 되돌리기(Cmd+Z)는 페이지 추가·삭제·이동·이름에 쓴다. 슬라이드 안 편집 되돌리기는 페이지별 스튜디오 히스토리다.

검증: 페이지를 옮기고 이름을 바꾼 뒤 Cmd+Z로 돌아온다. 마지막 한 장은 지울 수 없다.

### 3-5 다중 선택

계획: 한 페이지를 고른 뒤 다른 페이지를 Shift+클릭하면 사이 페이지가 모두 선택된다. 선택된 블록을 끌면 순서를 유지한 채 끼워 넣는다. 레일에서 Cmd+X·C·V로 잘라내기·복사·붙여넣기한다. Delete는 선택 범위를 함께 지운다.

검증: 1~5를 선택해 다른 자리로 옮기면 다섯 장이 한 덩어리로 간다. 잘라 붙인 페이지는 원래 id를 유지한다(잘라내기).

### 3-6 앱 기본값

계획: Presentation에는 `초기화`·`그래픽 라이브러리에 추가` 대신 **단일 페이지 현상태 기본값으로 세팅**과 **전체 페이지 현상태 기본값으로 세팅**을 둔다. 값은 `src/shared/presentation-defaults.json`에 쓴다. 로컬 Vite가 `POST /__presentation-defaults`로 파일을 갱신한다. 설정 리셋이나 저장 덱이 없을 때 이 기본값으로 연다. 파일이 비어 있으면 코드에 있는 예시 10장으로 연다.

검증: 전체 세팅 후 브라우저 저장을 지우고 다시 열면 같은 페이지 수·이름이 나온다. 배포 사이트에서 세팅을 누르면 로컬 서버에서만 가능하다는 안내가 나온다.

### 3-7 디자인 시스템 색

계획: 카드·타이틀·본문·도형·선·펜·로고 색 아래에 bg·fg·Primary·Soft·Mid·Deep·Tint·Accent·Mute·Warning 스와치를 둔다. 클릭 순간 `tokens.css`의 현재 모드 값을 읽어 적용한다. 카드 컬러 피커에도 다른 피커와 같은 테두리를 둔다.

검증: 다크에서 bg는 `#010102`, 라이트에서 bg는 `#fcfcff`다. 스와치 적용은 되돌리기 한 단계다.

### 3-8 PPTX · Keynote

계획: 페이지를 `SlideScene`으로 그린 뒤 OOXML PPTX로 묶는다. 글자는 편집 가능하고, Keynote는 같은 PPTX를 받는다. 효과는 래스터로 맞춘다.

검증: Keynote와 PowerPoint에서 열리고 글자를 고칠 수 있다.

### 3-9 벡터 PDF

계획: TrueType을 서브셋으로 넣고 CIDFont·ToUnicode로 한글을 선택할 수 있게 한다. 그라데이션·알파·타원은 벡터, 사진은 JPEG+마스크다.

검증: 뷰어에서 한글을 드래그해 복사할 수 있다. Chrome OTS가 `post` 테이블을 요구하므로 버전 3 `post`를 유지한다.

### 3-10 HTML 프레젠테이션

계획: 슬라이드마다 SVG와 서브셋 폰트를 넣고, 배경이 동영상이면 base64로 한 파일에 담는다. 화살표·Space·클릭·F(전체화면)·`#n` 해시로 넘긴다. 현재 슬라이드 영상만 재생한다.

검증: 동영상 모드 페이지를 HTML로내면 그 장에서 영상이 재생되고, 다른 장으로 가면 멈춘다. `file://`이 막히면 로컬 HTTP로 연다.

### 3-11 기본 덱 콘텐츠

계획: page 1은 Conference Slide Front 문구·로고·연사 네 이름을 16:9에 맞게 다시 배치한다. 그다음 네 장은 Instagram 연사 카드 정보로 박형걸 PM Slide 포맷을 채운다(김규영·이주원·이보연·박형걸). 이어서 기존 예시 페이지를 둔다. 2026-11-14 기준 기본값은 14장이다.

검증: 저장값이 없는 브라우저에서 Presentation을 열면 표지와 연사 4장이 보인다.

### 3-12 테스트와 문서

계획: `scripts/test-conference.ts`에 덱 저장·순서·범위 이동·삭제·기본값 병합을 넣고, `tsc --noEmit`으로 타입을 검사한다. README·History·이 문서에 Phase 3를 적는다.

검증: `npm run test:conference`와 `tsc --noEmit`이 통과한다.

## 파일

| 경로 | 역할 |
|---|---|
| `src/views/presentation.ts` | 레일 UI, 다중 선택, 내보내기 대화상자 |
| `src/shared/presentation.ts` | 덱 모델, 기본값 로드·쓰기, 페이지 이동·삭제 |
| `src/shared/presentation-defaults.json` | 앱 기본 덱 |
| `src/shared/slides-pptx.ts` | PPTX 작성 |
| `src/shared/scene-pdf.ts` | 벡터 PDF |
| `src/shared/scene-html.ts` | HTML 플레이어 |
| `src/shared/font-files.ts` | 폰트 fetch·서브셋 |
| `vite.config.ts` | `/__presentation-defaults` 개발 라우트 |

## 결정 기록

| ID | 결정 |
|---|---|
| P3-01 | 페이지 크기는 Conference Slide와 같은 3840 × 2160만 쓴다. |
| P3-02 | 기본값 세팅은 브라우저가 아니라 저장소의 `presentation-defaults.json`에 쓴다. 로컬 개발 서버에서만 기록한다. |
| P3-03 | HTML은 단일 파일에 영상·폰트·그림을 넣고, 글자는 임베드해 선택·검색 가능하게 한다. |
| P3-04 | PPTX와 Keynote는 같은 편집 가능 PPTX를 쓴다. |
| P3-05 | 범위 선택은 Shift+클릭이다. Cmd+클릭 가산 선택은 넣지 않았다. |
| P3-06 | Presentation 패널에서 초기화·그래픽 라이브러리 추가는 빼고 기본값 세팅 두 버튼만 둔다. |
