type AliasObject = Record<string, string>;
type AliasArray = string[][];

const getAliasArray = (aliases: AliasObject): AliasArray => {
  const aliasArray: AliasArray = [];
  for (const [aliasName, path] of Object.entries(aliases)) {
    aliasArray.push([aliasName, `.${path}`]);
  }

  return aliasArray;
};

// Define aliases for various paths
const aliasObject: AliasObject = {
  "@": "/src",
  "@images": "/src/assets/images",
  "@fonts": "/src/assets/fonts",
  "@components": "/src/components",
  "@context": "/src/context",
  "@data": "/src/data",
  "@hooks": "/src/hooks",
  "@services": "/src/services",
  "@utils": "/src/utils",
};

const aliasArray = getAliasArray(aliasObject);

export { aliasObject, aliasArray };
