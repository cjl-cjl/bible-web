'use server';

import { makeUsersRequest, makeUsersRequestFormBody } from '@/lib/requests';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { availableTranslations } from './constants';

export async function saveParallelTranslations({
  source_translation,
  parallel_translations,
}: {
  source_translation: string;
  parallel_translations: string[];
}) {
  const result = await makeUsersRequest('/paralleltranslations', 'POST', {
    source_translation,
    parallel_translations,
  });

  if (!result) {
    const cookieStore = await cookies();
    const existingParallelTranslations = cookieStore.get(
      'parallel_translations',
    );
    let data: Record<string, string[]> = {};
    if (existingParallelTranslations?.value) {
      try {
        data = JSON.parse(existingParallelTranslations.value);
      } catch {
        data = {};
      }
    }
    data[source_translation] = parallel_translations;
    cookieStore.set('parallel_translations', JSON.stringify(data), {
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      httpOnly: false,
    });
  }
  return {
    success: true,
    data: result,
    message: '平行译本已成功保存！',
  };
}

export async function searchRedirectAction({
  query,
  translation,
  matchCase,
  wholeWords,
  books,
  parallelTranslations,
}: {
  query: string;
  translation: string;
  matchCase: boolean;
  wholeWords: boolean;
  books: string | undefined;
  parallelTranslations: string[];
}) {
  let redirectUrl = `/search?query=${encodeURIComponent(query)}&translation=${encodeURIComponent(translation)}`;
  if (books) {
    redirectUrl += `&books=${books}`;
  }
  if (matchCase) {
    redirectUrl += '&matchcase=true';
  }
  if (wholeWords) {
    redirectUrl += '&wholewords=true';
  }
  if (parallelTranslations.length !== 0) {
    const actualParallel = parallelTranslations
      .filter((tr) => availableTranslations.includes(tr))
      .filter((tr) => tr !== translation)
      .join()
      .toUpperCase();
    redirectUrl += `&parallel=${actualParallel}`;
  }
  return redirect(redirectUrl);
}

export async function serverSetFontSize(delta: number) {
  let result;
  if (delta === 1) {
    result = await makeUsersRequest('/increasefontsize', 'POST');
  } else if (delta === -1) {
    result = await makeUsersRequest('/decreasefontsize', 'POST');
  }
  if (!result) {
    const cookieStore = await cookies();
    const currentFontSize = Number(cookieStore.get('font_size')?.value) || 0;
    const targetFontSize = currentFontSize + delta;
    cookieStore.set('font_size', JSON.stringify(targetFontSize), {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
    });
  }
  return { message: '成功' };
}

export async function serverSetMarginSize(delta: number) {
  let result;
  if (delta === 1) {
    result = await makeUsersRequest('/increasemarginsize', 'POST');
  } else if (delta === -1) {
    result = await makeUsersRequest('/decreasemarginsize', 'POST');
  }
  if (!result) {
    const cookieStore = await cookies();
    const currentMarginSize =
      Number(cookieStore.get('margin_size')?.value) || 0;
    const targetMarginSize = currentMarginSize + delta;
    cookieStore.set('margin_size', JSON.stringify(targetMarginSize), {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
    });
  }
  return { message: '成功' };
}

export async function serverSetFontFamily(fontFamily: number) {
  const body = {
    font_family: fontFamily.toString(),
  };
  const result = await makeUsersRequestFormBody(
    '/userpreferences',
    'PUT',
    body,
  );
  if (!result) {
    const cookieStore = await cookies();
    cookieStore.set('font_family', JSON.stringify(fontFamily), {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
    });
  }
  return { message: '成功' };
}

export async function switchUseAbbreviationState(targetState: boolean) {
  let result;
  if (targetState) {
    result = await makeUsersRequest('/abbreviationsfornav', 'POST');
  } else {
    result = await makeUsersRequest('/abbreviationsfornav', 'DELETE');
  }
  if (!result) {
    const cookieStore = await cookies();
    cookieStore.set('use_abbreviations_for_nav', JSON.stringify(targetState), {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
    });
  }
}

export async function setFontSize(fontSize: number) {
  const res = await makeUsersRequestFormBody('/userpreferences', 'PUT', {
    font_size: fontSize,
  });
  if (res) {
    return res.font_size;
  }
  return null;
}
