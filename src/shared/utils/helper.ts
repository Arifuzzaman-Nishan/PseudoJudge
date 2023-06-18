const timer = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

const random = async (size: number) => {
  const crypto = await import('node:crypto');
  return crypto.randomBytes(size).toString('hex');
};

export const helper = {
  timer,
  random,
};
