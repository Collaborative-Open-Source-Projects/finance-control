import { z } from 'zod';

export const categorySchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(50, "Name is too long"),
  color: z.string().regex(/^#([0-9a-fA-F]{3}){1,2}$/, "Must be a valid hex color").optional().nullable(),
  budgetLimit: z.number().positive("Budget limit must be positive").optional().nullable(),
});