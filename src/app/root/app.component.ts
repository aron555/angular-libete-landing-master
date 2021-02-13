import {AfterViewInit, Component, ElementRef, OnInit, ViewChild, PLATFORM_ID, Inject, OnDestroy} from '@angular/core';
import {ScrollToService} from '@nicky-lenaers/ngx-scroll-to';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FileValidator} from 'ngx-material-file-input';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {TestTranslateModalComponent} from '../modals/test-translate-modal/test-translate-modal.component';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute} from '@angular/router';
import {Title, Meta} from '@angular/platform-browser';
import {isPlatformBrowser} from '@angular/common';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {
    NgcCookieConsentService,
    NgcInitializeEvent,
    NgcNoCookieLawEvent,
    NgcStatusChangeEvent
} from 'ngx-cookieconsent';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss', './app.component.mobile.scss']
})

export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('scrollSection') scrollSection: ElementRef;
    @ViewChild('firstInput') firstInput: ElementRef;
    sectionClasses = [];
    sectionPositions = [];
    activeSectionIndex = 0;
    activeExpandedIndex: number;

    private popupOpenSubscription: Subscription;
    private popupCloseSubscription: Subscription;
    private initializeSubscription: Subscription;
    private statusChangeSubscription: Subscription;
    private revokeChoiceSubscription: Subscription;
    private noCookieLawSubscription: Subscription;

    calculateForm = new FormGroup({
        name: new FormControl('', Validators.required),
        phone: new FormControl(''),
        email: new FormControl('', [Validators.required, Validators.email]),
        file: new FormControl('', FileValidator.maxContentSize(104857600)),
        comment: new FormControl(''),
    });
    acceptFileTypes = `image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,
  application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`;
    imageLangsPath = 'assets/langs/';
    imageClientsPath = 'assets/clients/';
    clients = CLIENTS;
    expandingIndexes = {};
    aboutImages = [
        'assets/images/about-1.svg',
        'assets/images/about-2.svg',
        'assets/images/about-3.svg',
    ];
    firstImage = 'assets/images/image-first.svg';
    thirdImage = 'assets/images/image-third.svg';

    sendFormPending = false;
    sendFormSuccess = false;
    sendFormError = false;
    pendingLogoLetterImage = 'assets/images/logo-letter.svg';
    pendingLogoRotationImage = 'assets/images/logo-rotation.svg';
    sendFormSuccessImage = 'assets/images/send-form-success.svg';
    sendFormErrorImage = 'assets/images/send-form-error.svg';

    activeLang = LANGUAGE.EN;
    languageEnum = LANGUAGE;
    languages = [];
    isLangsOpen = false;
    languageFlags = LANGUAGE_FLAGS;

    useLanguage(language: string) {
        this.translate.use(language.toLowerCase());
    }

    constructor(
        private scrollToService: ScrollToService,
        private http: HttpClient,
        private dialog: MatDialog,
        private route: ActivatedRoute,
        private titleService: Title,
        private metaTagService: Meta,
        @Inject(PLATFORM_ID) private platformId: object,
        private translate: TranslateService,
        private ccService: NgcCookieConsentService,
        public el: ElementRef
    ) {
        this.initFormGroup();
        translate.setDefaultLang('en');
        this.languages = Object.values(LANGUAGE);
        this.route.params.subscribe(params => {
            if (params && params.lang) {
                const lang = params.lang.toUpperCase();
                this.activeLang = (lang in LANGUAGE) ? LANGUAGE[lang] : LANGUAGE.EN;
                this.translate.use(params.lang.toLowerCase());
                this.activeExpandedIndex = null;
                this.expandingIndexes = {0: true, 1: true, 2: true, 3: true};
                setTimeout(() => this.expandingIndexes = {}, 1000);
                const langs = Object.values(LANGUAGE);
                langs.splice(langs.indexOf(this.activeLang), 1);
                this.languages = [this.activeLang, ...langs];
            }
        });

        translate.onLangChange.subscribe((event: LangChangeEvent) => {
            // Change page title when user changes language preference
            translate.get('languageTitle').subscribe((res: string) => {
                titleService.setTitle(res);
            });
            translate.get('languageMeta').subscribe((res: string) => {
                metaTagService.updateTag({name: 'description', content: res});
            });
            const lang = document.createAttribute('lang');
            lang.value = this.translate.currentLang;
            this.el.nativeElement.parentElement.parentElement.parentElement.attributes.setNamedItem(lang);
            this.configureCookieConsent();
        });
    }

    initFormGroup() {
    }

    ngOnInit() {
        // subscribe to cookieconsent observables to react to main events
        this.popupOpenSubscription = this.ccService.popupOpen$.subscribe(
            () => {
                // you can use this.ccService.getConfig() to do stuff...
                // console.log('popupOpen');
            });

        this.popupCloseSubscription = this.ccService.popupClose$.subscribe(
            () => {
                // you can use this.ccService.getConfig() to do stuff...
                // console.log('popupClose');
            });

        this.initializeSubscription = this.ccService.initialize$.subscribe(
            (event: NgcInitializeEvent) => {
                // you can use this.ccService.getConfig() to do stuff...
                // console.log(`initialize: ${JSON.stringify(event)}`);
            });

        this.statusChangeSubscription = this.ccService.statusChange$.subscribe(
            (event: NgcStatusChangeEvent) => {
                // you can use this.ccService.getConfig() to do stuff...
                // console.log(`statusChange: ${JSON.stringify(event)}`);
            });

        this.revokeChoiceSubscription = this.ccService.revokeChoice$.subscribe(
            () => {
                // you can use this.ccService.getConfig() to do stuff...
                // console.log(`revokeChoice`);
            });

        this.noCookieLawSubscription = this.ccService.noCookieLaw$.subscribe(
            (event: NgcNoCookieLawEvent) => {
                // you can use this.ccService.getConfig() to do stuff...
                // console.log(`noCookieLaw: ${JSON.stringify(event)}`);
            });

        this.configureCookieConsent();

    }

    configureCookieConsent() {
        this.translate
            .get(['cookie.header', 'cookie.message', 'cookie.dismiss', 'cookie.allow', 'cookie.deny', 'cookie.link', 'cookie.policy', 'cookie.policyLink', 'cookie.policyHref'])
            .subscribe(data => {
                // console.log(data);
                this.ccService.getConfig().content = this.ccService.getConfig().content || {};
                // Override default messages with the translated ones
                this.ccService.getConfig().content.header = data['cookie.header'];
                this.ccService.getConfig().content.message = data['cookie.message'];
                this.ccService.getConfig().content.dismiss = data['cookie.dismiss'];
                this.ccService.getConfig().content.allow = data['cookie.allow'];
                this.ccService.getConfig().content.deny = data['cookie.deny'];
                this.ccService.getConfig().content.link = data['cookie.link'];
                this.ccService.getConfig().content.policy = data['cookie.policy'];
                this.ccService.getConfig().content.cookiePolicyLink = data['cookie.policyLink'];
                this.ccService.getConfig().content.cookiePolicyHref = data['cookie.policyHref'];
                this.ccService.destroy();// remove previous cookie bar (with default messages)
                this.ccService.init(this.ccService.getConfig()); // update config with translated messages
            });
    }

    ngOnDestroy() {
        // unsubscribe to cookieconsent observables to prevent memory leaks
        this.popupOpenSubscription.unsubscribe();
        this.popupCloseSubscription.unsubscribe();
        this.initializeSubscription.unsubscribe();
        this.statusChangeSubscription.unsubscribe();
        this.revokeChoiceSubscription.unsubscribe();
        this.noCookieLawSubscription.unsubscribe();
    }

    ngAfterViewInit() {
        setTimeout(() => this.setSectionPositions());
    }

    submitForm() {
        if (this.calculateForm.invalid) {
            return;
        }
        this.sendFormPending = true;
        const formData = new FormData();
        const values = this.calculateForm.getRawValue();
        Object.keys(values).map(key => formData.append(key, values[key]));
        formData.append('text', 'Заявка на рассчет стоимости с лендинга');
        if (values.file && values.file._files && values.file._files.length) {
            values.file._files.map(file => formData.append('file[]', file));
        }
        this.http.post<any>('https://libete.ru/phpmailer/mail.php', formData, {
            observe: 'events',
            responseType: 'text' as 'json'
        })
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
        this.calculateForm.reset();
    }

    onRepeatSending() {
        this.sendFormError = false;
        this.submitForm();
    }

    moveToOrderForm() {
        this.setActiveSection(4);
        setTimeout(() => this.firstInput.nativeElement.focus(), 1000);
    }

    expandedStart(index) {
        this.expandingIndexes[index] = true;
    }

    expandedRemove(index) {
        this.expandingIndexes[index] = false;
    }

    expandedOpen(index) {
        setTimeout(() => this.activeExpandedIndex = index);
    }

    expandedClose() {
        this.activeExpandedIndex = null;
    }

    expandedStop(index) {
        setTimeout(() => this.expandingIndexes[index] = false, 1000);
    }

    isInExpanded(index) {
        return this.expandingIndexes[index];
    }

    private setSectionPositions() {
        SECTION_CLASSES.map(sectionClass => {
            if (isPlatformBrowser(this.platformId)) {
                const section = document.getElementsByClassName(sectionClass)[0] as HTMLElement;
                if (section) {
                    this.sectionClasses.push(sectionClass);
                    this.sectionPositions.push(section.offsetTop);
                }
            }
        });
    }

    checkActiveSection($event) {
        if (!$event || !$event.target) {
            return;
        }
        this.sectionPositions.map((sectionPosition, idx) => {
            if ($event.target.scrollTop >= sectionPosition) {
                this.activeSectionIndex = idx;
            }
        });
    }

    setActiveSection($event: any) {
        try {
            this.scrollToService.scrollTo({
                offset: this.sectionPositions[$event] - this.scrollSection.nativeElement.scrollTop,
                container: this.scrollSection
            });
        } catch (e) {
        }
    }

    showTestTranslateModal() {
        this.dialog.open(TestTranslateModalComponent, {
            /*data: this.content,*/
            width: '100%',
            height: '100%',
            maxWidth: '100%',
            maxHeight: '100%',
        });
    }

    toggleLang(value?: boolean) {
        (value !== undefined)
            ? this.isLangsOpen = value
            : this.isLangsOpen = !this.isLangsOpen;

    }
}

