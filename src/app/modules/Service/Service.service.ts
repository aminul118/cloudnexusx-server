import { QueryBuilder } from '../../utils/QueryBuilder';
import { IService } from './Service.interface';
import { Service } from './Service.model';

const createServiceIntoDB = async (payload: IService) => {
  const result = await Service.create(payload);
  return result;
};

const getAllServicesFromDB = async (query: Record<string, unknown>) => {
  const serviceQuery = new QueryBuilder(Service.find(), query)
    .search(['title', 'description', 'content'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await serviceQuery.modelQuery;
  const meta = await serviceQuery.countTotal();

  return {
    meta,
    result,
  };
};

const getSingleServiceFromDB = async (id: string) => {
  const result = await Service.findById(id);
  return result;
};

const getSingleServiceBySlugFromDB = async (slug: string) => {
  const result = await Service.findOne({ slug });
  return result;
};

const updateServiceIntoDB = async (id: string, payload: Partial<IService>) => {
  const result = await Service.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteServiceFromDB = async (id: string) => {
  const result = await Service.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

export const ServiceServices = {
  createServiceIntoDB,
  getAllServicesFromDB,
  getSingleServiceFromDB,
  getSingleServiceBySlugFromDB,
  updateServiceIntoDB,
  deleteServiceFromDB,
};
