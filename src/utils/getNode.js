export function buildRules(node, restriction) {
  const rules = {};
  const isRequired = Number(node?.min) > 0;

  if (isRequired) {
    rules.required = '${label} is required';
  }

  const min = restriction?.minLength ? Number(restriction.minLength) : undefined;

  const max = restriction?.maxLength ? Number(restriction.maxLength) : undefined;

  if (min !== undefined) {
    rules.minLength = {
      value: min,
      message: `Minimum length is ${min}`,
    };
  }

  if (max !== undefined) {
    rules.maxLength = {
      value: max,
      message: `Maximum length is ${max}`,
    };
  }
  const minVal =
    restriction?.minInclusive !== undefined ? Number(restriction.minInclusive) : undefined;

  const maxVal =
    restriction?.maxInclusive !== undefined ? Number(restriction.maxInclusive) : undefined;

  if (minVal !== undefined) {
    rules.min = {
      value: minVal,
      message: `Value must be greater than or equal to ${minVal}`,
    };
  }

  if (maxVal !== undefined) {
    rules.max = {
      value: maxVal,
      message: `Value must be less than or equal to ${maxVal}`,
    };
  }

  if (restriction?.pattern) {
    try {
      const pattern = restriction.pattern.startsWith('^')
        ? restriction.pattern
        : `^${restriction.pattern}$`;

      rules.pattern = {
        value: new RegExp(pattern),
        message: `Invalid ${label} format`,
      };
    } catch (err) {
      console.log('Invalid regex pattern:', err);
    }
  }
  return { rules, min, max, isRequired };
}
