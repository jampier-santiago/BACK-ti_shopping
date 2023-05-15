"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categories = exports.products = exports.sellers = exports.clients = exports.storesComplete = exports.stores = void 0;
exports.stores = [
    {
        id: "1",
        name: "Prueba",
        logo: "https://s3.abcstatics.com/media/cultura/2020/10/05/acdc-U11064714571HRm-1248x698@abc.jpg",
    },
    {
        id: "2",
        name: "Prueba 2",
        logo: "https://s3.abcstatics.com/media/cultura/2020/10/05/acdc-U11064714571HRm-1248x698@abc.jpg",
    },
];
exports.storesComplete = [
    {
        id: "1",
        name: "Prueba",
        logo: "https://s3.abcstatics.com/media/cultura/2020/10/05/acdc-U11064714571HRm-1248x698@abc.jpg",
        adress: "dasasasd",
        bankAccountNumber: 2232332,
        description: "Loasodasndisanidas  ad asi hasi dsauh a",
        keywords: "a vdfvdf dsfssfas dsfssda",
        phoneNumber: "3232323232",
        products: [
            {
                id: "1",
                brand: "Apple",
                category: "Computadores",
                description: "saASDSASADSADSAasdasd s das dasdsa",
                name: "Mac",
                price: "404040",
            },
        ],
    },
    {
        id: "2",
        name: "Prueba 2",
        logo: "https://s3.abcstatics.com/media/cultura/2020/10/05/acdc-U11064714571HRm-1248x698@abc.jpg",
        adress: "dasasasd",
        bankAccountNumber: 2232332,
        description: "Loasodasndisanidas  ad asi hasi dsauh a",
        keywords: "a vdfvdf dsfssfas dsfssda",
        phoneNumber: "3232323232",
        products: [],
    },
];
exports.clients = [
    {
        address: "assaasaa",
        birthDate: new Date(),
        email: "client@gm.co",
        fullName: "Prueba1234",
        id: "1",
        phoneNumber: "232323322332",
        password: "$2a$10$wPVgIwfUmZNOqvnAOOu3aunV8xWxaWfM408gdLN6MguKidGniFhpu",
    },
];
exports.sellers = [
    {
        address: "assaasaa",
        birthDate: new Date(),
        email: "admin@gm.co",
        fullName: "Prueba1234",
        id: "1",
        phoneNumber: "232323322332",
        password: "$2a$10$wPVgIwfUmZNOqvnAOOu3aunV8xWxaWfM408gdLN6MguKidGniFhpu",
        dateOfMakeAccount: new Date(),
    },
];
exports.products = [
    {
        brand: "Apple",
        category: "Celulares",
        description: "LADASIDNAS sandasij dasj as das dasj das ",
        id: "1",
        name: "Iphone",
        price: "2000",
    },
    {
        brand: "Apple",
        category: "Computadores",
        description: "LADASIDNAS sandasij dasj as das dasj das ",
        id: "2",
        name: "Mac",
        price: "20000",
    },
];
exports.categories = [
    { id: "122", name: "Computadores" },
    { id: "123", name: "Celulares" },
    { id: "124", name: "Audifonos" },
];
//# sourceMappingURL=data.js.map