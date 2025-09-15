import Property from "../models/Property";
import { uploadBufferToS3 } from "../utils/s3";
import { addWatermark } from "./pictureService";

export const createProperty = async (
  data: any,
  imagens: { buffer: Buffer; mimetype: string }[]
) => {
  const urls = await Promise.all(
    imagens.map(async (img) => {
      const imgWithWaterMark = await addWatermark(img.buffer);
      return uploadBufferToS3(imgWithWaterMark, img.mimetype);
    })
  );
  const property = new Property({ ...data, imagens: urls });
  await property.save();
  return property;
};

export const getAllProperties = async () => {
  return Property.find();
};

export const getActiveProperties = async () => {
  return Property.find({ativo: true});
};

export const getPropertyById = async (id: string) => {
  return Property.findById(id);
};

export const updateProperty = async (
  id: string,
  data: any,
  imagens: { buffer: Buffer; mimetype: string }[]
) => {
  let urls: string[] = [];

  if (imagens && imagens.length > 0) {
    urls = await Promise.all(
      imagens.map((img) => uploadBufferToS3(img.buffer, img.mimetype))
    );
  }

  if (urls.length > 0) {
    data.imagens = urls;
  }

  return Property.findByIdAndUpdate(id, data, { new: true });
};

export const deleteProperty = async (id: string) => {
  return Property.findByIdAndUpdate(id, { ativo: false }, { new: true });
};

export const favoriteProperty = async (id: string) => {
  return Property.findByIdAndUpdate(id, { favorito: true });
};
