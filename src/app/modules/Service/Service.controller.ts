import { Request, Response } from 'express';
import { ServiceServices } from './Service.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

const createService = catchAsync(async (req: Request, res: Response) => {
  const result = await ServiceServices.createServiceIntoDB(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Service created successfully',
    data: result,
  });
});

const getAllServices = catchAsync(async (req: Request, res: Response) => {
  const { meta, result } = await ServiceServices.getAllServicesFromDB(
    req.query,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Services fetched successfully',
    meta,
    data: result,
  });
});

const getSingleService = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ServiceServices.getSingleServiceFromDB(id as string);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Service fetched successfully',
    data: result,
  });
});

const getSingleServiceBySlug = catchAsync(
  async (req: Request, res: Response) => {
    const { slug } = req.params;
    const result = await ServiceServices.getSingleServiceBySlugFromDB(
      slug as string,
    );
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Service fetched successfully',
      data: result,
    });
  },
);

const updateService = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ServiceServices.updateServiceIntoDB(
    id as string,
    req.body,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Service updated successfully',
    data: result,
  });
});

const deleteService = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ServiceServices.deleteServiceFromDB(id as string);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Service deleted successfully',
    data: result,
  });
});

export const ServiceControllers = {
  createService,
  getAllServices,
  getSingleService,
  getSingleServiceBySlug,
  updateService,
  deleteService,
};
