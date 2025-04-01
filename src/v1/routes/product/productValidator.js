import yup from 'yup';

export default yup
  .object()
  .shape({
    name: yup
      .string()
      .min(2, "Too short (name)")
      .max(80, "Too long (name)")
      .required("Required (name)"),
    description: yup
      .string()
      .min(2, "Too short (description)")
      .max(200, "Too long (description)")
      .required("Required (description)"),
    quantity: yup
      .string()
      .min(1, "Too short (quantity)")
      .max(20, "Too long (quantity)")
      .required("Required (quantity)"),
    price: yup
      .number()
      .min(0, "Too low (price)")
      .max(1000000, "Too high (price)")
      .required("Required (price)"),
  });