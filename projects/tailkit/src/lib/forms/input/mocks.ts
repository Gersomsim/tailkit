import { Component } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms'

import { TkInput } from './input'

@Component({
	selector: 'tk-input-form-mock',
	standalone: true,
	imports: [TkInput, ReactiveFormsModule],
	template: `
		<form [formGroup]="form">
			<tk-input formControlName="myField" name="myField" />
		</form>
	`,
})
export class InputFormMock {
	form = new FormGroup({
		myField: new FormControl('valor inicial'),
	})
}

@Component({
	selector: 'tk-input-ngmodel-mock',
	standalone: true,
	imports: [TkInput, FormsModule],
	template: ` <tk-input [(ngModel)]="value" /> `,
})
export class InputNgModelMock {
	value = 'is ngModel'
}

@Component({
	selector: 'tk-input-validation-mock',
	standalone: true,
	imports: [TkInput, ReactiveFormsModule],
	template: `
		<form [formGroup]="form">
			<tk-input formControlName="requiredField" name="Campo requerido" />
		</form>
	`,
})
export class InputValidationMock {
	form = new FormGroup({
		requiredField: new FormControl('', [Validators.required]),
	})
}

@Component({
	selector: 'tk-input-email-mock',
	standalone: true,
	imports: [TkInput, ReactiveFormsModule],
	template: `
		<form [formGroup]="form">
			<tk-input formControlName="emailField" type="email" />
		</form>
	`,
})
export class InputEmailMock {
	form = new FormGroup({
		emailField: new FormControl('', [Validators.email]),
	})
}

@Component({
	selector: 'tk-input-minlength-mock',
	standalone: true,
	imports: [TkInput, ReactiveFormsModule],
	template: `
		<form [formGroup]="form">
			<tk-input formControlName="minlengthField" />
		</form>
	`,
})
export class InputMinlengthMock {
	form = new FormGroup({
		minlengthField: new FormControl('', [Validators.minLength(5)]),
	})
}

@Component({
	selector: 'tk-input-maxlength-mock',
	standalone: true,
	imports: [TkInput, ReactiveFormsModule],
	template: `
		<form [formGroup]="form">
			<tk-input formControlName="maxlengthField" />
		</form>
	`,
})
export class InputMaxlengthMock {
	form = new FormGroup({
		maxlengthField: new FormControl('', [Validators.maxLength(10)]),
	})
}

@Component({
	selector: 'tk-input-pattern-mock',
	standalone: true,
	imports: [TkInput, ReactiveFormsModule],
	template: `
		<form [formGroup]="form">
			<tk-input formControlName="patternField" />
		</form>
	`,
})
export class InputPatternMock {
	form = new FormGroup({
		patternField: new FormControl('', [Validators.pattern(/^[a-z]+$/)]),
	})
}

@Component({
	selector: 'tk-input-min-mock',
	standalone: true,
	imports: [TkInput, ReactiveFormsModule],
	template: `
		<form [formGroup]="form">
			<tk-input formControlName="minField" type="number" />
		</form>
	`,
})
export class InputMinMock {
	form = new FormGroup({
		minField: new FormControl(0, [Validators.min(10)]),
	})
}

@Component({
	selector: 'tk-input-max-mock',
	standalone: true,
	imports: [TkInput, ReactiveFormsModule],
	template: `
		<form [formGroup]="form">
			<tk-input formControlName="maxField" type="number" />
		</form>
	`,
})
export class InputMaxMock {
	form = new FormGroup({
		maxField: new FormControl(100, [Validators.max(50)]),
	})
}

@Component({
	selector: 'tk-input-hint-mock',
	standalone: true,
	imports: [TkInput, ReactiveFormsModule],
	template: `
		<form [formGroup]="form">
			<tk-input formControlName="hintField" hint="This is a hint" />
		</form>
	`,
})
export class InputHintMock {
	form = new FormGroup({
		hintField: new FormControl(''),
	})
}

@Component({
	selector: 'tk-input-hint-validation-mock',
	standalone: true,
	imports: [TkInput, ReactiveFormsModule],
	template: `
		<form [formGroup]="form">
			<tk-input formControlName="hintValidationField" hint="This is a hint" />
		</form>
	`,
})
export class InputHintValidationMock {
	form = new FormGroup({
		hintValidationField: new FormControl('', [Validators.required]),
	})
}
