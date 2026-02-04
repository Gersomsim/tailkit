import { Component } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms'

import { TkTextarea } from './textarea'

@Component({
	selector: 'tk-textarea-form-mock',
	standalone: true,
	imports: [TkTextarea, ReactiveFormsModule],
	template: `
		<form [formGroup]="form">
			<tk-textarea formControlName="myField" name="myField" />
		</form>
	`,
})
export class TextareaFormMock {
	form = new FormGroup({
		myField: new FormControl('valor inicial'),
	})
}

@Component({
	selector: 'tk-textarea-ngmodel-mock',
	standalone: true,
	imports: [TkTextarea, FormsModule],
	template: ` <tk-textarea [(ngModel)]="value" /> `,
})
export class TextareaNgModelMock {
	value = 'is ngModel'
}

@Component({
	selector: 'tk-textarea-validation-mock',
	standalone: true,
	imports: [TkTextarea, ReactiveFormsModule],
	template: `
		<form [formGroup]="form">
			<tk-textarea formControlName="requiredField" name="Campo requerido" />
		</form>
	`,
})
export class TextareaValidationMock {
	form = new FormGroup({
		requiredField: new FormControl('', [Validators.required]),
	})
}

@Component({
	selector: 'tk-textarea-label-mock',
	standalone: true,
	imports: [TkTextarea, ReactiveFormsModule],
	template: `
		<form [formGroup]="form">
			<tk-textarea formControlName="labelField" label="Mi Label" />
		</form>
	`,
})
export class TextareaLabelMock {
	form = new FormGroup({
		labelField: new FormControl('', [Validators.required]),
	})
}

@Component({
	selector: 'tk-textarea-minlength-mock',
	standalone: true,
	imports: [TkTextarea, ReactiveFormsModule],
	template: `
		<form [formGroup]="form">
			<tk-textarea formControlName="minlengthField" />
		</form>
	`,
})
export class TextareaMinlengthMock {
	form = new FormGroup({
		minlengthField: new FormControl('', [Validators.minLength(5)]),
	})
}

@Component({
	selector: 'tk-textarea-maxlength-mock',
	standalone: true,
	imports: [TkTextarea, ReactiveFormsModule],
	template: `
		<form [formGroup]="form">
			<tk-textarea formControlName="maxlengthField" />
		</form>
	`,
})
export class TextareaMaxlengthMock {
	form = new FormGroup({
		maxlengthField: new FormControl('', [Validators.maxLength(10)]),
	})
}

@Component({
	selector: 'tk-textarea-pattern-mock',
	standalone: true,
	imports: [TkTextarea, ReactiveFormsModule],
	template: `
		<form [formGroup]="form">
			<tk-textarea formControlName="patternField" />
		</form>
	`,
})
export class TextareaPatternMock {
	form = new FormGroup({
		patternField: new FormControl('', [Validators.pattern(/^[a-z]+$/)]),
	})
}

@Component({
	selector: 'tk-textarea-hint-mock',
	standalone: true,
	imports: [TkTextarea, ReactiveFormsModule],
	template: `
		<form [formGroup]="form">
			<tk-textarea formControlName="hintField" hint="This is a hint" />
		</form>
	`,
})
export class TextareaHintMock {
	form = new FormGroup({
		hintField: new FormControl(''),
	})
}

@Component({
	selector: 'tk-textarea-hint-validation-mock',
	standalone: true,
	imports: [TkTextarea, ReactiveFormsModule],
	template: `
		<form [formGroup]="form">
			<tk-textarea formControlName="hintValidationField" hint="This is a hint" />
		</form>
	`,
})
export class TextareaHintValidationMock {
	form = new FormGroup({
		hintValidationField: new FormControl('', [Validators.required]),
	})
}
