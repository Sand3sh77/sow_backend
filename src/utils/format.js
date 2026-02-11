export const formatValidationError = (error) => {
  if (!error || !error.issues) return 'Validation failed';

  const formatted = [];

  error.issues.forEach(issue => {
    const field = issue.path[0] || 'input';

    formatted.push(`${field.slice(0, 1).toUpperCase() + field.slice(1)}: ${issue.message}`);
  });

  return formatted;
};
