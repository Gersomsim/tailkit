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
import { TkOption } from './option.interface'

@Component({
	selector: 'tk-select',
	imports: [NgClass],
	templateUrl: './select.html',
})
export class TkSelect implements ControlValueAccessor, OnInit, AfterViewInit, OnDestroy {
	private injector = inject(Injector)

	select = viewChild<ElementRef<HTMLSelectElement>>('UISelect')

	id = input<string>('')
	name = input<string>('')
	size = input<TkSize>('md')
	required = input<boolean>(false)
	placeholder = input<string>('Selecciona una opción')
	disabled = input<boolean>(false)
	label = input<string>('')
	hint = input<string>('')
	options = input<TkOption[]>()

	private static nextId = 0
	public ngControl: NgControl | null = null
	public valueChanges = new Subject<any>()
	public destroy$ = new Subject<void>()

	touched = signal<boolean>(false)
	currentValue = signal<any>('')

	public selectId = computed(() => this.id() || `custom-select-${TkSelect.nextId++}`)
	public errorId = computed(() => `error-${this.selectId()}`)
	classList = computed(() => {
		const baseClasses = [
			'block w-full rounded-md',
			'bg-white dark:bg-gray-800',
			'text-gray-900 dark:text-gray-100',
			'outline outline-1 -outline-offset-1',
			'placeholder:text-gray-400 dark:placeholder:text-gray-600',
			'focus:outline-2 focus:-outline-offset-2',
			'transition-colors px-2.5 py-1.5',
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
		// Obtener NgControl de forma diferida
		try {
			this.ngControl = this.injector.get(NgControl, null, { optional: true, self: true })
			if (this.ngControl) {
				// Vincular este componente como valueAccessor
				this.ngControl.valueAccessor = this
			}
		} catch (e) {
			// NgControl no disponible
		}
	}

	ngAfterViewInit(): void {
		this.updateSelectValue(this.currentValue())
		// Configura el observable de cambios
		this.setupValueChanges()
	}

	private setupValueChanges(): void {
		if (!this.select()) return

		fromEvent(this.select()!.nativeElement, 'change')
			.pipe(
				map((event: Event) => (event.target as HTMLSelectElement).value),
				distinctUntilChanged(),
				takeUntil(this.destroy$),
			)
			.subscribe(value => {
				this.currentValue.set(value)
				this.valueChanges.next(value)
				this._onChange(value)
			})
	}

	private updateSelectValue(value: any): void {
		if (this.select() && this.select()!.nativeElement) {
			this.select()!.nativeElement.value = value ?? ''
		}
	}

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

		// Mensajes personalizados según el tipo de error
		if (errors['required']) {
			return `${this.label() || 'Este campo'} es requerido`
		}

		// Error genérico para validaciones custom
		return 'Campo inválido'
	}

	//ControlValueAccessor
	_onChange: (value: any) => void = () => {}
	_onTouched: () => void = () => {}

	writeValue(value: any): void {
		this.currentValue.set(value ?? '')
		this.updateSelectValue(value)
	}

	registerOnChange(fn: (value: any) => void): void {
		this._onChange = fn
	}

	registerOnTouched(fn: () => void): void {
		this._onTouched = fn
	}

	setDisabledState(isDisabled: boolean): void {
		if (this.select && this.select()!.nativeElement) {
			this.select()!.nativeElement.disabled = isDisabled
		}
	}

	ngOnDestroy(): void {
		this.destroy$.next()
		this.destroy$.complete()
		this.valueChanges.complete()
		this.currentValue.set('')
	}
}
