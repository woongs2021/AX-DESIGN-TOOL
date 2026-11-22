/**
 * 행사 후기: the AI + DESIGN FUTURES seminar (2026-11-20) as a blog post under Conference.
 * Photos are presentation/conference/pictures, numbered in story order (01_, 02_, …).
 * The text is refined from presentation/conference/행사 후기.txt.
 */
import { escapeHtml } from "../lib/dom.ts";
import { hrefFor } from "../router.ts";
import { loadBlur } from "./studio.ts";

const PICTURES = import.meta.glob<string>("../../presentation/conference/pictures/*.jpg", {
  eager: true,
  query: "?url",
  import: "default",
});

/** URL of picture `number`, found by its file-name prefix. */
function picture(number: number): string {
  const prefix = `${String(number).padStart(2, "0")}_`;
  const hit = Object.entries(PICTURES).find(([path]) => (path.split("/").pop() ?? "").startsWith(prefix));
  return hit?.[1] ?? "";
}

type Photo = { n: number; caption: string };
type Block =
  | { kind: "text"; paragraphs: string[] }
  | { kind: "photo"; photo: Photo }
  | { kind: "pair"; photos: [Photo, Photo] }
  | { kind: "quote"; text: string; by: string };
type Section = {
  title: string;
  /** Session number and time, shown above the title. */
  session?: string;
  /** Speaker and talk title, shown under the title. */
  speaker?: string;
  blocks: Block[];
};

const LEAD: Photo = { n: 1, caption: "국제관 B2층에 걸린 ‘AI + DESIGN FUTURES’ 현수막" };

const INTRO = [
  "11월 20일 금요일, 성균관대학교에서 ‘AI가 더해진 디자인의 미래’를 주제로 한 세미나가 열렸습니다. 런던 브루넬 대학교에서 디자인을 전공한 네 명의 연사가 한자리에 모여, 각자의 자리와 직업에서 바라본 AI와 지금의 디자인 실무, 그리고 앞으로 디자인이 나아갈 모습에 대해 이야기를 들려주었습니다.",
];

const FACTS: [string, string][] = [
  ["일시", "2026년 11월 20일(금) 17:30–19:30"],
  ["장소", "성균관대학교 인문사회과학캠퍼스 국제관 B2층 9B 218호"],
  ["공동 주최", "성균관대학교 대학원 브랜드디자인매니지먼트전공 · 런던 브루넬대학교 한국 총동문회"],
  ["후원 · 지원", "성균관대학교 · 영국 런던 브루넬 대학교 · 디자인커뮤니티 디스닷"],
  ["연사", "김규영 멘토 · 이주원 감독 · 이보연 교수 · 박형걸 PM"],
];