const SECTION_CLASSES = [
    'first-screen',
    'second-screen',
    'third-screen',
    'fourth-screen',
    'fifth-screen',
    'sixth-screen',
];

interface Item {
    image: string;
    text: string;
}

const CLIENTS: Item[] = [
    {image: 'client-1.svg', text: 'LarchField Group'},
    {image: 'client-2.svg', text: 'VANDERLANDE'},
    {image: 'client-3.svg', text: 'LESPT'},
    {image: 'client-4.svg', text: 'Webgames'},
    {image: 'client-5.svg', text: 'KAMAZ'},
    {image: 'client-6.svg', text: 'SCARLETT'},
    {image: 'client-7.svg', text: 'AXXO'},
    {image: 'client-8.svg', text: 'AXES'},
];

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
    ZH = 'ZH',
    KO = 'KO',
    JA = 'JA',
}

enum LANGUAGE_FLAGS {
    EN = 'flag-eng.svg',
    RU = 'flag-rus.png',
    FR = 'flag-fra.svg',
    DE = 'flag-ger.svg',
    IT = 'flag-ita.svg',
    ES = 'flag-es.png',
    NL = 'flag-nl.png',
    PL = 'flag-pl.svg',
    TR = 'flag-tr.png',
    ZH = 'flag-zh.svg',
    KO = 'flag-ko.svg',
    JA = 'flag-ja.svg',
}
