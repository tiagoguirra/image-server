import * as tracer from "tracer";
import * as colors from "colors";

export default tracer.console({
    level: "log",
    format: [
      "{{timestamp}} [{{title}}] ({{file}}:{{line}}) {{message}} ",
      {
        error:
          "{{timestamp}} [{{title}}] ({{file}}:{{line}}) {{message}}\nCall Stack:\n{{stack}}"
      }
    ],
    filters: {
      log: colors.cyan,
      trace: colors.magenta,
      debug: colors.yellow,
      info: colors.blue,
      warn: colors.yellow.bgBlue,
      error: colors.red
    }
  });