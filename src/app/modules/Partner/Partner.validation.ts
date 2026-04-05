import { z } from 'zod';

const createPartnerValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Partner name is required',
    }),
    link: z.string().optional(),
    logo: z.string().optional(), // Can be optional during request as it's often added from file upload
  }),
});

const updatePartnerValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    link: z.string().optional(),
    logo: z.string().optional(),
  }),
});

export const PartnerValidation = {
  createPartnerValidationSchema,
  updatePartnerValidationSchema,
};
