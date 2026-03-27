import z from "zod";

export const signInSchema = z.object({
    email: z.email("Please enter a valid email address."),
    password: z.string("Please create a password.").min(8, "Password must be at least 8 characters long."),
});

export type SignInSchema = z.infer<typeof signInSchema>;

export const signUpSchema = z.object({
    name: z.string("Please enter your name.").trim().min(4, "Name must be at least 4 characters long."),
    email: z.email("Please enter a valid email address."),
    password: z.string("Please create a password.").trim().min(8, "Password must be at least 8 characters long."),
});

export type SignUpSchema = z.infer<typeof signUpSchema>;
