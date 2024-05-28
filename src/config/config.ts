import dotenv from "dotenv";
import path from "path";
import Joi, { ObjectSchema } from "joi";

dotenv.config({ path: path.join(__dirname, "../../.env") });

interface EnvVars {
  NODE_ENV: string;
  PORT: number;
  JWT_SECRET_KEY: string;
  JWT_ACCESS_EXPIRES_IN: string;
  SMTP_HOST: string;
  SMTP_PORT: number;
  SMTP_USERNAME: string;
  SMTP_PASSWORD: string;
  EMAIL_FROM: string;
}

const envVarsSchema: ObjectSchema<EnvVars> = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid("production", "development", "test")
      .required(),
    PORT: Joi.number().default(3000),
    JWT_SECRET_KEY: Joi.string().required().description("JWT secret key"),
    JWT_ACCESS_EXPIRES_IN: Joi.string()
      .default("1h")
      .description("minutes after which access tokens expire"),
    SMTP_HOST: Joi.string().description("server that will send the emails"),
    SMTP_PORT: Joi.number().description("port to connect to the email server"),
    SMTP_USERNAME: Joi.string().description("username for email server"),
    SMTP_PASSWORD: Joi.string().description("password for email server"),
    EMAIL_FROM: Joi.string().description(
      "the from field in the emails sent by the app"
    ),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const config: {
  env: string;
  port: number;
  jwt: {
    secret: string;
    accessExpiresIn: string;
  };
  email: {
    smtp: {
      host: string;
      port: number;
      secure: boolean;
      auth: {
        user: string;
        pass: string;
      };
    };
    from: string;
  };
} = {
  env: envVars.NODE_ENV || "development",
  port: envVars.PORT || 3000,
  jwt: {
    secret: envVars.JWT_SECRET_KEY || "movieticketbookinghaui",
    accessExpiresIn: envVars.JWT_ACCESS_EXPIRES_IN || "1h",
  },
  email: {
    smtp: {
      host: envVars.SMTP_HOST,
      port: envVars.SMTP_PORT,
      secure: true,
      auth: {
        user: envVars.SMTP_USERNAME,
        pass: envVars.SMTP_PASSWORD,
      },
    },
    from: envVars.EMAIL_FROM,
  },
};
