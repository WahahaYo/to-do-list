const fs = require('fs');
const path = require('path');

const width = 1200;
const height = 630;

// PNG文件结构
function createPNG(width, height) {
  const chunks = [];

  // IHDR chunk
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData.writeUInt8(8, 8);   // bit depth
  ihdrData.writeUInt8(2, 9);   // color type (RGB)
  ihdrData.writeUInt8(0, 10);  // compression
  ihdrData.writeUInt8(0, 11);  // filter
  ihdrData.writeUInt8(0, 12);  // interlace
  chunks.push(createChunk('IHDR', ihdrData));

  // IDAT chunk - 创建蓝色渐变背景
  const imageData = Buffer.alloc(width * height * 3);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 3;
      // 创建蓝色到紫色的渐变
      const ratio = x / width;
      imageData[idx] = Math.round(59 + (139 - 59) * ratio);     // R
      imageData[idx + 1] = Math.round(130 + (92 - 130) * ratio); // G
      imageData[idx + 2] = Math.round(246 + (246 - 246) * ratio); // B
    }
  }

  // 简单的压缩（实际应该使用zlib）
  const scanlines = [];
  for (let y = 0; y < height; y++) {
    const scanline = Buffer.alloc(1 + width * 3);
    scanline[0] = 0; // filter type
    for (let x = 0; x < width; x++) {
      const srcIdx = (y * width + x) * 3;
      const dstIdx = 1 + x * 3;
      scanline[dstIdx] = imageData[srcIdx];
      scanline[dstIdx + 1] = imageData[srcIdx + 1];
      scanline[dstIdx + 2] = imageData[srcIdx + 2];
    }
    scanlines.push(scanline);
  }

  const idatData = Buffer.concat(scanlines);
  chunks.push(createChunk('IDAT', idatData));

  // IEND chunk
  chunks.push(createChunk('IEND', Buffer.alloc(0)));

  // PNG签名
  const signature = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);

  // 合并所有数据
  const pngData = Buffer.concat([signature, ...chunks]);
  return pngData;
}

function createChunk(type, data) {
  const typeBuffer = Buffer.from(type, 'ascii');
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length, 0);

  const chunkData = Buffer.concat([typeBuffer, data]);
  const crc = calculateCRC(chunkData);
  const crcBuffer = Buffer.alloc(4);
  crcBuffer.writeUInt32BE(crc, 0);

  return Buffer.concat([length, chunkData, crcBuffer]);
}

function calculateCRC(data) {
  let crc = 0xFFFFFFFF;
  const table = [];

  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[n] = c;
  }

  for (let i = 0; i < data.length; i++) {
    crc = table[(crc ^ data[i]) & 0xFF] ^ (crc >>> 8);
  }

  return (crc ^ 0xFFFFFFFF) >>> 0;
}

// 生成PNG文件
const pngData = createPNG(width, height);
const outputPath = path.join(__dirname, '../public/og-image.png');
fs.writeFileSync(outputPath, pngData);

console.log('OG image generated successfully at:', outputPath);
console.log('Size:', pngData.length, 'bytes');