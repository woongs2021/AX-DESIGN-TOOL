/** A one-page PDF whose page is the card image, including rounded-corner transparency. */

function concat(parts: readonly Uint8Array[]): Uint8Array {
  const out = new Uint8Array(parts.reduce((sum, part) => sum + part.length, 0));
  let offset = 0;
  for (const part of parts) {
    out.set(part, offset);
    offset += part.length;
  }
  return out;
}

async function deflate(bytes: Uint8Array): Promise<Uint8Array> {
  const copy = new ArrayBuffer(bytes.byteLength);
  new Uint8Array(copy).set(bytes);
  const stream = new Blob([copy]).stream().pipeThrough(new CompressionStream("deflate"));
  return new Uint8Array(await new Response(stream).arrayBuffer());
}

/** Bytes of a PDF page that shows `pixels` at 1 pixel = 1 point. */
export async function cardPdf(pixels: Uint8ClampedArray, width: number, height: number): Promise<Uint8Array> {
  const count = width * height;
  if (width < 1 || height < 1 || pixels.length < count * 4) throw new Error("image");
  const rgb = new Uint8Array(count * 3);
  const alpha = new Uint8Array(count);
  let opaque = true;
  for (let index = 0; index < count; index += 1) {
    const offset = index * 4;
    rgb[index * 3] = pixels[offset] ?? 0;
    rgb[index * 3 + 1] = pixels[offset + 1] ?? 0;
    rgb[index * 3 + 2] = pixels[offset + 2] ?? 0;
    const channel = pixels[offset + 3] ?? 0;
    alpha[index] = channel;
    if (channel !== 255) opaque = false;
  }
  const rgbZip = await deflate(rgb);
  const alphaZip = opaque ? null : await deflate(alpha);
  const text = new TextEncoder();
  const parts: Uint8Array[] = [];
  let length = 0;
  const push = (bytes: Uint8Array) => {
    parts.push(bytes);
    length += bytes.length;
  };
  const pushText = (value: string) => push(text.encode(value));
  const offsets: number[] = [];
  const start = (id: number) => {
    offsets[id] = length;
    pushText(`${id} 0 obj\n`);
  };
  const end = () => pushText("endobj\n");
  const stream = (bytes: Uint8Array) => {
    pushText(`<< /Length ${bytes.length} >>\nstream\n`);
    push(bytes);
    pushText("\nendstream\n");
  };

  pushText("%PDF-1.4\n%\xFF\xFF\xFF\xFF\n");
  start(1);
  pushText("<< /Type /Catalog /Pages 2 0 R >>\n");
  end();
  start(2);
  pushText("<< /Type /Pages /Count 1 /Kids [3 0 R] >>\n");
  end();
  start(3);
  pushText(
    `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${width} ${height}] /Contents 4 0 R /Resources << /XObject << /Im 5 0 R >> >> >>\n`,
  );
  end();
  const content = text.encode(`q ${width} 0 0 ${height} 0 0 cm /Im Do Q\n`);
  start(4);
  stream(content);
  end();
  start(5);
  pushText(
    `<< /Type /XObject /Subtype /Image /Width ${width} /Height ${height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /FlateDecode /Length ${rgbZip.length}${alphaZip ? " /SMask 6 0 R" : ""} >>\nstream\n`,
  );
  push(rgbZip);
  pushText("\nendstream\n");
  end();
  if (alphaZip) {
    start(6);
    pushText(
      `<< /Type /XObject /Subtype /Image /Width ${width} /Height ${height} /ColorSpace /DeviceGray /BitsPerComponent 8 /Filter /FlateDecode /Length ${alphaZip.length} >>\nstream\n`,
    );
    push(alphaZip);
    pushText("\nendstream\n");
    end();
  }
  const objects = alphaZip ? 6 : 5;
  const xref = length;
  let table = `xref\n0 ${objects + 1}\n0000000000 65535 f \n`;
  for (let id = 1; id <= objects; id += 1) table += `${String(offsets[id] ?? 0).padStart(10, "0")} 00000 n \n`;
  table += `trailer\n<< /Size ${objects + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`;
  pushText(table);
  return concat(parts);
}
