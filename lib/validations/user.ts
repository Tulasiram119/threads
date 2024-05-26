import {z} from "zod"


export const userValidation = z.object({
    profile_photo:z.string().url().min(1),
    name:z.string().min(3,{message:"min 3 characters are requried"}).max(30,{message:"max 30 characters are allowed"}),
    username:z.string().min(3,{message:"min 3 characters are requried"}).max(30,{message:"max 30 characters are allowed"}),
    bio:z.string().min(3).max(1000)
})