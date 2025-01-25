# **Generate CRUD Boilerplate**

An NPM package that automates the creation of boilerplate code for CRUD operations in TypeScript files. It generates service, controller, and route files to streamline development.

## **Installation**

Install the package globally using npm:

```bash
npm install -g @rakin_al_mahin/generate-crud
```

## **Usage**

After installation (globally), simply run the following command:

```bash
generate-crud --name AnyName
```

If you haven't install it globally then run the following command:

```bash
npx generate-crud --name AnyName
```

## **What It Does**

##### 1. A new folder is created in the directory from where you run the command.

##### 2. Inside this folder, the following TypeScript files are generated:

- `anyname.service.ts`
- `anyname.controller.ts`
- `anyname.route.ts`

##### Each file contains pre-written boilerplate code for CRUD operations, allowing you to kickstart your development with minimal effort.

## **Example**

Running the command:

```bash
generate-crud --name User
```

##### Will generate a folder named user with the following files:

- `user.service.ts`
- `user.controller.ts`
- `user.route.ts`

##### Each file will include TypeScript boilerplate code for basic CRUD operations tailored to the provided entity name.

## **Features**

- Generates service, controller, and route files.
- Provides pre-written TypeScript boilerplate code.
- Simplifies and accelerates development of CRUD functionalities.

## **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