const SECTIONS: Section[] = [
  {
    title: "행사장 풍경",
    blocks: [
      {
        kind: "text",
        paragraphs: [
          "국제관 B2층 복도에는 ‘AI + DESIGN FUTURES’ 현수막과 네 연사의 얼굴이 담긴 X배너가 세워져, 참석자들을 강연장으로 안내했습니다.",
        ],
      },
      { kind: "photo", photo: { n: 2, caption: "일정과 장소가 적힌 현수막. 2026년 11월 20일(금) 17:30–19:30, 국제관 B2층 9B 218호" } },
      {
        kind: "pair",
        photos: [
          { n: 3, caption: "현수막 옆에 세워진 연사 소개 X배너" },
          { n: 4, caption: "계단 앞에서 강연장을 안내한 X배너" },
        ],
      },
      {
        kind: "text",
        paragraphs: [
          "강연장 무대는 세미나 키비주얼로 꾸며졌고, 입구 테이블에는 ‘#IamBrunel’과 ‘ONCE A BRUNELIAN, ALWAYS A BRUNELIAN’ 문구가 놓여 브루넬 동문 세미나다운 분위기를 더했습니다.",
        ],
      },
      {
        kind: "pair",
        photos: [
          { n: 5, caption: "세미나 키비주얼로 꾸며진 강연장 무대" },
          { n: 6, caption: "브루넬 동문 웰컴 테이블" },
        ],
      },
    ],
  },
  {
    session: "세션 1 · 18:00–18:20",
    title: "“사업을 만드는 사람이 돼야 한다”",
    speaker: "김규영 멘토 · AI 활용 글로벌 성공 디자이너",
    blocks: [
      { kind: "photo", photo: { n: 7, caption: "‘무엇이 달라졌는가’를 주제로 이야기하는 김규영 멘토님" } },
      {
        kind: "text",
        paragraphs: [
          "첫 연사인 김규영 멘토님은 취업 시장과 창업에 AI가 어떤 영향을 미쳤는지 이야기해 주셨습니다. 지금의 AI는 과거와 달리, 아이디어만 있으면 그것을 실행해 주는 역할을 맡게 되었다고 합니다. 시각화와 구현의 장벽이 크게 낮아진 셈이죠. 덕분에 수많은 디자인 결과물이 쏟아지고 있고, 디자이너가 아닌 다른 직군의 사람들도 원하는 것을 직접 구현할 수 있게 되었습니다. 그래서 지금은 무엇보다 가치 있는 결과물을 만드는 것이 가장 중요하다고 강조하셨습니다.",
          "즉 디자인의 본질이 더 중요해졌고, AI가 대체할 수 없는 영역을 잘 고민하는 것, 그리고 직접 팔아 보는 경험이 가장 필요하다는 이야기입니다.",
          "AI로 만든 템플릿을 판매하는 것도 하나의 사업 아이템으로 주목받고 있었습니다. 디자이너가 가진 안목으로 AI를 활용해 시간과 비용을 줄이고, 하나의 사업을 만들어 키워 나가는 것. 이제 디자이너가 ‘사장’이 되어야 한다는 메시지였습니다.",
        ],
      },
    ],
  },
  {
    session: "세션 2 · 18:20–18:40",
    title: "“단순한 그림이 정교한 3D가 된다”",
    speaker: "이주원 감독 · AI 활용 제품 영상 전략",
    blocks: [
      { kind: "photo", photo: { n: 8, caption: "‘THE FUTURE OF DESIGN WITH AI’로 문을 연 두 번째 세션" } },
      {
        kind: "text",
        paragraphs: [
          "영상의 시각 효과, 즉 CG를 작업하는 이주원 감독님의 강연은 이번 세미나에서 가장 실무에 가까운 이야기였습니다. 예전에는 사람이 손으로 하나하나 묘사하고 색을 입혀야 했지만, 지금은 AI가 흑백 사진을 컬러로 바꾸고 오래된 사진을 복원해 줍니다. 사진이 영상이 되고 각도까지 바꿀 수 있게 되었으며, 나노바나나(Nano Banana)로 모든 방향의 뷰를 뽑아낼 수 있다고 합니다.",
        ],
      },
      { kind: "photo", photo: { n: 9, caption: "스케치를 렌더링 이미지로 바꾸는 Variation 사례를 소개하는 이주원 감독님" } },
      {
        kind: "text",
        paragraphs: [
          "Meshy AI로 이미지를 3D 모델로 만드는 과정도 영상으로 보여 주셨습니다. 여러 각도의 이미지를 올릴수록 더 정확한 3D가 만들어진다고 합니다.",
          "Vizcom에서는 아무리 서툰 스케치라도 3D로 구현하고, 렌더링까지 거의 완벽하게 해내는 모습을 볼 수 있었습니다. 아이디에이션은 GPT나 Meta, Gemini로 하고, 그 프롬프트를 Vizcom에서 활용해 결과물을 만드는 흐름이었습니다.",
        ],
      },
      { kind: "photo", photo: { n: 10, caption: "‘프로모션 영상 만들기’ 슬라이드. Google Flow로 만든 제품 영상 사례" } },
      {
        kind: "text",
        paragraphs: [
          "힉스필드(Higgsfield)로 영상을 만들면 지금까지 해 오던 각종 CG 작업이 정말 간단하게 구현됩니다. 이제는 생성형 AI로 영화와 드라마를 제작할 수 있고, 실제 실무에서도 충분히 활용되고 있었습니다. 결국 AI는 세트장부터 CG까지 모든 과정을 압축해 주는 도구라는 것이 감독님의 이야기였습니다.",
        ],
      },
    ],
  },
  {
    session: "세션 3 · 18:40–19:00",
    title: "“AI 시대에도 사용자 리서치는 사람에게서 얻어야 한다”",
    speaker: "이보연 교수 · 데이터 드리븐 디자인 프레임워크 연구",
    blocks: [
      { kind: "photo", photo: { n: 11, caption: "University of Exeter 캠퍼스를 소개하는 이보연 교수님의 발표 화면" } },
      {
        kind: "text",
        paragraphs: [
          "현재 학생들을 가르치며 데이터 연구를 하고 계신 이보연 교수님은 리서치 회사에서 일하며 디자인의 패러다임이 바뀌었음을 느꼈다고 합니다. 지금은 실무와 연구 모두에서 AI를 많이 사용하고 있고, 단순히 UI/UX 제품이나 서비스를 파는 것을 넘어 기업이 전하고자 하는 일관된 경험을 제공하는 데 AI가 힘을 보태고 있다고 말씀해 주셨습니다.",
          "AI를 쓸 때는 데이터가 눈에 보이는 것인지, 추상적인 것인지, 빅데이터만 쓴 것인지처럼 어떤 데이터를 활용하고 또 어떻게 수집하는지가 중요하다고 하셨습니다. 특히 컨셉 개발에 AI를 많이 활용하고 있으며, 최적화된 서비스를 제공하기 위한 디자인에는 확실히 데이터가 쓰이고 있었습니다.",
          "데이터를 기반으로 한 여러 경험 디자인 사례도 보여 주셨습니다. 사람들이 걷는 방향부터 욕실 제품을 사용하는 순서까지 이런 데이터를 모으는 데 AI가 쓰이고 있지만, 사람에게서만 얻을 수 있는 데이터는 분명히 존재하며 개인의 경험을 다루는 데에는 아직 AI에 한계가 있다는 견해를 들려주셨습니다.",
        ],
      },
    ],
  },
  {
    session: "세션 4 · 19:00–19:20",
    title: "“AI로 디자인이 시스템으로 설계되는 시대”",
    speaker: "박형걸 PM · 에이전트 레디 데이터 디자이너의 역할",
    blocks: [
      {
        kind: "text",
        paragraphs: [
          "이번 브루넬 대학교 동문 세미나를 주최한 박형걸 PM님은 ‘사람의 말이 곧 프로그램이 되는 시대’라는 이야기로 강연을 시작하셨습니다. 코드를 짜던 시대에서 바뀌어, 이제는 디자인을 만드는 것을 넘어 시스템 자체를 설계해야 한다고 강조하셨습니다.",
          "일하는 에이전트를 만들고, 컴퓨터로 하던 일은 에이전트(AI)에게 맡기며, 사람은 그 일을 나누어 지시하고 결과를 확인하는 역할로 바뀌었다고 합니다.",
          "어떤 기업은 지금까지 만들어 온 제품 디자인의 역사를 모델링하고 프롬프트로 정리해 데이터로 만들었는데, 이 데이터가 사내 직원보다 더 신뢰할 만하다는 평가를 받았다고 합니다. 반드시 데이터가 있어야 하고, 이를 바탕으로 그 기업만의 디자인 시스템을 구축하는 흐름으로 보였습니다.",
        ],
      },
      { kind: "quote", text: "디자인을 만드는 걸 넘어서 시스템 자체를 설계해야 한다.", by: "나이키 디자인 디렉터" },
      {
        kind: "text",
        paragraphs: [
          "이제 디자이너는 순간순간 디자인하는 사람이 아니라, 데이터를 바탕으로 AI를 통해 시스템까지 구현하는 역할을 맡아야 한다는 이야기였습니다.",
        ],
      },
    ],
  },
  {
    title: "마치며",
    blocks: [
      {
        kind: "text",
        paragraphs: [
          "네 분의 이야기를 관통한 메시지는, AI 시대에 가장 중요한 것은 문제의 본질을 파악하는 능력이라는 점이었습니다. AI가 발전할수록 경험 있는 사람이 더 필요해집니다. AI의 할루시네이션을 가려낼 수 있는 사람, 해당 분야에 감각이 있는 사람, 좋고 나쁨을 판단할 줄 아는 사람, AI가 만든 콘텐츠를 검증하고 적재적소에 쓸 줄 아는 사람이 살아남을 것이라는 이야기가 강연 전반에 스며 있었습니다.",
          "AI가 나왔다고 공부를 게을리해서는 안 되고, 디자인을 보는 안목도 결코 놓쳐서는 안 됩니다. 모든 분야에서 AI가 쓰이고 진입장벽이 낮아진 만큼, 그동안 쌓아 온 경험으로 AI를 검증할 수 있도록 지금의 디자이너는 더 많은 지식과 경험을 쌓고 기초를 단단히 다져야 하는 시대라고 생각합니다.",
        ],
      },
    ],
  },
];

