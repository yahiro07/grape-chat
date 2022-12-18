export function reflectTextValue(destFn: (text: string) => void) {
  return (e: Event) => {
    const el = e.currentTarget as HTMLInputElement | HTMLTextAreaElement;
    destFn(el.value);
  };
}
