# ZaNjihovOsmjeh

Web Aplication for donations

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Install JSON Server

```
npm install -g json-server
```

Start JSON Server

```
json-server --watch db.json
```

Add following json to db.json

```
{
    "categories": [{
            "id": "1",
            "name": "Odjeća i Obuća",
            "shortName": "odjecaIObuca",
            "image": "img/multistep/002-shirt.svg",
            "options": [{
                "age": [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
                "size": ["XS", "S", "M", "L", "XL", "XXL"],
                "priceRange": "2-30",
                "quantity": 10
            }]
        },
        {
            "id": "2",
            "name": "Higijena",
            "shortName": "higijena",
            "image": "img/multistep/stationery.svg",
            "options": [{
                "priceRange": "2-10",
                "quantity": 10
            }]
        },
        {
            "id": "3",
            "name": "Školski pribor i igračke",
            "shortName": "skolskiPribor",
            "image": "img/multistep/003-toothbrush.svg",
            "options": [{
                "priceRange": "1-10",
                "quantity": 10
            }]
        }
    ],
    "items": [{
            "id": "1",
            "categoryId": "1",
            "name": "Trenerke",
            "shortName": "trenerke"
        },
        {
            "id": "2",
            "categoryId": "1",
            "name": "Majice",
            "shortName": "majice"
        },
        {
            "id": "3",
            "categoryId": "1",
            "name": "Trik majice",
            "shortName": "trikMajice"
        },
        {
            "id": "4",
            "categoryId": "1",
            "name": "Donji Veš",
            "shortName": "donjiVes"
        },
        {
            "id": "5",
            "categoryId": "1",
            "name": "Čarape",
            "shortName": "carape"
        },
        {
            "id": "6",
            "categoryId": "1",
            "name": "Peškiri",
            "shortName": "peskiri"
        },
        {
            "id": "7",
            "categoryId": "1",
            "name": "Patike",
            "shortName": "patike"
        },
        {
            "id": "8",
            "categoryId": "1",
            "name": "Flašica za bebe",
            "shortName": "flasicaZaBebe"
        },
        {
            "id": "9",
            "categoryId": "1",
            "name": "Ćebence",
            "shortName": "cebence"
        },
        {
            "id": "10",
            "categoryId": "1",
            "name": "Pape",
            "shortName": "pape"
        },
        {
            "id": "11",
            "categoryId": "1",
            "name": "Pidzama",
            "shortName": "pidzama"
        },
        {
            "id": "12",
            "categoryId": "1",
            "name": "Zimska kapa",
            "shortName": "zimskaKapa"
        },
        {
            "id": "13",
            "categoryId": "1",
            "name": "Papuče",
            "shortName": "papuce"
        },
        {
            "id": "14",
            "categoryId": "1",
            "name": "Hulahopke",
            "shortName": "hulahopke"
        },
        {
            "id": "15",
            "categoryId": "2",
            "name": "Dezedorans",
            "shortName": "dezedorans"
        },
        {
            "id": "16",
            "categoryId": "2",
            "name": "Kupka",
            "shortName": "kupka"
        },
        {
            "id": "17",
            "categoryId": "2",
            "name": "Šampon",
            "shortName": "sampon"
        },
        {
            "id": "18",
            "categoryId": "2",
            "name": "Četkica za zube",
            "shortName": "cetkicaZaZube"
        },
        {
            "id": "19",
            "categoryId": "2",
            "name": "Vlažne maramice",
            "shortName": "vlazneMaramice"
        },
        {
            "id": "20",
            "categoryId": "2",
            "name": "Štapići za uši",
            "shortName": "stapiciZaUsi"
        },
        {
            "id": "21",
            "categoryId": "2",
            "name": "Pasta za zube",
            "shortName": "pastaZaZube"
        },
        {
            "id": "22",
            "categoryId": "2",
            "name": "Šampon za bebe",
            "shortName": "samponZaBebe"
        },
        {
            "id": "23",
            "categoryId": "3",
            "name": "Glodalica",
            "shortName": "glodalica"
        },
        {
            "id": "24",
            "categoryId": "3",
            "name": "Igračke",
            "shortName": "igracke"
        },
        {
            "id": "25",
            "categoryId": "3",
            "name": "Sveske",
            "shortName": "sveske"
        },
        {
            "id": "26",
            "categoryId": "3",
            "name": "Bojanka",
            "shortName": "bojanka"
        },
        {
            "id": "27",
            "categoryId": "3",
            "name": "Bojice",
            "shortName": "bojice"
        },
        {
            "id": "28",
            "categoryId": "3",
            "name": "Ranac",
            "shortName": "ranac"
        }
    ]
}
```
