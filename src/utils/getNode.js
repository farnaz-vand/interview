export function buildRules(node, restriction) {
  const rules = {};
  const isRequired = Number(node?.min) > 0;

  if (isRequired) {
    rules.required = 'field is required';
  }

  const min = restriction?.minLength ? Number(restriction.minLength) : undefined;

  const max = restriction?.maxLength ? Number(restriction.maxLength) : undefined;

  if (min !== undefined) {
    rules.minLength = {
      value: min,
    };
  }

  if (max !== undefined) {
    rules.maxLength = {
      value: max,
    };
  }

  if (restriction?.pattern) {
    try {
      rules.pattern = {
        value: new RegExp(restriction.pattern),
      };
    } catch (err) {
      console.log('Invalid regex pattern:', err);
    }
  }
  return { rules, min, max, isRequired };
}
