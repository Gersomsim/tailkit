import { ComponentFixture, TestBed } from '@angular/core/testing'

import { TkSelect } from './select'

describe('Select', () => {
	let component: TkSelect
	let fixture: ComponentFixture<TkSelect>

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [TkSelect],
		}).compileComponents()

		fixture = TestBed.createComponent(TkSelect)
		component = fixture.componentInstance
		await fixture.whenStable()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
