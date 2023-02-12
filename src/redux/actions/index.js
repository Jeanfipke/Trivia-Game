export const SAVE_GRAVATAR_EMAIL = 'SAVE_GRAVATAR_EMAIL';
export const SUM_POINTS = 'SUM_POINTS';

export const saveGravatarEmail = (payload) => ({
  type: SAVE_GRAVATAR_EMAIL,
  payload,
});

export const sumPoints = (payload) => ({
  type: SUM_POINTS,
  payload,
});
