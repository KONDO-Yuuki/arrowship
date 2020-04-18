import fs from "fs";

type TargetFunc = (...args: any[]) => Promise<any>;
type Mode = "save" | "use";
type Params = {
  funcName: string;
  mode?: Mode;
};

type ShipJson = {
  response: any;
};

const setUpFolder = (folderPath: string) => {
  try {
    fs.readdirSync(folderPath);
  } catch (e) {
    if (e.code !== "ENOENT") throw e;
    fs.mkdirSync(folderPath);
  }
};

export const arrowShip = async (
  asyncFunc: TargetFunc,
  args: any[],
  params: Params
) => {
  const folderPath = `${__dirname}/__arrowship__`;
  const jsonPath = `${folderPath}/${params.funcName}.arrow.json`;
  switch (params.mode) {
    case "save": {
      const response = await asyncFunc(...args);
      setUpFolder(folderPath);
      fs.writeFileSync(jsonPath, JSON.stringify({ response }));
      return response;
    }
    case "use": {
      const json: ShipJson = JSON.parse(fs.readFileSync(jsonPath).toString());
      return json.response;
    }
    default: {
      const response = await asyncFunc(...args);
      return response;
    }
  }
};
