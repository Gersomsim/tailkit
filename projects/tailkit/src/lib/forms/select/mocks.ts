import { Component } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms'

import { TkSelect } from './select'
import { TkOption } from './option.interface'

const basicOptions: TkOption[] = [
	{ value: '1', label: 'Option 1' },
	{ value: '2', label: 'Option 2' },
	{ value: '3', label: 'Option 3' },
]

const optionsWithDisabled: TkOption[] = [
	{ value: '1', label: 'Option 1' },
	{ value: '2', label: 'Option 2', disabled: true },
	{ value: '3', label: 'Option 3' },
]

const groupedOptions: TkOption[] = [
	{
		value: 'group1',
		label: 'Group 1',
		options: [
			{ value: '1a', label: 'Option 1A' },
			{ value: '1b', label: 'Option 1B' },
		],
	},
	{
		value: 'group2',
		label: 'Group 2',
		options: [
			{ value: '2a', label: 'Option 2A' },
			{ value: '2b', label: 'Option 2B' },
		],
	},
]

@Component({
	selector: 'tk-select-form-mock',
	standalone: true,
	imports: [TkSelect, ReactiveFormsModule],
	template: `
		<form [formGroup]="form">
			<tk-select formControlName="myField" name="myField" [options]="options" />
		</form>
	`,
})
export class SelectFormMock {
	options = basicOptions
	form = new FormGroup({
		myField: new FormControl('1'),
	})
}

@Component({
	selector: 'tk-select-ngmodel-mock',
	standalone: true,
	imports: [TkSelect, FormsModule],
	template: ` <tk-select [(ngModel)]="value" [options]="options" /> `,
})
export class SelectNgModelMock {
	options = basicOptions
	value = '2'
}

@Component({
	selector: 'tk-select-validation-mock',
	standalone: true,
	imports: [TkSelect, ReactiveFormsModule],
	template: `
		<form [formGroup]="form">
			<tk-select formControlName="requiredField" name="Campo requerido" [options]="options" />
		</form>
	`,
})
export class SelectValidationMock {
	options = basicOptions
	form = new FormGroup({
		requiredField: new FormControl('', [Validators.required]),
	})
}

@Component({
	selector: 'tk-select-label-mock',
	standalone: true,
	imports: [TkSelect, ReactiveFormsModule],
	template: `
		<form [formGroup]="form">
			<tk-select formControlName="labelField" label="Mi Select" [options]="options" />
		</form>
	`,
})
export class SelectLabelMock {
	options = basicOptions
	form = new FormGroup({
		labelField: new FormControl('', [Validators.required]),
	})
}

@Component({
	selector: 'tk-select-hint-mock',
	standalone: true,
	imports: [TkSelect, ReactiveFormsModule],
	template: `
		<form [formGroup]="form">
			<tk-select formControlName="hintField" hint="This is a hint" [options]="options" />
		</form>
	`,
})
export class SelectHintMock {
	options = basicOptions
	form = new FormGroup({
		hintField: new FormControl(''),
	})
}

@Component({
	selector: 'tk-select-hint-validation-mock',
	standalone: true,
	imports: [TkSelect, ReactiveFormsModule],
	template: `
		<form [formGroup]="form">
			<tk-select formControlName="hintValidationField" hint="This is a hint" [options]="options" />
		</form>
	`,
})
export class SelectHintValidationMock {
	options = basicOptions
	form = new FormGroup({
		hintValidationField: new FormControl('', [Validators.required]),
	})
}

@Component({
	selector: 'tk-select-disabled-options-mock',
	standalone: true,
	imports: [TkSelect, ReactiveFormsModule],
	template: `
		<form [formGroup]="form">
			<tk-select formControlName="field" [options]="options" />
		</form>
	`,
})
export class SelectDisabledOptionsMock {
	options = optionsWithDisabled
	form = new FormGroup({
		field: new FormControl(''),
	})
}

@Component({
	selector: 'tk-select-grouped-mock',
	standalone: true,
	imports: [TkSelect, ReactiveFormsModule],
	template: `
		<form [formGroup]="form">
			<tk-select formControlName="field" [options]="options" />
		</form>
	`,
})
export class SelectGroupedMock {
	options = groupedOptions
	form = new FormGroup({
		field: new FormControl(''),
	})
}

export { basicOptions, optionsWithDisabled, groupedOptions }
