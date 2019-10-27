// makesure the props.values
import { Form } from 'antd';

const mapPropsToFields = (props = {}) => {
  const res = {};
  const {
    fields = [],
  } = props;
  for (let i = 0; i < fields.length; i += 1) {
    if (fields[i].items) {
      for (let j = 0; j < fields[i].items.length; j += 1) {
        const key = fields[i].items[j].name;
        const disabled = fields[i].items[j].disabled;
        const param = props.values && props.values[key];
        if (typeof param === 'object' && param !== null && 'value' in param) {
          if (disabled) { // clear the errors, all the thing is data
            param.errors = null;
          }
          res[key] = Form.createFormField(param);
        } else {
          res[key] = Form.createFormField({ value: param });
        }
      }
    }
    const key = fields[i].name;
    const disabled = fields[i].disabled;
    const param = props.values && props.values[key];
    if (typeof param === 'object' && param !== null && 'value' in param) {
      if (disabled) { // clear the errors, all the thing is data
        param.errors = null;
      }
      res[key] = Form.createFormField(param);
    } else {
      res[key] = Form.createFormField({ value: param });
    }
  }
  return res;
};

export default mapPropsToFields;
