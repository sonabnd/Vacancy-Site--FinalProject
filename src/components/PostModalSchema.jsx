import * as Yup from 'yup';

// const dateRegex = /^(\d{2})\.(\d{2})\.(\d{4})$/;
// const capitalizeFirstLetter = (value) =>
//     value.replace(/\b\w/g, (char) => char.toUpperCase());
export const PostModalSchema=Yup.object().shape({
    company: Yup.string()
    // .transform((value) => capitalizeFirstLetter(value))
    .min(2, 'Şirkət adı çox qısadır')
    .max(25, 'Çox uzun!')
    .required('Xananı doldurmağınız tələb olunur'),

    category: Yup.string(),

    position: Yup.string()
    // .transform((value) => capitalizeFirstLetter(value))
    .min(2, 'Vəzifə adı çox qısadır')
    .max(30, 'Çox uzun!')
    .required('Xananı doldurmağınız tələb olunur'),

    location: Yup.string()
    // .transform((value) => capitalizeFirstLetter(value))
    .min(2, 'Şəhər adı çox qısadır')
    .max(15, 'Çox uzun!')
    .required('Xananı doldurmağınız tələb olunur'),

    salary: Yup.number()
    .typeError('Maaş yalnız rəqəmlərdən ibarət olmalıdır')
    .positive('Maaş müsbət olmalıdır')
    .required('Xananı doldurmağınız tələb olunur'),

    workExperience: Yup.number(),

    deadline: Yup.string()
    // .matches(dateRegex, 'Son tarix bu formatda olmalıdır : DD.MM.YYYY')
    .required('Xananı doldurmağınız tələb olunur'),

    jobTime: Yup.string(),

    requirement : Yup.string(),

    jobInformation: Yup.string(),
})
