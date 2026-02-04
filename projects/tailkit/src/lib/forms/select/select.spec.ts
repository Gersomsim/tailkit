import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import {
	SelectDisabledOptionsMock,
	SelectFormMock,
	SelectGroupedMock,
	SelectHintMock,
	SelectHintValidationMock,
	SelectLabelMock,
	SelectNgModelMock,
	SelectValidationMock,
	basicOptions,
} from './mocks'
import { TkSelect } from './select'

describe('TkSelect', () => {
	let component: TkSelect
	let fixture: ComponentFixture<TkSelect>

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [TkSelect, ReactiveFormsModule, FormsModule],
		}).compileComponents()

		fixture = TestBed.createComponent(TkSelect)
		component = fixture.componentInstance
		fixture.componentRef.setInput('options', basicOptions)
		fixture.detectChanges()
		await fixture.whenStable()
	})

	describe('Component initialization', () => {
		it('should create the component', () => {
			expect(component).toBeTruthy()
		})

		it('should generate a unique id when no id is provided', () => {
			const compiled = fixture.nativeElement as HTMLElement
			const select = compiled.querySelector('select')

			expect(component.selectId()).toBeDefined()
			expect(select?.id).toContain('custom-select-')
		})

		it('should use the provided id when one is given', () => {
			const id = 'SelectId-id'
			fixture.componentRef.setInput('id', id)
			fixture.detectChanges()

			const compiled = fixture.nativeElement as HTMLElement
			const select = compiled.querySelector('select')

			expect(component.selectId()).toBe(id)
			expect(select?.id).toBe(id)
		})

		it('should initialize with default values', () => {
			const defaultValues = {
				name: '',
				required: false,
				placeholder: 'Selecciona una opción',
				disabled: false,
				label: '',
				hint: '',
			}
			expect(component.name()).toBe(defaultValues.name)
			expect(component.required()).toBe(defaultValues.required)
			expect(component.placeholder()).toBe(defaultValues.placeholder)
			expect(component.disabled()).toBe(defaultValues.disabled)
			expect(component.label()).toBe(defaultValues.label)
			expect(component.hint()).toBe(defaultValues.hint)
		})
	})

	describe('HTML attributes binding', () => {
		it('should bind name attribute', () => {
			const name = 'mySelect'
			fixture.componentRef.setInput('name', name)
			fixture.detectChanges()

			const compiled = fixture.nativeElement as HTMLElement
			const select = compiled.querySelector('select')
			expect(select?.name).toBe(name)
		})

		it('should bind required attribute', () => {
			fixture.componentRef.setInput('required', true)
			fixture.detectChanges()

			const compiled = fixture.nativeElement as HTMLElement
			const select = compiled.querySelector('select')
			expect(select?.required).toBe(true)
		})

		it('should bind disabled attribute', () => {
			fixture.componentRef.setInput('disabled', true)
			fixture.detectChanges()

			const compiled = fixture.nativeElement as HTMLElement
			const select = compiled.querySelector('select')
			expect(select?.disabled).toBe(true)
		})
	})

	describe('Options rendering', () => {
		it('should render placeholder option', () => {
			const compiled = fixture.nativeElement as HTMLElement
			const placeholderOption = compiled.querySelector('option[disabled][selected]')

			expect(placeholderOption).toBeTruthy()
			expect(placeholderOption?.textContent?.trim()).toBe('Selecciona una opción')
		})

		it('should render custom placeholder', () => {
			fixture.componentRef.setInput('placeholder', 'Choose an option')
			fixture.detectChanges()

			const compiled = fixture.nativeElement as HTMLElement
			const placeholderOption = compiled.querySelector('option[disabled][selected]')

			expect(placeholderOption?.textContent?.trim()).toBe('Choose an option')
		})

		it('should render all options', () => {
			const compiled = fixture.nativeElement as HTMLElement
			const options = compiled.querySelectorAll('option:not([disabled])')

			expect(options.length).toBe(basicOptions.length)
		})

		it('should render option values correctly', () => {
			const compiled = fixture.nativeElement as HTMLElement
			const options = compiled.querySelectorAll('option:not([disabled])')

			options.forEach((option, index) => {
				expect((option as HTMLOptionElement).value).toBe(basicOptions[index].value)
			})
		})

		it('should render option labels correctly', () => {
			const compiled = fixture.nativeElement as HTMLElement
			const options = compiled.querySelectorAll('option:not([disabled])')

			options.forEach((option, index) => {
				expect(option.textContent?.trim()).toBe(basicOptions[index].label)
			})
		})

		it('should render disabled options', async () => {
			const fixtureHost = TestBed.createComponent(SelectDisabledOptionsMock)
			fixtureHost.detectChanges()
			await fixtureHost.whenStable()

			const compiled = fixtureHost.nativeElement as HTMLElement
			const disabledOption = compiled.querySelector('option[value="2"]') as HTMLOptionElement

			expect(disabledOption.disabled).toBe(true)
		})

		it('should render optgroups for grouped options', async () => {
			const fixtureHost = TestBed.createComponent(SelectGroupedMock)
			fixtureHost.detectChanges()
			await fixtureHost.whenStable()

			const compiled = fixtureHost.nativeElement as HTMLElement
			const optgroups = compiled.querySelectorAll('optgroup')

			expect(optgroups.length).toBe(2)
			expect(optgroups[0].label).toBe('Group 1')
			expect(optgroups[1].label).toBe('Group 2')
		})

		it('should render options inside optgroups', async () => {
			const fixtureHost = TestBed.createComponent(SelectGroupedMock)
			fixtureHost.detectChanges()
			await fixtureHost.whenStable()

			const compiled = fixtureHost.nativeElement as HTMLElement
			const firstGroup = compiled.querySelector('optgroup')
			const options = firstGroup?.querySelectorAll('option')

			expect(options?.length).toBe(2)
		})
	})

	describe('Size variants', () => {
		it('should apply sm size classes when size is sm', () => {
			fixture.componentRef.setInput('size', 'sm')
			fixture.detectChanges()

			const compiled = fixture.nativeElement as HTMLElement
			const select = compiled.querySelector('select')
			expect(select!.classList).toContain('text-sm')
		})

		it('should apply md size classes when size is md', () => {
			fixture.componentRef.setInput('size', 'md')
			fixture.detectChanges()

			const compiled = fixture.nativeElement as HTMLElement
			const select = compiled.querySelector('select')
			expect(select!.classList).toContain('text-base')
		})

		it('should apply lg size classes when size is lg', () => {
			fixture.componentRef.setInput('size', 'lg')
			fixture.detectChanges()

			const compiled = fixture.nativeElement as HTMLElement
			const select = compiled.querySelector('select')
			expect(select!.classList).toContain('text-lg')
		})

		it('should apply xl size classes when size is xl', () => {
			fixture.componentRef.setInput('size', 'xl')
			fixture.detectChanges()

			const compiled = fixture.nativeElement as HTMLElement
			const select = compiled.querySelector('select')
			expect(select!.classList).toContain('text-xl')
		})

		it('should default to md size when no size is provided', () => {
			const compiled = fixture.nativeElement as HTMLElement
			const select = compiled.querySelector('select')
			expect(select!.classList).toContain('text-base')
		})
	})

	describe('ControlValueAccessor integration', () => {
		it('should register with NgControl when used with formControlName', () => {
			const fixtureHost = TestBed.createComponent(SelectFormMock)
			fixtureHost.detectChanges()

			const compiled = fixtureHost.nativeElement as HTMLElement
			const select = compiled.querySelector('select') as HTMLSelectElement

			expect(select.value).toBe('1')
		})

		it('should register with NgControl when used with ngModel', async () => {
			const fixtureHost = TestBed.createComponent(SelectNgModelMock)
			fixtureHost.detectChanges()
			await fixtureHost.whenStable()
			fixtureHost.detectChanges()

			const compiled = fixtureHost.nativeElement as HTMLElement
			const select = compiled.querySelector('select') as HTMLSelectElement

			expect(select.value).toBe('2')
		})

		it('should call onChange when select value changes', async () => {
			const fixtureHost = TestBed.createComponent(SelectFormMock)
			fixtureHost.detectChanges()
			await fixtureHost.whenStable()

			const compiled = fixtureHost.nativeElement as HTMLElement
			const select = compiled.querySelector('select') as HTMLSelectElement
			select.value = '3'

			select.dispatchEvent(new Event('change'))
			fixtureHost.detectChanges()

			const formControl = fixtureHost.componentInstance.form.get('myField')
			expect(formControl?.value).toBe('3')
		})

		it('should call onTouched when select loses focus', async () => {
			const fixtureHost = TestBed.createComponent(SelectFormMock)
			fixtureHost.detectChanges()
			await fixtureHost.whenStable()

			const compiled = fixtureHost.nativeElement as HTMLElement
			const select = compiled.querySelector('select') as HTMLSelectElement
			select.dispatchEvent(new Event('blur'))
			fixtureHost.detectChanges()

			const formControl = fixtureHost.componentInstance.form.get('myField')
			expect(formControl?.touched).toBe(true)
		})

		it('should update select value when writeValue is called', () => {
			component.writeValue('2')
			fixture.detectChanges()

			const select = fixture.nativeElement.querySelector('select') as HTMLSelectElement
			expect(select.value).toBe('2')
		})

		it('should disable select when setDisabledState is called with true', () => {
			component.setDisabledState(true)
			fixture.detectChanges()

			const compiled = fixture.nativeElement as HTMLElement
			const select = compiled.querySelector('select') as HTMLSelectElement
			expect(select.disabled).toBe(true)
		})

		it('should enable select when setDisabledState is called with false', () => {
			component.setDisabledState(false)
			fixture.detectChanges()

			const compiled = fixture.nativeElement as HTMLElement
			const select = compiled.querySelector('select') as HTMLSelectElement
			expect(select.disabled).toBe(false)
		})
	})

	describe('Validation states', () => {
		it('should return isInvalid true when control is invalid and touched', async () => {
			const fixtureHost = TestBed.createComponent(SelectValidationMock)
			fixtureHost.detectChanges()
			await fixtureHost.whenStable()

			const compiled = fixtureHost.nativeElement as HTMLElement
			const select = compiled.querySelector('select') as HTMLSelectElement

			select.dispatchEvent(new Event('blur'))
			fixtureHost.detectChanges()

			const tkSelect = fixtureHost.debugElement.children[0].children[0].componentInstance as TkSelect
			expect(tkSelect.isInvalid).toBe(true)
		})

		it('should return isInvalid false when control is valid', async () => {
			const fixtureHost = TestBed.createComponent(SelectValidationMock)
			fixtureHost.componentInstance.form.get('requiredField')?.setValue('1')
			fixtureHost.detectChanges()
			await fixtureHost.whenStable()

			const tkSelect = fixtureHost.debugElement.children[0].children[0].componentInstance as TkSelect
			expect(tkSelect.isInvalid).toBe(false)
		})

		it('should return isInvalid false when control is invalid but untouched', async () => {
			const fixtureHost = TestBed.createComponent(SelectValidationMock)
			fixtureHost.detectChanges()
			await fixtureHost.whenStable()

			const tkSelect = fixtureHost.debugElement.children[0].children[0].componentInstance as TkSelect
			expect(tkSelect.isInvalid).toBe(false)
		})

		it('should return isValid true when control is valid, touched and has value', async () => {
			const fixtureHost = TestBed.createComponent(SelectValidationMock)
			fixtureHost.componentInstance.form.get('requiredField')?.setValue('1')
			fixtureHost.componentInstance.form.get('requiredField')?.markAsTouched()
			fixtureHost.detectChanges()
			await fixtureHost.whenStable()

			const tkSelect = fixtureHost.debugElement.children[0].children[0].componentInstance as TkSelect
			expect(tkSelect.isValid).toBe(true)
		})

		it('should return isValid false when control is valid but untouched', async () => {
			const fixtureHost = TestBed.createComponent(SelectFormMock)
			fixtureHost.detectChanges()
			await fixtureHost.whenStable()

			const tkSelect = fixtureHost.debugElement.children[0].children[0].componentInstance as TkSelect
			expect(tkSelect.isValid).toBe(false)
		})

		it('should return isValid false when control is valid but empty', async () => {
			const fixtureHost = TestBed.createComponent(SelectFormMock)
			fixtureHost.componentInstance.form.get('myField')?.setValue('')
			fixtureHost.componentInstance.form.get('myField')?.markAsTouched()
			fixtureHost.detectChanges()
			await fixtureHost.whenStable()

			const tkSelect = fixtureHost.debugElement.children[0].children[0].componentInstance as TkSelect
			expect(tkSelect.isValid).toBe(false)
		})
	})

	describe('Error messages', () => {
		it('should display required error message', async () => {
			const fixtureHost = TestBed.createComponent(SelectValidationMock)
			fixtureHost.detectChanges()
			await fixtureHost.whenStable()

			const compiled = fixtureHost.nativeElement as HTMLElement
			const select = compiled.querySelector('select') as HTMLSelectElement
			select.dispatchEvent(new Event('blur'))
			fixtureHost.detectChanges()

			const errorMessage = compiled.querySelector('p')
			expect(errorMessage?.textContent?.trim()).toBe('Este campo es requerido')
		})

		it('should display required error message with label when provided', async () => {
			const fixtureHost = TestBed.createComponent(SelectLabelMock)
			fixtureHost.detectChanges()
			await fixtureHost.whenStable()

			const compiled = fixtureHost.nativeElement as HTMLElement
			const select = compiled.querySelector('select') as HTMLSelectElement
			select.dispatchEvent(new Event('blur'))
			fixtureHost.detectChanges()

			const errorMessage = compiled.querySelector('p')
			expect(errorMessage?.textContent?.trim()).toBe('Mi Select es requerido')
		})

		it('should display generic error message for custom validators', async () => {
			const fixtureHost = TestBed.createComponent(SelectValidationMock)
			fixtureHost.detectChanges()
			await fixtureHost.whenStable()

			const formControl = fixtureHost.componentInstance.form.get('requiredField')
			formControl?.setErrors({ customError: true })
			formControl?.markAsTouched()
			fixtureHost.detectChanges()

			const compiled = fixtureHost.nativeElement as HTMLElement
			const errorMessage = compiled.querySelector('p')
			expect(errorMessage?.textContent?.trim()).toBe('Campo inválido')
		})

		it('should not display error message when control is untouched', async () => {
			const fixtureHost = TestBed.createComponent(SelectValidationMock)
			fixtureHost.detectChanges()
			await fixtureHost.whenStable()

			const compiled = fixtureHost.nativeElement as HTMLElement
			const errorMessage = compiled.querySelector('p.text-red-600')
			expect(errorMessage).toBeNull()
		})
	})

	describe('Visual feedback', () => {
		it('should apply red outline classes when invalid', async () => {
			const fixtureHost = TestBed.createComponent(SelectValidationMock)
			fixtureHost.detectChanges()
			await fixtureHost.whenStable()

			const compiled = fixtureHost.nativeElement as HTMLElement
			const select = compiled.querySelector('select') as HTMLSelectElement
			select.dispatchEvent(new Event('blur'))
			fixtureHost.detectChanges()

			expect(select.classList).toContain('outline-red-500')
		})

		it('should apply green outline classes when valid', async () => {
			const fixtureHost = TestBed.createComponent(SelectValidationMock)
			fixtureHost.componentInstance.form.get('requiredField')?.setValue('1')
			fixtureHost.componentInstance.form.get('requiredField')?.markAsTouched()
			fixtureHost.detectChanges()
			await fixtureHost.whenStable()

			const compiled = fixtureHost.nativeElement as HTMLElement
			const select = compiled.querySelector('select') as HTMLSelectElement
			fixtureHost.detectChanges()

			expect(select.classList).toContain('outline-green-500')
		})

		it('should apply default outline classes when neither valid nor invalid', () => {
			const compiled = fixture.nativeElement as HTMLElement
			const select = compiled.querySelector('select') as HTMLSelectElement

			expect(select.classList).toContain('outline-gray-300')
		})

		it('should apply cursor-not-allowed when disabled', () => {
			fixture.componentRef.setInput('disabled', true)
			fixture.detectChanges()

			const compiled = fixture.nativeElement as HTMLElement
			const select = compiled.querySelector('select') as HTMLSelectElement

			expect(select.classList).toContain('cursor-not-allowed')
		})
	})

	describe('Accessibility', () => {
		it('should set aria-invalid to true when control is invalid and touched', async () => {
			const fixtureHost = TestBed.createComponent(SelectValidationMock)
			fixtureHost.detectChanges()
			await fixtureHost.whenStable()

			const compiled = fixtureHost.nativeElement as HTMLElement
			const select = compiled.querySelector('select') as HTMLSelectElement
			select.dispatchEvent(new Event('blur'))
			fixtureHost.detectChanges()

			expect(select.getAttribute('aria-invalid')).toBe('true')
		})

		it('should set aria-invalid to false when control is valid', async () => {
			const fixtureHost = TestBed.createComponent(SelectValidationMock)
			fixtureHost.componentInstance.form.get('requiredField')?.setValue('1')
			fixtureHost.detectChanges()
			await fixtureHost.whenStable()

			const compiled = fixtureHost.nativeElement as HTMLElement
			const select = compiled.querySelector('select') as HTMLSelectElement

			expect(select.getAttribute('aria-invalid')).toBe('false')
		})

		it('should set aria-describedby pointing to error message id', () => {
			const compiled = fixture.nativeElement as HTMLElement
			const select = compiled.querySelector('select') as HTMLSelectElement

			expect(select.getAttribute('aria-describedby')).toBe(component.errorId())
		})

		it('should generate unique errorId based on selectId', () => {
			const selectId = component.selectId()
			const errorId = component.errorId()

			expect(errorId).toBe(`error-${selectId}`)
		})
	})

	describe('Hint text', () => {
		it('should display hint text when provided and not invalid', async () => {
			const fixtureHost = TestBed.createComponent(SelectHintMock)
			fixtureHost.detectChanges()
			await fixtureHost.whenStable()

			const compiled = fixtureHost.nativeElement as HTMLElement
			const hint = compiled.querySelector('p.text-gray-500')

			expect(hint?.textContent?.trim()).toBe('This is a hint')
		})

		it('should hide hint text when select is invalid', async () => {
			const fixtureHost = TestBed.createComponent(SelectHintValidationMock)
			fixtureHost.detectChanges()
			await fixtureHost.whenStable()

			const compiled = fixtureHost.nativeElement as HTMLElement
			const select = compiled.querySelector('select') as HTMLSelectElement
			select.dispatchEvent(new Event('blur'))
			fixtureHost.detectChanges()

			const hint = compiled.querySelector('p.text-gray-500')
			expect(hint).toBeNull()
		})

		it('should not display hint when not provided', () => {
			const compiled = fixture.nativeElement as HTMLElement
			const hint = compiled.querySelector('p.text-gray-500')

			expect(hint).toBeNull()
		})
	})

	describe('Value changes observable', () => {
		it('should emit value through valueChanges subject on change', async () => {
			fixture.detectChanges()
			await fixture.whenStable()

			const emittedValues: string[] = []
			component.valueChanges.subscribe(val => emittedValues.push(val))

			const compiled = fixture.nativeElement as HTMLElement
			const select = compiled.querySelector('select') as HTMLSelectElement

			select.value = '2'
			select.dispatchEvent(new Event('change'))
			fixture.detectChanges()

			expect(emittedValues).toContain('2')
		})

		it('should not emit duplicate consecutive values', async () => {
			fixture.detectChanges()
			await fixture.whenStable()

			const emittedValues: string[] = []
			component.valueChanges.subscribe(val => emittedValues.push(val))

			const compiled = fixture.nativeElement as HTMLElement
			const select = compiled.querySelector('select') as HTMLSelectElement

			select.value = '2'
			select.dispatchEvent(new Event('change'))
			select.dispatchEvent(new Event('change'))
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
			component.currentValue.set('some value')
			component.ngOnDestroy()

			expect(component.currentValue()).toBe('')
		})
	})
})
