import { ComponentFixture, TestBed } from '@angular/core/testing'

import { TkRadiobutton } from './radiobutton'

describe('Radiobutton', () => {
	let component: TkRadiobutton
	let fixture: ComponentFixture<TkRadiobutton>

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [TkRadiobutton],
		}).compileComponents()

		fixture = TestBed.createComponent(TkRadiobutton)
		component = fixture.componentInstance
		await fixture.whenStable()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
