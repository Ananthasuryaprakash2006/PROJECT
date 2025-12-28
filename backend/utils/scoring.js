export const computeReturnScore = (f) => {
  return (
    (f.return1y || 0) * 0.2 +
    (f.return3y || 0) * 0.3 +
    (f.return5y || 0) * 0.5
  );
};
