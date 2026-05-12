// src/common/helpers/excel.helper.ts

import * as ExcelJS from 'exceljs';

export class ExcelHelper {
  /**
   * STRING
   */
  static getCellString(value: ExcelJS.CellValue): string | undefined {
    if (typeof value === 'string') {
      const trimmed = value.trim();

      return trimmed.length > 0 ? trimmed : undefined;
    }

    if (typeof value === 'number') {
      return value.toString();
    }

    if (typeof value === 'boolean') {
      return value.toString();
    }

    return undefined;
  }

  /**
   * REQUIRED STRING
   */
  static getRequiredCellString(value: ExcelJS.CellValue): string {
    return this.getCellString(value) ?? '';
  }

  /**
   * NUMBER
   */
  static getCellNumber(value: ExcelJS.CellValue): number | undefined {
    if (typeof value === 'number') {
      return value;
    }

    if (typeof value === 'string') {
      const normalized = value.toLowerCase().replace('đời ', '').trim();

      const parsed = Number(normalized);

      return isNaN(parsed) ? undefined : parsed;
    }

    return undefined;
  }

  /**
   * BOOLEAN
   */
  static getCellBoolean(value: ExcelJS.CellValue): boolean | undefined {
    if (typeof value === 'boolean') {
      return value;
    }

    if (typeof value === 'string') {
      const normalized = value.trim().toLowerCase();

      if (['true', '1', 'yes', 'có', 'còn sống'].includes(normalized)) {
        return true;
      }

      if (['false', '0', 'no', 'không', 'đã mất'].includes(normalized)) {
        return false;
      }
    }

    return undefined;
  }

  /**
   * DATE
   */
  static getCellDate(value: ExcelJS.CellValue): Date | undefined {
    if (!value) {
      return undefined;
    }

    // ExcelJS Date
    if (value instanceof Date) {
      return value;
    }

    // Excel serial date
    if (typeof value === 'number') {
      return new Date(Math.round((value - 25569) * 86400 * 1000));
    }

    // String date
    if (typeof value === 'string') {
      const date = new Date(value);

      return isNaN(date.getTime()) ? undefined : date;
    }

    return undefined;
  }

  /**
   * GENDER
   * 0 = nữ
   * 1 = nam
   * 2 = khác
   */
  static getGender(value: ExcelJS.CellValue): number {
    if (typeof value !== 'string') {
      return 2;
    }

    const normalized = value.trim().toLowerCase();

    if (normalized === 'nam') {
      return 1;
    }

    if (normalized === 'nữ') {
      return 0;
    }

    return 2;
  }

  /**
   * ARRAY STRING
   */
  static getCellStringArray(
    value: ExcelJS.CellValue,
    separator = ',',
  ): string[] {
    if (typeof value !== 'string') {
      return [];
    }

    return value
      .split(separator)
      .map((item) => item.trim())
      .filter(Boolean);
  }
}
