class GREGeoIP {
    #key;
    #baseURL = 'https://gregeoip.com/';
    #availableGeoIPParams = ['security', 'timezone', 'currency', 'device'];
    #availableLanguages = ['EN', 'AR', 'DE', 'FR', 'ES', 'JA', 'ZH', 'RU'];
    #availableFormats = ['JSON', 'XML', 'CSV', 'Newline'];
    #availableCountryParams = ['language', 'flag', 'currency', 'timezone'];

    constructor(key) {
        this.#key = key;
    }

    #serialize = function (obj) {
        var str = [];
        for (var p in obj)
            if (obj.hasOwnProperty(p)) {
                str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
            }
        return str.join('&');
    }

    #makeHttpRquest(endpoint, options, callback) {
        options.source = 'JS-Package';
        let xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                callback(xmlHttp.responseText);
            }
        }
        xmlHttp.open('GET', this.#baseURL + '/' + endpoint + '?' + this.#serialize(options), true); // true for asynchronous 
        xmlHttp.send(null);
    }

    geoip(params = [], format = 'JSON', lang = 'EN', mode = 'live') {
        return new Promise((resolve, reject) => {
            lang = lang.toUpperCase();

            // Validate the params variable items
            params.forEach(perParam => {
                if (perParam.length > 0) {
                    if (!this.#availableGeoIPParams.includes(perParam)) {
                        reject(new Error('The "' + perParam + '" module you used is unknown.\nYou can use: `security`, `timezone`, `currency` and/or `device`.\nRead more at: https://geoip-docs.gredev.io/options/custom-modules-response'));
                    }
                }
            });

            // Validate the format variable
            if (!this.#availableFormats.includes(format)) {
                reject(new Error('The `format` option value "' + lang + '" you specified is unknown.\nYou can use: `JSON`, `XML`, `CSV` or `Newline`.\nRead more at: https://geoip-docs.gredev.io/options/response-format'));
            }

            // Validate the lang variable
            if (!this.#availableLanguages.includes(lang)) {
                reject(new Error('The `lang` option value "' + lang + '" you specified is unknown.\nYou can use: `EN`, `AR`, `DE`, `FR`, `ES`, `JA`, `ZH` or `RU`.\nRead more at: https://geoip-docs.gredev.io/options/localization'));
            }

            // Validate the mode variable
            if (mode !== 'live' && mode !== 'test') {
                reject(new Error('The `mode` option value "' + lang + '" you specified is unknown.\nYou can use: `live` or `test`.\nRead more at: https://geoip-docs.gredev.io/options/development-environment'));
            }
            this.#makeHttpRquest('GeoIP', {
                'key': this.#key,
                'params': params.join(','),
                'format': format,
                'lang': lang,
                'mode': mode
            }, (res) => {
                resolve(res);
            });
        });
    }

    lookup(ip, params = [], format = 'JSON', lang = 'EN', mode = 'live') {
        return new Promise((resolve, reject) => {
            lang = lang.toUpperCase();

            // Validate the ip variable
            if (ip.length < 7){
                reject(new Error('You should pass the `ip` parameter.'))
            }

            // Validate the params variable items
            params.forEach(perParam => {
                if (perParam.length > 0) {
                    if (!this.#availableGeoIPParams.includes(perParam)) {
                        reject(new Error('The "' + perParam + '" module you used is unknown.\nYou can use: `security`, `timezone`, `currency` and/or `device`.\nRead more at: https://geoip-docs.gredev.io/options/custom-modules-response'));
                    }
                }
            });

            // Validate the format variable
            if (!this.#availableFormats.includes(format)) {
                reject(new Error('The `format` option value "' + lang + '" you specified is unknown.\nYou can use: `JSON`, `XML`, `CSV` or `Newline`.\nRead more at: https://geoip-docs.gredev.io/options/response-format'));
            }

            // Validate the lang variable
            if (!this.#availableLanguages.includes(lang)) {
                reject(new Error('The `lang` option value "' + lang + '" you specified is unknown.\nYou can use: `EN`, `AR`, `DE`, `FR`, `ES`, `JA`, `ZH` or `RU`.\nRead more at: https://geoip-docs.gredev.io/options/localization'));
            }

            // Validate the mode variable
            if (mode !== 'live' && mode !== 'test') {
                reject(new Error('The `mode` option value "' + lang + '" you specified is unknown.\nYou can use: `live` or `test`.\nRead more at: https://geoip-docs.gredev.io/options/development-environment'));
            }
            this.#makeHttpRquest('IPLookup', {
                'ip': ip,
                'key': this.#key,
                'params': params.join(','),
                'format': format,
                'lang': lang,
                'mode': mode
            }, (res) => {
                resolve(res);
            });
        });
    }

    country(countryCode, params = [], format = 'JSON', lang = 'EN', mode = 'live') {
        return new Promise((resolve, reject) => {
            countryCode = countryCode.toUpperCase();
            lang = lang.toUpperCase();

            // Validate the countryCode variable
            if (countryCode.length !== 2){
                reject(new Error('You should pass the `countryCode` parameter. Also, it should be a `ISO 3166-1 alpha-2` format.\nRead more at: https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2'));
            }

            // Validate the params variable items
            params.forEach(perParam => {
                if (perParam.length > 0) {
                    if (!this.#availableCountryParams.includes(perParam)) {
                        reject(new Error('The "' + perParam + '" module you used is unknown.\nYou can use: `language`, `flag`, `currency` and/or `timezone`.\nRead more at: https://geoip-docs.gredev.io/methods/country-data-api#possible-param'));
                    }
                }
            });

            // Validate the format variable
            if (!this.#availableFormats.includes(format)) {
                reject(new Error('The `format` option value "' + lang + '" you specified is unknown.\nYou can use: `JSON`, `XML`, `CSV` or `Newline`.\nRead more at: https://geoip-docs.gredev.io/options/response-format'));
            }

            // Validate the lang variable
            if (!this.#availableLanguages.includes(lang)) {
                reject(new Error('The `lang` option value "' + lang + '" you specified is unknown.\nYou can use: `EN`, `AR`, `DE`, `FR`, `ES`, `JA`, `ZH` or `RU`.\nRead more at: https://geoip-docs.gredev.io/options/localization'));
            }

            // Validate the mode variable
            if (mode !== 'live' && mode !== 'test') {
                reject(new Error('The `mode` option value "' + lang + '" you specified is unknown.\nYou can use: `live` or `test`.\nRead more at: https://geoip-docs.gredev.io/options/development-environment'));
            }
            this.#makeHttpRquest('Country', {
                'CountryCode': countryCode,
                'key': this.#key,
                'params': params.join(','),
                'format': format,
                'lang': lang,
                'mode': mode
            }, (res) => {
                resolve(res);
            });
        });
    }
};