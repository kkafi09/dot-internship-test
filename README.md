
# Contact App

Contact App adalah aplikasi untuk menyimpan data seseorang seperti nama, email, dan juga no. telp


## Pattern

Pattern yang saya gunakan untuk membuat aplikasi **Contact App** adalah MVC (Model View Controller). Kenapa saya menggunakan pattern tersebut karena pattern tersebut mudah untuk di implementasikan, kareana telah memisahkan antara **Route** untuk endpoint apinya, **Model** untuk Schema databasenya, dan **Controller** untuk proses pengolahan data
## Tech Stack

**Server:** Node, Express, Jest (Testing), MongoDB

## API Documentation

#### Logi Api

```http
  POST /api/auth/login
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | Required, Unique |
| `password` | `string` | Required. |

API login digunakan untuk masuk ke dalam aplikasi, jika belum melakukan login maka tidak dapat upate **Contact** yang ada dalam aplikasi

#### Register api

```http
  GET /api/auth/register
```

#### Get All Contacts

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name` | `string` | Required. |
| `username` | `string` | Required, Unique |
| `password` | `string` | Required. |

API register jika belum mempunyai aku maka dapa melakukan register terlebih dahulu

```http
  GET /api/contacts
```
API untuk mendapatkan seluruh data **Contact**.

Response API
```
  {
    contacts: [
      {
        name: "string",
        email: "string",
        phone_number: "string"
      }
    ],
    message: "string"
  }
```

#### Get single Contact

```http
  GET /api/contacts/:id
```
API untuk mendapatkan satu data **Contact**.


| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | Required, Unique |

Response API
```
  {
    contacts: [
      {
        name: "string",
        email: "string",
        phone_number: "string"
      }
    ],
    message: "string"
  }
```

#### Get single Contact

```http
  POST /api/contacts/:id
```
API digunakan untuk membuat **Contact** baru


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name` | `string` | Required. |
| `email` | `string` | Required, Unique |
| `phone_number` | `string` | Required. |

Response API
```
  {
    contact:
    {
      name: "string",
      email: "string",
      phone_number: "string"
    },
    message: "string"
  }
```


## Running Tests

To run tests, run the following command

```bash
  npm run test || yarn test
```


## Authors

- [@kkafi09](https://www.github.com/kkafi09)
