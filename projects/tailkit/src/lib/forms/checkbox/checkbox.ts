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
	selector: 'tk-checkbox',
	imports: [NgClass],
	templateUrl: './checkbox.html',
	styles: ``,
})
export class TkCheckbox implements ControlValueAccessor, OnInit, AfterViewInit, OnDestroy {
	private injector = inject(Injector)

	checkbox = viewChild<ElementRef<HTMLInputElement>>('UICheckbox')

	// INPUTS
	id = input<string>('')
	name = input<string>('')
	label = input<string>('')
	size = input<TkSize>('md')
	disabled = input<boolean>(false)
	readonly = input<boolean>(false)
	indeterminate = input<boolean>(false)
	hint = input<string>('')

	private static nextId = 0
	public ngControl: NgControl | null = null
	public valueChanges = new Subject<boolean>()
	public destroy$ = new Subject<void>()

	touched = signal<boolean>(false)
	currentValue = signal<boolean>(false)

	public checkboxId = computed(() => this.id() || `tk-checkbox-${TkCheckbox.nextId++}`)
	public errorId = computed(() => `error-${this.checkboxId()}`)

	checkboxClasses = computed(() => {
		const sizeClasses = {
			sm: 'size-3.5',
			md: 'size-4',
			lg: 'size-5',
			xl: 'size-6',
		}
		return sizeClasses[this.size()] || 'size-4'
	})

	labelClasses = computed(() => {
		const sizeClasses = {
			sm: 'text-sm',
			md: 'text-base',
			lg: 'text-lg',
			xl: 'text-xl',
		}
		return sizeClasses[this.size()] || 'text-base'
	})

	ngOnInit(): void {
		try {
			this.ngControl = this.injector.get(NgControl, null, { optional: true, self: true })
			if (this.ngControl) {
				this.ngControl.valueAccessor = this
			}
		} catch (e) {}
	}

	ngAfterViewInit(): void {
		this.updateCheckboxValue(this.currentValue())
		this.updateIndeterminate()
		this.setupValueChanges()
	}

	private setupValueChanges(): void {
		if (!this.checkbox()) return

		fromEvent(this.checkbox()!.nativeElement, 'change')
			.pipe(
				map((event: Event) => (event.target as HTMLInputElement).checked),
				distinctUntilChanged(),
				takeUntil(this.destroy$),
			)
			.subscribe(checked => {
				this.currentValue.set(checked)
				this.valueChanges.next(checked)
				this._onChange(checked)
			})
	}

	private updateCheckboxValue(value: boolean): void {
		if (this.checkbox() && this.checkbox()!.nativeElement) {
			this.checkbox()!.nativeElement.checked = value
		}
	}

	private updateIndeterminate(): void {
		if (this.checkbox() && this.checkbox()!.nativeElement) {
			this.checkbox()!.nativeElement.indeterminate = this.indeterminate()
		}
	}

	// Métodos para obtener estado de validación
	get isInvalid(): boolean {
		return !!(this.ngControl?.invalid && this.ngControl?.touched)
	}

	get isValid(): boolean {
		return !!(this.ngControl?.valid && this.ngControl?.touched)
	}

	get errorMessage(): string | null {
		if (!this.ngControl?.errors || !this.ngControl?.touched) {
			return null
		}

		const errors = this.ngControl.errors

		if (errors['required']) {
			return `${this.name() || 'Este campo'} es requerido`
		}
		if (errors['requiredTrue']) {
			return `Debes aceptar ${this.name() || 'este campo'}`
		}

		return 'Campo inválido'
	}

	// ControlValueAccessor
	_onChange: (value: boolean) => void = () => {}
	_onTouched: () => void = () => {}

	writeValue(value: boolean): void {
		const boolValue = !!value
		this.currentValue.set(boolValue)
		this.updateCheckboxValue(boolValue)
	}

	registerOnChange(fn: (value: boolean) => void): void {
		this._onChange = fn
	}

	registerOnTouched(fn: () => void): void {
		this._onTouched = fn
	}

	setDisabledState(isDisabled: boolean): void {
		if (this.checkbox() && this.checkbox()!.nativeElement) {
			this.checkbox()!.nativeElement.disabled = isDisabled
		}
	}

	ngOnDestroy(): void {
		this.destroy$.next()
		this.destroy$.complete()
		this.valueChanges.complete()
		this.currentValue.set(false)
	}
}
