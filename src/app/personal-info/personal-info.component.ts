import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../services/cart/cart.service';
import { PersonalInfo } from '../interfaces/personal-info.interface';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css'],
})
export class PersonalInfoComponent {
  public personalInfoForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private cartService: CartService
  ) {
    this.personalInfoForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      creditNumber: ['', Validators.required],
      creditDate: ['', Validators.required],
      creditOwner: ['', Validators.required],
      creditCVC: ['', Validators.required],
    });
  }

  public savePersonalInfo() {
    if (this.personalInfoForm.invalid) {
      return;
    }
    const personalInfo: PersonalInfo = {
      firstName: this.personalInfoForm.value.firstName,
      lastName: this.personalInfoForm.value.lastName,
      address: this.personalInfoForm.value.address,
      creditCard: {
        id: this.personalInfoForm.value.id,
        number: this.personalInfoForm.value.creditNumber,
        date: this.personalInfoForm.value.creditDate,
        owner: this.personalInfoForm.value.creditOwner,
        cvc: this.personalInfoForm.value.creditCVC,
      },
    };

    const currentPersonalInfo = this.cartService.personalInfoSubject.getValue();
    this.cartService.personalInfoSubject.next([personalInfo]);

    this.router.navigate(['/order-resume']);
  }
}
