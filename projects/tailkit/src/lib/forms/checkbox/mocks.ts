import { Component } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms'

import { TkCheckbox } from './checkbox'

@Component({
	selector: 'tk-checkbox-form-mock',
	standalone: true,
	imports: [TkCheckbox, ReactiveFormsModule],
	template: `
		<form [formGroup]="form">
			<tk-checkbox formControlName="myField" name="myField" />
		</form>
	`,
})
export class CheckboxFormMock {
	form = new FormGroup({
		myField: new FormControl(true),
	})
}

@Component({
	selector: 'tk-checkbox-ngmodel-mock',
	standalone: true,
	imports: [TkCheckbox, FormsModule],
	template: ` <tk-checkbox [(ngModel)]="value" /> `,
})
export class CheckboxNgModelMock {
	value = true
}

@Component({
	selector: 'tk-checkbox-validation-mock',
	standalone: true,
	imports: [TkCheckbox, ReactiveFormsModule],
	template: `
		<form [formGroup]="form">
			<tk-checkbox formControlName="requiredField" name="Campo requerido" />
		</form>
	`,
})
export class CheckboxValidationMock {
	form = new FormGroup({
		requiredField: new FormControl(false, [Validators.requiredTrue]),
	})
}

@Component({
	selector: 'tk-checkbox-hint-mock',
	standalone: true,
	imports: [TkCheckbox, ReactiveFormsModule],
	template: `
		<form [formGroup]="form">
			<tk-checkbox formControlName="hintField" hint="This is a hint" />
		</form>
	`,
})
export class CheckboxHintMock {
	form = new FormGroup({
		hintField: new FormControl(false),
	})
}

@Component({
	selector: 'tk-checkbox-hint-validation-mock',
	standalone: true,
	imports: [TkCheckbox, ReactiveFormsModule],
	template: `
		<form [formGroup]="form">
			<tk-checkbox formControlName="hintValidationField" hint="This is a hint" />
		</form>
	`,
})
export class CheckboxHintValidationMock {
	form = new FormGroup({
		hintValidationField: new FormControl(false, [Validators.requiredTrue]),
	})
}
