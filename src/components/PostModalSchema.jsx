import * as Yup from "yup";

const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;

const startsWithCapitalLetter = Yup.string().test(
    "startsWithCapitalLetter",
    "Dəyər böyük hərflə (A-Z) başlamalıdır",
    (value) => /^[A-HJ-Z]/.test(value)  // Matches any uppercase letter except 'I'
);

export const PostModalSchema = Yup.object().shape({
    company: Yup.string()
        .min(1, "Şirkət adı çox qısadır")
        .concat(startsWithCapitalLetter)
        .required("Xananı doldurmağınız tələb olunur"),

    category: Yup.string(),

    position: Yup.string()
        .min(2, "Vəzifə adı çox qısadır")
        .required("Xananı doldurmağınız tələb olunur")
        .concat(startsWithCapitalLetter)
        .concat(startsWithCapitalLetter),
        
    location: Yup.string()
        .min(2, "Şəhər adı çox qısadır")
        .max(25, "Çox uzun!")
        .required("Xananı doldurmağınız tələb olunur")
        .concat(startsWithCapitalLetter),

    salary: Yup.number()
        .typeError("Maaş yalnız rəqəmlərdən ibarət olmalıdır")
        .positive("Maaş müsbət olmalıdır")
        .required("Xananı doldurmağınız tələb olunur"),

    deadline: Yup.string()
        .matches(dateRegex, "Son tarix bu formatda olmalıdır : DD/MM/YYYY")
        .required("Xananı doldurmağınız tələb olunur"),

    jobTime: Yup.string(),

    requirement: Yup.string(),

    jobInformation: Yup.string(),
});
