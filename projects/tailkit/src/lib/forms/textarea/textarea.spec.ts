import { ComponentFixture, TestBed } from '@angular/core/testing'

import { TkTextarea } from './textarea'

describe('Textarea', () => {
	let component: TkTextarea
	let fixture: ComponentFixture<TkTextarea>

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [TkTextarea],
		}).compileComponents()

		fixture = TestBed.createComponent(TkTextarea)
		component = fixture.componentInstance
		await fixture.whenStable()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
