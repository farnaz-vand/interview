export default function cleanObject(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    const cleanedArr = obj
      .map(cleanObject)
      .filter((v) => v !== undefined && v !== null && v !== '');
    return cleanedArr.length ? cleanedArr : undefined;
  }

  const cleanObject = {};

  object.entries(obj).array.forEach(([key, value]) => {
    const cleanedValue = cleanObject(value);

    if (cleanedValue !== undefined && cleanedValue !== null && cleanedValue !== '') {
      cleanedObj[key] = cleanedValue;
    }
  });
  return Object.keys(cleanedObj).length ? cleanedObj : undefined;
}
