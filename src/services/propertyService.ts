import Property from "../models/Property";
import { uploadBufferToS3 } from "../utils/s3";

export const createProperty = async (
  data: any,
  imagens: { buffer: Buffer; mimetype: string }[]
) => {
  const urls = await Promise.all(
    imagens.map((img) => uploadBufferToS3(img.buffer, img.mimetype))
  );
  const property = new Property({ ...data, imagens: urls });
  await property.save();
  return property;
};

export const getAllProperties = async () => {
  return Property.find();
};

export const getPropertyById = async (id: string) => {
  return Property.findById(id);
};

export const updateProperty = async (id: string, data: any) => {
  return Property.findByIdAndUpdate(id, data, { new: true });
};

export const deleteProperty = async (id: string) => {
  return Property.findByIdAndUpdate(id, { ativo: false }, { new: true });
};
