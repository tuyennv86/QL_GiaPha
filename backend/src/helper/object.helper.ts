// src/common/helpers/object.helper.ts

export class ObjectHelper {
  static removeUndefined<T extends object>(obj: T): Partial<T> {
    return Object.fromEntries(
      Object.entries(obj).filter(([value]) => value !== undefined),
    ) as Partial<T>;
  }
}
