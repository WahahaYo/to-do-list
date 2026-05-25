const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, '../public/og-image.png');
const tempPath = path.join(__dirname, '../public/og-image-temp.png');
const outputPath = path.join(__dirname, '../public/og-image.png');

async function compressImage() {
  try {
    // 获取原始文件大小
    const stats = fs.statSync(inputPath);
    console.log(`原始文件大小: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);

    // 压缩图片到约500KB
    const targetSize = 500 * 1024; // 500KB

    // 尝试不同的质量级别来达到目标大小
    let quality = 80;
    let outputSize = stats.size;

    while (outputSize > targetSize && quality > 10) {
      await sharp(inputPath)
        .resize(1200, 630)
        .png({ quality: quality })
        .toFile(tempPath);

      const newStats = fs.statSync(tempPath);
      outputSize = newStats.size;
      console.log(`质量 ${quality}%: ${(outputSize / 1024).toFixed(1)} KB`);

      quality -= 10;
    }

    // 将临时文件移动到目标位置
    fs.copyFileSync(tempPath, outputPath);
    fs.unlinkSync(tempPath);

    console.log(`\n压缩完成! 最终大小: ${(outputSize / 1024).toFixed(1)} KB`);

  } catch (error) {
    console.error('压缩失败:', error);
  }
}

compressImage();