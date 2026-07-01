export function buildRules(node, restriction) {
  const rules = {};
  const isRequired = Number(node?.min) > 0;
  const label = node?.verbose_name || node?.name || 'Field';

  if (isRequired) {
    rules.required = `${label} is required`;
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