function figure(photo: Photo, lazy = true): string {
  const src = picture(photo.n);
  if (!src) return "";
  const loading = lazy ? ' loading="lazy"' : ' fetchpriority="high"';
  return `
      <figure class="review__figure" data-reveal="rise">
        <img src="${escapeHtml(src)}" alt="${escapeHtml(photo.caption)}" width="2400" height="1800" decoding="async"${loading} />
        <figcaption>${escapeHtml(photo.caption)}</figcaption>
      </figure>`;
}

function block(item: Block): string {
  switch (item.kind) {
    case "text":
      return item.paragraphs.map((text) => `<p>${escapeHtml(text)}</p>`).join("");
    case "photo":
      return figure(item.photo);
    case "pair":
      return `<div class="review__pair">${item.photos.map((photo) => figure(photo)).join("")}</div>`;
    case "quote":
      return `
      <blockquote class="review__quote">
        <p>${escapeHtml(item.text)}</p>
        <cite>${escapeHtml(item.by)}</cite>
      </blockquote>`;
  }
}

function section(item: Section): string {
  return `
    <section class="review__section">
      ${item.session ? `<p class="review__session">${escapeHtml(item.session)}</p>` : ""}
      <h2 class="review__heading" data-reveal="text">${escapeHtml(item.title)}</h2>
      ${item.speaker ? `<p class="review__speaker">${escapeHtml(item.speaker)}</p>` : ""}
      ${item.blocks.map(block).join("")}
    </section>`;
}

