import Extension from "@tepez/joi-phone-number-extensions";
import BaseJoi from "joi";

const Joi = BaseJoi.extend(Extension).extend(require('@joi/date'));
export default Joi;
