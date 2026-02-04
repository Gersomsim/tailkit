import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { TkTextarea } from './textarea'
import {
	TextareaFormMock,
	TextareaNgModelMock,
	TextareaValidationMock,
	TextareaLabelMock,
	TextareaMinlengthMock,
	TextareaMaxlengthMock,
	TextareaPatternMock,
	TextareaHintMock,
	TextareaHintValidationMock,
} from './mocks'

describe('TkTextarea', () => {
	let component: TkTextarea
	let fixture: ComponentFixture<TkTextarea>

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [TkTextarea, ReactiveFormsModule, FormsModule],
		}).compileComponents()

		fixture = TestBed.createComponent(TkTextarea)
		component = fixture.componentInstance
		fixture.detectChanges()
		await fixture.whenStable()
	})

	describe('Component initialization', () => {
		it('should create the component', () => {
			expect(component).toBeTruthy()
		})

		it('should generate a unique id when no id is provided', () => {
			const compiled = fixture.nativeElement as HTMLElement
			const textarea = compiled.querySelector('textarea')

			expect(component.textAreaId()).toBeDefined()
			expect(textarea?.id).toContain('custom-input-')
		})

		it('should use the provided id when one is given', () => {
			const id = 'TextareaId-id'
			fixture.componentRef.setInput('id', id)
			fixture.detectChanges()

			const compiled = fixture.nativeElement as HTMLElement
			const textarea = compiled.querySelector('textarea')

			expect(component.textAreaId()).toBe(id)
			expect(textarea?.id).toBe(id)
		})

		it('should initialize with default values', () => {
			const defaultValues = {
				name: '',
				required: false,
				placeholder: '',
				autocomplete: 'off',
				readonly: false,
				disabled: false,
				minlength: null,
				maxlength: null,
				rows: 4,
				cols: null,
			}
			expect(component.name()).toBe(defaultValues.name)
			expect(component.required()).toBe(defaultValues.required)
			expect(component.placeholder()).toBe(defaultValues.placeholder)
			expect(component.autocomplete()).toBe(defaultValues.autocomplete)
			expect(component.readonly()).toBe(defaultValues.readonly)
			expect(component.disabled()).toBe(defaultValues.disabled)
			expect(component.minlength()).toBe(defaultValues.minlength)
			expect(component.maxlength()).toBe(defaultValues.maxlength)
			expect(component.rows()).toBe(defaultValues.rows)
			expect(component.cols()).toBe(defaultValues.cols)
		})
	})

	describe('HTML attributes binding', () => {
		it('should bind placeholder attribute', () => {
			const placeholder = 'Enter your text here'
			fixture.componentRef.setInput('placeholder', placeholder)
			fixture.detectChanges()

			const compiled = fixture.nativeElement as HTMLElement
			const textarea = compiled.querySelector('textarea')
			expect(textarea?.placeholder).toBe(placeholder)
		})

		it('should bind name attribute', () => {
			const name = 'description'
			fixture.componentRef.setInput('name', name)
			fixture.detectChanges()

			const compiled = fixture.nativeElement as HTMLElement
			const textarea = compiled.querySelector('textarea')
			expect(textarea?.name).toBe(name)
		})

		it('should bind required attribute', () => {
			fixture.componentRef.setInput('required', true)
			fixture.detectChanges()

			const compiled = fixture.nativeElement as HTMLElement
			const textarea = compiled.querySelector('textarea')
			expect(textarea?.required).toBe(true)
		})

		it('should bind readonly attribute', () => {
			fixture.componentRef.setInput('readonly', true)
			fixture.detectChanges()

			const compiled = fixture.nativeElement as HTMLElement
			const textarea = compiled.querySelector('textarea')
			expect(textarea?.readOnly).toBe(true)
		})

		it('should bind disabled attribute', () => {
			fixture.componentRef.setInput('disabled', true)
			fixture.detectChanges()

			const compiled = fixture.nativeElement as HTMLElement
			const textarea = compiled.querySelector('textarea')
			expect(textarea?.disabled).toBe(true)
		})

		it('should bind autocomplete attribute', () => {
			fixture.componentRef.setInput('autocomplete', 'on')
			fixture.detectChanges()

			const compiled = fixture.nativeElement as HTMLElement
			const textarea = compiled.querySelector('textarea')
			expect(textarea?.autocomplete).toBe('on')
		})

		it('should bind minlength attribute', () => {
			const minlength = 5
			fixture.componentRef.setInput('minlength', minlength)
			fixture.detectChanges()

			const compiled = fixture.nativeElement as HTMLElement
			const textarea = compiled.querySelector('textarea')
			expect(textarea?.minLength).toBe(minlength)
		})

		it('should bind maxlength attribute', () => {
			const maxlength = 100
			fixture.componentRef.setInput('maxlength', maxlength)
			fixture.detectChanges()

			const compiled = fixture.nativeElement as HTMLElement
			const textarea = compiled.querySelector('textarea')
			expect(textarea?.maxLength).toBe(maxlength)
		})

		it('should bind rows attribute', () => {
			const rows = 10
			fixture.componentRef.setInput('rows', rows)
			fixture.detectChanges()

			const compiled = fixture.nativeElement as HTMLElement
			const textarea = compiled.querySelector('textarea')
			expect(textarea?.rows).toBe(rows)
		})

		it('should bind cols attribute', () => {
			const cols = 50
			fixture.componentRef.setInput('cols', cols)
			fixture.detectChanges()

			const compiled = fixture.nativeElement as HTMLElement
			const textarea = compiled.querySelector('textarea')
			expect(textarea?.cols).toBe(cols)
		})
	})

	describe('Size variants', () => {
		it('should apply sm size classes when size is sm', () => {
			fixture.componentRef.setInput('size', 'sm')
			fixture.detectChanges()

			const compiled = fixture.nativeElement as HTMLElement
			const textarea = compiled.querySelector('textarea')
			expect(textarea!.classList).toContain('text-sm')
		})

		it('should apply md size classes when size is md', () => {
			fixture.componentRef.setInput('size', 'md')
			fixture.detectChanges()

			const compiled = fixture.nativeElement as HTMLElement
			const textarea = compiled.querySelector('textarea')
			expect(textarea!.classList).toContain('text-base')
		})

		it('should apply lg size classes when size is lg', () => {
			fixture.componentRef.setInput('size', 'lg')
			fixture.detectChanges()

			const compiled = fixture.nativeElement as HTMLElement
			const textarea = compiled.querySelector('textarea')
			expect(textarea!.classList).toContain('text-lg')
		})

		it('should apply xl size classes when size is xl', () => {
			fixture.componentRef.setInput('size', 'xl')
			fixture.detectChanges()

			const compiled = fixture.nativeElement as HTMLElement
			const textarea = compiled.querySelector('textarea')
			expect(textarea!.classList).toContain('text-xl')
		})

		it('should default to md size when no size is provided', () => {
			const compiled = fixture.nativeElement as HTMLElement
			const textarea = compiled.querySelector('textarea')
			expect(textarea!.classList).toContain('text-base')
		})
	})

	describe('ControlValueAccessor integration', () => {
		it('should register with NgControl when used with formControlName', () => {
			const fixtureHost = TestBed.createComponent(TextareaFormMock)
			fixtureHost.detectChanges()

			const compiled = fixtureHost.nativeElement as HTMLElement
			const textarea = compiled.querySelector('textarea')

			expect(textarea?.value).toBe('valor inicial')
		})

		it('should register with NgControl when used with ngModel', async () => {
			const fixtureHost = TestBed.createComponent(TextareaNgModelMock)
			fixtureHost.detectChanges()
			await fixtureHost.whenStable()
			fixtureHost.detectChanges()

			const compiled = fixtureHost.nativeElement as HTMLElement
			const textarea = compiled.querySelector('textarea')

			expect(textarea?.value).toBe('is ngModel')
		})

		it('should call onChange when textarea value changes', async () => {
			const fixtureHost = TestBed.createComponent(TextareaFormMock)
			fixtureHost.detectChanges()
			await fixtureHost.whenStable()

			const compiled = fixtureHost.nativeElement as HTMLElement
			const textarea = compiled.querySelector('textarea')
			textarea!.value = 'nuevo valor'

			textarea!.dispatchEvent(new Event('input'))
			fixtureHost.detectChanges()

			const formControl = fixtureHost.componentInstance.form.get('myField')
			expect(formControl?.value).toBe('nuevo valor')
		})

		it('should call onTouched when textarea loses focus', async () => {
			const fixtureHost = TestBed.createComponent(TextareaFormMock)
			fixtureHost.detectChanges()
			await fixtureHost.whenStable()

			const compiled = fixtureHost.nativeElement as HTMLElement
			const textarea = compiled.querySelector('textarea')
			textarea!.dispatchEvent(new Event('blur'))
			fixtureHost.detectChanges()

			const formControl = fixtureHost.componentInstance.form.get('myField')
			expect(formControl?.touched).toBe(true)
		})

		it('should update textarea value when writeValue is called', () => {
			const newValue = 'Hola Textarea'
			component.writeValue(newValue)
			fixture.detectChanges()

			const textarea = fixture.nativeElement.querySelector('textarea') as HTMLTextAreaElement
			expect(textarea.value).toBe(newValue)
		})

		it('should disable textarea when setDisabledState is called with true', () => {
			component.setDisabledState(true)
			fixture.detectChanges()

			const compiled = fixture.nativeElement as HTMLElement
			const textarea = compiled.querySelector('textarea') as HTMLTextAreaElement
			expect(textarea.disabled).toBe(true)
		})

		it('should enable textarea when setDisabledState is called with false', () => {
			component.setDisabledState(false)
			fixture.detectChanges()

			const compiled = fixture.nativeElement as HTMLElement
			const textarea = compiled.querySelector('textarea') as HTMLTextAreaElement
			expect(textarea.disabled).toBe(false)
		})
	})

	describe('Validation states', () => {
		it('should return isInvalid true when control is invalid and touched', async () => {
			const fixtureHost = TestBed.createComponent(TextareaValidationMock)
			fixtureHost.detectChanges()
			await fixtureHost.whenStable()

			const compiled = fixtureHost.nativeElement as HTMLElement
			const textarea = compiled.querySelector('textarea') as HTMLTextAreaElement

			textarea.dispatchEvent(new Event('blur'))
			fixtureHost.detectChanges()

			const tkTextarea = fixtureHost.debugElement.children[0].children[0].componentInstance as TkTextarea
			expect(tkTextarea.isInvalid).toBe(true)
		})

		it('should return isInvalid false when control is valid', async () => {
			const fixtureHost = TestBed.createComponent(TextareaValidationMock)
			fixtureHost.componentInstance.form.get('requiredField')?.setValue('valid value')
			fixtureHost.detectChanges()
			await fixtureHost.whenStable()

			const tkTextarea = fixtureHost.debugElement.children[0].children[0].componentInstance as TkTextarea
			expect(tkTextarea.isInvalid).toBe(false)
		})

		it('should return isInvalid false when control is invalid but untouched', async () => {
			const fixtureHost = TestBed.createComponent(TextareaValidationMock)
			fixtureHost.detectChanges()
			await fixtureHost.whenStable()

			const tkTextarea = fixtureHost.debugElement.children[0].children[0].componentInstance as TkTextarea
			expect(tkTextarea.isInvalid).toBe(false)
		})

		it('should return isValid true when control is valid, touched and has value', async () => {
			const fixtureHost = TestBed.createComponent(TextareaValidationMock)
			fixtureHost.componentInstance.form.get('requiredField')?.setValue('valid value')
			fixtureHost.componentInstance.form.get('requiredField')?.markAsTouched()
			fixtureHost.detectChanges()
			await fixtureHost.whenStable()

			const tkTextarea = fixtureHost.debugElement.children[0].children[0].componentInstance as TkTextarea
			expect(tkTextarea.isValid).toBe(true)
		})

		it('should return isValid false when control is valid but untouched', async () => {
			const fixtureHost = TestBed.createComponent(TextareaFormMock)
			fixtureHost.detectChanges()
			await fixtureHost.whenStable()

			const tkTextarea = fixtureHost.debugElement.children[0].children[0].componentInstance as TkTextarea
			expect(tkTextarea.isValid).toBe(false)
		})

		it('should return isValid false when control is valid but empty', async () => {
			const fixtureHost = TestBed.createComponent(TextareaFormMock)
			fixtureHost.componentInstance.form.get('myField')?.setValue('')
			fixtureHost.componentInstance.form.get('myField')?.markAsTouched()
			fixtureHost.detectChanges()
			await fixtureHost.whenStable()

			const tkTextarea = fixtureHost.debugElement.children[0].children[0].componentInstance as TkTextarea
			expect(tkTextarea.isValid).toBe(false)
		})
	})

	describe('Error messages', () => {
		it('should display required error message with name', async () => {
			const fixtureHost = TestBed.createComponent(TextareaValidationMock)
			fixtureHost.detectChanges()
			await fixtureHost.whenStable()

			const compiled = fixtureHost.nativeElement as HTMLElement
			const textarea = compiled.querySelector('textarea') as HTMLTextAreaElement
			textarea.dispatchEvent(new Event('blur'))
			fixtureHost.detectChanges()

			const errorMessage = compiled.querySelector('p')
			expect(errorMessage?.textContent?.trim()).toBe('Campo requerido es requerido')
		})

		it('should display required error message with label when provided', async () => {
			const fixtureHost = TestBed.createComponent(TextareaLabelMock)
			fixtureHost.detectChanges()
			await fixtureHost.whenStable()

			const compiled = fixtureHost.nativeElement as HTMLElement
			const textarea = compiled.querySelector('textarea') as HTMLTextAreaElement
			textarea.dispatchEvent(new Event('blur'))
			fixtureHost.detectChanges()

			const errorMessage = compiled.querySelector('p')
			expect(errorMessage?.textContent?.trim()).toBe('Mi Label es requerido')
		})

		it('should display minlength error message with required length', async () => {
			const fixtureHost = TestBed.createComponent(TextareaMinlengthMock)
			fixtureHost.componentInstance.form.get('minlengthField')?.setValue('abc')
			fixtureHost.componentInstance.form.get('minlengthField')?.markAsTouched()
			fixtureHost.detectChanges()
			await fixtureHost.whenStable()

			const compiled = fixtureHost.nativeElement as HTMLElement
			const errorMessage = compiled.querySelector('p')
			expect(errorMessage?.textContent?.trim()).toBe('Mínimo 5 caracteres')
		})

		it('should display maxlength error message with required length', async () => {
			const fixtureHost = TestBed.createComponent(TextareaMaxlengthMock)
			fixtureHost.componentInstance.form.get('maxlengthField')?.setValue('this is a very long text')
			fixtureHost.componentInstance.form.get('maxlengthField')?.markAsTouched()
			fixtureHost.detectChanges()
			await fixtureHost.whenStable()

			const compiled = fixtureHost.nativeElement as HTMLElement
			const errorMessage = compiled.querySelector('p')
			expect(errorMessage?.textContent?.trim()).toBe('Máximo 10 caracteres')
		})

		it('should display pattern error message', async () => {
			const fixtureHost = TestBed.createComponent(TextareaPatternMock)
			fixtureHost.componentInstance.form.get('patternField')?.setValue('123')
			fixtureHost.componentInstance.form.get('patternField')?.markAsTouched()
			fixtureHost.detectChanges()
			await fixtureHost.whenStable()

			const compiled = fixtureHost.nativeElement as HTMLElement
			const errorMessage = compiled.querySelector('p')
			expect(errorMessage?.textContent?.trim()).toBe('Formato inválido')
		})

		it('should display generic error message for custom validators', async () => {
			const fixtureHost = TestBed.createComponent(TextareaValidationMock)
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
			const fixtureHost = TestBed.createComponent(TextareaValidationMock)
			fixtureHost.detectChanges()
			await fixtureHost.whenStable()

			const compiled = fixtureHost.nativeElement as HTMLElement
			const errorMessage = compiled.querySelector('p.text-red-600')
			expect(errorMessage).toBeNull()
		})
	})

	describe('Visual feedback', () => {
		it('should apply red outline classes when invalid', async () => {
			const fixtureHost = TestBed.createComponent(TextareaValidationMock)
			fixtureHost.detectChanges()
			await fixtureHost.whenStable()

			const compiled = fixtureHost.nativeElement as HTMLElement
			const textarea = compiled.querySelector('textarea') as HTMLTextAreaElement
			textarea.dispatchEvent(new Event('blur'))
			fixtureHost.detectChanges()

			expect(textarea.classList).toContain('outline-red-500')
		})

		it('should apply green outline classes when valid', async () => {
			const fixtureHost = TestBed.createComponent(TextareaValidationMock)
			fixtureHost.componentInstance.form.get('requiredField')?.setValue('valid')
			fixtureHost.componentInstance.form.get('requiredField')?.markAsTouched()
			fixtureHost.detectChanges()
			await fixtureHost.whenStable()

			const compiled = fixtureHost.nativeElement as HTMLElement
			const textarea = compiled.querySelector('textarea') as HTMLTextAreaElement
			fixtureHost.detectChanges()

			expect(textarea.classList).toContain('outline-green-500')
		})

		it('should apply default outline classes when neither valid nor invalid', () => {
			const compiled = fixture.nativeElement as HTMLElement
			const textarea = compiled.querySelector('textarea') as HTMLTextAreaElement

			expect(textarea.classList).toContain('outline-gray-300')
		})

		it('should apply cursor-not-allowed when disabled', () => {
			fixture.componentRef.setInput('disabled', true)
			fixture.detectChanges()

			const compiled = fixture.nativeElement as HTMLElement
			const textarea = compiled.querySelector('textarea') as HTMLTextAreaElement

			expect(textarea.classList).toContain('cursor-not-allowed')
		})

		it('should apply cursor-not-allowed when readonly', () => {
			fixture.componentRef.setInput('readonly', true)
			fixture.detectChanges()

			const compiled = fixture.nativeElement as HTMLElement
			const textarea = compiled.querySelector('textarea') as HTMLTextAreaElement

			expect(textarea.classList).toContain('cursor-not-allowed')
		})
	})

	describe('Accessibility', () => {
		it('should set aria-invalid to true when control is invalid and touched', async () => {
			const fixtureHost = TestBed.createComponent(TextareaValidationMock)
			fixtureHost.detectChanges()
			await fixtureHost.whenStable()

			const compiled = fixtureHost.nativeElement as HTMLElement
			const textarea = compiled.querySelector('textarea') as HTMLTextAreaElement
			textarea.dispatchEvent(new Event('blur'))
			fixtureHost.detectChanges()

			expect(textarea.getAttribute('aria-invalid')).toBe('true')
		})

		it('should set aria-invalid to false when control is valid', async () => {
			const fixtureHost = TestBed.createComponent(TextareaValidationMock)
			fixtureHost.componentInstance.form.get('requiredField')?.setValue('valid')
			fixtureHost.detectChanges()
			await fixtureHost.whenStable()

			const compiled = fixtureHost.nativeElement as HTMLElement
			const textarea = compiled.querySelector('textarea') as HTMLTextAreaElement

			expect(textarea.getAttribute('aria-invalid')).toBe('false')
		})

		it('should set aria-describedby pointing to error message id', () => {
			const compiled = fixture.nativeElement as HTMLElement
			const textarea = compiled.querySelector('textarea') as HTMLTextAreaElement

			expect(textarea.getAttribute('aria-describedby')).toBe(component.errorId())
		})

		it('should generate unique errorId based on textAreaId', () => {
			const textAreaId = component.textAreaId()
			const errorId = component.errorId()

			expect(errorId).toBe(`error-${textAreaId}`)
		})
	})

	describe('Hint text', () => {
		it('should display hint text when provided and not invalid', async () => {
			const fixtureHost = TestBed.createComponent(TextareaHintMock)
			fixtureHost.detectChanges()
			await fixtureHost.whenStable()

			const compiled = fixtureHost.nativeElement as HTMLElement
			const hint = compiled.querySelector('p.text-gray-500')

			expect(hint?.textContent?.trim()).toBe('This is a hint')
		})

		it('should hide hint text when textarea is invalid', async () => {
			const fixtureHost = TestBed.createComponent(TextareaHintValidationMock)
			fixtureHost.detectChanges()
			await fixtureHost.whenStable()

			const compiled = fixtureHost.nativeElement as HTMLElement
			const textarea = compiled.querySelector('textarea') as HTMLTextAreaElement
			textarea.dispatchEvent(new Event('blur'))
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
			const textarea = compiled.querySelector('textarea') as HTMLTextAreaElement

			textarea.value = 'test value'
			textarea.dispatchEvent(new Event('input'))
			fixture.detectChanges()

			expect(emittedValues).toContain('test value')
		})

		it('should not emit duplicate consecutive values', async () => {
			fixture.detectChanges()
			await fixture.whenStable()

			const emittedValues: string[] = []
			component.valueChanges.subscribe(val => emittedValues.push(val))

			const compiled = fixture.nativeElement as HTMLElement
			const textarea = compiled.querySelector('textarea') as HTMLTextAreaElement

			textarea.value = 'same value'
			textarea.dispatchEvent(new Event('input'))
			textarea.dispatchEvent(new Event('input'))
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
