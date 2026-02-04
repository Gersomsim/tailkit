import {
	parseInputValue,
	parseOutputValue,
	isDateTimeType,
	formatDateForInput,
	parseStringToDate,
	formatDate,
	formatDateTime,
	formatTime,
	formatMonth,
	formatWeek,
	getWeekNumber,
	getDateFromWeek,
} from './date.utils'

describe('Date Utils', () => {
	describe('formatDate', () => {
		it('should format date to YYYY-MM-DD', () => {
			const date = new Date(2024, 0, 15) // January 15, 2024
			expect(formatDate(date)).toBe('2024-01-15')
		})

		it('should pad single digit month and day with zeros', () => {
			const date = new Date(2024, 2, 5) // March 5, 2024
			expect(formatDate(date)).toBe('2024-03-05')
		})

		it('should handle end of year dates', () => {
			const date = new Date(2024, 11, 31) // December 31, 2024
			expect(formatDate(date)).toBe('2024-12-31')
		})
	})

	describe('formatTime', () => {
		it('should format time to HH:mm', () => {
			const date = new Date(2024, 0, 1, 14, 30) // 14:30
			expect(formatTime(date)).toBe('14:30')
		})

		it('should pad single digit hours and minutes with zeros', () => {
			const date = new Date(2024, 0, 1, 9, 5) // 09:05
			expect(formatTime(date)).toBe('09:05')
		})

		it('should handle midnight', () => {
			const date = new Date(2024, 0, 1, 0, 0) // 00:00
			expect(formatTime(date)).toBe('00:00')
		})

		it('should handle end of day', () => {
			const date = new Date(2024, 0, 1, 23, 59) // 23:59
			expect(formatTime(date)).toBe('23:59')
		})
	})

	describe('formatDateTime', () => {
		it('should format datetime to YYYY-MM-DDTHH:mm', () => {
			const date = new Date(2024, 5, 15, 10, 30) // June 15, 2024 10:30
			expect(formatDateTime(date)).toBe('2024-06-15T10:30')
		})

		it('should handle midnight correctly', () => {
			const date = new Date(2024, 0, 1, 0, 0)
			expect(formatDateTime(date)).toBe('2024-01-01T00:00')
		})
	})

	describe('formatMonth', () => {
		it('should format month to YYYY-MM', () => {
			const date = new Date(2024, 5, 15) // June 2024
			expect(formatMonth(date)).toBe('2024-06')
		})

		it('should pad single digit month with zero', () => {
			const date = new Date(2024, 0, 1) // January 2024
			expect(formatMonth(date)).toBe('2024-01')
		})

		it('should handle December correctly', () => {
			const date = new Date(2024, 11, 1) // December 2024
			expect(formatMonth(date)).toBe('2024-12')
		})
	})

	describe('formatWeek', () => {
		it('should format week to YYYY-Www', () => {
			const date = new Date(2024, 0, 8) // Week 2 of 2024
			expect(formatWeek(date)).toBe('2024-W02')
		})

		it('should pad single digit week with zero', () => {
			const date = new Date(2024, 0, 1) // Week 1 of 2024
			expect(formatWeek(date)).toBe('2024-W01')
		})
	})

	describe('getWeekNumber', () => {
		it('should return week 1 for first week of year', () => {
			const date = new Date(2024, 0, 1) // January 1, 2024
			expect(getWeekNumber(date)).toBe(1)
		})

		it('should return correct week number for mid-year', () => {
			const date = new Date(2024, 5, 15) // June 15, 2024
			expect(getWeekNumber(date)).toBeGreaterThan(20)
		})

		it('should return week 52 or 53 for end of year', () => {
			const date = new Date(2024, 11, 28) // December 28, 2024
			const week = getWeekNumber(date)
			expect(week).toBeGreaterThanOrEqual(52)
		})
	})

	describe('getDateFromWeek', () => {
		it('should return correct date for week 1', () => {
			const result = getDateFromWeek(2024, 1)
			expect(result.getFullYear()).toBe(2024)
			expect(result.getMonth()).toBe(0) // January
		})

		it('should return Monday of the given week', () => {
			const result = getDateFromWeek(2024, 10)
			expect(result.getDay()).toBe(1) // Monday
		})
	})

	describe('isDateTimeType', () => {
		it('should return true for date type', () => {
			expect(isDateTimeType('date')).toBe(true)
		})

		it('should return true for datetime-local type', () => {
			expect(isDateTimeType('datetime-local')).toBe(true)
		})

		it('should return true for time type', () => {
			expect(isDateTimeType('time')).toBe(true)
		})

		it('should return true for month type', () => {
			expect(isDateTimeType('month')).toBe(true)
		})

		it('should return true for week type', () => {
			expect(isDateTimeType('week')).toBe(true)
		})

		it('should return false for text type', () => {
			expect(isDateTimeType('text')).toBe(false)
		})

		it('should return false for email type', () => {
			expect(isDateTimeType('email')).toBe(false)
		})

		it('should return false for number type', () => {
			expect(isDateTimeType('number')).toBe(false)
		})

		it('should return false for password type', () => {
			expect(isDateTimeType('password')).toBe(false)
		})
	})

	describe('formatDateForInput', () => {
		it('should return empty string for invalid date', () => {
			expect(formatDateForInput(new Date('invalid'), 'date')).toBe('')
		})

		it('should return empty string for non-Date object', () => {
			expect(formatDateForInput('not a date' as any, 'date')).toBe('')
		})

		it('should format correctly for date type', () => {
			const date = new Date(2024, 5, 15)
			expect(formatDateForInput(date, 'date')).toBe('2024-06-15')
		})

		it('should format correctly for datetime-local type', () => {
			const date = new Date(2024, 5, 15, 10, 30)
			expect(formatDateForInput(date, 'datetime-local')).toBe('2024-06-15T10:30')
		})

		it('should format correctly for time type', () => {
			const date = new Date(2024, 5, 15, 14, 45)
			expect(formatDateForInput(date, 'time')).toBe('14:45')
		})

		it('should format correctly for month type', () => {
			const date = new Date(2024, 5, 15)
			expect(formatDateForInput(date, 'month')).toBe('2024-06')
		})

		it('should format correctly for week type', () => {
			const date = new Date(2024, 0, 8)
			expect(formatDateForInput(date, 'week')).toBe('2024-W02')
		})

		it('should return ISO string for non-date input types', () => {
			const date = new Date(2024, 5, 15, 10, 30, 0, 0)
			const result = formatDateForInput(date, 'text')
			expect(result).toContain('2024')
		})
	})

	describe('parseStringToDate', () => {
		it('should return null for empty value', () => {
			expect(parseStringToDate('', 'date')).toBeNull()
		})

		it('should parse date string correctly', () => {
			const result = parseStringToDate('2024-06-15', 'date')
			expect(result).toBeInstanceOf(Date)
			expect(result?.getFullYear()).toBe(2024)
			expect(result?.getMonth()).toBe(5) // June (0-indexed)
			expect(result?.getDate()).toBe(15)
		})

		it('should parse datetime-local string correctly', () => {
			const result = parseStringToDate('2024-06-15T10:30', 'datetime-local')
			expect(result).toBeInstanceOf(Date)
			expect(result?.getFullYear()).toBe(2024)
			expect(result?.getHours()).toBe(10)
			expect(result?.getMinutes()).toBe(30)
		})

		it('should parse time string correctly', () => {
			const result = parseStringToDate('14:30', 'time')
			expect(result).toBeInstanceOf(Date)
			expect(result?.getHours()).toBe(14)
			expect(result?.getMinutes()).toBe(30)
		})

		it('should parse month string correctly', () => {
			const result = parseStringToDate('2024-06', 'month')
			expect(result).toBeInstanceOf(Date)
			expect(result?.getFullYear()).toBe(2024)
			expect(result?.getMonth()).toBe(5) // June (0-indexed)
			expect(result?.getDate()).toBe(1) // First day of month
		})

		it('should parse week string correctly', () => {
			const result = parseStringToDate('2024-W02', 'week')
			expect(result).toBeInstanceOf(Date)
			expect(result?.getFullYear()).toBe(2024)
		})

		it('should handle default case', () => {
			const result = parseStringToDate('2024-06-15', 'text')
			expect(result).toBeInstanceOf(Date)
		})
	})

	describe('parseInputValue', () => {
		it('should return empty string for null value', () => {
			expect(parseInputValue(null, 'text')).toBe('')
		})

		it('should return empty string for undefined value', () => {
			expect(parseInputValue(undefined, 'text')).toBe('')
		})

		it('should return empty string for empty string', () => {
			expect(parseInputValue('', 'text')).toBe('')
		})

		it('should return string value as is', () => {
			expect(parseInputValue('hello', 'text')).toBe('hello')
		})

		it('should convert number to string', () => {
			expect(parseInputValue(123, 'number')).toBe('123')
		})

		it('should format Date object for date type', () => {
			const date = new Date(2024, 5, 15)
			expect(parseInputValue(date, 'date')).toBe('2024-06-15')
		})

		it('should format Date object for datetime-local type', () => {
			const date = new Date(2024, 5, 15, 10, 30)
			expect(parseInputValue(date, 'datetime-local')).toBe('2024-06-15T10:30')
		})

		it('should format Date object for time type', () => {
			const date = new Date(2024, 5, 15, 14, 45)
			expect(parseInputValue(date, 'time')).toBe('14:45')
		})
	})

	describe('parseOutputValue', () => {
		it('should return value as is when empty', () => {
			expect(parseOutputValue('', false, 'date')).toBe('')
		})

		it('should return value as is when returnDateObject is false', () => {
			expect(parseOutputValue('2024-06-15', false, 'date')).toBe('2024-06-15')
		})

		it('should return value as is for non-date types', () => {
			expect(parseOutputValue('hello', true, 'text')).toBe('hello')
		})

		it('should return Date object when returnDateObject is true for date type', () => {
			const result = parseOutputValue('2024-06-15', true, 'date')
			expect(result).toBeInstanceOf(Date)
			expect(result.getFullYear()).toBe(2024)
		})

		it('should return Date object when returnDateObject is true for datetime-local type', () => {
			const result = parseOutputValue('2024-06-15T10:30', true, 'datetime-local')
			expect(result).toBeInstanceOf(Date)
			expect(result.getHours()).toBe(10)
		})

		it('should return Date object when returnDateObject is true for time type', () => {
			const result = parseOutputValue('14:30', true, 'time')
			expect(result).toBeInstanceOf(Date)
			expect(result.getHours()).toBe(14)
		})

		it('should return Date object when returnDateObject is true for month type', () => {
			const result = parseOutputValue('2024-06', true, 'month')
			expect(result).toBeInstanceOf(Date)
			expect(result.getMonth()).toBe(5)
		})

		it('should return Date object when returnDateObject is true for week type', () => {
			const result = parseOutputValue('2024-W02', true, 'week')
			expect(result).toBeInstanceOf(Date)
		})
	})
})
