#!/usr/bin/env node

import fs from "fs-extra";
import path from "path";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

// Function to convert the name to PascalCase and camelCase
const toPascalCase = (str: string): string => {
  const lowerCase = str.toLowerCase();
  return lowerCase.charAt(0).toUpperCase() + lowerCase.slice(1);
};

const toCamelCase = (str: string): string => {
  return str.toLowerCase();
};

// Define templates for service, controller and route files
const serviceTemplate = (moduleUpper: string, moduleLower: string): string => `
const create${moduleUpper} = async (data: any, user: any) => {
  // Logic for creating a ${moduleLower}
};

const get${moduleUpper}s = async () => {
  // Logic for fetching all ${moduleLower}s
};

const get${moduleUpper}ById = async (id: string) => {
  // Logic for fetching a ${moduleLower} by ID
};

const update${moduleUpper} = async (id: string, data: any, user: any) => {
  // Logic for updating a ${moduleLower}
};

const delete${moduleUpper} = async (id: string) => {
  // Logic for deleting a ${moduleLower}
};

export const ${moduleUpper}Service = {
  create${moduleUpper},
  get${moduleUpper}s,
  get${moduleUpper}ById,
  update${moduleUpper},
  delete${moduleUpper},
};
`;

const controllerTemplate = (
  moduleUpper: string,
  moduleLower: string
): string => `
import { Request, Response } from 'express';
import { ${moduleUpper}Service } from './${moduleLower}.service';

const create${moduleUpper} = async (req: Request, res: Response) => {
  const result = await ${moduleUpper}Service.create${moduleUpper}(req.body, req.user);
  res.status(201).json({ success: true, data: result });
};

const get${moduleUpper}s = async (_req: Request, res: Response) => {
  const result = await ${moduleUpper}Service.get${moduleUpper}s();
  res.status(200).json({ success: true, data: result });
};

const get${moduleUpper}ById = async (req: Request, res: Response) => {
  const result = await ${moduleUpper}Service.get${moduleUpper}ById(req.params.id);
  res.status(200).json({ success: true, data: result });
};

const update${moduleUpper} = async (req: Request, res: Response) => {
  const result = await ${moduleUpper}Service.update${moduleUpper}(req.params.id, req.body, req.user);
  res.status(200).json({ success: true, data: result });
};

const delete${moduleUpper} = async (req: Request, res: Response) => {
  await ${moduleUpper}Service.delete${moduleUpper}(req.params.id);
  res.status(200).json({ success: true, message: '${moduleUpper} deleted successfully' });
};

export const ${moduleUpper}Controller = {
  create${moduleUpper},
  get${moduleUpper}s,
  get${moduleUpper}ById,
  update${moduleUpper},
  delete${moduleUpper},
};
`;

const routeTemplate = (moduleUpper: string, moduleLower: string): string => `
import express from 'express';
import { ${moduleUpper}Controller } from './${moduleLower}.controller';

const router = express.Router();

// Create
router.post('/new', ${moduleUpper}Controller.create${moduleUpper});

// Read all
router.get('/', ${moduleUpper}Controller.get${moduleUpper}s);

// Read by ID
router.get('/:id', ${moduleUpper}Controller.get${moduleUpper}ById);

// Update
router.patch('/:id', ${moduleUpper}Controller.update${moduleUpper});

// Delete
router.delete('/:id', ${moduleUpper}Controller.delete${moduleUpper});

export const ${moduleUpper}Routes = router;
`;

// CLI to accept the entity name
const argv = yargs(hideBin(process.argv))
  .option("name", {
    alias: "n",
    type: "string",
    description: "Name of the entity",
    demandOption: true,
  })
  .parseSync();

// Generate CRUD files
const generateCRUD = (entityName: string): void => {
  const moduleUpper = toPascalCase(entityName);
  const moduleLower = toCamelCase(entityName);
  const dir = path.resolve(process.cwd(), moduleLower);
  const serviceFile = path.join(dir, `${moduleLower}.service.ts`);
  const controllerFile = path.join(dir, `${moduleLower}.controller.ts`);
  const routeFile = path.join(dir, `${moduleLower}.route.ts`);

  fs.ensureDirSync(dir);

  fs.writeFileSync(
    serviceFile,
    serviceTemplate(moduleUpper, moduleLower),
    "utf8"
  );
  fs.writeFileSync(
    controllerFile,
    controllerTemplate(moduleUpper, moduleLower),
    "utf8"
  );
  fs.writeFileSync(routeFile, routeTemplate(moduleUpper, moduleLower), "utf8");

  console.log(`CRUD files generated for ${moduleUpper} at ${dir}`);
};

generateCRUD(argv.name);
