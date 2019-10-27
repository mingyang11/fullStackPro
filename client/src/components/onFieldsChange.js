// makesure the props.changeRecord
const onFieldsChange = (props, flds) => {
  const fields = flds;
  const keys = Object.keys(fields || {});
  for (let i = 0; i < keys.length; i += 1) {
    let fld;
    const key = keys[i];
    for (let j = 0; j < props.fields.length; j += 1) {
      const field = props.fields[j];
      if (field.name === fields[key].name) {
        fld = field;
        break;
      }
      if (field.items) {
        fld = field.items.find((item) => item.name === fields[key].name);
      }
    }
    fields[key].type = fld && fld.type;
    fields[key] = {
      ...{ value: undefined },
      ...fields[key],
    };
  }
  props.changeRecord && props.changeRecord({
    ...props.values,
    ...fields,
  }, flds);
};

export default onFieldsChange;
