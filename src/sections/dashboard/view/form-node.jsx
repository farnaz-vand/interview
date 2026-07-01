import { MenuItem } from '@mui/material';

import { RHFSelect, RHFCheckbox, RHFTextField } from 'src/components/hook-form';

import { buildRules } from '../../../utils/getNode';

export default function FormNode({ node, path = '' }) {
  if (!node) return null;

  const nodeName = node?.name || 'root';
  const label = node?.verbose_name || nodeName;
  const elementType = node?.element_type || {};
  const restriction = elementType?.restriction || {};
  const type = elementType?.type;

  const baseType = elementType?.base || restriction?.base;
  const pathField = path ? `${path}.${nodeName}` : nodeName;

  const { rules, min, max, isRequired } = buildRules(node, restriction);

  const renderChildren = () =>
    elementType.children?.map((group, gIdx) =>
      group.map((child, cIdx) => (
        <FormNode key={`${pathField}-${gIdx}-${cIdx}`} node={child} path={pathField} />
      ))
    );

  if (type === 'choice') {
    return (
      <div>
        <h5>choice: {label}</h5>
        {renderChildren()}
      </div>
    );
  }

  if (type === 'element_sequence') {
    return (
      <div
        style={{
          marginLeft: 16,
          borderLeft: '1px solid #eee',
          paddingLeft: 10,
        }}
      >
        <h4>{label}</h4>
        {renderChildren()}
      </div>
    );
  }

  if (baseType === 'boolean') {
    return <RHFCheckbox name={pathField} label={label} defaultValue={false} />;
  }

  if (elementType?.enumeration) {
    return (
      <RHFSelect
        sx={{ mb: 1, mt: 1 }}
        name={pathField}
        label={label}
        placeholder={node?.description}
        required={isRequired}
        defaultValue=""
        rules={rules}
      >
        {elementType.enumeration.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </RHFSelect>
    );
  }

  return (
    <RHFTextField
      sx={{ mb: 1, mt: 1 }}
      name={pathField}
      label={label}
      placeholder={node?.description}
      required={isRequired}
      defaultValue=""
      inputProps={{
        minLength: min,
        maxLength: max,
      }}
      rules={rules}
    />
  );
}
