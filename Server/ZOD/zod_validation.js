const z = require('zod')

const Uservalidation = z.object({
    username: z
        .string()
        .nonempty('Name is Required!')
        .trim()
        .min(2, 'Name must have at least 2 characters')
        .max(25, "Name must not be more than 25 characters!"),

    email: z
        .string()
        .nonempty('Email is Required!')
        .email("Invalid email address"),

    phone: z
        .string()
        .nonempty('Phone is Required!')
        .trim()
        .min(10, 'Phone must be exactly 10 digits')
        .max(10, 'Phone must be exactly 10 digits'),

    password: z
        .string()
        .nonempty('Password is Required!')
        .min(6, 'Password must have at least 6 characters')
        .max(10, 'Password must not be more than 10 characters')
        .regex(
            /[!@#$%^&*(),.?":{}|<>]/,
            "Password must contain at least one special character"
        ),
    isAdmin: z.boolean().optional().default(false)
});

const loginvalidation = z.object({
    email: z.string()
        .nonempty('Email Is Required!')
        .email(),
    password: z.string()
        .nonempty('Password is Required')
        .regex(/[!@#$%^&*(),.?":{}|<>]/,
            "Password must contain at least one special character")
});

module.exports = { Uservalidation, loginvalidation }