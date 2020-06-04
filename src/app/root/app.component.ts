import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ScrollToService} from '@nicky-lenaers/ngx-scroll-to';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FileValidator} from 'ngx-material-file-input';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {TestTranslateModalComponent} from '../modals/test-translate-modal/test-translate-modal.component';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute} from '@angular/router';
import {Title, Meta} from '@angular/platform-browser';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss', './app.component.mobile.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
    @ViewChild('scrollSection') scrollSection: ElementRef;
    @ViewChild('firstInput') firstInput: ElementRef;
    sectionClasses = [];
    sectionPositions = [];
    activeSectionIndex = 0;
    activeExpandedIndex: number;

    calculateForm = new FormGroup({
        name: new FormControl('', Validators.required),
        phone: new FormControl(''),
        email: new FormControl('', [Validators.required, Validators.email]),
        file: new FormControl('', FileValidator.maxContentSize(104857600)),
        comment: new FormControl(''),
    });
    acceptFileTypes = `image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,
  application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`;

    imageFlagsPath = 'assets/flags/';
    imageLangsPath = 'assets/langs/';
    imageAdvantagesPath = 'assets/advantages/';
    imageClientsPath = 'assets/clients/';
    clients = CLIENTS;
    expandingIndexes = {};
    aboutImages = [
        '../assets/images/about-1.svg',
        '../assets/images/about-2.svg',
        '../assets/images/about-3.svg',
    ];
    logoImage = '../assets/images/logo.svg';
    logoImageEn = '../assets/images/logo-en.svg';
    firstImage = '../assets/images/image-first.svg';
    thirdImage = '../assets/images/image-third.svg';

    sendFormPending = false;
    sendFormSuccess = false;
    sendFormError = false;
    pendingLogoLetterImage = '/assets/images/logo-letter.svg';
    pendingLogoRotationImage = '/assets/images/logo-rotation.svg';
    sendFormSuccessImage = '/assets/images/send-form-success.svg';
    sendFormErrorImage = '/assets/images/send-form-error.svg';

    activeLang = LANGUAGE.EN;
    languageEnum = LANGUAGE;
    content = CONTENT[LANGUAGE.EN];
    languages = [];
    languageFlags = LANGUAGE_FLAGS;
    languageTitles = LANGUAGE_TITLE;
    languageMeta = LANGUAGE_META;
    isLangsOpen = false;

    constructor(
        private scrollToService: ScrollToService,
        private http: HttpClient,
        private dialog: MatDialog,
        private route: ActivatedRoute,
        private titleService: Title,
        private metaTagService: Meta,
    ) {
        this.initFormGroup();
        this.languages = Object.values(LANGUAGE);
        this.route.params.subscribe(params => {
            if (params && params.lang) {
                const lang = params.lang.toUpperCase();
                this.activeLang = (lang in LANGUAGE) ? LANGUAGE[lang] : LANGUAGE.EN;
                this.activeExpandedIndex = null;
                this.expandingIndexes = {0: true, 1: true, 2: true, 3: true};
                this.content = CONTENT[lang];
                setTimeout(() => this.expandingIndexes = {}, 1000);
                const langs = Object.values(LANGUAGE);
                langs.splice(langs.indexOf(this.activeLang), 1);
                this.languages = [this.activeLang, ...langs];
            }
        });
    }

    public setTitle(newTitle: string) {
        this.titleService.setTitle(newTitle);
    }

    public setMeta(newMeta: string) {
        this.metaTagService.updateTag({name: 'description', content: newMeta});
    }

    initFormGroup() {
    }

    ngOnInit() {
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
            if (!document) {
                return;
            }
            const section = document.getElementsByClassName(sectionClass)[0] as HTMLElement;
            if (section) {
                this.sectionClasses.push(sectionClass);
                this.sectionPositions.push(section.offsetTop);
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
            data: this.content,
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

export enum LANGUAGE {
    EN = 'EN',
    RU = 'RU',
    FR = 'FR',
    DE = 'DE',
    IT = 'IT',
}

export enum LANGUAGE_FLAGS {
    RU = 'flag-rus.png',
    EN = 'flag-eng.svg',
    FR = 'flag-fra.svg',
    DE = 'flag-ger.svg',
    IT = 'flag-ita.svg',
}

export enum LANGUAGE_TITLE {
    RU = 'Бюро переводов Libete',
    EN = 'Libete Translation Agency',
    FR = 'Libete Translation Agency',
    DE = 'Libete Translation Agency',
    IT = 'Libete Translation Agency',
}

export enum LANGUAGE_META {
    RU = 'Бюро переводов Libete. Либете предлагает недорогие и срочные услуги переводческого агентства онлайн' +
        ' в Москве с различных языков, а также ознакомиться с расценками и отзывами о центре и бюро переводов',
    EN = 'Libete Translation Agency',
    FR = 'Libete Translation Agency',
    DE = 'Libete Translation Agency',
    IT = 'Libete Translation Agency',
}

export interface Item {
    image: string;
    text: string;
}

export const SECTION_CLASSES = [
    'first-screen',
    'second-screen',
    'third-screen',
    'fourth-screen',
    'fifth-screen',
    'sixth-screen',
];

export const CLIENTS: Item[] = [
    {image: 'client-1.svg', text: 'LarchField Group'},
    {image: 'client-2.svg', text: 'VANDERLANDE'},
    {image: 'client-3.svg', text: 'LESPT'},
    {image: 'client-4.svg', text: 'Webgames'},
    {image: 'client-5.svg', text: 'KAMAZ'},
    {image: 'client-6.svg', text: 'SCARLETT'},
    {image: 'client-7.svg', text: 'AXXO'},
    {image: 'client-8.svg', text: 'AXES'},
];


export interface Content {
    [prop: string]: any;
}

const CONTENT: Content = {
    [LANGUAGE.RU]: {
        mainTranslations: [
            {
                title: 'Письменный перевод',
                items: [
                    'юридический',
                    'технический',
                    'медицинский',
                ],
                itemsSecond: [
                    'маркетинговый',
                    'научный',
                    'публицистический',
                ],
                promo: 'Цена от $0,02 за слово'
            },
            {
                title: 'Устный перевод',
                items: [
                    'последовательный перевод и синхронный перевод: выставки, переговоры, тренинги, конференции',
                    'устный перевод онлайн (удаленная работа переводчика)',
                    'индивидуальное сопровождение и работа с группами',
                    'перевод для закрытых или публичных мероприятий',
                    'озвученный перевод медиапродукции',
                    'аренда оборудования для синхронного перевода',
                ],
                promo: 'Цена от $35 в час'
            },
            {
                title: 'Локализация сайтов и ПО',
                items: [
                    'перевод элементов пользовательского интерфейса и контента',
                    'адаптация перевода к культурным особенностям целевой аудитории',
                    'адаптация перевода к техническим аспектам его использования',
                    'работа с материалами в специальных форматах',
                    'перевод сопутствующей документации',
                ],
                promo: 'Цена от $0,02 за слово'
            },
            {
                title: 'Нотариальный перевод',
                items: [
                    `перевод документов, подтвержденный подписью и печатью нотариуса в соответствии
            с законодательством России и официальными требованиями других стран.`,
                ],
                promo: 'Цена от $8,5 за документ'
            },
        ],
        mainTranslationButton: 'Заказать перевод',
        flagsTitle: 'Мы работаем с языками стран СНГ и Прибалтики:',
        flags: [
            {image: 'star-flag-1.svg', text: 'Русский'},
            {image: 'star-flag-7.svg', text: 'Украинский'},
            {image: 'star-flag-15.svg', text: 'Белорусский'},
            {image: 'star-flag-4.svg', text: 'Казахский'},
            {image: 'star-flag-9.svg', text: 'Азербайджан&shy;ский'},
            {image: 'star-flag-8.svg', text: 'Армянский'},
            {image: 'star-flag-3.svg', text: 'Грузинский'},
            {image: 'star-flag-2.svg', text: 'Молдавский'},
            {image: 'star-flag-11.svg', text: 'Киргизский'},
            {image: 'star-flag-5.svg', text: 'Таджикский'},
            {image: 'star-flag-6.svg', text: 'Туркменский'},
            {image: 'star-flag-10.svg', text: 'Узбекский'},
            {image: 'star-flag-13.svg', text: 'Латвийский'},
            {image: 'star-flag-12.svg', text: 'Литовский'},
            {image: 'star-flag-14.svg', text: 'Эстонский'},
        ],
        testTitle: 'Мы выполняем тестовый перевод',
        testFree: 'бесплатно',
        testText1: 'Оцените качество и скорость нашей работы!',
        testText2: `Мы предоставим вам несколько вариантов работ наших переводчиков,
     и вы сможете выбрать того, чей стиль изложения наиболее вам близок.`,
        testButton: 'Заказать тестовый перевод',
        advantagesTitle: 'Почему стоит заказать перевод в «Либете»',
        advantages: [
            {
                image: 'advantage-1.svg',
                text: `Сопровождение заказа персональным менеджером.
         Новейшее ПО для управления проектами, контроля качества, распознавания текстов и речи`,
            },
            {image: 'advantage-2.svg', text: 'Квалифицированные переводчики и редакторы – носители языка'},
            {image: 'advantage-3.svg', text: 'Сертификаты соответствия требованиям ISO 17100:2015 и ISO 9001:2015'},
            {image: 'advantage-4.svg', text: 'Терминологические базы и словари для отдельных отраслей'},
            {image: 'advantage-5.svg', text: 'Быстрая и надежная доставка по всему миру'},
            {image: 'advantage-6.svg', text: 'Мы являемся членом Торгово-промышленной палаты РФ'},
            {image: 'advantage-7.svg', text: 'Срочные переводы от 1 дня'},
        ],
        formTitle: 'Расcчитать стоимость перевода',
        formName: 'Имя',
        formPhone: 'Телефон',
        formMail: 'Эл. почта',
        formFile: 'Прикрепить файл',
        formComment: 'Комментарий',
        formText1: 'Отмечены поля, обязательные для заполнения',
        formText2: 'Отправляя данную форму, я даю согласие на обработку моих персональных данных в соответствии с ',
        formPrivacy: 'Политикой конфиденциальности',
        formSubmit: 'Отправить документы для расчёта стоимости',
        clientsTitle: 'Наши клиенты',
        aboutTitle: 'О нас',
        aboutTexts: [
            `«Либете» сегодня — современная и технологичная компания, способная найти лучшее решение для самых сложных задач. Устный перевод
       на мероприятии, нотариальное заверение документов, автоматизированная локализация сайта — нерешаемых задач для нас нет.`,
            `Большой штат профессионалов и современные технические решения позволяют нам выполнять ряд задач по проекту параллельно,
        экономя время и деньги наших клиентов.`,
            `Чтобы рабочий процесс был быстрым и прозрачным для нас и для клиента, мы используем специальные программы менеджмента,
        позволяющие управлять работой и контролировать ее на всех этапах.`,
            `Благодаря современным технологиям, многие рутинные задачи выполняются автоматически, а наши переводчики, редакторы и рецензенты
       работают онлайн в едином пространстве, обмениваясь актуальным опытом и творческими находками.`,
            `Специализированные переводы выполняются носителями языка с компетенцией в конкретной отрасли.`,
            `Качество наших переводов отвечает международным стандартам, что подтверждают наши клиенты из крупных европейских компаний.`,
        ],
        aboutPromo: 'Закажите тестовый перевод, чтобы оценить уровень нашей работы',
        aboutOrder: 'Заказать тестовый перевод',
        footerTitle: 'Бюро переводов «Либете»',
        sentSuccessTitle: 'Отправлено!',
        sentSuccessText1: 'Спасибо за ваше обращение!',
        sentSuccessText2: 'Мы свяжемся с вами в ближайшее время.',
        sentSuccessButton: 'Ещё один запрос',
        sentErrorTitle: 'Произошла ошибка',
        sentErrorText1: 'Извините, но при отправке формы произошла ошибка.',
        sentErrorText2: 'Попробуйте ещё раз чуть позже.',
        sentErrorButton: 'Отправить ещё раз',
        modalTitle: 'Заказать тестовый перевод',
    },
    [LANGUAGE.EN]: {
        mainTranslations: [
            {
                title: 'Translation Services:',
                items: [
                    'Legal Translation',
                    'Technical Translation',
                    'Medical Translation',
                ],
                itemsSecond: [
                    'Marketing Translation',
                    'Scientific Translation',
                    'Journalistic Translation',
                ],
                promo: 'Rate: from $0.02/word'
            },
            {
                title: 'Interpreting Services',
                items: [
                    'Consecutive and simultaneous interpreting at exhibitions, negotiation sessions, training sessions, and conferences',
                    'Online interpreting (remote interpreter)',
                    'Individual support and work with groups',
                    'Interpreting at private or public events',
                    'Voiced translation for media',
                    'Simultaneous interpreting equipment rental',
                ],
                promo: 'Rate: from $35/hour'
            },
            {
                title: 'Website & Software Localization',
                items: [
                    'UI and content translation',
                    'Adapting translations to cultural specifics of the target audience',
                    'Adapting translations to technical specifics',
                    'Handling specific file types',
                    'Translation of associated documentation',
                ],
                promo: 'Rate: from $0.02/word'
            },
            {
                title: 'Notarized Translation',
                items: [
                    `Translation certified by the notary’s signature and seal in compliance
            with the Russian legislation and official regulations adopted by other countries.`,
                ],
                promo: 'Rate: from $8.5/document'
            },
        ],
        mainTranslationButton: 'Order Translation',
        flagsTitle: 'CIS and Baltic states languages we translate:',
        flags: [
            {image: 'star-flag-1.svg', text: 'Russian'},
            {image: 'star-flag-7.svg', text: 'Ukrainian'},
            {image: 'star-flag-15.svg', text: 'Belarusian'},
            {image: 'star-flag-4.svg', text: 'Kazakh'},
            {image: 'star-flag-9.svg', text: 'Azerbaijani'},
            {image: 'star-flag-8.svg', text: 'Armenian'},
            {image: 'star-flag-3.svg', text: 'Georgian'},
            {image: 'star-flag-2.svg', text: 'Moldavian'},
            {image: 'star-flag-11.svg', text: 'Kyrgyz'},
            {image: 'star-flag-5.svg', text: 'Tadjik'},
            {image: 'star-flag-6.svg', text: 'Turkmen'},
            {image: 'star-flag-10.svg', text: 'Uzbek'},
            {image: 'star-flag-13.svg', text: 'Latvian'},
            {image: 'star-flag-12.svg', text: 'Lithuanian'},
            {image: 'star-flag-14.svg', text: 'Estonian'},
        ],
        testFree0: 'Free',
        testTitle: ' test translation',
        testText1: 'Assess our swiftness and quality!',
        testText2: `We will provide you several test translations made by different translators
     so you can choose the one that you like most.`,
        testButton: 'Order Test Translation',
        advantagesTitle: 'Why order translation from Libete',
        advantages: [
            {
                image: 'advantage-1.svg',
                text: `Personal manager provides end-to-end order support.
         Cutting-edge project management, quality assurance, text & speech recognition software`,
            },
            {image: 'advantage-2.svg', text: 'Qualified native-speaker translators and editors'},
            {image: 'advantage-3.svg', text: '  ISO 9001:2015 and ISO 17100:2015 compliance'},
            {image: 'advantage-4.svg', text: 'Term bases and domain-specific dictionaries'},
            {image: 'advantage-5.svg', text: 'Fast and reliable worldwide delivery'},
            {
                image: 'advantage-6.svg',
                text: 'Libete is a member of the Chamber of Commerce and Industry of the Russian Federation'
            },
            {image: 'advantage-7.svg', text: 'Urgent translations (order-to-text from 1 day)'},
        ],
        formTitle: 'Get free quote',
        formName: 'Name',
        formPhone: 'Phone',
        formMail: 'E-mail',
        formFile: 'Attach File',
        formComment: 'Comment',
        formText1: 'Required',
        formText2: 'By submitting this form, I give my consent to processing of my personal data as per the',
        formPrivacy: 'Privacy Policy',
        formSubmit: 'Send free quote request',
        clientsTitle: 'Our Customers',
        aboutTitle: 'Company Profile',
        aboutTexts: [
            `Today, Libete is a leading-edge and innovative translation company that can provide the best solution for the most
       complex tasks. Leverage our professional in situ interpreting,
       document certification, automated website localization, and other capabilities. There is nothing we can't handle.`,
            `A large team of professionals and innovative techniques enable us to handle several tasks at a time,
        thereby reducing our customers' time, efforts and costs.`,
            `To make sure the process is fast and transparent for us and the customer, we employ dedicated management software
        ensuring end-to-end workflow control.`,
            `Advanced solutions turn routine tasks into automated processes, while our translators, editors, and reviewers
       collaborate in one online space, exchanging relevant experience and findings.`,
            `For specialized projects, we involve native speakers having competences in specific fields.`,
            `We provide world-class translations with quality confirmed by our satisfied customers from major European businesses.`,
        ],
        aboutPromo: 'Request a test translation to assess our capabilities.',
        aboutOrder: 'Request a test translation',
        footerTitle: 'Libete Translation Agency',
        sentSuccessTitle: 'Sent!',
        sentSuccessText1: 'Thank you for your request!',
        sentSuccessText2: 'We will contact you shortly',
        sentSuccessButton: 'One more request',
        sentErrorTitle: 'Error',
        sentErrorText1: 'Sorry, an error occurred while submitting the form',
        sentErrorText2: 'Try again later',
        sentErrorButton: 'Send again',
        modalTitle: 'Request a test translation',
    },
};

