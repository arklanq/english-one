const fonts = {
  /* Poppins family */
  'Poppins-Thin': require('@/assets/fonts/Poppins/Poppins-Thin.ttf'),
  'Poppins-Light': require('@/assets/fonts/Poppins/Poppins-Light.ttf'),
  'Poppins-Regular': require('@/assets/fonts/Poppins/Poppins-Regular.ttf'),
  'Poppins-Medium': require('@/assets/fonts/Poppins/Poppins-Medium.ttf'),
  //'Poppins-SemiBold': require('@/assets/fonts/Poppins/Poppins-SemiBold.ttf'),
  //'Poppins-Bold': require('@/assets/fonts/Poppins/Poppins-Bold.ttf'),
  //'Poppins-Black': require('@/assets/fonts/Poppins/Poppins-Black.ttf'),

  /* Bowly One SC family */
  'BowlbyOneSC-Regular': require('@/assets/fonts/Bowlby_One_SC/BowlbyOneSC-Regular.ttf'),
};

export const fontName = Object.fromEntries(
  Object.keys(fonts).map((fontName: string) => [fontName, fontName])
) as Record<keyof typeof fonts, keyof typeof fonts>;

export default fonts;
