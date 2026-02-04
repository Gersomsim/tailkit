import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { TkCheckbox } from './checkbox'
import {
	CheckboxFormMock,
	CheckboxHintMock,
	CheckboxHintValidationMock,
	CheckboxNgModelMock,
	CheckboxValidationMock,
} from './mocks'

describe('TkCheckbox', () => {
	let component: TkCheckbox
	let fixture: ComponentFixture<TkCheckbox>

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [TkCheckbox, ReactiveFormsModule, FormsModule],
		}).compileComponents()

		fixture = TestBed.createComponent(TkCheckbox)
		component = fixture.componentInstance
		await fixture.whenStable()
	})

	describe('Component initialization', () => {
		it('should create the component', () => {
			expect(component).toBeTruthy()
		})

		it('should generate a unique id when no id is provided', () => {
			fixture.detectChanges()
			const compiled = fixture.nativeElement as HTMLElement
			const input = compiled.querySelector('input')

			expect(component.checkboxId()).toBeDefined()
			expect(input?.id).toContain('tk-checkbox-')
		})

		it('should use the provided id when one is given', () => {
			const id = 'custom-checkbox-id'
			fixture.componentRef.setInput('id', id)
			fixture.detectChanges()

			const compiled = fixture.nativeElement as HTMLElement
			const input = compiled.querySelector('input')

			expect(component.checkboxId()).toBe(id)
			expect(input?.id).toBe(id)
		})

		it('should initialize with default values', () => {
			const defaultValues = {
				id: '',
				name: '',
				label: '',
				size: 'md',
				disabled: false,
				readonly: false,
				indeterminate: false,
				hint: '',
			}

			expect(component.id()).toBe(defaultValues.id)
			expect(component.name()).toBe(defaultValues.name)
			expect(component.label()).toBe(defaultValues.label)
			expect(component.size()).toBe(defaultValues.size)
			expect(component.disabled()).toBe(defaultValues.disabled)
			expect(component.readonly()).toBe(defaultValues.readonly)
			expect(component.indeterminate()).toBe(defaultValues.indeterminate)
			expect(component.hint()).toBe(defaultValues.hint)
		})

		it('should initialize currentValue as false', () => {
			expect(component.currentValue()).toBe(false)
		})
	})

	describe('HTML attributes binding', () => {
		it('should bind name attribute', () => {
			const name = 'checkbox-name'
			fixture.componentRef.setInput('name', name)
			fixture.detectChanges()

			const compiled = fixture.nativeElement as HTMLElement
			const input = compiled.querySelector('input')
			expect(input?.name).toBe(name)
		})

		it('should bind disabled attribute', () => {
			fixture.componentRef.setInput('disabled', true)
			fixture.detectChanges()

			const compiled = fixture.nativeElement as HTMLElement
			const input = compiled.querySelector('input')
			expect(input?.disabled).toBe(true)
		})

		it('should bind readonly attribute', () => {
			fixture.componentRef.setInput('readonly', true)
			fixture.detectChanges()

			const compiled = fixture.nativeElement as HTMLElement
			const input = compiled.querySelector('input')
			expect(input?.readOnly).toBe(true)
		})
	})

	describe('Size variants', () => {
		it('should apply sm size classes when size is sm', () => {
			fixture.componentRef.setInput('size', 'sm')
			fixture.detectChanges()

			const compiled = fixture.nativeElement as HTMLElement
			const input = compiled.querySelector('input')
			expect(input!.classList).toContain('size-3.5')
		})

		it('should apply md size classes when size is md', () => {
			fixture.componentRef.setInput('size', 'md')
			fixture.detectChanges()

			const compiled = fixture.nativeElement as HTMLElement
			const input = compiled.querySelector('input')
			expect(input!.classList).toContain('size-4')
		})

		it('should apply lg size classes when size is lg', () => {
			fixture.componentRef.setInput('size', 'lg')
			fixture.detectChanges()

			const compiled = fixture.nativeElement as HTMLElement
			const input = compiled.querySelector('input')
			expect(input!.classList).toContain('size-5')
		})

		it('should apply xl size classes when size is xl', () => {
			fixture.componentRef.setInput('size', 'xl')
			fixture.detectChanges()

			const compiled = fixture.nativeElement as HTMLElement
			const input = compiled.querySelector('input')
			expect(input!.classList).toContain('size-6')
		})

		it('should default to md size when no size is provided', () => {
			fixture.detectChanges()

			const compiled = fixture.nativeElement as HTMLElement
			const input = compiled.querySelector('input')
			expect(input!.classList).toContain('size-4')
		})

		it('should return correct label classes for each size', () => {
			fixture.componentRef.setInput('size', 'sm')
			fixture.detectChanges()
			expect(component.labelClasses()).toBe('text-sm')

			fixture.componentRef.setInput('size', 'md')
			fixture.detectChanges()
			expect(component.labelClasses()).toBe('text-base')

			fixture.componentRef.setInput('size', 'lg')
			fixture.detectChanges()
			expect(component.labelClasses()).toBe('text-lg')

			fixture.componentRef.setInput('size', 'xl')
			fixture.detectChanges()
			expect(component.labelClasses()).toBe('text-xl')
		})
	})

	describe('ControlValueAccessor integration', () => {
		it('should register with NgControl when used with formControlName', async () => {
			const fixtureHost = TestBed.createComponent(CheckboxFormMock)
			fixtureHost.detectChanges()
			await fixtureHost.whenStable()

			const compiled = fixtureHost.nativeElement as HTMLElement
			const input = compiled.querySelector('input') as HTMLInputElement

			expect(input?.checked).toBe(true)
		})

		it('should register with NgControl when used with ngModel', async () => {
			const fixtureHost = TestBed.createComponent(CheckboxNgModelMock)
			fixtureHost.detectChanges()
			await fixtureHost.whenStable()
			fixtureHost.detectChanges()

			const compiled = fixtureHost.nativeElement as HTMLElement
			const input = compiled.querySelector('input') as HTMLInputElement

			expect(input?.checked).toBe(true)
		})

		it('should call onChange when checkbox value changes', async () => {
			const fixtureHost = TestBed.createComponent(CheckboxFormMock)
			fixtureHost.detectChanges()
			await fixtureHost.whenStable()

			const compiled = fixtureHost.nativeElement as HTMLElement
			const input = compiled.querySelector('input') as HTMLInputElement

			input.checked = false
			input.dispatchEvent(new Event('change'))
			fixtureHost.detectChanges()

			const formControl = fixtureHost.componentInstance.form.get('myField')
			expect(formControl?.value).toBe(false)
		})

		it('should call onTouched when checkbox loses focus', async () => {
			const fixtureHost = TestBed.createComponent(CheckboxFormMock)
			fixtureHost.detectChanges()
			await fixtureHost.whenStable()

			const compiled = fixtureHost.nativeElement as HTMLElement
			const input = compiled.querySelector('input') as HTMLInputElement

			input.dispatchEvent(new Event('blur'))
			fixtureHost.detectChanges()

			const formControl = fixtureHost.componentInstance.form.get('myField')
			expect(formControl?.touched).toBe(true)
		})

		it('should update checkbox value when writeValue is called', async () => {
			fixture.detectChanges()
			await fixture.whenStable()

			component.writeValue(true)
			fixture.detectChanges()

			const input = fixture.nativeElement.querySelector('input') as HTMLInputElement
			expect(input.checked).toBe(true)
			expect(component.currentValue()).toBe(true)
		})

		it('should convert truthy values to boolean in writeValue', () => {
			component.writeValue(1 as unknown as boolean)
			expect(component.currentValue()).toBe(true)

			component.writeValue(null as unknown as boolean)
			expect(component.currentValue()).toBe(false)

			component.writeValue(undefined as unknown as boolean)
			expect(component.currentValue()).toBe(false)
		})

		it('should disable checkbox when setDisabledState is called with true', async () => {
			fixture.detectChanges()
			await fixture.whenStable()

			component.setDisabledState(true)
			fixture.detectChanges()

			const compiled = fixture.nativeElement as HTMLElement
			const input = compiled.querySelector('input') as HTMLInputElement
			expect(input.disabled).toBe(true)
		})

		it('should enable checkbox when setDisabledState is called with false', async () => {
			fixture.detectChanges()
			await fixture.whenStable()

			component.setDisabledState(false)
			fixture.detectChanges()

			const compiled = fixture.nativeElement as HTMLElement
			const input = compiled.querySelector('input') as HTMLInputElement
			expect(input.disabled).toBe(false)
		})
	})

	describe('Indeterminate state', () => {
		it('should set indeterminate state on initialization', async () => {
			const newFixture = TestBed.createComponent(TkCheckbox)
			newFixture.componentRef.setInput('indeterminate', true)
			newFixture.detectChanges()
			await newFixture.whenStable()

			const compiled = newFixture.nativeElement as HTMLElement
			const input = compiled.querySelector('input') as HTMLInputElement
			expect(input.indeterminate).toBe(true)
		})

		it('should not be indeterminate by default', async () => {
			fixture.detectChanges()
			await fixture.whenStable()

			const compiled = fixture.nativeElement as HTMLElement
			const input = compiled.querySelector('input') as HTMLInputElement
			expect(input.indeterminate).toBe(false)
		})
	})

	describe('Validation states', () => {
		it('should return isInvalid true when control is invalid and touched', async () => {
			const fixtureHost = TestBed.createComponent(CheckboxValidationMock)
			fixtureHost.detectChanges()
			await fixtureHost.whenStable()

			const compiled = fixtureHost.nativeElement as HTMLElement
			const input = compiled.querySelector('input') as HTMLInputElement

			input.dispatchEvent(new Event('blur'))
			fixtureHost.detectChanges()

			const tkCheckbox = fixtureHost.debugElement.children[0].children[0].componentInstance as TkCheckbox
			expect(tkCheckbox.isInvalid).toBe(true)
		})

		it('should return isInvalid false when control is valid', async () => {
			const fixtureHost = TestBed.createComponent(CheckboxValidationMock)
			fixtureHost.componentInstance.form.get('requiredField')?.setValue(true)
			fixtureHost.detectChanges()
			await fixtureHost.whenStable()

			const tkCheckbox = fixtureHost.debugElement.children[0].children[0].componentInstance as TkCheckbox
			expect(tkCheckbox.isInvalid).toBe(false)
		})

		it('should return isInvalid false when control is invalid but untouched', async () => {
			const fixtureHost = TestBed.createComponent(CheckboxValidationMock)
			fixtureHost.detectChanges()
			await fixtureHost.whenStable()

			const tkCheckbox = fixtureHost.debugElement.children[0].children[0].componentInstance as TkCheckbox
			expect(tkCheckbox.isInvalid).toBe(false)
		})

		it('should return isValid true when control is valid and touched', async () => {
			const fixtureHost = TestBed.createComponent(CheckboxValidationMock)
			fixtureHost.componentInstance.form.get('requiredField')?.setValue(true)
			fixtureHost.componentInstance.form.get('requiredField')?.markAsTouched()
			fixtureHost.detectChanges()
			await fixtureHost.whenStable()

			const tkCheckbox = fixtureHost.debugElement.children[0].children[0].componentInstance as TkCheckbox
			expect(tkCheckbox.isValid).toBe(true)
		})

		it('should return isValid false when control is valid but untouched', async () => {
			const fixtureHost = TestBed.createComponent(CheckboxFormMock)
			fixtureHost.detectChanges()
			await fixtureHost.whenStable()

			const tkCheckbox = fixtureHost.debugElement.children[0].children[0].componentInstance as TkCheckbox
			expect(tkCheckbox.isValid).toBe(false)
		})
	})

	describe('Error messages', () => {
		it('should display required error message when requiredTrue validation fails', async () => {
			const fixtureHost = TestBed.createComponent(CheckboxValidationMock)
			fixtureHost.detectChanges()
			await fixtureHost.whenStable()

			const compiled = fixtureHost.nativeElement as HTMLElement
			const input = compiled.querySelector('input') as HTMLInputElement
			input.dispatchEvent(new Event('blur'))
			fixtureHost.detectChanges()

			const errorMessage = compiled.querySelector('p.text-red-600')
			// Validators.requiredTrue generates { 'required': true } error
			expect(errorMessage?.textContent?.trim()).toBe('Campo requerido es requerido')
		})

		it('should display error message when manually set requiredTrue error', async () => {
			const fixtureHost = TestBed.createComponent(CheckboxValidationMock)
			fixtureHost.detectChanges()
			await fixtureHost.whenStable()

			const formControl = fixtureHost.componentInstance.form.get('requiredField')
			formControl?.setErrors({ requiredTrue: true })
			formControl?.markAsTouched()
			fixtureHost.detectChanges()

			const compiled = fixtureHost.nativeElement as HTMLElement
			const errorMessage = compiled.querySelector('p.text-red-600')
			expect(errorMessage?.textContent?.trim()).toBe('Debes aceptar Campo requerido')
		})

		it('should display generic error message for custom validators', async () => {
			const fixtureHost = TestBed.createComponent(CheckboxValidationMock)
			fixtureHost.detectChanges()
			await fixtureHost.whenStable()

			const formControl = fixtureHost.componentInstance.form.get('requiredField')
			formControl?.setErrors({ customError: true })
			formControl?.markAsTouched()
			fixtureHost.detectChanges()

			const compiled = fixtureHost.nativeElement as HTMLElement
			const errorMessage = compiled.querySelector('p.text-red-600')
			expect(errorMessage?.textContent?.trim()).toBe('Campo inválido')
		})

		it('should not display error message when control is untouched', async () => {
			const fixtureHost = TestBed.createComponent(CheckboxValidationMock)
			fixtureHost.detectChanges()
			await fixtureHost.whenStable()

			const compiled = fixtureHost.nativeElement as HTMLElement
			const errorMessage = compiled.querySelector('p.text-red-600')
			expect(errorMessage).toBeNull()
		})

		it('should use default text when name is not provided', async () => {
			const fixtureHost = TestBed.createComponent(CheckboxValidationMock)
			fixtureHost.detectChanges()
			await fixtureHost.whenStable()

			const tkCheckbox = fixtureHost.debugElement.children[0].children[0].componentInstance as TkCheckbox
			fixture.componentRef.setInput('name', '')

			const formControl = fixtureHost.componentInstance.form.get('requiredField')
			formControl?.setErrors({ required: true })
			formControl?.markAsTouched()

			expect(tkCheckbox.errorMessage).toContain('es requerido')
		})
	})

	describe('Visual feedback', () => {
		it('should apply red accent class when invalid', async () => {
			const fixtureHost = TestBed.createComponent(CheckboxValidationMock)
			fixtureHost.detectChanges()
			await fixtureHost.whenStable()

			const compiled = fixtureHost.nativeElement as HTMLElement
			const input = compiled.querySelector('input') as HTMLInputElement
			input.dispatchEvent(new Event('blur'))
			fixtureHost.detectChanges()

			expect(input.classList).toContain('accent-red-500')
		})

		it('should apply green accent class when valid', async () => {
			const fixtureHost = TestBed.createComponent(CheckboxValidationMock)
			fixtureHost.componentInstance.form.get('requiredField')?.setValue(true)
			fixtureHost.componentInstance.form.get('requiredField')?.markAsTouched()
			fixtureHost.detectChanges()
			await fixtureHost.whenStable()

			const compiled = fixtureHost.nativeElement as HTMLElement
			const input = compiled.querySelector('input') as HTMLInputElement
			fixtureHost.detectChanges()

			expect(input.classList).toContain('accent-green-500')
		})

		it('should apply default accent class when neither valid nor invalid', () => {
			fixture.detectChanges()

			const compiled = fixture.nativeElement as HTMLElement
			const input = compiled.querySelector('input') as HTMLInputElement

			expect(input.classList).toContain('accent-indigo-600')
		})

		it('should apply cursor-not-allowed when disabled', () => {
			fixture.componentRef.setInput('disabled', true)
			fixture.detectChanges()

			const compiled = fixture.nativeElement as HTMLElement
			const input = compiled.querySelector('input') as HTMLInputElement

			expect(input.classList).toContain('cursor-not-allowed')
		})

		it('should apply cursor-not-allowed when readonly', () => {
			fixture.componentRef.setInput('readonly', true)
			fixture.detectChanges()

			const compiled = fixture.nativeElement as HTMLElement
			const input = compiled.querySelector('input') as HTMLInputElement

			expect(input.classList).toContain('cursor-not-allowed')
		})

		it('should apply cursor-pointer when not disabled and not readonly', () => {
			fixture.detectChanges()

			const compiled = fixture.nativeElement as HTMLElement
			const input = compiled.querySelector('input') as HTMLInputElement

			expect(input.classList).toContain('cursor-pointer')
		})
	})

	describe('Accessibility', () => {
		it('should set aria-invalid to true when control is invalid and touched', async () => {
			const fixtureHost = TestBed.createComponent(CheckboxValidationMock)
			fixtureHost.detectChanges()
			await fixtureHost.whenStable()

			const compiled = fixtureHost.nativeElement as HTMLElement
			const input = compiled.querySelector('input') as HTMLInputElement
			input.dispatchEvent(new Event('blur'))
			fixtureHost.detectChanges()

			expect(input.getAttribute('aria-invalid')).toBe('true')
		})

		it('should set aria-invalid to false when control is valid', async () => {
			const fixtureHost = TestBed.createComponent(CheckboxValidationMock)
			fixtureHost.componentInstance.form.get('requiredField')?.setValue(true)
			fixtureHost.detectChanges()
			await fixtureHost.whenStable()

			const compiled = fixtureHost.nativeElement as HTMLElement
			const input = compiled.querySelector('input') as HTMLInputElement

			expect(input.getAttribute('aria-invalid')).toBe('false')
		})

		it('should set aria-describedby pointing to error message id', () => {
			fixture.detectChanges()

			const compiled = fixture.nativeElement as HTMLElement
			const input = compiled.querySelector('input') as HTMLInputElement

			expect(input.getAttribute('aria-describedby')).toBe(component.errorId())
		})

		it('should generate unique errorId based on checkboxId', () => {
			fixture.detectChanges()

			const checkboxId = component.checkboxId()
			const errorId = component.errorId()

			expect(errorId).toBe(`error-${checkboxId}`)
		})
	})

	describe('Hint text', () => {
		it('should display hint text when provided and not invalid', async () => {
			const fixtureHost = TestBed.createComponent(CheckboxHintMock)
			fixtureHost.detectChanges()
			await fixtureHost.whenStable()

			const compiled = fixtureHost.nativeElement as HTMLElement
			const hint = compiled.querySelector('p.text-gray-500')

			expect(hint?.textContent?.trim()).toBe('This is a hint')
		})

		it('should hide hint text when checkbox is invalid', async () => {
			const fixtureHost = TestBed.createComponent(CheckboxHintValidationMock)
			fixtureHost.detectChanges()
			await fixtureHost.whenStable()

			const compiled = fixtureHost.nativeElement as HTMLElement
			const input = compiled.querySelector('input') as HTMLInputElement
			input.dispatchEvent(new Event('blur'))
			fixtureHost.detectChanges()

			const hint = compiled.querySelector('p.text-gray-500')
			expect(hint).toBeNull()
		})

		it('should not display hint when not provided', () => {
			fixture.detectChanges()

			const compiled = fixture.nativeElement as HTMLElement
			const hint = compiled.querySelector('p.text-gray-500')

			expect(hint).toBeNull()
		})
	})

	describe('Value changes observable', () => {
		it('should emit value through valueChanges subject on change', async () => {
			fixture.detectChanges()
			await fixture.whenStable()

			const emittedValues: boolean[] = []
			component.valueChanges.subscribe(val => emittedValues.push(val))

			const compiled = fixture.nativeElement as HTMLElement
			const input = compiled.querySelector('input') as HTMLInputElement

			input.checked = true
			input.dispatchEvent(new Event('change'))
			fixture.detectChanges()

			expect(emittedValues).toContain(true)
		})

		it('should not emit duplicate consecutive values', async () => {
			fixture.detectChanges()
			await fixture.whenStable()

			const emittedValues: boolean[] = []
			component.valueChanges.subscribe(val => emittedValues.push(val))

			const compiled = fixture.nativeElement as HTMLElement
			const input = compiled.querySelector('input') as HTMLInputElement

			input.checked = true
			input.dispatchEvent(new Event('change'))
			input.dispatchEvent(new Event('change'))
			fixture.detectChanges()

			expect(emittedValues.length).toBe(1)
		})
	})

	describe('Cleanup', () => {
		it('should complete destroy$ subject on destroy', () => {
			let completed = false
			component.destroy$.subscribe({
				complete: () => (completed = true),
			})

			component.ngOnDestroy()

			expect(completed).toBe(true)
		})

		it('should complete valueChanges subject on destroy', () => {
			let completed = false
			component.valueChanges.subscribe({
				complete: () => (completed = true),
			})

			component.ngOnDestroy()

			expect(completed).toBe(true)
		})

		it('should reset currentValue on destroy', () => {
			component.currentValue.set(true)
			component.ngOnDestroy()

			expect(component.currentValue()).toBe(false)
		})
	})
})
