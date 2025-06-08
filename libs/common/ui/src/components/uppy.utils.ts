export function patternToAllowedFileTypes(
  regStr: string | undefined,
): string[] | undefined {
  if (typeof regStr !== 'string') return undefined;

  const cleanRegex = regStr
    .replace(/^\/|\/[gimuy]*$/g, '')
    .replace(/^\^|\$$/g, '');

  const results: string[] = [];

  // Split by | at the top level, handling nested parentheses
  const parts = [];
  let current = '';
  let parenDepth = 0;

  for (let i = 0; i < cleanRegex.length; i++) {
    const char = cleanRegex[i];
    if (char === '(') {
      parenDepth++;
      if (parenDepth > 1) current += char;
    } else if (char === ')') {
      parenDepth--;
      if (parenDepth > 0) current += char;
    } else if (char === '|' && parenDepth <= 1) {
      parts.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  if (current) parts.push(current.trim());

  for (const part of parts) {
    // Handle MIME types: word\/.*  -> word/*
    const mimeMatch = part.match(/^([a-z]+)\\\/\.\*$/);
    if (mimeMatch) {
      results.push(`${mimeMatch[1]}/*`);
      continue;
    }

    // Handle file extensions: .*\.(ext1|ext2|ext3) -> [.ext1, .ext2, .ext3]
    const extMatch = part.match(/\*\\\.\(([^)]+)\)$/);
    if (extMatch) {
      const extensions = extMatch[1].split('|').map((ext) => `.${ext.trim()}`);
      results.push(...extensions);
      continue;
    }

    // Handle single extension: .*\.ext -> .ext
    const singleExtMatch = part.match(/\*\\\.([a-z0-9]+)$/i);
    if (singleExtMatch) {
      results.push(`.${singleExtMatch[1]}`);
    }
  }

  return results;
}
