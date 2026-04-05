import { IPartner } from './Partner.interface';
import { Partner } from './Partner.model';

const createPartnerInDB = async (payload: IPartner) => {
  const result = await Partner.create(payload);
  return result;
};

const getAllPartnersFromDB = async () => {
  const result = await Partner.find({ isDeleted: false });
  return result;
};


const getSinglePartnerBySlugFromDB = async (slug: string) => {
  const result = await Partner.findOne({ slug });
  return result;
};

const updatePartnerBySlugInDB = async (slug: string, payload: Partial<IPartner>) => {
  const result = await Partner.findOneAndUpdate({ slug }, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deletePartnerBySlugFromDB = async (slug: string) => {
  const result = await Partner.findOneAndUpdate(
    { slug },
    { isDeleted: true },
    { new: true },
  );
  return result;
};

export const PartnerService = {
  createPartnerInDB,
  getAllPartnersFromDB,
  getSinglePartnerBySlugFromDB,
  updatePartnerBySlugInDB,
  deletePartnerBySlugFromDB,
};
