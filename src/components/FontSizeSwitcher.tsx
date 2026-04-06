import { useState } from 'react';
import Form from 'next/form';
import { setFontSize } from '@/lib/actions';

export default function FontSizeSwitcher({ fontSize }: { fontSize: number }) {
  const [fSize, setFSize] = useState(fontSize);

  const decrementValue = Math.max(fSize - 1, -2);
  const incrementValue = Math.min(fSize + 1, 2);

  return (
    <div className="flex items-center space-x-2 font-bold">
      <Form
        action={async () => {
          await setFontSize(decrementValue);
          setFSize(decrementValue);
        }}
      >
        <button
          disabled={fSize <= -2}
          type="submit"
          className="w-8 h-8 rounded-full text-sm bg-muted disabled:opacity-30 hover:cursor-pointer"
        >
          -
        </button>
      </Form>
      <div className="w-8 h-8 rounded-full text-sm flex items-center justify-center bg-background border font-bold">
        {fSize}
      </div>
      <Form
        action={async () => {
          await setFontSize(incrementValue);
          setFSize(incrementValue);
        }}
      >
        <button
          type="submit"
          disabled={fSize >= 2}
          className="w-8 h-8 rounded-full text-sm bg-muted disabled:opacity-30 hover:cursor-pointer"
        >
          +
        </button>
      </Form>
    </div>
  );
}
