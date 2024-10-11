import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // SwaggerModule.setup(path: path to documentation, app: Nest application, document: Swagger document, options: SwaggerModuleOptions)
  SwaggerModule.setup(
    'api/docs',
    app,
    SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle('Swagger Documentation API') // Sets the title for the documentation. It will be displayed at the top of the Swagger UI.
        // Sets the description for the documentation. It may contain details about the purpose of the API.
        .setDescription(
          'API for Swagger documentation with examples and detailed description. Writed by github.com/Eugener3',
        )
        .setVersion('0.1') // Sets the version for the API.
        .addTag('Cats', 'Operations related to cat management') // Adds tags to group endpoints together and you can add description.
        .addTag('Users', 'Operations related to user management')
        // Adds an authentication mechanism using Bearer tokens.
        .addBearerAuth(
          {
            in: 'Header',
            name: 'Authorization',
            description: 'Please enter token in following format: Bearer <JWT>',
            bearerFormat: 'Bearer',
            scheme: 'Bearer',
            type: 'http',
          },
          'access-token',
        )
        // Adds authentication via Basic Authentication.
        .addBasicAuth(
          {
            type: 'http',
            scheme: 'basic',
            name: 'Basic Auth',
          },
          'basic-auth',
        )
        .addOAuth2({
          type: 'oauth2',
          flows: {
            password: {
              tokenUrl: 'http://localhost:5000/auth/token',
              scopes: {},
            },
          },
        })
        .addApiKey({
          type: 'apiKey',
          name: 'x-api-key',
          in: 'header',
        })
        .addSecurity('customAuth', {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        })
        .setTermsOfService('https://example.com/terms') // sets the URL for the Terms of Use page.
        // Sets the contact information for the API documentation.
        .setContact(
          'Author contact',
          'https://t.me/E_Sora',
          'sora.eugener@gmail.com',
        )
        .setLicense('MIT', 'https://opensource.org/licenses/MIT') // Sets the license information for the API.
        .build(),
    ),
    {
      swaggerOptions: {
        docExpansion: 'list', // Determines how the API documentation will be displayed on first load. (options: ['none', 'list', 'full']  default: 'list')
        filter: true, // Includes a search field, allowing you to filter endpoints by keyword.
        deepLinking: true, // Enables the ability to use links to specific parts of the documentation (default: true)
        operationsSorter: 'alpha', // Determines how endpoints are sorted. (options: ['alfa', 'method', 'default'] default: 'default')
        tagsSorter: 'alfa', // Determines how tags are sorted. (options: ['alfa', 'method', 'default'] default: 'default')
        // validatorUrl: null // Disables the built-in validator for the Swagger.
        tryItOutEnabled: true, // Removes the need to press Try it out.
        persistAuthorization: true, // Saves authorization between sessions.
        displayOperationId: true, // Displays the operationId for each endpoint in the documentation.
        maxDisplayedTags: 2, // Defines the maximum number of displayed tags.
        displayRequestDuration: true, // Shows the execution time of each request.
        withCredentials: true, // Determines whether requests will include cookies and HTTP headers.
        layout: 'StandaloneLayout', // Defines the Swagger UI layout to be used.
        // urls: // This parameter is used to load a specification from an external source.
        //   { url: 'https://t.me/E_Sora', name: 'API v1' },
        //   { url: 'https://t.me/E_Sora', name: 'API v2' },
        // ],
        // Automatically substitutes the API key into request headers.
        preauthorizeApiKey: {
          key: 'access-token',
          value: '1234567890',
        },
        preauthorizeBasic: {
          username: 'admin',
          password: 'a123',
        },
        // Automatically prepends Basic Auth credentials to the request headers.
        // This feature is not included in the standard Swagger UI package,
        // but can be implemented using third-party theme customization solutions.
        theme: 'default', // Allows you to set a custom theme for the Swagger UI.
        // Controls the syntax highlighting in the Swagger UI. (options: ['true', 'false', { theme: 'monokai' }]  default: 'true')
        syntaxHighlight: {
          theme: 'monokai',
        },
        enableCORS: true, // Includes support for CORS.
      },
      customSiteTitle: 'Swagger example project', // This allows you to change the title of the Swagger page.
      // This allows you to change the icon of the Swagger page.
      customfavIcon: 'https://example.com/favicon.ico',
    },
  );

  await app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000/api/docs');
  });
}
bootstrap();
