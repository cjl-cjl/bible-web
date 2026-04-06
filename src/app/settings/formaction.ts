'use server';

import { makeUsersRequestFormBody } from '@/lib/requests';
import { revalidatePath } from 'next/cache';

const fontSizeMap: Record<string, number> = {
  Tiny: -2,
  Small: -1,
  Normal: 0,
  Big: 1,
  Huge: 2,
};

const fontFamilyMap: Record<string, number> = {
  Sans: 0,
  Serif: 1,
};

export async function settingsAction(
  initialState: Record<string, string>,
  formData: FormData,
) {
  const translationValue = formData.get('preferredTranslation');
  const fontSizeValue = formData.get('fontSize');
  const fontFamilyValue = formData.get('fontFamily');

  const body = {
    translation: translationValue ? String(translationValue) : '',
    font_size: fontSizeValue ? fontSizeMap[String(fontSizeValue)] : null,
    font_family: fontFamilyValue
      ? fontFamilyMap[String(fontFamilyValue)]
      : null,
  };
  await makeUsersRequestFormBody('/userpreferences', 'PUT', body);
  revalidatePath('/settings');
  return { message: 'Updated successfully' };
}
