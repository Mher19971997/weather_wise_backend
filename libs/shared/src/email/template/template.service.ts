import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { template } from 'lodash';

@Injectable()
export class TemplateService {
  private readonly templates: Map<any, any>;

  constructor() {
    this.templates = new Map<any, any>();
  }

  async loadTemplate(templateName: string) {
    const templatesFolder = path.join(process.cwd(), 'assets', 'templates');
    this.templates.set(
      templateName,
      template(
        fs
          .readFileSync(path.join(templatesFolder, `${templateName}.html`))
          .toString('utf-8')
      )
    );
    return this.templates;
  }
}