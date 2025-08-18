import sharp from "sharp";

export const addWatermark = async (image: Buffer): Promise<Buffer> => {
    const watermark = Buffer.from(`
    <svg width="600" height="150">
      <style>
        .watermark {
          fill: white;
          font-size: 48px;
          font-weight: bold;
          opacity: 0.18;
        }
      </style>
      <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" class="watermark">Exata ADM</text>
    </svg>`);

    const finalImage = await sharp(image).composite([{
        input: watermark,
        gravity: 'center',
        blend: 'over'
    }]).toBuffer();

    return finalImage;
}