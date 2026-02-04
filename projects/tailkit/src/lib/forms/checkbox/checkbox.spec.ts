import { ComponentFixture, TestBed } from '@angular/core/testing'

import { TkCheckbox } from './checkbox'

describe('Checkbox', () => {
	let component: TkCheckbox
	let fixture: ComponentFixture<TkCheckbox>

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [TkCheckbox],
		}).compileComponents()

		fixture = TestBed.createComponent(TkCheckbox)
		component = fixture.componentInstance
		await fixture.whenStable()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
