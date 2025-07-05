import Property from '../models/Property';

export const createProperty = async (data: any) => {
    const property = new Property(data);
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
    return Property.findByIdAndDelete(id);
};