/**
 * Entrance, once per visit: each title writes in with the progressive blur and each photo rises into place
 * the first time it comes on screen. Reduced motion, or no blur script, shows everything as it is.
 */
export function bindReview(root: HTMLElement): void {
  const article = root.querySelector<HTMLElement>(".review");
  if (!article || typeof IntersectionObserver === "undefined" || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  article.classList.add("review--animate");
  const blur = loadBlur().catch(() => null);
  const reveal = (el: HTMLElement) => {
    if (el.dataset.reveal !== "text") {
      el.classList.add("is-revealed");
      return;
    }
    void blur.then((api) => {
      // Shown and split into hidden letters in the same task, so the sharp title never flashes.
      el.classList.add("is-revealed");
      api?.writeText(el, { autoplay: true });
    });
  };
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        reveal(entry.target as HTMLElement);
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
  );
  article.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => observer.observe(el));
}

export function renderReview(): string {
  const back = hrefFor({ name: "conference", card: null });
  return `
    <article class="page review">
      <header class="review__header">
        <a class="detail__back" href="${back}"><span class="detail__back-icon" aria-hidden="true">←</span> Conference</a>
        <p class="review__kicker">행사 후기</p>
        <h1 class="page__title review__title" data-reveal="text">AI가 더해진 디자인의 미래</h1>
        <p class="review__subtitle">AI + DESIGN FUTURES · 2026 디자인경영 전략세미나</p>
      </header>
      <div class="review__lead">${figure(LEAD, false)}</div>
      <div class="review__body">
        ${INTRO.map((text) => `<p class="review__intro">${escapeHtml(text)}</p>`).join("")}
        <dl class="review__facts">
          ${FACTS.map(([term, value]) => `<div><dt>${escapeHtml(term)}</dt><dd>${escapeHtml(value)}</dd></div>`).join("")}
        </dl>
        ${SECTIONS.map(section).join("")}
        <footer class="review__footer">
          <a class="detail__back" href="${back}"><span class="detail__back-icon" aria-hidden="true">←</span> Conference로 돌아가기</a>
        </footer>
      </div>
    </article>
  `;
}
