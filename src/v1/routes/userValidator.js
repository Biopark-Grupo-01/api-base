import yup from 'yup';

export default yup
  .object()
  .shape({
    name: yup
      .string()
      .min(2, "Too short (name)")
      .max(80, "Too long (name)")
      .required("Required (name)"),
    email: yup
      .string()
      .email("Invalid (email)")
      .required("Required (email)"),
    password: yup
      .string()
      .min(8, "Too short (password)")
      .max(20, "Too long (password)")
      .matches(/(?=.*[0-9])/, "Password must contain a number")
      .matches(/(?=.*[a-z])/, "Password must contain a lowercase letter")
      .matches(/(?=.*[A-Z])/, "Password must contain an uppercase letter")
      .matches(/(?=.*[!@#$%^&*])/, "Password must contain a special character")
      .required("Required (password)"),
  });