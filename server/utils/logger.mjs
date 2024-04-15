import morgan from "morgan";


export const loggerMiddleware = (environment) => {
  let morganFormat;
  if (environment === "production") {
    morganFormat = "short";
  } else {
    morganFormat = "dev";
  }
  return morgan(morganFormat);
};

