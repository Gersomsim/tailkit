import { ComponentFixture, TestBed } from '@angular/core/testing'

import { TkDatepicker } from './datepicker'

describe('Datepicker', () => {
	let component: TkDatepicker
	let fixture: ComponentFixture<TkDatepicker>

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [TkDatepicker],
		}).compileComponents()

		fixture = TestBed.createComponent(TkDatepicker)
		component = fixture.componentInstance
		await fixture.whenStable()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
