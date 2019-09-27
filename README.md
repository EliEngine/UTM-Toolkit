# UTM-Toolkit
# ELI Dev Experiment UTM-Toolkit
Work in progress!!

Sneller experimenten opzetten met kant-en-klare scripts.

# Hoe gebruik je dit?

Kopieer de volgende code in de `<head>` sectie van je Webflow project.

``` html
<script type="text/javascript" src="https://eliengine.github.io/toolkit/elitoolkit.js"></script>
```

# Alles-in-één oplossingen

## Alle CTA knoppen opzoeken en de UTM codes erachter plakken

De default functie zoekt alle knoppen op die beginnen met `btn-cta` in de `id` en zet hier de UTM codes achter:

```javascript
eli.utmNaarAlleCTA();
````

Je kan ook zelf een begin term voor de `id` instellen in de parameter
```javascript
eli.utmNaarAlleCTA("customID");
````

## Hidden fields automatisch aanmaken voor alle UTM codes 

Deze functie leest de UTM codes uit en maakt automatisch een hidden field aan per UTM, deze worden daarna ook gevuld met de juiste data.
Je moet de exacte form `id` opgeven in de paramter van de functie.
```javascript
eli.maakHiddenFields("formID");
```

## Formulier automatisch vullen met data uit de URL (geen UTM codes!)
Deze functie leest de non-UTM parameters in de URL uit en zoekt per parameter een `<input>` veld met `name=parameter`, deze worden daarna ook gevuld met de juiste data.
```javascript
eli.vulFormMetUrlParams("formID");
```

### Use case
Als de url is: `www.site.nl?naam=roderick`
En je hebt een: `<input type="text" name="naam" />`
Dan wordt "roderick" vanzelf in het formulier gezet, zodat de gebruiker het niet dubbel hoeft in te vullen.

# Losse functies

## Alle UTM codes uit de URL krijgen

```javascript
var utms = eli.alleUTM();
```

Voorbeeld

```javascript
var utmCodes = eli.alleUTM();
var buttonUrl = "https://www.landingpage.com";
var nieuweUrl = buttonUrl + utmCodes;
```

## Een losse UTM code uit de URL krijgen

```javascript
eli.losseUTM();
```

Vooorbeeld
```javascript
var utm_content = eli.losseUTM("utm_content");
```
