import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { TkInput } from './input'
import {
	InputEmailMock,
	InputFormMock,
	InputHintMock,
	InputHintValidationMock,
	InputMaxMock,
	InputMaxlengthMock,
	InputMinMock,
	InputMinlengthMock,
	InputNgModelMock,
	InputPatternMock,
	InputValidationMock,
} from './mocks'

describe('TkInput', () => {
	let component: TkInput
	let fixture: ComponentFixture<TkInput>

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [TkInput, ReactiveFormsModule, FormsModule],
		}).compileComponents()

		fixture = TestBed.createComponent(TkInput)
		component = fixture.componentInstance
		await fixture.whenStable()
	})

	describe('Component initialization', () => {
		it('should create the component', () => {
			expect(component).toBeTruthy()
		})
		it('should generate a unique id when no id is provided', () => {
			const initialId = 'custom-input-1'
			const compiled = fixture.nativeElement as HTMLElement
			const input = compiled.querySelector('input')

			expect(component.inputId()).toBeDefined()
			expect(input?.id).toBe(initialId)
		})
		it('should use the provided id when one is given', () => {
			const id = 'InputId-id'
			fixture.componentRef.setInput('id', id)
			fixture.detectChanges()
			const compiled = fixture.nativeElement as HTMLElement
			const input = compiled.querySelector('input')

			expect(component.inputId()).toBe(id)
			expect(input?.id).toBe(id)
		})
		it('should initialize with default values', () => {
			const defultValues = {
				type: 'text',
				name: '',
				required: false,
				placeholder: '',
				autocomplete: 'off',
				readonly: false,
				disabled: false,
				min: null,
				max: null,
				step: null,
				minlength: null,
				maxlength: null,
			}
			expect(component.type()).toBe(defultValues.type)
			expect(component.name()).toBe(defultValues.name)
			expect(component.required()).toBe(defultValues.required)
			expect(component.placeholder()).toBe(defultValues.placeholder)
			expect(component.autocomplete()).toBe(defultValues.autocomplete)
			expect(component.readonly()).toBe(defultValues.readonly)
			expect(component.disabled()).toBe(defultValues.disabled)
			expect(component.min()).toBe(defultValues.min)
			expect(component.max()).toBe(defultValues.max)
			expect(component.step()).toBe(defultValues.step)
			expect(component.minlength()).toBe(defultValues.minlength)
			expect(component.maxlength()).toBe(defultValues.maxlength)
		})
	})

	describe('Input types', () => {
		it('should render as text input by default', () => {
			const compiled = fixture.nativeElement as HTMLElement
			const input = compiled.querySelector('input')
			expect(input?.type).toBe('text')
		})
		it('should render as password input when type is password', () => {
			fixture.componentRef.setInput('type', 'password')
			fixture.detectChanges()

			const compiled = fixture.nativeElement as HTMLElement
			const input = compiled.querySelector('input')
			expect(input?.type).toBe('password')
		})
		it('should render as email input when type is email', () => {
			fixture.componentRef.setInput('type', 'email')
			fixture.detectChanges()

			const compiled = fixture.nativeElement as HTMLElement
			const input = compiled.querySelector('input')
			expect(input?.type).toBe('email')
		})
		it('should render as number input when type is number', () => {
			fixture.componentRef.setInput('type', 'number')
			fixture.detectChanges()

			const compiled = fixture.nativeElement as HTMLElement
			const input = compiled.querySelector('input')
			expect(input?.type).toBe('number')
		})
		it('should render as date input when type is date', () => {
			fixture.componentRef.setInput('type', 'date')
			fixture.detectChanges()

			const compiled = fixture.nativeElement as HTMLElement
			const input = compiled.querySelector('input')
			expect(input?.type).toBe('date')
		})
		it('should render as time input when type is time', () => {
			fixture.componentRef.setInput('type', 'number')
			fixture.detectChanges()

			const compiled = fixture.nativeElement as HTMLElement
			const input = compiled.querySelector('input')
			expect(input?.type).toBe('number')
		})
		it('should render as month input when type is month', () => {
			fixture.componentRef.setInput('type', 'month')
			fixture.detectChanges()

			const compiled = fixture.nativeElement as HTMLElement
			const input = compiled.querySelector('input')
			expect(input?.type).toBe('month')
		})
		it('should render as week input when type is week', () => {
			fixture.componentRef.setInput('type', 'week')
			fixture.detectChanges()

			const compiled = fixture.nativeElement as HTMLElement
			const input = compiled.querySelector('input')
			expect(input?.type).toBe('week')
		})
	})

	describe('HTML attributes binding', () => {
		it('should bind placeholder attribute', () => {
			const placeholder = 'Placeholder'
			fixture.componentRef.setInput('placeholder', placeholder)
			fixture.detectChanges()

			const compiled = fixture.nativeElement as HTMLElement
			const input = compiled.querySelector('input')
			expect(input?.placeholder).toBe(placeholder)
		})
		it('should bind name attribute', () => {
			const name = 'name'
			fixture.componentRef.setInput('name', name)
			fixture.detectChanges()

			const compiled = fixture.nativeElement as HTMLElement
			const input = compiled.querySelector('input')
			expect(input?.name).toBe(name)
		})
		it('should bind required attribute', () => {
			const required = true
			fixture.componentRef.setInput('required', required)
			fixture.detectChanges()

			const compiled = fixture.nativeElement as HTMLElement
			const input = compiled.querySelector('input')
			expect(input?.required).toBe(required)
		})
		it('should bind readonly attribute', () => {
			const readonly = true
			fixture.componentRef.setInput('readonly', readonly)
			fixture.detectChanges()

			const compiled = fixture.nativeElement as HTMLElement
			const input = compiled.querySelector('input')
			expect(input?.readOnly).toBe(readonly)
		})
		it('should bind disabled attribute', () => {
			const disabled = true
			fixture.componentRef.setInput('disabled', disabled)
			fixture.detectChanges()

			const compiled = fixture.nativeElement as HTMLElement
			const input = compiled.querySelector('input')
			expect(input?.disabled).toBe(disabled)
		})
		it('should bind autocomplete attribute', () => {
			const autocomplete = 'off'
			fixture.componentRef.setInput('autocomplete', autocomplete)
			fixture.detectChanges()

			const compiled = fixture.nativeElement as HTMLElement
			const input = compiled.querySelector('input')
			expect(input?.autocomplete).toBe(autocomplete)
		})
		it('should bind min attribute', () => {
			const min = 50
			fixture.componentRef.setInput('min', min)
			fixture.detectChanges()

			const compiled = fixture.nativeElement as HTMLElement
			const input = compiled.querySelector('input')
			expect(input!.min).toBe(min.toString())
		})
		it('should bind max attribute', () => {
			const max = 100
			fixture.componentRef.setInput('max', max)
			fixture.detectChanges()

			const compiled = fixture.nativeElement as HTMLElement
			const input = compiled.querySelector('input')
			expect(input!.max).toBe(max.toString())
		})
		it('should bind step attribute', () => {
			const step = 0.001
			fixture.componentRef.setInput('step', step)
			fixture.detectChanges()

			const compiled = fixture.nativeElement as HTMLElement
			const input = compiled.querySelector('input')
			expect(input!.step).toBe(step.toString())
		})
		it('should bind minlength attribute', () => {
			const minlength = 5
			fixture.componentRef.setInput('minlength', minlength)
			fixture.detectChanges()

			const compiled = fixture.nativeElement as HTMLElement
			const input = compiled.querySelector('input')
			expect(input!.minLength).toBe(minlength)
		})
		it('should bind maxlength attribute', () => {
			const maxlength = 10
			fixture.componentRef.setInput('maxlength', maxlength)
			fixture.detectChanges()

			const compiled = fixture.nativeElement as HTMLElement
			const input = compiled.querySelector('input')
			expect(input!.maxLength).toBe(maxlength)
		})
	})

	describe('Size variants', () => {
		it('should apply sm size classes when size is sm', () => {
			const size = 'sm'
			fixture.componentRef.setInput('size', size)
			fixture.detectChanges()

			const compiled = fixture.nativeElement as HTMLElement
			const input = compiled.querySelector('input')
			expect(input!.classList).toContain(`text-${size}`)
		})
		it('should apply md size classes when size is md', () => {
			const size = 'md'
			fixture.componentRef.setInput('size', size)
			fixture.detectChanges()

			const compiled = fixture.nativeElement as HTMLElement
			const input = compiled.querySelector('input')
			expect(input!.classList).toContain(`text-base`)
		})
		it('should apply lg size classes when size is lg', () => {
			const size = 'lg'
			fixture.componentRef.setInput('size', size)
			fixture.detectChanges()

			const compiled = fixture.nativeElement as HTMLElement
			const input = compiled.querySelector('input')
			expect(input!.classList).toContain(`text-${size}`)
		})
		it('should apply xl size classes when size is xl', () => {
			const size = 'xl'
			fixture.componentRef.setInput('size', size)
			fixture.detectChanges()

			const compiled = fixture.nativeElement as HTMLElement
			const input = compiled.querySelector('input')
			expect(input!.classList).toContain(`text-${size}`)
		})
		it('should default to md size when no size is provided', () => {
			const compiled = fixture.nativeElement as HTMLElement
			const input = compiled.querySelector('input')
			expect(input!.classList).toContain(`text-base`)
		})
	})

	describe('ControlValueAccessor integration', () => {
		it('should register with NgControl when used with formControlName', () => {
			const fixtureHost = TestBed.createComponent(InputFormMock)
			fixtureHost.detectChanges()

			const compiled = fixtureHost.nativeElement as HTMLElement
			const form = compiled.querySelector('form')
			const input = form?.querySelector('input')

			expect(input?.value).toBe('valor inicial')
		})
		it('should register with NgControl when used with ngModel', async () => {
			const fixtureHost = TestBed.createComponent(InputNgModelMock)
			fixtureHost.detectChanges()
			await fixtureHost.whenStable()
			fixtureHost.detectChanges()

			const compiled = fixtureHost.nativeElement as HTMLElement
			const input = compiled.querySelector('input')

			expect(input?.value).toBe('is ngModel')
		})
		it('should call onChange when input value changes', async () => {
			const fistureHost = TestBed.createComponent(InputFormMock)
			fistureHost.detectChanges()
			await fistureHost.whenStable()

			const compiled = fistureHost.nativeElement as HTMLElement
			const input = compiled.querySelector('input')
			input!.value = 'nuevo valor'

			input!.dispatchEvent(new Event('input'))
			fistureHost.detectChanges()

			const formControl = fistureHost.componentInstance.form.get('myField')
			expect(formControl?.value).toBe('nuevo valor')
		})
		it('should call onTouched when input loses focus', async () => {
			const fixtureHost = TestBed.createComponent(InputFormMock)
			fixtureHost.detectChanges()
			await fixtureHost.whenStable()

			const compiled = fixtureHost.nativeElement as HTMLElement
			const input = compiled.querySelector('input')
			input!.dispatchEvent(new Event('blur'))
			fixtureHost.detectChanges()

			const formControl = fixtureHost.componentInstance.form.get('myField')
			expect(formControl?.touched).toBe(true)
		})
		it('should update input value when writeValue is called', () => {
			const fixture = TestBed.createComponent(TkInput)
			const component = fixture.componentInstance

			const newValue = 'Hola Vitest'
			component.writeValue(newValue)
			fixture.detectChanges()

			const input = fixture.nativeElement.querySelector('input') as HTMLInputElement
			expect(input.value).toBe(newValue)
		})
		it('should disable input when setDisabledState is called with true', () => {
			component.setDisabledState(true)
			fixture.detectChanges()

			const compiled = fixture.nativeElement as HTMLElement
			const input = compiled.querySelector('input') as HTMLInputElement
			expect(input.disabled).toBe(true)
		})
		it('should enable input when setDisabledState is called with false', () => {
			component.setDisabledState(false)
			fixture.detectChanges()

			const compiled = fixture.nativeElement as HTMLElement
			const input = compiled.querySelector('input') as HTMLInputElement
			expect(input.disabled).toBe(false)
		})
	})

	describe('Date handling', () => {
		it('should format Date object to YYYY-MM-DD for date type', () => {
			fixture.componentRef.setInput('type', 'date')
			fixture.detectChanges()

			const compiled = fixture.nativeElement as HTMLElement
			const input = compiled.querySelector('input') as HTMLInputElement

			input.value = '2022-01-01'
			input.dispatchEvent(new Event('input'))
			fixture.detectChanges()

			expect(input.value).toBe('2022-01-01')
		})
		it('should format Date object to YYYY-MM-DDTHH:mm for datetime-local type', () => {
			fixture.componentRef.setInput('type', 'datetime-local')
			fixture.detectChanges()

			const compiled = fixture.nativeElement as HTMLElement
			const input = compiled.querySelector('input') as HTMLInputElement

			input.value = '2022-01-01T12:00'
			input.dispatchEvent(new Event('input'))
			fixture.detectChanges()

			expect(input.value).toBe('2022-01-01T12:00')
		})
		it('should format Date object to HH:mm for time type', () => {
			fixture.componentRef.setInput('type', 'time')
			fixture.detectChanges()

			const compiled = fixture.nativeElement as HTMLElement
			const input = compiled.querySelector('input') as HTMLInputElement

			input.value = '12:00'
			input.dispatchEvent(new Event('input'))
			fixture.detectChanges()

			expect(input.value).toBe('12:00')
		})
		it('should format Date object to YYYY-MM for month type', () => {
			fixture.componentRef.setInput('type', 'month')
			fixture.detectChanges()

			const compiled = fixture.nativeElement as HTMLElement
			const input = compiled.querySelector('input') as HTMLInputElement

			input.value = '2022-01'
			input.dispatchEvent(new Event('input'))
			fixture.detectChanges()

			expect(input.value).toBe('2022-01')
		})
		it('should format Date object to YYYY-Www for week type', () => {
			fixture.componentRef.setInput('type', 'week')
			fixture.detectChanges()

			const compiled = fixture.nativeElement as HTMLElement
			const input = compiled.querySelector('input') as HTMLInputElement

			input.value = '2022-W01'
			input.dispatchEvent(new Event('input'))
			fixture.detectChanges()

			expect(input.value).toBe('2022-W01')
		})
		it('should return string value when returnDateObject is false', () => {
			fixture.componentRef.setInput('returnDateObject', false)
			fixture.detectChanges()

			const compiled = fixture.nativeElement as HTMLElement
			const input = compiled.querySelector('input') as HTMLInputElement

			input.value = '2022-01-01'
			input.dispatchEvent(new Event('input'))
			fixture.detectChanges()

			expect(input.value).toBe('2022-01-01')
		})
		it('should return Date object when returnDateObject is true for date type', () => {
			fixture.componentRef.setInput('returnDateObject', true)
			fixture.detectChanges()

			const compiled = fixture.nativeElement as HTMLElement
			const input = compiled.querySelector('input') as HTMLInputElement

			input.value = '2022-01-01'
			input.dispatchEvent(new Event('input'))
			fixture.detectChanges()

			expect(input.value).toBe('2022-01-01')
		})
		it('should return Date object when returnDateObject is true for datetime-local type', () => {
			fixture.componentRef.setInput('returnDateObject', true)
			fixture.detectChanges()

			const compiled = fixture.nativeElement as HTMLElement
			const input = compiled.querySelector('input') as HTMLInputElement

			input.value = '2022-01-01T12:00'
			input.dispatchEvent(new Event('input'))
			fixture.detectChanges()

			expect(input.value).toBe('2022-01-01T12:00')
		})
		it('should return Date object when returnDateObject is true for time type', () => {
			fixture.componentRef.setInput('returnDateObject', true)
			fixture.detectChanges()

			const compiled = fixture.nativeElement as HTMLElement
			const input = compiled.querySelector('input') as HTMLInputElement

			input.value = '12:00'
			input.dispatchEvent(new Event('input'))
			fixture.detectChanges()

			expect(input.value).toBe('12:00')
		})
		it('should handle invalid Date gracefully', () => {
			fixture.componentRef.setInput('returnDateObject', true)
			fixture.detectChanges()

			const compiled = fixture.nativeElement as HTMLElement
			const input = compiled.querySelector('input') as HTMLInputElement

			input.value = 'invalid date'
			input.dispatchEvent(new Event('input'))
			fixture.detectChanges()

			expect(input.value).toBe('invalid date')
		})
	})

	describe('Validation states', () => {
		it('should return isInvalid true when control is invalid and touched', async () => {
			const fixtureHost = TestBed.createComponent(InputValidationMock)
			fixtureHost.detectChanges()
			await fixtureHost.whenStable()

			const compiled = fixtureHost.nativeElement as HTMLElement
			const input = compiled.querySelector('input') as HTMLInputElement

			input.dispatchEvent(new Event('blur'))
			fixtureHost.detectChanges()

			const tkInput = fixtureHost.debugElement.children[0].children[0].componentInstance as TkInput
			expect(tkInput.isInvalid).toBe(true)
		})

		it('should return isInvalid false when control is valid', async () => {
			const fixtureHost = TestBed.createComponent(InputValidationMock)
			fixtureHost.componentInstance.form.get('requiredField')?.setValue('valid value')
			fixtureHost.detectChanges()
			await fixtureHost.whenStable()

			const tkInput = fixtureHost.debugElement.children[0].children[0].componentInstance as TkInput
			expect(tkInput.isInvalid).toBe(false)
		})

		it('should return isInvalid false when control is invalid but untouched', async () => {
			const fixtureHost = TestBed.createComponent(InputValidationMock)
			fixtureHost.detectChanges()
			await fixtureHost.whenStable()

			const tkInput = fixtureHost.debugElement.children[0].children[0].componentInstance as TkInput
			expect(tkInput.isInvalid).toBe(false)
		})

		it('should return isValid true when control is valid, touched and has value', async () => {
			const fixtureHost = TestBed.createComponent(InputValidationMock)
			fixtureHost.componentInstance.form.get('requiredField')?.setValue('valid value')
			fixtureHost.componentInstance.form.get('requiredField')?.markAsTouched()
			fixtureHost.detectChanges()
			await fixtureHost.whenStable()

			const tkInput = fixtureHost.debugElement.children[0].children[0].componentInstance as TkInput
			expect(tkInput.isValid).toBe(true)
		})

		it('should return isValid false when control is valid but untouched', async () => {
			const fixtureHost = TestBed.createComponent(InputFormMock)
			fixtureHost.detectChanges()
			await fixtureHost.whenStable()

			const tkInput = fixtureHost.debugElement.children[0].children[0].componentInstance as TkInput
			expect(tkInput.isValid).toBe(false)
		})

		it('should return isValid false when control is valid but empty', async () => {
			const fixtureHost = TestBed.createComponent(InputFormMock)
			fixtureHost.componentInstance.form.get('myField')?.setValue('')
			fixtureHost.componentInstance.form.get('myField')?.markAsTouched()
			fixtureHost.detectChanges()
			await fixtureHost.whenStable()

			const tkInput = fixtureHost.debugElement.children[0].children[0].componentInstance as TkInput
			expect(tkInput.isValid).toBe(false)
		})
	})

	describe('Error messages', () => {
		it('should display required error message', async () => {
			const fixtureHost = TestBed.createComponent(InputValidationMock)
			fixtureHost.detectChanges()
			await fixtureHost.whenStable()

			const compiled = fixtureHost.nativeElement as HTMLElement
			const input = compiled.querySelector('input') as HTMLInputElement
			input.dispatchEvent(new Event('blur'))
			fixtureHost.detectChanges()

			const errorMessage = compiled.querySelector('p')
			expect(errorMessage?.textContent?.trim()).toBe('Campo requerido es requerido')
		})

		it('should display email error message', async () => {
			const fixtureHost = TestBed.createComponent(InputEmailMock)
			fixtureHost.componentInstance.form.get('emailField')?.setValue('invalid-email')
			fixtureHost.componentInstance.form.get('emailField')?.markAsTouched()
			fixtureHost.detectChanges()
			await fixtureHost.whenStable()

			const compiled = fixtureHost.nativeElement as HTMLElement
			const errorMessage = compiled.querySelector('p')
			expect(errorMessage?.textContent?.trim()).toBe('Ingresa un email válido')
		})

		it('should display minlength error message with required length', async () => {
			const fixtureHost = TestBed.createComponent(InputMinlengthMock)
			fixtureHost.componentInstance.form.get('minlengthField')?.setValue('abc')
			fixtureHost.componentInstance.form.get('minlengthField')?.markAsTouched()
			fixtureHost.detectChanges()
			await fixtureHost.whenStable()

			const compiled = fixtureHost.nativeElement as HTMLElement
			const errorMessage = compiled.querySelector('p')
			expect(errorMessage?.textContent?.trim()).toBe('Mínimo 5 caracteres')
		})

		it('should display maxlength error message with required length', async () => {
			const fixtureHost = TestBed.createComponent(InputMaxlengthMock)
			fixtureHost.componentInstance.form.get('maxlengthField')?.setValue('this is a very long text')
			fixtureHost.componentInstance.form.get('maxlengthField')?.markAsTouched()
			fixtureHost.detectChanges()
			await fixtureHost.whenStable()

			const compiled = fixtureHost.nativeElement as HTMLElement
			const errorMessage = compiled.querySelector('p')
			expect(errorMessage?.textContent?.trim()).toBe('Máximo 10 caracteres')
		})

		it('should display pattern error message', async () => {
			const fixtureHost = TestBed.createComponent(InputPatternMock)
			fixtureHost.componentInstance.form.get('patternField')?.setValue('123')
			fixtureHost.componentInstance.form.get('patternField')?.markAsTouched()
			fixtureHost.detectChanges()
			await fixtureHost.whenStable()

			const compiled = fixtureHost.nativeElement as HTMLElement
			const errorMessage = compiled.querySelector('p')
			expect(errorMessage?.textContent?.trim()).toBe('Formato inválido')
		})

		it('should display min error message with min value', async () => {
			const fixtureHost = TestBed.createComponent(InputMinMock)
			fixtureHost.componentInstance.form.get('minField')?.setValue(5)
			fixtureHost.componentInstance.form.get('minField')?.markAsTouched()
			fixtureHost.detectChanges()
			await fixtureHost.whenStable()

			const compiled = fixtureHost.nativeElement as HTMLElement
			const errorMessage = compiled.querySelector('p')
			expect(errorMessage?.textContent?.trim()).toBe('El valor mínimo es 10')
		})

		it('should display max error message with max value', async () => {
			const fixtureHost = TestBed.createComponent(InputMaxMock)
			fixtureHost.componentInstance.form.get('maxField')?.setValue(100)
			fixtureHost.componentInstance.form.get('maxField')?.markAsTouched()
			fixtureHost.detectChanges()
			await fixtureHost.whenStable()

			const compiled = fixtureHost.nativeElement as HTMLElement
			const errorMessage = compiled.querySelector('p')
			expect(errorMessage?.textContent?.trim()).toBe('El valor máximo es 50')
		})

		it('should display generic error message for custom validators', async () => {
			const fixtureHost = TestBed.createComponent(InputValidationMock)
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
			const fixtureHost = TestBed.createComponent(InputValidationMock)
			fixtureHost.detectChanges()
			await fixtureHost.whenStable()

			const compiled = fixtureHost.nativeElement as HTMLElement
			const errorMessage = compiled.querySelector('p.text-red-600')
			expect(errorMessage).toBeNull()
		})

		it('should use field name in required error message when name is provided', async () => {
			const fixtureHost = TestBed.createComponent(InputValidationMock)
			fixtureHost.detectChanges()
			await fixtureHost.whenStable()

			const compiled = fixtureHost.nativeElement as HTMLElement
			const input = compiled.querySelector('input') as HTMLInputElement
			input.dispatchEvent(new Event('blur'))
			fixtureHost.detectChanges()

			const errorMessage = compiled.querySelector('p')
			expect(errorMessage?.textContent?.trim()).toContain('Campo requerido')
		})
	})

	describe('Visual feedback', () => {
		it('should apply red outline classes when invalid', async () => {
			const fixtureHost = TestBed.createComponent(InputValidationMock)
			fixtureHost.detectChanges()
			await fixtureHost.whenStable()

			const compiled = fixtureHost.nativeElement as HTMLElement
			const input = compiled.querySelector('input') as HTMLInputElement
			input.dispatchEvent(new Event('blur'))
			fixtureHost.detectChanges()

			expect(input.classList).toContain('outline-red-500')
		})

		it('should apply green outline classes when valid', async () => {
			const fixtureHost = TestBed.createComponent(InputValidationMock)
			fixtureHost.componentInstance.form.get('requiredField')?.setValue('valid')
			fixtureHost.componentInstance.form.get('requiredField')?.markAsTouched()
			fixtureHost.detectChanges()
			await fixtureHost.whenStable()

			const compiled = fixtureHost.nativeElement as HTMLElement
			const input = compiled.querySelector('input') as HTMLInputElement
			fixtureHost.detectChanges()

			expect(input.classList).toContain('outline-green-500')
		})

		it('should apply default outline classes when neither valid nor invalid', () => {
			const compiled = fixture.nativeElement as HTMLElement
			const input = compiled.querySelector('input') as HTMLInputElement

			expect(input.classList).toContain('outline-gray-300')
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
	})

	describe('Accessibility', () => {
		it('should set aria-invalid to true when control is invalid and touched', async () => {
			const fixtureHost = TestBed.createComponent(InputValidationMock)
			fixtureHost.detectChanges()
			await fixtureHost.whenStable()

			const compiled = fixtureHost.nativeElement as HTMLElement
			const input = compiled.querySelector('input') as HTMLInputElement
			input.dispatchEvent(new Event('blur'))
			fixtureHost.detectChanges()

			expect(input.getAttribute('aria-invalid')).toBe('true')
		})

		it('should set aria-invalid to false when control is valid', async () => {
			const fixtureHost = TestBed.createComponent(InputValidationMock)
			fixtureHost.componentInstance.form.get('requiredField')?.setValue('valid')
			fixtureHost.detectChanges()
			await fixtureHost.whenStable()

			const compiled = fixtureHost.nativeElement as HTMLElement
			const input = compiled.querySelector('input') as HTMLInputElement

			expect(input.getAttribute('aria-invalid')).toBe('false')
		})

		it('should set aria-describedby pointing to error message id', () => {
			const compiled = fixture.nativeElement as HTMLElement
			const input = compiled.querySelector('input') as HTMLInputElement

			expect(input.getAttribute('aria-describedby')).toBe(component.errorId())
		})

		it('should generate unique errorId based on inputId', () => {
			const inputId = component.inputId()
			const errorId = component.errorId()

			expect(errorId).toBe(`error-${inputId}`)
		})
	})

	describe('Hint text', () => {
		it('should display hint text when provided and not invalid', async () => {
			const fixtureHost = TestBed.createComponent(InputHintMock)
			fixtureHost.detectChanges()
			await fixtureHost.whenStable()

			const compiled = fixtureHost.nativeElement as HTMLElement
			const hint = compiled.querySelector('p.text-gray-500')

			expect(hint?.textContent?.trim()).toBe('This is a hint')
		})

		it('should hide hint text when input is invalid', async () => {
			const fixtureHost = TestBed.createComponent(InputHintValidationMock)
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
			const compiled = fixture.nativeElement as HTMLElement
			const hint = compiled.querySelector('p.text-gray-500')

			expect(hint).toBeNull()
		})
	})

	describe('Value changes observable', () => {
		it('should emit value through valueChanges subject on input', async () => {
			fixture.detectChanges()
			await fixture.whenStable()

			const emittedValues: string[] = []
			component.valueChanges.subscribe(val => emittedValues.push(val))

			const compiled = fixture.nativeElement as HTMLElement
			const input = compiled.querySelector('input') as HTMLInputElement

			input.value = 'test value'
			input.dispatchEvent(new Event('input'))
			fixture.detectChanges()

			expect(emittedValues).toContain('test value')
		})

		it('should not emit duplicate consecutive values', async () => {
			fixture.detectChanges()
			await fixture.whenStable()

			const emittedValues: string[] = []
			component.valueChanges.subscribe(val => emittedValues.push(val))

			const compiled = fixture.nativeElement as HTMLElement
			const input = compiled.querySelector('input') as HTMLInputElement

			input.value = 'same value'
			input.dispatchEvent(new Event('input'))
			input.dispatchEvent(new Event('input'))
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
