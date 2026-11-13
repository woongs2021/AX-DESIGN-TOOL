figma.showUI(__html__, { width: 300, height: 88, themeColors: true });

figma.ui.onmessage = (msg) => {
  if (!msg || msg.type !== "place" || !msg.job) return;
  void place(msg.job).then(
    (frameId) => figma.ui.postMessage({ type: "done", id: msg.job.id, ok: true, frameId }),
    (error) => {
      const message = error instanceof Error ? error.message : "카드를 넣지 못했습니다.";
      figma.notify(message, { error: true });
      figma.ui.postMessage({ type: "done", id: msg.job.id, ok: false, error: message });
    },
  );
};

async function place(job) {
  if (job.fileKey && figma.fileKey && figma.fileKey !== job.fileKey) {
    throw new Error("Figma에서 해당 파일을 연 뒤 플러그인을 다시 실행해 주세요.");
  }
  const found = await destination(job.nodeId);
  let response;
  try {
    response = await fetch(`http://127.0.0.1:47321/jobs/${job.id}/png`);
  } catch {
    throw new Error("로컬 브리지에서 카드 이미지를 받지 못했습니다.");
  }
  if (!response.ok) throw new Error("카드 이미지를 받지 못했습니다.");
  const image = figma.createImage(new Uint8Array(await response.arrayBuffer()));
  await figma.setCurrentPageAsync(found.page);
  const width = Math.max(1, Number(job.width) || 1);
  const height = Math.max(1, Number(job.height) || 1);
  const frame = figma.createFrame();
  frame.name = job.name || "카드";
  frame.resize(width, height);
  frame.cornerRadius = Math.max(0, Math.min(Number(job.radius) || 0, width / 2, height / 2));
  frame.clipsContent = true;
  frame.fills = [];
  found.parent.appendChild(frame);
  const rect = figma.createRectangle();
  rect.name = "카드 이미지";
  rect.resize(width, height);
  rect.fills = [{ type: "IMAGE", imageHash: image.hash, scaleMode: "FILL" }];
  frame.appendChild(rect);
  park(found.parent, frame);
  figma.currentPage.selection = [frame];
  figma.viewport.scrollAndZoomIntoView([frame]);
  figma.notify("카드를 넣었습니다.");
  return frame.id;
}

async function destination(nodeId) {
  if (!nodeId) return { parent: figma.currentPage, page: figma.currentPage };
  const node = await figma.getNodeByIdAsync(nodeId);
  if (!node) throw new Error("주소의 페이지를 이 파일에서 찾지 못했습니다.");
  if (node.type === "PAGE") return { parent: node, page: node };
  const page = pageOf(node);
  if (!page) throw new Error("주소의 페이지를 이 파일에서 찾지 못했습니다.");
  if (node.type === "SECTION") return { parent: node, page };
  return { parent: page, page };
}

function pageOf(node) {
  let current = node;
  while (current && current.type !== "PAGE") current = current.parent;
  return current && current.type === "PAGE" ? current : null;
}

function park(parent, node) {
  let x = 0;
  if ("children" in parent) {
    for (const child of parent.children) {
      if (child === node || !("x" in child) || !("width" in child)) continue;
      x = Math.max(x, child.x + child.width + 80);
    }
  }
  node.x = x;
  node.y = 0;
}
