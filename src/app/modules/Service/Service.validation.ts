import { z } from 'zod';

const createServiceValidationSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
    description: z.string({
      required_error: 'Description is required',
    }),
    content: z.string({
      required_error: 'Content is required',
    }),
    image: z.string({
      required_error: 'Image is required',
    }),
    icon: z.string({
      required_error: 'Icon is required',
    }),
  }),
});

const updateServiceValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    content: z.string().optional(),
    image: z.string().optional(),
    icon: z.string().optional(),
  }),
});

export const ServiceValidations = {
  createServiceValidationSchema,
  updateServiceValidationSchema,
};
