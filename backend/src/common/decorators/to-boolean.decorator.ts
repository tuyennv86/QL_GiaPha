import { Transform } from 'class-transformer';

export function ToBoolean() {
  return Transform(
    ({
      value,
      obj,
      key,
    }: {
      value: unknown;
      obj: Record<string, unknown>;
      key: string;
    }) => {
      const raw: unknown = obj?.[key] ?? value;

      if (raw === 'true' || raw === '1' || raw === 1) return true;
      if (raw === 'false' || raw === '0' || raw === 0) return false;
      if (typeof raw === 'boolean') return raw;

      return undefined;
    },
  );
}
