import * as yup from "yup";

export const regValid = yup
  .object({
    login: yup.string().min(6, "Минимальная длинна 6 символов").max(20, "Максимальная длинна 6 символов"),
    email: yup.string().email("Не верный формат Email"),
    password: yup.string().min(6, "Минимальная длинна 6 символов").max(30, "Максимальная длинна 6 символов"),
    agreement: yup.boolean().oneOf([true], "Вы должны согласиться"),
  })
  .required();
