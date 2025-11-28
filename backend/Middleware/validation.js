import { ValidationError } from "yup";

// Middleware function for validation
const validate = (schema) => async (req, res, next) => {
    try {
        await schema.validate(req.body, { abortEarly: false });
        next();
    } catch (err) {
        if (err instanceof ValidationError) {
            return res.status(400).json({ errors: err.errors });
        }
        next(err);
    }
};

export default validate;
