import { sendError } from "./index";
import * as yup from "yup";

module.exports = {
  validateGetChannelList: async (req, res, next) => {
    const schema = yup.object().shape({
      email: yup.string().required(),
    });
    await validate(schema, req.query, res, next);
  },

  validateSearchUser: async (req, res, next) => {
    const schema = yup.object().shape({
      email: yup.string().required(),
    });
    await validate(schema, req.query, res, next);
  },
};
const validate = async (schema, reqData, res, next) => {
  try {
    await schema.validate(reqData, { abortEarly: false });
    next();
  } catch (e) {
    const errors = e.inner.map(({ path, message, value }) => ({
      path,
      message,
      value,
    }));
    sendError(res, errors, "Invalid Request");
  }
};
