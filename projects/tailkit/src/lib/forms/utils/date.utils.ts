import { InputType } from '../input/input.type'

export const parseInputValue = (value: any, type: InputType): string => {
	if (!value) return ''
	// Si es un Date object, convertir al formato correcto según el tipo
	if (value instanceof Date) {
		return formatDateForInput(value, type)
	}
	// Si ya es string, devolverlo tal cual
	return String(value)
}
/**
 * Convierte el valor de salida (string del input) a Date si es necesario
 */
export const parseOutputValue = (value: string, returnDateObject: boolean, type: InputType): any => {
	if (!value || !returnDateObject) return value

	// Convertir a Date solo si el tipo es de fecha/hora
	if (isDateTimeType(type)) {
		return parseStringToDate(value, type)
	}
	return value
}

/**
 * Verifica si el tipo de input es de fecha/hora
 */
export const isDateTimeType = (type: InputType): boolean => {
	return ['date', 'datetime-local', 'time', 'month', 'week'].includes(type)
}

/**
 * Formatea un Date al formato correcto según el tipo de input
 */
export const formatDateForInput = (date: Date, type: InputType): string => {
	if (!(date instanceof Date) || isNaN(date.getTime())) {
		return ''
	}

	switch (type) {
		case 'date':
			return formatDate(date)

		case 'datetime-local':
			return formatDateTime(date)

		case 'time':
			return formatTime(date)

		case 'month':
			return formatMonth(date)

		case 'week':
			return formatWeek(date)

		default:
			return date.toISOString()
	}
}
/**
 * Parsea un string del input a Date según el tipo
 */
export const parseStringToDate = (value: string, type: InputType): Date | null => {
	if (!value) return null

	try {
		switch (type) {
			case 'date':
				// value: "2025-12-18"
				return new Date(value + 'T00:00:00')

			case 'datetime-local':
				// value: "2025-12-18T10:30"
				return new Date(value)

			case 'time':
				// value: "10:30"
				const today = new Date()
				const [hours, minutes] = value.split(':')
				today.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0)
				return today

			case 'month':
				// value: "2025-12"
				const [year, month] = value.split('-')
				return new Date(parseInt(year, 10), parseInt(month, 10) - 1, 1)

			case 'week':
				// value: "2025-W50" (ISO week format)
				const [weekYear, weekNum] = value.split('-W')
				return getDateFromWeek(parseInt(weekYear, 10), parseInt(weekNum, 10))

			default:
				return new Date(value)
		}
	} catch (error) {
		console.error('Error parsing date:', error)
		return null
	}
}

/**
 * Formatea Date a YYYY-MM-DD
 */
export const formatDate = (date: Date): string => {
	const year = date.getFullYear()
	const month = String(date.getMonth() + 1).padStart(2, '0')
	const day = String(date.getDate()).padStart(2, '0')
	return `${year}-${month}-${day}`
}

/**
 * Formatea Date a YYYY-MM-DDTHH:mm
 */
export const formatDateTime = (date: Date): string => {
	const datePart = formatDate(date)
	const timePart = formatTime(date)
	return `${datePart}T${timePart}`
}

/**
 * Formatea Date a HH:mm
 */
export const formatTime = (date: Date): string => {
	const hours = String(date.getHours()).padStart(2, '0')
	const minutes = String(date.getMinutes()).padStart(2, '0')
	return `${hours}:${minutes}`
}

/**
 * Formatea Date a YYYY-MM (month)
 */
export const formatMonth = (date: Date): string => {
	const year = date.getFullYear()
	const month = String(date.getMonth() + 1).padStart(2, '0')
	return `${year}-${month}`
}

/**
 * Formatea Date a YYYY-Www (week)
 */
export const formatWeek = (date: Date): string => {
	const year = date.getFullYear()
	const week = getWeekNumber(date)
	return `${year}-W${String(week).padStart(2, '0')}`
}

/**
 * Obtiene el número de semana ISO de una fecha
 */
export const getWeekNumber = (date: Date): number => {
	const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
	const dayNum = d.getUTCDay() || 7
	d.setUTCDate(d.getUTCDate() + 4 - dayNum)
	const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
	return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7)
}

/**
 * Obtiene una fecha desde el año y número de semana ISO
 */
export const getDateFromWeek = (year: number, week: number): Date => {
	const simple = new Date(year, 0, 1 + (week - 1) * 7)
	const dow = simple.getDay()
	const ISOweekStart = simple
	if (dow <= 4) ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1)
	else ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay())
	return ISOweekStart
}
