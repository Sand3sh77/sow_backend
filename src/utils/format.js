export const formatValidationError = (error) => {
    if (!error || !error.issues) return 'Validation failed';
  
    const formatted = {};
  
    error.issues.forEach(issue => {
      const field = issue.path[0] || 'input';
  
      if (!formatted[field]) {
        formatted[field] = issue.message;
      } else {
        formatted[field] += `, ${issue.message}`;
      }
    });
  
    return formatted;
  };
  