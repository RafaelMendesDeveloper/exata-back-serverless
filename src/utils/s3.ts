import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export const uploadBufferToS3 = async (buffer: Buffer, mimetype: string): Promise<string> => {
  const fileName = `${uuidv4()}`;
  const bucket = "luciano-marmita";
  const folder = "imagens/";

  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: `${folder}${fileName}`,
    Body: buffer,
    ContentType: mimetype,
    ACL: "public-read",
  });

  await s3.send(command);

  return `https://${bucket}.s3.amazonaws.com/${folder}${fileName}`;
};