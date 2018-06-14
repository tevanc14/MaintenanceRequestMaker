# Maintenance Request Maker

A Node.js-powered service to build and submit a maintenance request for my apartment complex.

## Current Interactions

> - Open and sign into website for apartment complex
> - Enter the page to create a maintenance request
> - Fill out form with desired information
> - Submit request

## Usage

> - Create file `src/credentials.json` similar to the following:

```json
{
  "username": "bleh@gmail.com",
  "password": "xxxxx",
  "phoneNumber": "(123) 456-7890"
}
```

> - Create file `src/requestDescription.js` (used javascript to take advantage of multiline string):

```javascript
const text = `Blah blah blah.`;

module.exports = {
  text
};
```

> - Install requirements by executing `npm install`
> - Invoke program with `node index.js`
