import { Component } from '@angular/core'
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'

import { TkCheckbox, TkInput, TkSelect, TkTextarea } from '@gersomsim/tailkit'

@Component({
	selector: 'app-root',
	imports: [TkTextarea, ReactiveFormsModule, FormsModule, TkSelect, TkInput, TkCheckbox],
	templateUrl: './app.html',
	styleUrl: './app.css',
})
export class App {
	form = new FormGroup({
		name: new FormControl('', [Validators.required]),
		terms: new FormControl(false, [Validators.requiredTrue]),
		options: new FormControl('', [Validators.required]),
		text: new FormControl('', [Validators.required]),
	})

	ngOnInit(): void {
		this.form.valueChanges.subscribe(val => {
			console.log(val)
		})
	}

	submitForm() {
		this.form.markAllAsTouched()
		console.log(this.form.value)
	}
}
