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

@Component({
	selector: 'tk-textarea',
	imports: [NgClass],
	templateUrl: './textarea.html',
	styles: ``,
})
export class TkTextarea implements ControlValueAccessor, OnInit, OnDestroy, AfterViewInit {
	private injector = inject(Injector)
	textArea = viewChild<ElementRef<HTMLTextAreaElement>>('UITextArea')
	// INPUTS
	required = input<boolean>(false)
	id = input<string>('')
	label = input<string>('')
	name = input<string>('')
	size = input<TkSize>('md')
	placeholder = input<string>('')
	// Atributos de restricción nativa
	minlength = input<number | null>(null)
	maxlength = input<number | null>(null)
	rows = input<number | null>(4)
	cols = input<number | null>(null)

	autocomplete = input<'on' | 'off'>('off')
	disabled = input<boolean>(false)
	readonly = input<boolean>(false)
	hint = input<string>('')

	private static nextId = 0

	public valueChanges = new Subject<string>()
	public destroy$ = new Subject<void>()
	public ngControl: NgControl | null = null

	touched = signal<boolean>(false)
	currentValue = signal<string>('')

	public textAreaId = computed(() => this.id() || `custom-input-${TkTextarea.nextId++}`)
	public errorId = computed(() => `error-${this.textAreaId()}`)
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
		if (!this.textArea()) return
		fromEvent(this.textArea()!.nativeElement, 'input')
			.pipe(
				map((event: Event) => (event.target as HTMLInputElement).value),
				distinctUntilChanged(),
				takeUntil(this.destroy$),
			)
			.subscribe(val => {
				this.currentValue.set(val)
				this.valueChanges.next(val)
				this._onChange(val)
			})
	}
	private updateInputValue(value: any): void {
		if (this.textArea() && this.textArea()!.nativeElement) {
			this.textArea()!.nativeElement.value = value
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

		const label = this.label() || this.name() || 'Este campo'

		// Mensajes personalizados según el tipo de error
		if (errors['required']) {
			return `${label} es requerido`
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
	_onChange: (value: string) => void = () => {}
	_onTouched: () => void = () => {}

	writeValue(value: any): void {
		this.currentValue.set(value)
		this.updateInputValue(value)
	}

	registerOnChange(fn: (value: string) => void): void {
		this._onChange = fn
	}

	registerOnTouched(fn: () => void): void {
		this._onTouched = fn
	}

	setDisabledState(isDisabled: boolean): void {
		//this.disabled.set(isDisabled)
		if (this.textArea() && this.textArea()!.nativeElement) {
			this.textArea()!.nativeElement.disabled = isDisabled
		}
	}

	ngOnDestroy(): void {
		this.destroy$.next()
		this.destroy$.complete()
		this.valueChanges.complete()
		this.currentValue.set('')
	}
}
