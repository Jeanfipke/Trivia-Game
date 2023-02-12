export const SAVE_GRAVATAR_EMAIL = 'SAVE_GRAVATAR_EMAIL';
export const SUM_POINTS = 'SUM_POINTS';
export const CHANGE_NEXT_VISIBLITY = 'CHANGE_NEXT_VISIBLITY';

export const saveGravatarEmail = (payload) => ({
  type: SAVE_GRAVATAR_EMAIL,
  payload,
});

export const sumPoints = (payload) => ({
  type: SUM_POINTS,
  payload,
});

export const changeNextVisibility = (payload) => ({
  type: CHANGE_NEXT_VISIBLITY,
  payload,
});
