declare module "*.woff2" {
  const src: string;
  export default src;
}

// webpack require.context — 손글씨 폰트의 유니코드 분할 파일을 묶어 온다.
declare namespace NodeJS {
  interface Require {
    context(
      directory: string,
      recursive: boolean,
      regExp: RegExp,
    ): { (key: string): string; keys(): string[] };
  }
}
