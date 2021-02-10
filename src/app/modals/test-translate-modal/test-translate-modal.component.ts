import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FileValidator} from 'ngx-material-file-input';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-test-translate-modal',
  templateUrl: './test-translate-modal.component.html',
  styleUrls: ['./test-translate-modal.component.scss']
})
export class TestTranslateModalComponent implements OnInit {
  translateForm = new FormGroup({
    name: new FormControl('', Validators.required),
    phone: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    file: new FormControl('', FileValidator.maxContentSize(104857600)),
    comment: new FormControl(''),
  });
  acceptFileTypes = `image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,
  application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`;
  sendFormPending = false;
  sendFormSuccess = false;
  sendFormError = false;
  pendingLogoLetterImage = './assets/images/logo-letter.svg';
  pendingLogoRotationImage = './assets/images/logo-rotation.svg';
  sendFormSuccessImage = './assets/images/send-form-success.svg';
  sendFormErrorImage = './assets/images/send-form-error.svg';

  activeLang = LANGUAGE.EN;
  languageEnum = LANGUAGE;

  constructor(
    private http: HttpClient,
    private translate: TranslateService
  ) {
      translate.setDefaultLang('en');
  }

  ngOnInit(): void {
    /*console.log(this.content);*/
  }

  submitForm() {
    if (this.translateForm.invalid) {
      return;
    }
    this.sendFormPending = true;
    const formData = new FormData();
    const values = this.translateForm.getRawValue();
    Object.keys(values).map(key => formData.append(key, values[key]));
    formData.append('text', 'Заявка на тестовый перевод с лендинга');
    if (values.file && values.file._files && values.file._files.length) {
      values.file._files.map(file => formData.append('file[]', file));
    }
    this.http.post<any>('https://libete.ru/phpmailer/mail.php', formData, { responseType: 'text' as 'json'})
      .subscribe(
        () => {
          this.sendFormPending = false;
          this.sendFormSuccess = true;
        },
          (error: HttpErrorResponse) => {
              this.sendFormPending = false;
              this.sendFormError = true;
              console.log(error.status, error.error);
          });
  }

  onMoreRequest() {
    this.sendFormSuccess = false;
    this.translateForm.reset();
  }

  onRepeatSending() {
    this.sendFormError = false;
    this.submitForm();
  }
}

enum LANGUAGE {
    EN = 'EN',
    RU = 'RU',
    FR = 'FR',
    DE = 'DE',
    IT = 'IT',
    ES = 'ES',
    NL = 'NL',
    PL = 'PL',
    TR = 'TR',
    JA = 'JA',
    KO = 'KO',
    ZH = 'ZH'
}
