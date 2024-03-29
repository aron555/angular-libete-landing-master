import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FileValidator} from 'ngx-material-file-input';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Content, LANGUAGE} from '../../root/app.component';

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
  pendingLogoLetterImage = '/assets/images/logo-letter.svg';
  pendingLogoRotationImage = '/assets/images/logo-rotation.svg';
  sendFormSuccessImage = '/assets/images/send-form-success.svg';
  sendFormErrorImage = '/assets/images/send-form-error.svg';

  activeLang = LANGUAGE.EN;
  languageEnum = LANGUAGE;

  constructor(
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public content: Content,
  ) {
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
    formData.append('option', 'com_ajax');
    formData.append('module', 'obrat');
    formData.append('format', 'json');
    if (values.file && values.file._files && values.file._files.length) {
      values.file._files.map(file => formData.append('file[]', file));
    }
    this.http.post<any>(environment.apiUrl, formData)
      .subscribe(
        () => {
          this.sendFormPending = false;
          this.sendFormSuccess = true;
        },
        () => {
          this.sendFormPending = false;
          this.sendFormError = true;
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
