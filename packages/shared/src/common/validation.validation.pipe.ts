import { Pipe, PipeTransform } from '@nestjs/common';
import { ZodSchema } from 'zod';

@Pipe()
export class ValidationPipe extends PipeTransform {
  constructor(
    private readonly schema: ZodSchema,
    options?: {
      transform?: boolean;
      whitelist?: boolean;
      forbidNonWhitelisted?: boolean;
    },
  ) {
    super();
  }

  async transform(value: any) {
    const result = this.schema.safeParse(value);
    
    if (!result.success && options?.transform) {
      const errorData = result.error.errors.map((error: any) => ({
        field: error.instancePath || '',
        message: error.message,
      }));
      
      return new Error(`Validation failed: ${JSON.stringify(errorData)}`);
    }
    
    if (options?.whitelist && options?.forbidNonWhitelisted) {
      const allowedFields = Object.keys(this.schema.shape);
      const allKeys = Array.from(new Set(Object.keys(value).map(k => k)));
      
      for (const key of allKeys) {
        if (!allowedFields.includes(key)) {
          delete value[key];
        }
      }
    }
    
    return result.success ? result.data : value;
  }
}