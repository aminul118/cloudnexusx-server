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

const getSinglePartnerFromDB = async (id: string) => {
  const result = await Partner.findById(id);
  return result;
};

const getSinglePartnerBySlugFromDB = async (slug: string) => {
  const result = await Partner.findOne({ slug });
  return result;
};

const updatePartnerInDB = async (id: string, payload: Partial<IPartner>) => {
  const result = await Partner.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const deletePartnerFromDB = async (id: string) => {
  const result = await Partner.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

export const PartnerService = {
  createPartnerInDB,
  getAllPartnersFromDB,
  getSinglePartnerFromDB,
  getSinglePartnerBySlugFromDB,
  updatePartnerInDB,
  deletePartnerFromDB,
};
