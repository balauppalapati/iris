module.exports = (loopback, app) => {

  // Passport configurators..
  const loopbackPassport = require('loopback-component-passport');
  const PassportConfigurator = loopbackPassport.PassportConfigurator;
  const passportConfigurator = new PassportConfigurator(app);

  /*
   * body-parser is a piece of express middleware that
   *   reads a form's input and stores it as a javascript
   *   object accessible through `req.body`
   *
   */
  const bodyParser = require('body-parser');

  // to support JSON-encoded bodies
  app.middleware('parse', bodyParser.json());

  // to support URL-encoded bodies
  app.middleware('parse', bodyParser.urlencoded({
    extended: true,
  }));

  // The access token is only available after boot
  app.middleware('auth', loopback.token({
    model: app.models.accessToken,
  }));

  const cookieParser = require('cookie-parser');
  app.middleware('session:before', cookieParser(app.get('cookieSecret')));

  const session = require('express-session');
  app.middleware('session', session({
    secret: 'kitty',
    saveUninitialized: true,
    resave: true,
  }));
  passportConfigurator.init();

  /**
   * Flash messages for passport
   *
   * Setting the failureFlash option to true instructs Passport to flash an
   * error message using the message given by the strategy's verify callback,
   * if any. This is often the best approach, because the verify callback
   * can make the most accurate determination of why authentication failed.
   */
  const flash = require('express-flash');

  // We need flash messages to see passport errors
  app.use(flash());

  passportConfigurator.setupModels({
    userModel: app.models.user,
    userIdentityModel: app.models.userIdentity,
    userCredentialModel: app.models.userCredential,
  });

  // attempt to build the providers/passport config
  let config = {};
  try {
    config = require('../../config/providers.json');
  } catch (err) {
    console.trace(err);
    process.exit(1); // fatal
  }

  for (let s in config) {
    const c = config[s];
    c.session = c.session !== false;
    passportConfigurator.configureProvider(s, c);
  }

};
