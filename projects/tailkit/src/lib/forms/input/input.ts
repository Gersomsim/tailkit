import { NgClass } from '@angular/common'
import {
	AfterViewInit,
	Component,
	ElementRef,
	Injector,
	OnDestroy,
	OnInit,
	computed,
	inject,
	input,
	signal,
	viewChild,
} from '@angular/core'
import { ControlValueAccessor, NgControl } from '@angular/forms'

import { Subject, distinctUntilChanged, fromEvent, map, takeUntil } from 'rxjs'

import { TkSize } from '../../types'
import { parseInputValue, parseOutputValue } from '../utils'
import { InputType } from './input.type'

@Component({
	selector: 'tk-input',
	imports: [NgClass],
	templateUrl: './input.html',
	styles: ``,
})
export class TkInput implements ControlValueAccessor, OnInit, AfterViewInit, OnDestroy {
	private injector = inject(Injector)

	input = viewChild<ElementRef<HTMLInputElement>>('UIInput')
	// INPUTS
	type = input<InputType>('text')
	required = input<boolean>(false)
	id = input<string>('')
	label = input<string>('')
	name = input<string>('')
	size = input<TkSize>('md')
	placeholder = input<string>('')
	// Atributos de restricción nativa
	min = input<string | number | null>(null)
	max = input<string | number | null>(null)
	step = input<string | number | null>(null)
	minlength = input<number | null>(null)
	maxlength = input<number | null>(null)

	autocomplete = input<'on' | 'off'>('off')
	disabled = input<boolean>(false)
	readonly = input<boolean>(false)
	hint = input<string>('')
	returnDateObject = input<boolean>(false) // only for date type date, datetime-local, month, week, time

	private static nextId = 0
	public inputId = computed(() => this.id() || `custom-input-${TkInput.nextId++}`)
	public errorId = computed(() => `error-${this.inputId()}`)

	public valueChanges = new Subject<string>()
	public destroy$ = new Subject<void>()
	public ngControl: NgControl | null = null

	touched = signal<boolean>(false)
	currentValue = signal<string>('')

	classList = computed(() => {
		const baseClasses = [
			'block w-full rounded-md',
			'bg-white dark:bg-gray-800',
			'text-gray-900 dark:text-gray-100',
			'outline outline-1 -outline-offset-1',
			'placeholder:text-gray-400 dark:placeholder:text-gray-600',
			'focus:outline-2 focus:-outline-offset-2',
			'transition-colors px-2 py-1',
		].join(' ')

		const sizeClasses = {
			sm: 'text-sm',
			md: 'text-base',
			lg: 'text-lg',
			xl: 'text-xl',
		}
		const sizeClass = sizeClasses[this.size()] || 'text-base'
		return `${baseClasses} ${sizeClass}`
	})

	ngOnInit(): void {
		// Obtencion del ngControl de forma diferida
		try {
			this.ngControl = this.injector.get(NgControl, null, { optional: true, self: true })
			if (this.ngControl) {
				this.ngControl.valueAccessor = this
			}
		} catch (e) {}
	}
	ngAfterViewInit(): void {
		this.updateInputValue(this.currentValue())
		this.setupValueChanges()
	}
	private setupValueChanges(): void {
		if (!this.input()) return
		fromEvent(this.input()!.nativeElement, 'input')
			.pipe(
				map((event: Event) => (event.target as HTMLInputElement).value),
				distinctUntilChanged(),
				takeUntil(this.destroy$),
			)
			.subscribe(val => {
				this.currentValue.set(val)
				this.valueChanges.next(val)

				// Transform value if needed
				const parsedValue = parseOutputValue(val, this.returnDateObject(), this.type())
				this._onChange(parsedValue)
			})
	}
	private updateInputValue(value: any): void {
		if (this.input() && this.input()!.nativeElement) {
			// Convertir Date a string si es necesario
			const stringValue = parseInputValue(value, this.type())
			this.input()!.nativeElement.value = stringValue
		}
	}
	/**
	 * Convierte el valor de entrada (puede ser Date o string) al formato correcto para el input HTML
	 */

	// Métodos para obtener estado de validación
	get isInvalid(): boolean {
		return !!(this.ngControl?.invalid && this.ngControl?.touched)
	}

	get isValid(): boolean {
		return !!(this.ngControl?.valid && this.ngControl?.touched && this.currentValue())
	}

	get errorMessage(): string | null {
		if (!this.ngControl?.errors || !this.ngControl?.touched) {
			return null
		}

		const errors = this.ngControl.errors

		const label = this.label() || this.name() || 'Este campo'

		// Mensajes personalizados según el tipo de error
		if (errors['required']) {
			return `${label} es requerido`
		}
		if (errors['email']) {
			return 'Ingresa un email válido'
		}
		if (errors['minlength']) {
			return `Mínimo ${errors['minlength'].requiredLength} caracteres`
		}
		if (errors['maxlength']) {
			return `Máximo ${errors['maxlength'].requiredLength} caracteres`
		}
		if (errors['pattern']) {
			return 'Formato inválido'
		}
		if (errors['min']) {
			return `El valor mínimo es ${errors['min'].min}`
		}
		if (errors['max']) {
			return `El valor máximo es ${errors['max'].max}`
		}

		// Error genérico para validaciones custom
		return 'Campo inválido'
	}

	//ControlValueAccessor
	_onChange: (value: string | Date | null) => void = () => {}
	_onTouched: () => void = () => {}

	writeValue(value: any): void {
		// Convertir el valor al formato correcto
		const stringValue = parseInputValue(value, this.type())
		this.currentValue.set(stringValue)
		this.updateInputValue(value)
	}

	registerOnChange(fn: (value: string | Date | null) => void): void {
		this._onChange = fn
	}

	registerOnTouched(fn: () => void): void {
		this._onTouched = fn
	}

	setDisabledState(isDisabled: boolean): void {
		//this.disabled.set(isDisabled)
		if (this.input() && this.input()!.nativeElement) {
			this.input()!.nativeElement.disabled = isDisabled
		}
	}

	ngOnDestroy(): void {
		this.destroy$.next()
		this.destroy$.complete()
		this.valueChanges.complete()
		this.currentValue.set('')
	}
}
