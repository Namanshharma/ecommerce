import { z } from 'zod'

export const addAddressSchema = z.object({
    address1: z.string().min(3, "Please fill the complete address"),
    address2: z.string().nullable(),
    city: z.string().min(3, "Please enter valid City name"),
    country: z.string().min(3, "Please enter valid Country name"),
    pincode: z.number(),
    userId: z.number()
});