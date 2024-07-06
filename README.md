### Create Sugarcoat App

![Demo](https://utfs.io/f/d171d93f-4169-4557-a399-e276c77b282a-1v0sh1.gif)

#### Overview

`create-sugarcoat-app` is a command-line tool designed to swiftly scaffold a modern backend API using TypeScript. It aims to minimize setup time and streamline the initial configuration process, allowing developers to focus more on building robust applications.

#### Features

- **TypeScript Support:** No running away from typescript
- **Webserver framework:** Choose from hono or express js as your web server
- **Database Integration:** Easily integrate with databases such as PostgreSQL, MySQL, or libsql.
- **Database Orms**: Choose from drizzle, pisma, typeorm (not recommended)
- **Authentication Options:** You can choose if you want built in auth with lucia or not

#### Getting Started

To use `create-sugarcoat-app`, follow these steps:

```bash
npx create-sugarcoat-app@latest
# or
pnpm create sugarcoat-app@latest
# or
bun create sguarcoat-app@latest
```

### Note

You might have to change environment variable's name sometime eg. when using drizzle orm with vercel pg. This is because this project is still under dev.

#### Customization

Customize the generated code, add routes, middleware, and database models as per your application's requirements.

#### Contributing

Contributions are welcome! If you have any ideas, bug fixes, or improvements, please submit a pull request or open an issue on GitHub.

#### License

This project is licensed under the MIT License - see the LICENSE file for details.
