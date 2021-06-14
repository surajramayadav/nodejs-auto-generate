module.exports = {
  jsw_secret:
    "kWsIpo7thNFzzU7mY74KnC4R4tu8Fal8gUp2l2U0tNRnWxF3Lr60hsPifKJhRjWByhgnMR2G5nMpsqWXuLsg2hK2akZJ2frmgnCsZx6QwDe3JCgKD3wop6BoeiIOHom50jUW8MHeC3izr5xNNDy36KYANZlqG5YmNmRtAoPNIRLIVVepTXZslho8DrwLYiHc65NuZVORxWSoRtj5gFcXRawEsIRPfdTwVEKdMuP00PU4vm0w9z6hqwcAj6JlT9w1PwMqGmY3tuHqCs2GUEjeyYBpM5dLvSsqi5xfBUMF2U2rsyviDIxqsmjZzeggHCJTZfSyBBFV1lznPS7FfLaxmNfMXC4z7YdFDfsvON5DRdag9d80lO9lv55FE6vBNGqbOwbOhNxXZCeShS03r9Z3Qi6KuOfb9in6YfcFRCagRT4Ha2TQpLqESXXq61DIcdJ7xCOIcYOhZukUKdbVIfCtEmiq77xi8Rd3Mk8VKtyg1wbLDltCWIPjxXygvTn5MFj9",
  DB: "mongo", // OR mysql
  // DB: "mysql", // OR mongo
  // MYSQL CONNECTION PROPERTIES
  MYSQL_HOST: "localhost",
  MYSQL_USER: "dbadmin",
  MYSQL_PASSWORD: "25824096",
  MYSQL_DB: "mydb",
  MYSQL_dialect: "mysql",
  MYSQL_pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  MONGODB_URI: "mongodb://127.0.0.1:27017/mydb",
  REACT_API_URL: "http://localhost/portal/public/api/",
  REACT_PUBLIC_URL: "http://localhost/portal/public/",
  REACT_BASE_PATH: "/var/www/html/portal",
};
