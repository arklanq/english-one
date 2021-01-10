import {PredefinedFontColor} from '@/models/theme/IThemeTypography';

export const predefinedColors = ['primary', 'secondary', 'disabled', 'hint', 'icon'];

export function isPredefinedFontColor(color: string): color is PredefinedFontColor {
  color = color.toLowerCase();

  for (const predefinedColor of predefinedColors) {
    if (predefinedColor === color) return true;
  }
  return false;
}
